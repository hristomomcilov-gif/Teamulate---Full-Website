#!/usr/bin/env bash
# Build a SuperHosting zip for teamulate.ca/stg/ only.
# Do not upload this zip to the live document root.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

BASE="/stg"
rm -rf out
TEAMULATE_STAGING_BASE=1 npm run build

if [[ ! -f out/blog/index.html && ! -f out/stg/blog/index.html ]]; then
  echo "staging blog HTML missing from out/" >&2
  exit 1
fi

export_root="out"
if [[ -d out/stg/blog && -f out/stg/blog/index.html ]]; then
  export_root="out/stg"
fi

cp -f "$root/scripts/preview-htaccess" "$export_root/.htaccess"

# next/image unoptimized srcs can miss basePath; rewrite leftover public files.
EXPORT_ROOT="$export_root" STAGING_BASE="$BASE" python3 - <<'PY'
import os
from pathlib import Path
root = Path(os.environ["EXPORT_ROOT"])
base = os.environ["STAGING_BASE"]
prefixes = ("/assets/", "/agents/", "/brand/", "/creative/", "/founder/", "/reports/")
for path in root.rglob("*"):
    if not path.is_file():
        continue
    if path.suffix not in {".html", ".txt", ".js", ".xml", ".css"}:
        continue
    text = path.read_text(encoding="utf-8", errors="surrogateescape")
    original = text
    for prefix in prefixes:
        text = text.replace(f'"{prefix}', f'"{base}{prefix}')
        text = text.replace(f"'{prefix}", f"'{base}{prefix}")
        text = text.replace(f"url({prefix}", f"url({base}{prefix}")
    if text != original:
        path.write_text(text, encoding="utf-8", errors="surrogateescape")
PY

rm -rf "$export_root/app" "$export_root/auth" "$export_root/shop"
rm -f "$export_root/client-login.html"

dest="${1:-$root/previews/stg-blog.zip}"
mkdir -p "$(dirname "$dest")"
rm -f "$dest"
(
  cd "$export_root"
  zip -r "$dest" . \
    -x "app/*" \
    -x "auth/*" \
    -x "shop/*" \
    -x "hosting/*"
)

echo "Wrote $dest from $export_root"
unzip -l "$dest" | rg -n "blog/index.html|11-human-hires-vs-11-ai-specialists/index.html|_next/"
