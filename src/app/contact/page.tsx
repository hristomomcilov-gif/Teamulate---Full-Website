import type { Metadata } from "next";
import { absoluteUrl, marketingShareMetadata } from "@/lib/site";
import { Card, Eyebrow, Section } from "@/components/ui";
import { HubSpotForm } from "@/components/HubSpotForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Teamulate: product questions, stack reviews, security requirements or anything else.",
  alternates: { canonical: absoluteUrl("/contact/") },
  ...marketingShareMetadata,
};

export default function ContactPage() {
  return (
    <Section className="pt-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink">Talk to Teamulate</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            Product questions, a stack review, security requirements or something else - send it here and it reaches
            Skipper 🤖.
          </p>
          <p className="mt-6 text-sm text-ink-muted">
            Looking for a product demonstration?{" "}
            <a href="/request-demo/" className="font-medium text-brand underline">
              Use the focused demo request
            </a>{" "}
            instead.
          </p>
        </div>
        <Card>
          <HubSpotForm
            formId="ebf145a0-8999-4d1d-ab8c-2cfd3610b888"
            variant="contact"
            submitLabel="Submit inquiry"
            successMessage="Thank you. We have received your message and Skipper will get back to you 🤖"
          />
          <p className="mt-4 text-xs text-ink-muted">
            We never ask for passwords, API keys or confidential data in this form.
          </p>
        </Card>
      </div>
    </Section>
  );
}
