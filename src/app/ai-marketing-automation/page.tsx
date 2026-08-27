import type { Metadata } from "next";
import Link from "next/link";
import { ENTITY_LINE, absoluteUrl } from "@/lib/site";
import { Card, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { FAQAccordion } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "AI Marketing Automation vs an AI Marketing Department",
  description:
    "Marketing automation runs rules on a path someone already designed. Named AI seats draft new work. Where automation ends, a department begins - and where Teamulate fits.",
  alternates: { canonical: absoluteUrl("/ai-marketing-automation/") },
  robots: { index: true, follow: true },
};

const FAQ_ITEMS = [
  {
    question: "Is Teamulate a marketing automation tool?",
    answer:
      "No. Marketing automation executes rules and zaps on a path someone already designed - send this email when that form fires. Teamulate's named seats draft the new work itself: the research, the pages, the social cuts, the sequences and the reports. Automation moves work along; a department creates it.",
  },
  {
    question: "Does Teamulate replace our email platform or CRM?",
    answer:
      "No. Teamulate is not an ESP replacement and not a zap tool. It works inside the stack you already use. Your automations, your email platform and your CRM stay - the department produces the work that flows through them.",
  },
  {
    question: "Do we still need our existing automations?",
    answer:
      "Yes, keep them. Rules and zaps are the right tool for repeatable paths that are already designed. The gap they cannot fill - drafting new work with an accountable owner - is what the named seats cover.",
  },
  {
    question: "What about 'AI agents' inside automation tools?",
    answer:
      "Unnamed agents bolted onto a zap tool produce output nobody owns. The difference with a department is structure: named seats, one strategy set above them, independent QA by Guardian, measurement by Metric, and human sign-off on material decisions.",
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

const COMPARISON_ROWS: { label: string; automation: string; agents: string; teamulate: string }[] = [
  {
    label: "What it is",
    automation: "Rules and zaps on a path someone already designed",
    agents: "Loose AI agents producing output on request",
    teamulate: "An 11-seat department under one strategy",
  },
  {
    label: "Who designs the path",
    automation: "You do, up front",
    agents: "Nobody - each run is ad hoc",
    teamulate: "Strategos, as Head of Marketing",
  },
  {
    label: "Who drafts new work",
    automation: "No one - it only moves existing work",
    agents: "An unnamed agent, unowned",
    teamulate: "Named seats: Scout, Wordsmith, Seeker, Pixel, Flow, GrowthTrack, Socialite, Nexus",
  },
  {
    label: "Quality control",
    automation: "None beyond the rule itself",
    agents: "None, or self-review",
    teamulate: "Guardian checks independently; Metric reports what tools recorded",
  },
  {
    label: "Accountability",
    automation: "The rule author",
    agents: "Unclear",
    teamulate: "Every output has a named owner seat; humans keep sign-off",
  },
  {
    label: "Best for",
    automation: "Repeatable, already-designed paths",
    agents: "One-off experiments",
    teamulate: "Running marketing as a continuous, accountable function",
  },
];

export default function AiMarketingAutomationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Automation vs department</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Automation runs the path. A department drafts the work.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink">
            Marketing automation is rules and zaps executing on a path someone already designed. It is good at that -
            keep yours. What it cannot do is draft new work with an accountable owner. That is what named seats are
            for.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{ENTITY_LINE}</p>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Side by side" title="Automation vs unnamed agents vs Teamulate" />
        <div className="overflow-x-auto rounded-(--tm-radius-md) border border-line bg-surface">
          <table className="w-full min-w-[760px] text-left text-sm">
            <caption className="sr-only">Comparison of marketing automation, unnamed AI agents and the Teamulate department</caption>
            <thead>
              <tr className="border-b border-line bg-surface-muted">
                <th scope="col" className="px-4 py-3 font-semibold text-ink">&nbsp;</th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink">Marketing automation</th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink">Unnamed AI agents</th>
                <th scope="col" className="px-4 py-3 font-semibold text-brand">Teamulate</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-line align-top last:border-0">
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">{row.label}</th>
                  <td className="px-4 py-3 text-ink-muted">{row.automation}</td>
                  <td className="px-4 py-3 text-ink-muted">{row.agents}</td>
                  <td className="px-4 py-3 font-medium text-ink">{row.teamulate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted">
          Teamulate is not an ESP replacement and not a zap tool. Your stack stays; the department produces the work
          that flows through it. See exactly what it drafts in{" "}
          <Link href="/workflows/" className="font-semibold text-brand underline">
            the 18 named workflows
          </Link>
          .
        </p>
      </Section>

      <Section>
        <SectionHeading eyebrow="Where each fits" title="Keep the rules. Add the department." />
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <h3 className="text-sm font-bold text-ink">Keep automating</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Form-to-CRM routing, notification rules, list hygiene, handoffs - designed once, executed reliably.
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-bold text-ink">Stop expecting automation to create</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              No rule drafts your next page, sequence or campaign brief. That gap is where backlogs come from.
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-bold text-ink">Let named seats draft</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Research, pages, social, video, outreach and measurement - drafted by owned seats, checked by Guardian,
              gated by you.
            </p>
          </Card>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="FAQ" title="Automation questions, answered straight" />
        <div className="max-w-3xl">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">See what a department looks like</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              Eleven named seats, one strategy, independent QA - and your existing automations left exactly where they
              are.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/team/" ctaId="aima-team" kind="primary">
              Meet the 11 seats
            </CtaLink>
            <CtaLink href="/autonomous-ai-marketing-department/" ctaId="aima-product" kind="secondary">
              The full department
            </CtaLink>
          </div>
        </div>
      </Section>
    </>
  );
}
