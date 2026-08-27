import type { Metadata } from "next";
import { Card, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Sign in to the Teamulate client dashboard.",
  robots: { index: false, follow: false },
};

/**
 * Public login page - deliberately NO automatic redirect and NO prefetchable
 * link to /app/. The Apache Basic Auth prompt on /app/ (realm Teamulate)
 * must start only from an explicit user click, so the dashboard is reached
 * via a form GET submit. Never 302 /login to /app/ and never put
 * href="/app/" in the site chrome: prefetching it triggers the auth popup
 * on unrelated pages.
 */
export default function LoginPage() {
  return (
    <Section className="pt-16">
      <div className="mx-auto max-w-md">
        <Eyebrow>Client login</Eyebrow>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Sign in to your dashboard</h1>
        <Card className="mt-6">
          <p className="text-sm leading-relaxed text-ink-muted">
            The client dashboard is protected. After you continue, your browser will ask for your Teamulate access
            credentials - use the details provided during onboarding.
          </p>
          <form action="/app/" method="get" className="mt-5">
            <button
              type="submit"
              className="min-h-11 w-full rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-[#4a38d8]"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            No credentials yet? Access is provisioned during onboarding -{" "}
            <a href="/contact/" className="font-medium text-brand underline">
              contact us
            </a>
            .
          </p>
        </Card>
      </div>
    </Section>
  );
}
