import type { Metadata } from "next";
import Link from "next/link";
import { ENTITY_LINE, absoluteUrl } from "@/lib/site";
import { Card, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "AI Department vs Agency vs Fractional vs In-House",
  description:
    "Four ways to get marketing done in 2026 - an 11-seat AI department, hiring in-house, an agency retainer, or fractional help - compared honestly, without invented metrics.",
  alternates: { canonical: absoluteUrl("/compare/ai-vs-agency-vs-fractional-vs-inhouse/") },
  robots: { index: true, follow: true },
};

const FAQ_ITEMS = [
  {
    question: "Which option is 'best'?",
    answer:
      "It depends on what constrains you. If you need senior strategy a few hours a week, fractional fits. If you need a campaign machine with external creative muscle, an agency fits. If marketing is core and budget allows, hire. If the constraint is recurring execution capacity across many functions with full visibility, that is what the 11-seat department is built for.",
  },
  {
    question: "Does Teamulate guarantee better ROI than the alternatives?",
    answer:
      "No. Nobody honest can guarantee marketing ROI, and we do not. What we can show is the cost structure (published in our 2026 cost research), the named seats, the 60-workflow eligible library with plan activation caps, and a dashboard where you see the work and its results with limitations stated.",
  },
  {
    question: "Can Teamulate work alongside an agency or fractional leader?",
    answer:
      "Yes. The department covers recurring execution; a fractional CMO or specialist agency can sit above or beside it. Strategos coordinates the seats either way, and your existing stack stays.",
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

type Row = { label: string; teamulate: string; inhouse: string; agency: string; fractional: string };

const ROWS: Row[] = [
  {
    label: "What you get",
    teamulate: "An 11-seat AI department: Strategos as Head, eight execution seats, independent QA and analytics",
    inhouse: "Employees you hire, manage and retain",
    agency: "A retainer team shared across clients",
    fractional: "A senior person, part-time",
  },
  {
    label: "Capacity shape",
    teamulate: "Recurring execution across research, content, SEO/GEO, social, lifecycle, paid and measurement - a 60-workflow eligible library, activating 8, 20 or 35 by plan",
    inhouse: "As many functions as you can afford to staff",
    agency: "Deep in the agency's specialty, thinner elsewhere",
    fractional: "Strategy and direction; execution stays with you",
  },
  {
    label: "Accountability",
    teamulate: "Named seat per output; Guardian QA; human sign-off on material decisions",
    inhouse: "Direct - they work for you",
    agency: "Account manager between you and the work",
    fractional: "High for decisions, low for delivery volume",
  },
  {
    label: "Ramp-up",
    teamulate: "Structured onboarding to first active workflows",
    inhouse: "Months per hire: recruit, onboard, ramp",
    agency: "Weeks of onboarding and briefing cycles",
    fractional: "Fast for strategy; execution still needs hands",
  },
  {
    label: "Cost structure",
    teamulate: "Setup + flat retainer (Core C$7,500 + C$5,000/mo; Growth C$12,500 + C$7,500/mo; Scale C$20,000 + from C$12,000/mo). GrokBot included",
    inhouse: "Salaries + employer load + tools (see our 2026 cost research)",
    agency: "Retainer + scope changes; production often billed extra",
    fractional: "Day or monthly rate for a slice of a senior calendar",
  },
  {
    label: "Visibility",
    teamulate: "One dashboard: goals, work, approvals, results with limitations stated",
    inhouse: "Whatever reporting you build",
    agency: "Periodic reports on the agency's cadence",
    fractional: "Depends on the person",
  },
  {
    label: "Ownership",
    teamulate: "Your accounts, your data, every asset produced stays yours",
    inhouse: "Fully yours",
    agency: "Contract-dependent; portability varies",
    fractional: "Yours, but institutional knowledge leaves with the person",
  },
];

export default function ComparePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Compare</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            AI department vs agency vs fractional vs in-house
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink">
            Four legitimate ways to get marketing done. Each fits a different constraint - here is the honest
            comparison, with no invented metrics and no guaranteed ROI from anyone.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{ENTITY_LINE}</p>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Side by side" title="The four options, on the axes that matter" />
        <div className="overflow-x-auto rounded-(--tm-radius-md) border border-line bg-surface">
          <table className="w-full min-w-[900px] text-left text-sm">
            <caption className="sr-only">Comparison of Teamulate, in-house hiring, agencies and fractional marketing leadership</caption>
            <thead>
              <tr className="border-b border-line bg-surface-muted">
                <th scope="col" className="px-4 py-3 font-semibold text-ink">&nbsp;</th>
                <th scope="col" className="px-4 py-3 font-semibold text-brand">Teamulate (11-seat department)</th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink">Hiring in-house</th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink">Agency</th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink">Fractional</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-line align-top last:border-0">
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">{row.label}</th>
                  <td className="px-4 py-3 font-medium text-ink">{row.teamulate}</td>
                  <td className="px-4 py-3 text-ink-muted">{row.inhouse}</td>
                  <td className="px-4 py-3 text-ink-muted">{row.agency}</td>
                  <td className="px-4 py-3 text-ink-muted">{row.fractional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted">
          People-cost numbers behind the in-house column are published in{" "}
          <Link href="/research/marketing-team-cost-2026/" className="font-semibold text-brand underline">
            our 2026 cost research
          </Link>{" "}
          - 2026 Robert Half national midpoints plus employer load, software and ads excluded, modeled and not a
          guarantee.
        </p>
      </Section>

      <Section>
        <SectionHeading eyebrow="Honest fit" title="When each option is the right call" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-t-4 border-t-brand">
            <h3 className="text-sm font-bold text-ink">Choose Teamulate if…</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Your constraint is recurring execution capacity across many functions, and you want named accountability
              and one dashboard without building a department.
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-bold text-ink">Hire in-house if…</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Marketing is a core competitive function, you can afford the loaded cost, and you are ready to manage and
              retain the team.
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-bold text-ink">Use an agency if…</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              You need deep external muscle in a specialty - a rebrand, a launch burst, heavyweight creative - more
              than a continuous function.
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-bold text-ink">Go fractional if…</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              You need senior strategic direction a few hours a week and already have hands for the execution.
            </p>
          </Card>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="FAQ" title="Fair questions" />
        <div className="max-w-3xl">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">Run a fit assessment</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              A focused review of your goals, stack and recurring work - and a straight answer if we are not the right
              fit.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/request-demo/" ctaId="compare-cta" kind="primary">
              Book a Demo
            </CtaLink>
            <CtaLink href="/autonomous-ai-marketing-department/" ctaId="compare-product" kind="secondary">
              What the department is
            </CtaLink>
          </div>
        </div>
      </Section>
      <RelatedGuides current="/compare/ai-vs-agency-vs-fractional-vs-inhouse/" />
    </>
  );
}
