#!/usr/bin/env bash
# Production SuperHosting zip for the live teamulate.ca document root.
# Empty basePath: hrefs are /blog/ and /_next/, never /stg/.
# Do not include a .htaccess — live Apache stays on the server.
# Skipper comments out RewriteRule ^blog(/.*)?$ / [R=301,L] on deploy.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

rm -rf out
# Explicitly unset so a leftover staging flag cannot leak /stg into this zip.
env -u TEAMULATE_STAGING_BASE npm run build

if [[ ! -f out/blog/index.html ]]; then
  echo "live blog HTML missing from out/blog/index.html" >&2
  exit 1
fi

if rg -q '/stg/' out/blog/index.html out/blog/11-human-hires-vs-11-ai-specialists/index.html; then
  echo "live export still contains /stg/ paths" >&2
  exit 1
fi

rm -rf out/app out/auth out/shop
rm -f out/client-login.html

dest="${1:-$root/previews/live-blog.zip}"
mkdir -p "$(dirname "$dest")"
rm -f "$dest"
(
  cd out
  zip -r "$dest" . \
    -x "app/*" \
    -x "auth/*" \
    -x "shop/*" \
    -x "hosting/*" \
    -x ".htaccess"
)

echo "Wrote $dest from out/"
unzip -l "$dest" | rg -n "blog/index.html|11-human-hires-vs-11-ai-specialists/index.html|_next/"
