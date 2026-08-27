import type { Metadata } from "next";
import Link from "next/link";
import { ENTITY_LINE, absoluteUrl } from "@/lib/site";
import { Card, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "What a Marketing Team Costs in 2026 - US & Canada",
  description:
    "The loaded people-cost of a 10-role in-house marketing department in 2026, built on Robert Half national midpoints plus employer load - and how a Teamulate Core plan compares. Modeled, not a guarantee.",
  alternates: { canonical: absoluteUrl("/research/marketing-team-cost-2026/") },
  robots: { index: true, follow: true },
  authors: [{ name: "Chris Momchilov" }],
};

const RH_ROLES = [
  "Marketing Manager",
  "Content Marketer",
  "Designer",
  "SEO Specialist",
  "PPC Specialist",
  "Social Media Specialist",
  "Marketing Operations",
  "Web Developer",
  "Video Producer",
  "Marketing Analyst",
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What a Marketing Team Costs in 2026 - US & Canada",
  description:
    "The loaded people-cost of a 10-role in-house marketing department in 2026, modeled on Robert Half national midpoints plus employer load, compared with a Teamulate Core plan.",
  author: {
    "@type": "Person",
    name: "Chris Momchilov",
    address: { "@type": "PostalAddress", addressLocality: "Barrie", addressCountry: "CA" },
  },
  publisher: { "@type": "Organization", name: "Teamulate", url: "https://teamulate.ca/" },
  datePublished: "2026-08-21",
  dateModified: "2026-08-27",
  mainEntityOfPage: absoluteUrl("/research/marketing-team-cost-2026/"),
};

export default function MarketingTeamCostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Section className="pt-16">
        <div className="mx-auto max-w-[820px]">
          <Eyebrow>Research</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            What a marketing team costs in 2026 - US &amp; Canada
          </h1>
          <p className="mt-4 text-sm text-ink-muted">
            By <strong className="text-ink">Chris Momchilov</strong>, Barrie · Research dated August 21, 2026 · Updated
            August 27, 2026
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            <strong>The direct answer:</strong> staffing a 10-role in-house marketing department in 2026 carries a
            loaded people-cost of roughly <strong className="tabular-nums">US$1,094,367</strong> per year in the United
            States and roughly <strong className="tabular-nums">C$875,210</strong> in Canada, based on Robert Half
            national salary midpoints plus employer load. Software and advertising spend come on top of that.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{ENTITY_LINE}</p>
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading
            eyebrow="The model"
            title="Ten roles, priced honestly"
            lede="The model covers the ten marketing roles below, priced at 2026 Robert Half national salary midpoints with employer load applied. We do not publish invented per-role salary figures here - the totals come from the published midpoints, and the methodology is disclosed in full below."
          />
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-2">
            {RH_ROLES.map((role, i) => (
              <li key={role} className="flex items-center gap-3 rounded-(--tm-radius-sm) border border-line bg-surface px-4 py-3 text-sm font-medium text-ink">
                <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lavender text-xs font-bold text-brand">
                  {i + 1}
                </span>
                {role}
              </li>
            ))}
          </ul>
          <Card className="mt-6 border-l-4 border-l-attention">
            <p className="text-sm font-semibold text-ink">What this model does not cover - said plainly</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Three Teamulate seats have no separate Robert Half salary line to benchmark against: Scout (product
              marketing / market intelligence), Socialite (lifecycle) and Guardian (dedicated marketing QA). Rather
              than invent numbers for them, the model simply excludes them. The 10-role total above is therefore a
              conservative picture of the equivalent in-house department.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading eyebrow="The comparison" title="Loaded people-cost vs a Teamulate Core plan" />
          <div className="overflow-x-auto rounded-(--tm-radius-md) border border-line bg-surface">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">Canadian people-cost benchmarks versus a Teamulate Core plan (research math)</caption>
              <thead>
                <tr className="border-b border-line bg-surface-muted">
                  <th scope="col" className="px-4 py-3 font-semibold text-ink">Research math (Canada)</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-ink">Per year</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-ink">Vs Teamulate Core</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">Teamulate Core retainer</th>
                  <td className="px-4 py-3 tabular-nums text-ink">C$5,000/mo × 12 = C$60,000</td>
                  <td className="px-4 py-3 text-ink-muted">—</td>
                </tr>
                <tr className="border-b border-line">
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">10-role loaded people-cost</th>
                  <td className="px-4 py-3 tabular-nums text-ink">~C$875,210</td>
                  <td className="px-4 py-3 font-bold tabular-nums text-brand">≈93.1% lower</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">Lean 4-FTE loaded people-cost (secondary)</th>
                  <td className="px-4 py-3 tabular-nums text-ink">~C$363,934</td>
                  <td className="px-4 py-3 font-bold tabular-nums text-brand">≈83.5% lower recurring</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            The table above is the research math. In marketing copy Teamulate uses a rounded public claim of{" "}
            <strong className="text-ink">90% lower people-cost</strong> against the 10-role department. The US 10-role
            benchmark (~US$1,094,367) is shown for context only; we do not compute a cross-currency percentage against
            the CAD-priced plan.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Core also carries a one-time setup of C$7,500. Growth (C$12,500 setup + C$7,500/mo) and Scale (C$20,000
            setup + from C$12,000/mo) sit above it in capacity. The percentages compare people-cost only - they are
            not a claim of one-to-one output.
          </p>
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-[820px]">
          <SectionHeading eyebrow="Methodology & limits" title="Read this before quoting the numbers" />
          <Card>
            <ul className="space-y-2.5 text-sm leading-relaxed text-ink-muted">
              <li>
                <strong className="text-ink">Source:</strong> 2026 Robert Half national salary midpoints for the ten
                roles listed, with employer load applied (payroll taxes, benefits and employment overhead).
              </li>
              <li>
                <strong className="text-ink">Excluded:</strong> software subscriptions and advertising spend - on both
                sides of the comparison. Those are real costs and remain yours either way.
              </li>
              <li>
                <strong className="text-ink">Not one-to-one:</strong> an AI department and ten human specialists are
                not interchangeable output. This is a people-cost comparison, not an output equivalence claim.
              </li>
              <li>
                <strong className="text-ink">Not a guarantee:</strong> the model describes cost structure, not
                results. Teamulate does not guarantee leads, pipeline or revenue.
              </li>
              <li>
                <strong className="text-ink">Geography:</strong> national midpoints; your market may sit above or
                below them.
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="mx-auto flex max-w-[820px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">What the alternative looks like</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              Eleven named seats, a 60-workflow eligible library, one dashboard - see how the department compares with
              hiring, agencies and fractional help.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/compare/ai-vs-agency-vs-fractional-vs-inhouse/" ctaId="cost-compare" kind="primary">
              Compare your options
            </CtaLink>
            <CtaLink href="/pricing/" ctaId="cost-pricing" kind="secondary">
              See plans
            </CtaLink>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-[820px] text-sm text-ink-muted">
          Related:{" "}
          <Link href="/ai-marketing-team/" className="font-semibold text-brand underline">
            What is an AI marketing team?
          </Link>{" "}
          ·{" "}
          <Link href="/workflows/" className="font-semibold text-brand underline">
            The workflow library
          </Link>
        </p>
      </Section>
      <RelatedGuides current="/research/marketing-team-cost-2026/" />
    </>
  );
}
