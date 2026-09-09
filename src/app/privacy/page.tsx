import type { Metadata } from "next";
import { absoluteUrl, marketingShareMetadata } from "@/lib/site";
import { Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Teamulate collects, uses and protects information.",
  alternates: { canonical: absoluteUrl("/privacy/") },
  ...marketingShareMetadata,
};

export default function PrivacyPage() {
  return (
    <Section className="pt-16">
      <div className="mx-auto max-w-[780px]">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink">
          <p className="text-ink-muted">
            This interim statement describes Teamulate&apos;s current practices for the public website. A complete
            privacy policy reviewed by qualified legal counsel will replace this page before broader commercial
            launch.
          </p>
          <section>
            <h2 className="text-lg font-semibold">What we collect on this website</h2>
            <p className="mt-2 text-ink-muted">
              When you submit a demo request or contact form, we collect the information you provide: name, work
              email, company, website, role, company and team size, your stated challenge and country/region. We do
              not ask for passwords, API keys or confidential data on public forms.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold">How we use it</h2>
            <p className="mt-2 text-ink-muted">
              To respond to your request and evaluate fit. Submitting a form is not a marketing subscription;
              commercial email requires separate consent and always includes an unsubscribe option.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Analytics and cookies</h2>
            <p className="mt-2 text-ink-muted">
              The marketing pages of this website use Google Analytics 4 (measurement ID G-N9TCF45QX6), which sets
              analytics cookies to measure page views and interactions in aggregate. This applies to the marketing
              pages only - not to the client dashboard or unrelated demo sites hosted on this domain. We do not send
              form contents, email addresses or other personal details to analytics tooling. You can block analytics
              cookies with your browser settings or an opt-out extension; the site works without them.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Your choices</h2>
            <p className="mt-2 text-ink-muted">
              You may request access to, correction of or deletion of information you submitted through this website
              by contacting us via the contact page.
            </p>
          </section>
          <p className="text-xs text-ink-muted">Last updated: August 26, 2026.</p>
        </div>
      </div>
    </Section>
  );
}
