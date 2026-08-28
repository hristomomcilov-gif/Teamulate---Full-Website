import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { Eyebrow, Section, StatusChip } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Teamulate website.",
  alternates: { canonical: absoluteUrl("/terms/") },
};

export default function TermsPage() {
  return (
    <Section className="pt-16">
      <div className="mx-auto max-w-[780px]">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Terms of Use</h1>
        <div className="mt-3">
          <StatusChip tone="attention" label="Interim terms - final version pending legal counsel review" />
        </div>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink">
          <p className="text-ink-muted">
            These interim terms govern use of the Teamulate public website. Complete terms reviewed by qualified legal
            counsel will replace this page before broader commercial launch. Client service engagements are governed by
            individually signed scopes and agreements, not by this page.
          </p>
          <section>
            <h2 className="text-lg font-semibold">Website content</h2>
            <p className="mt-2 text-ink-muted">
              Content on this website is provided for information about the Teamulate service. The interactive demo
              uses fictional sample data and does not represent any customer account or guaranteed outcome. Teamulate
              does not guarantee leads, pipeline or revenue.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Acceptable use</h2>
            <p className="mt-2 text-ink-muted">
              You agree not to abuse the website, attempt unauthorized access, scrape at disruptive rates or submit
              false or malicious form data.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Intellectual property</h2>
            <p className="mt-2 text-ink-muted">
              The Teamulate name, wordmark and website content are the property of Teamulate. Client-produced assets in
              service engagements belong to the client, as described in the service agreement.
            </p>
          </section>
          <p className="text-xs text-ink-muted">Last updated: August 26, 2026.</p>
        </div>
      </div>
    </Section>
  );
}
