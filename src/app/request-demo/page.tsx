import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { Card, Eyebrow, Section } from "@/components/ui";
import { HubSpotForm } from "@/components/HubSpotForm";

export const metadata: Metadata = {
  title: "Request a Demonstration",
  description:
    "See the Teamulate autonomous marketing department in action: a focused review of your goals, current stack and the recurring work you want to move forward.",
  alternates: { canonical: absoluteUrl("/request-demo/") },
};

export default function RequestDemoPage() {
  return (
    <Section className="pt-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Request a demonstration</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink">See the team in action</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            Tell us a little about your company and what needs to move forward. The next step is a focused review of
            your goals, current stack and the recurring work you want the department to take on.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink-muted">
            <li className="flex gap-2"><span aria-hidden className="text-positive">✓</span> A walkthrough of the operating model and dashboard with your use case in mind</li>
            <li className="flex gap-2"><span aria-hidden className="text-positive">✓</span> A first look at which recurring workflows fit your stack</li>
            <li className="flex gap-2"><span aria-hidden className="text-positive">✓</span> Straight answers on scope, control and ownership</li>
          </ul>
          <p className="mt-6 text-sm text-ink-muted">
            Prefer to explore first?{" "}
            <a href="/demo/dashboard/" className="font-medium text-brand underline">
              Open the interactive demo
            </a>{" "}
            - no form required.
          </p>
        </div>
        <Card>
          <HubSpotForm formId="10fb9f2d-fdae-47db-8ce8-f986de3a5e08" variant="demo" submitLabel="Request demonstration" />
          <p className="mt-4 text-xs text-ink-muted">
            We never ask for passwords, API keys or confidential data in this form.
          </p>
        </Card>
      </div>
    </Section>
  );
}
