import type { Metadata } from "next";
import Link from "next/link";
import { AGENTS } from "@/content/agents";
import { ENTITY_LINE, absoluteUrl, marketingShareMetadata } from "@/lib/site";
import { Card, Eyebrow, Section, SectionHeading, StatusChip } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "What Is an AI Marketing Team?",
  description:
    "An AI marketing team is a set of named, accountable AI seats working under one strategy - not a pile of unnamed agents. Here is how Teamulate structures its 11-seat department.",
  alternates: { canonical: absoluteUrl("/ai-marketing-team/") },
  robots: { index: true, follow: true },
  ...marketingShareMetadata,
};

const FAQ_ITEMS = [
  {
    question: "What is an AI marketing team?",
    answer:
      "An AI marketing team is a set of named AI seats - each with a defined role, defined inputs and outputs, and defined boundaries - working together under one strategy, the way a human department would. The difference from a pile of AI tools is accountability: you can point at who drafted what and why.",
  },
  {
    question: "How is that different from just using AI agents?",
    answer:
      "Unnamed agents produce output nobody owns. In a structured team, every piece of work has an owner seat, passes independent QA before you see it, and material decisions wait for a human. Structure is the product; the models are just the mechanism.",
  },
  {
    question: "How many seats does Teamulate run?",
    answer:
      "Eleven, always: Strategos (Head), Scout (Insight), Wordsmith (Content), Seeker (SEO/GEO), GrowthTrack (Demand), Pixel (Design and video), Flow (Site/CRO), Socialite (Nurture), Nexus (Ops), Metric (Analytics) and Guardian (QA).",
  },
  {
    question: "Do we need to hire a marketing manager to manage it?",
    answer:
      "No. A client marketing manager is not required. Strategos coordinates the seats and the cadence; your team keeps sign-off on strategy, spend and sensitive decisions.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function AiMarketingTeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Definition</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">What is an AI marketing team?</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink">
            An AI marketing team is a set of <strong>named, accountable AI seats</strong> working under one strategy -
            not a pile of unnamed agents. Each seat has a role, inputs, outputs and boundaries, the way a human
            department would. The structure is what makes the output trustworthy.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{ENTITY_LINE}</p>
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="Named seats"
          title="Eleven seats. Each one answerable."
          lede="One head, eight execution specialists and two independent assurance seats. Nothing in the department is anonymous."
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((agent) => (
            <li key={agent.slug} className="flex items-start justify-between gap-3 rounded-(--tm-radius-md) border border-line bg-surface p-4">
              <div>
                <p className="text-sm font-extrabold text-ink">
                  {agent.name} <span className="text-ink-muted">·</span> <span className="text-brand">{agent.tag}</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">{agent.blurb}</p>
              </div>
              {agent.type === "orchestrator" ? (
                <StatusChip tone="info" label="Head" />
              ) : agent.type === "assurance" ? (
                <StatusChip tone="positive" label="Assurance" />
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-ink-muted">
          The roster is always these 11. Strategos is Head of Marketing; Metric and Guardian check the work
          independently and do not report to any execution seat.
        </p>
      </Section>

      <Section>
        <SectionHeading eyebrow="The difference" title="Named seats vs a pile of agents" />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-l-4 border-l-critical">
            <h3 className="text-base font-bold text-ink">A pile of unnamed agents</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted">
              <li>Output appears; nobody owns it.</li>
              <li>No independent quality check before you see it.</li>
              <li>No boundary between routine drafts and material decisions.</li>
              <li>When something is wrong, there is no one to correct.</li>
            </ul>
          </Card>
          <Card className="border-l-4 border-l-positive">
            <h3 className="text-base font-bold text-ink">A structured AI marketing team</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted">
              <li>Every draft has a named owner seat and a brief behind it.</li>
              <li>Guardian checks brand, claims and quality independently.</li>
              <li>Metric reports what your tools recorded - an empty report is allowed.</li>
              <li>Strategy, spend and sensitive calls wait for your sign-off.</li>
            </ul>
          </Card>
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink-muted">
          What the seats actually run day to day is public:{" "}
          <Link href="/workflows/" className="font-semibold text-brand underline">
            the workflow library
          </Link>{" "}
          across research, pages, social, video, outreach and measurement.
        </p>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <div className="max-w-3xl">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">Meet the department behind the definition</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              Full profiles for every seat - responsibilities, boundaries and what each one is allowed to do on its
              own.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/team/" ctaId="aimt-team" kind="primary">
              Meet the 11 seats
            </CtaLink>
            <CtaLink href="/autonomous-ai-marketing-department/" ctaId="aimt-product" kind="secondary">
              The full department
            </CtaLink>
          </div>
        </div>
      </Section>
      <RelatedGuides current="/ai-marketing-team/" />
    </>
  );
}
