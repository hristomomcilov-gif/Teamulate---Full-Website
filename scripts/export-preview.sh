#!/usr/bin/env bash
# Build a SuperHosting zip for teamulate.ca/preview/ only.
# Do not upload this zip to the live document root.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

rm -rf out
TEAMULATE_PREVIEW_BASE=1 npm run build

if [[ ! -f out/blog/index.html && ! -f out/preview/blog/index.html ]]; then
  echo "preview blog HTML missing from out/" >&2
  exit 1
fi

# Next may emit files at out/ or out/preview/ when basePath is /preview.
export_root="out"
if [[ -d out/preview/blog && -f out/preview/blog/index.html ]]; then
  export_root="out/preview"
fi

cp -f "$root/scripts/preview-htaccess" "$export_root/.htaccess"

# Never ship live-root login/auth/app/shop trees in a preview zip.
rm -rf "$export_root/app" "$export_root/auth" "$export_root/shop"
rm -f "$export_root/client-login.html"

dest="${1:-$root/previews/preview-blog.zip}"
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
