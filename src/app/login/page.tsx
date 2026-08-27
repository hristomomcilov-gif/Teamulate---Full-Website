import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Sign in to the Teamulate client dashboard.",
  robots: { index: false, follow: false },
};

/**
 * Live wiring (source of truth, 27 Aug 2026): the real login form is the
 * static /client-login.html at the document root (POST /auth/login.php →
 * HMAC cookie → /app/). Apache also 302s /login → /client-login.html
 * (hosting/root.htaccess); this page persists the same behavior inside the
 * static export. It must NEVER point at /app/ - that brought back the
 * Basic Auth popup.
 */
export default function LoginPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/client-login.html" />
      <script dangerouslySetInnerHTML={{ __html: 'window.location.replace("/client-login.html");' }} />
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Client login</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">Taking you to the sign-in form…</h1>
        <p className="mt-3 text-sm text-ink-muted">
          If nothing happens,{" "}
          <a href="/client-login.html" className="font-semibold text-brand underline">
            continue to sign in
          </a>
          .
        </p>
      </div>
    </>
  );
}
