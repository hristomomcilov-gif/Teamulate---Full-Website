import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Sign in to the Teamulate client dashboard.",
  robots: { index: false, follow: false },
};

/**
 * The client dashboard lives at /app/ behind Apache Basic Auth (realm
 * Teamulate). SuperHosting already 302-redirects /login variants to /app/;
 * this page persists the same behavior inside the static export: meta
 * refresh + script redirect + a visible fallback link. No login form here.
 */
export default function LoginPage() {
  return (
    <>
      {/* Browsers honor meta refresh in body; Apache-level 302 covers the rest. */}
      <meta httpEquiv="refresh" content="0;url=/app/" />
      <script dangerouslySetInnerHTML={{ __html: 'window.location.replace("/app/");' }} />
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Client login</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">Taking you to the client dashboard…</h1>
        <p className="mt-3 text-sm text-ink-muted">
          If nothing happens,{" "}
          <a href="/app/" className="font-semibold text-brand underline">
            continue to the dashboard
          </a>
          . You will be asked for your Teamulate access credentials.
        </p>
      </div>
    </>
  );
}
