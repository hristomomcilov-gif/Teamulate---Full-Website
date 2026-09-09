#!/usr/bin/env bash
# LOCKED SITECHROME (docs/LOCKED_SITECHROME.md) — About Chris deploy overlay.
#
# Live /about-chris/ must be the Next export of src/app/about-chris/page.tsx,
# never a hand-authored HTML document: that is the only way the page carries the
# homepage header AND footer by construction. This script:
#   1. builds the live static export (empty basePath),
#   2. runs the SiteChrome parity checker over it,
#   3. refreshes hosting/about-chris/index.html (source of truth of the live file),
#   4. writes export/about-chris-sitechrome-<date>.zip = about-chris/** + _next/static/**
#      (additive: hashed asset names never collide with the build already live),
#   5. verifies every /_next/ and /about-chris/ asset the page references is in the zip.
#
# Deploy (Flow): unzip at the document root. Do not deploy the HTML without _next/.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

rm -rf out
env -u TEAMULATE_STAGING_BASE npm run build

page="out/about-chris/index.html"
if [[ ! -f "$page" ]]; then
  echo "about-chris export missing: $page" >&2
  exit 1
fi
if rg -q '/stg/' "$page"; then
  echo "about-chris export still contains /stg/ paths" >&2
  exit 1
fi

node scripts/check-sitechrome-parity.mjs out

mkdir -p hosting/about-chris
cp -f "$page" hosting/about-chris/index.html

stamp="${ABOUT_CHRIS_OVERLAY_DATE:-$(date -u +%Y-%m-%d)}"
dest="${1:-$root/export/about-chris-sitechrome-$stamp.zip}"
mkdir -p "$(dirname "$dest")"
rm -f "$dest"
(
  cd out
  zip -q -r "$dest" about-chris _next/static
)

# Every absolute /_next/... or /about-chris/... reference in the page must ship in the zip.
missing=0
while IFS= read -r asset; do
  entry="${asset#/}"
  if ! unzip -l "$dest" | awk '{print $4}' | grep -qx -- "$entry"; then
    echo "asset referenced by about-chris but missing from zip: $asset" >&2
    missing=1
  fi
done < <(grep -o '\(href\|src\)="/\(_next\|about-chris\)/[^"]*"' "$page" | sed 's/^[a-z]*="//; s/"$//' | sort -u)
if [[ "$missing" -ne 0 ]]; then
  exit 1
fi

echo "Refreshed hosting/about-chris/index.html from $page"
echo "Wrote $dest ($(unzip -l "$dest" | tail -1 | awk '{print $2}') files)"
unzip -l "$dest" | rg -n "about-chris/index.html|_next/static/chunks/.*\.css"
