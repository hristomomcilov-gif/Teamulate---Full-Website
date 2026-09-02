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
