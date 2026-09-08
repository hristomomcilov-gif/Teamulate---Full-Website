#!/usr/bin/env bash
# Self-contained PREVIEW DRAFT bundle for teamulate.ca/preview/team/ only.
#
# Output: previews/preview-team.zip. Flow extracts it into the existing
# /preview/team/ folder on SuperHosting (SFTP). Nothing else on the host is
# touched: the bundle carries its own _next/static assets under
# /preview/team/_next/ and its own noindex .htaccess, so it does not depend on
# (or collide with) the live root's _next build.
#
# Do not upload this zip to the document root and do not extract it over /team/.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

PREVIEW_PATH="/preview/team"
ROUTE_DIR="out/preview/team"
BUNDLE="out/preview-team-bundle"

rm -rf out
# Root basePath (no /stg), but the whole build is noindex + no GA4.
env -u TEAMULATE_STAGING_BASE TEAMULATE_PREVIEW_EXPORT=1 npm run build

if [[ ! -f "$ROUTE_DIR/index.html" ]]; then
  echo "preview team HTML missing from $ROUTE_DIR/index.html" >&2
  exit 1
fi

if ! rg -q 'name="robots" content="noindex' "$ROUTE_DIR/index.html"; then
  echo "preview team HTML is missing the noindex meta tag" >&2
  exit 1
fi

if rg -q 'googletagmanager' "$ROUTE_DIR/index.html"; then
  echo "preview team HTML still loads GA4" >&2
  exit 1
fi

rm -rf "$BUNDLE"
mkdir -p "$BUNDLE/_next"
cp "$ROUTE_DIR/index.html" "$BUNDLE/index.html"
# RSC payloads (index.txt + __next.*.txt segments) used by client-side navigation.
find "$ROUTE_DIR" -maxdepth 1 -name '*.txt' -exec cp {} "$BUNDLE/" \;
cp -R out/_next/static "$BUNDLE/_next/static"
cp -f "$root/scripts/preview-team-htaccess" "$BUNDLE/.htaccess"

# Re-point every /_next/ reference (HTML, RSC payload, webpack public path,
# CSS font urls) at the bundle's own copy under /preview/team/_next/.
BUNDLE_ROOT="$BUNDLE" PREVIEW_BASE="$PREVIEW_PATH" python3 - <<'PY'
import os
from pathlib import Path
root = Path(os.environ["BUNDLE_ROOT"])
base = os.environ["PREVIEW_BASE"]
changed = 0
for path in root.rglob("*"):
    if not path.is_file() or path.suffix not in {".html", ".txt", ".js", ".css"}:
        continue
    text = path.read_text(encoding="utf-8", errors="surrogateescape")
    updated = text.replace(f"{base}/_next/", "/_next/").replace("/_next/", f"{base}/_next/")
    if updated != text:
        path.write_text(updated, encoding="utf-8", errors="surrogateescape")
        changed += 1
print(f"rewrote /_next/ -> {base}/_next/ in {changed} files")
PY

if rg -q '"/_next/' "$BUNDLE/index.html"; then
  echo "bundle HTML still references the root /_next/ build" >&2
  exit 1
fi

# Public assets referenced by the shared chrome (/brand/, /login-intercept.js,
# /agents/ ...) are intentionally left root-relative: they already exist on the
# live host and are identical for this build.

dest="${1:-$root/previews/preview-team.zip}"
mkdir -p "$(dirname "$dest")"
rm -f "$dest"
(
  cd "$BUNDLE"
  zip -qr "$dest" . -x "*.DS_Store"
)

echo "Wrote $dest from $BUNDLE"
echo "SFTP target: teamulate.ca${PREVIEW_PATH}/ (noindex draft; not linked, not in sitemap)"
unzip -l "$dest" | rg -n "index.html|\.htaccess|_next/static/chunks/.*\.css" | head -n 10
