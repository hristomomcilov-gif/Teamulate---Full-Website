# Hosting tree - live teamulate.ca login (source of truth, 27 Aug 2026)

These are the exact files running on SuperHosting (Apache + PHP 7.4). Deploy layout:

| Repo file | Deploy to |
|---|---|
| `client-login.html` | document root `/client-login.html` |
| `login-intercept.js` | document root `/login-intercept.js` |
| `root.htaccess` | merged into the document-root `.htaccess` (do not wipe other rules) |
| `sitemap.php` | document root `/sitemap.php` (rewrites `/sitemap.xml`; do not process `.xml` as PHP) |
| `auth/login.php`, `auth/serve.php`, `auth/.htaccess` | `/auth/` |
| `app.htaccess` | `/app/.htaccess` (NO Basic Auth) |
| `about-chris/index.html` | `/about-chris/index.html` — **only together with** `export/about-chris-sitechrome-<date>.zip` (see below) |
| `js/about-nav.js` | `/js/about-nav.js` — bump the `?v=` query on every page that loads it (currently `?v=2` → `?v=3`) |

## About Chris overlay (`about-chris/index.html`) — LOCKED SITECHROME

`docs/LOCKED_SITECHROME.md` (Chris, 2026-09-09): every marketing page carries the
homepage header **and** footer 1:1. The hand-authored About Chris document that was live
(header CSS mirrored by hand, no `<footer>`) cannot satisfy that, so `about-chris/index.html`
here is the **Next static export** of `src/app/about-chris/page.tsx` — same `SiteHeader`,
same `SiteFooter`, same compiled stylesheet as `/` and `/team/`.

Regenerate and package it with `scripts/export-about-chris-overlay.sh`. That script
builds, runs the SiteChrome parity checker, refreshes this file, and writes
`export/about-chris-sitechrome-<date>.zip` = `about-chris/**` (HTML + hero/OG/diagram
assets) + `_next/static/**`. **Deploy by unzipping the zip at the document root** —
never upload the HTML alone; it needs the `_next/` chunks from the same build. The
`_next/` files are content-hashed, so adding them next to the build already live is safe.

The live overlay scripts are no-ops on this page: `about-nav.js` finds no top-level
**Team** link to replace (About ▾ is in the markup), `launch-demo.js` finds every demo
link already at `/demo/dashboard/dashboard.html`, and `footer-social.js` recognises the
footer's `nav[aria-label="Teamulate on social"][data-teamulate-social="2"]` and leaves
it alone. Never edit the page body here — change `src/app/about-chris/page.tsx` and re-run
the script (copy is locked).

`js/about-nav.js` turns the exported top-level **Team** link into the **About ▾**
dropdown (Chris → `/about-chris/`, The Team → `/team/`) on live pages from the older
build (homepage). v3 styles the trigger inline so it renders as a plain text link +
chevron even on a page without Tailwind preflight, and highlights About when a child page
is current (same rule as `SiteHeader.tsx`).

## How login works

Public form at `/client-login.html` → `POST /auth/login.php` → verifies against
`app/.htpasswd` (bcrypt `$2y$/$2a$` or crypt/apr1) → sets HMAC cookie `tm_auth`
(Path=/app, HttpOnly, Secure, SameSite=Lax, 12h) → `/app/` is served through
`/auth/serve.php`, which 302s anonymous visitors back to `/client-login.html`
with **no WWW-Authenticate header** (never bring Basic Auth back - it caused
browser popups when /login redirected to /app/ or when fetch('/app/') ran).
Root `.htaccess` 302s `/login` → `/client-login.html`.

## Secrets - never in the repo

- `auth/.secret`: Chris generates this **on the server** with random bytes
  (e.g. `head -c 32 /dev/urandom | base64 > .secret`) and never checks it in.
  `auth/.secret.example` is a placeholder only.
- `app/.htpasswd`: user entries (chris + demo) live on the server only.
- `.gitignore` blocks `auth/.secret` and any `.htpasswd`.

Shop demo folders and `/preview/` are separate deployments - never touched by
this repo or the static export zip.
