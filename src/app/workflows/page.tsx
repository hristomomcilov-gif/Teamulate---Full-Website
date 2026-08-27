import type { Metadata } from "next";
import { ENTITY_LINE, absoluteUrl } from "@/lib/site";
import { WORKFLOW_GROUPS, WORKFLOW_TITLE_COUNT } from "@/content/workflows";
import { Card, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "The 18 Named Marketing Workflows",
  description:
    "Every workflow Teamulate runs has a name, an owner seat and an output: research, pages, social, video, outreach and measurement - eighteen named titles across the 11-seat department.",
  alternates: { canonical: absoluteUrl("/workflows/") },
  robots: { index: true, follow: true },
};

const FAQ_ITEMS = [
  {
    question: "Do you run sixty workflows?",
    answer:
      "No. We name exactly eighteen workflow titles across six groups - research, pages, social, video, outreach and measurement. We would rather name eighteen real ones than claim a big number we cannot show.",
  },
  {
    question: "Is eighteen the number of agents?",
    answer:
      "No. Eighteen is the number of named workflow titles. The roster is 11 seats: Strategos as Head of Marketing, eight execution specialists, and Metric and Guardian as independent assurance.",
  },
  {
    question: "How big is the team behind the workflows?",
    answer:
      "Eleven seats only: Strategos (Head), Scout (Insight), Wordsmith (Content), Seeker (SEO/GEO), GrowthTrack (Demand), Pixel (Design and video), Flow (Site/CRO), Socialite (Nurture), Nexus (Ops), Metric (Analytics) and Guardian (QA).",
  },
  {
    question: "Do we need a marketing manager on our side to run this?",
    answer:
      "No. A client marketing manager is not required. Strategos runs the department's day-to-day coordination; you keep sign-off on the decisions that matter.",
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

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The 18 named Teamulate marketing workflows",
  numberOfItems: WORKFLOW_TITLE_COUNT,
  itemListElement: WORKFLOW_GROUPS.flatMap((group) => group.titles).map((title, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: title,
  })),
};

export default function WorkflowsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Workflow library</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Eighteen named workflows. Not a vague &ldquo;hundreds&rdquo;.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Every workflow Teamulate runs has a name, an owner seat and an output you can point at. Here are all
            eighteen titles across six groups - and which of the 11 seats runs each one.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{ENTITY_LINE}</p>
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-6 md:grid-cols-2">
          {WORKFLOW_GROUPS.map((group) => (
            <Card key={group.group}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-extrabold text-ink">{group.group}</h2>
                <p className="text-xs font-bold text-brand">{group.seats.join(" · ")}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{group.description}</p>
              <ul className="mt-4 space-y-2">
                {group.titles.map((title) => (
                  <li key={title} className="flex items-center gap-2.5 rounded-(--tm-radius-sm) bg-surface-muted px-3.5 py-2.5 text-sm font-semibold text-ink">
                    <span aria-hidden className="text-brand">✓</span>
                    {title}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          {WORKFLOW_TITLE_COUNT} named titles · six groups · one 11-seat department. Workflow titles are not headcount.
        </p>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Straight answers on the numbers" />
        <div className="max-w-3xl">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </Section>

      <Section muted>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">See who runs them</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              Each workflow belongs to a named seat with defined boundaries, independent QA and human sign-off where it
              matters.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/team/" ctaId="workflows-team" kind="primary">
              Meet the 11 seats
            </CtaLink>
            <CtaLink href="/autonomous-ai-marketing-department/" ctaId="workflows-product" kind="secondary">
              What the department is
            </CtaLink>
          </div>
        </div>
      </Section>
      <RelatedGuides current="/workflows/" />
    </>
  );
}
