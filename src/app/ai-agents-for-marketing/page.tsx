import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agents for Marketing",
  description: "See what an AI marketing team is and how the Teamulate department works.",
  robots: { index: false, follow: true },
};

/**
 * Redirect shim (28 Aug audit): the live URL previously served a leftover
 * old-shell page ("Coming…", old nav/css). There is no accepted copy for a
 * dedicated pillar yet, so this route 0-refreshes to the closest live guide.
 * Excluded from sitemap and llms.txt until real finished copy exists.
 */
export default function AiAgentsForMarketingRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/ai-marketing-team/" />
      <script dangerouslySetInnerHTML={{ __html: 'window.location.replace("/ai-marketing-team/");' }} />
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">This guide moved</h1>
        <p className="mt-3 text-sm text-ink-muted">
          Continue to{" "}
          <a href="/ai-marketing-team/" className="font-semibold text-brand underline">
            What is an AI marketing team?
          </a>
        </p>
      </div>
    </>
  );
}
