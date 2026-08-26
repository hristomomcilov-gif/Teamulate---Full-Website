import type { Metadata } from "next";
import { COPY } from "@/content/copy";
import { ALL_PLANS_SHARE, PLANS, SETUP_FEE_COVERS, formatUsd } from "@/content/plans";
import { absoluteUrl } from "@/lib/site";
import { Card, Eyebrow, Section, SectionHeading, StatusChip } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { InViewEvent } from "@/components/InViewEvent";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent Teamulate plans: Core, Growth and Scale. Setup and monthly fees, workflow and integration envelopes, and a clear boundary on client-owned third-party costs.",
  alternates: { canonical: absoluteUrl("/pricing/") },
};

const PRICING_FAQ = [
  {
    question: "What counts as an active recurring workflow?",
    answer:
      "A workflow is a complete recurring loop - trigger, owner, action, QA, approval where required, execution, measurement and next action. The plan envelope counts workflows that are active in production, not one-off requests.",
  },
  {
    question: "What counts as an integration?",
    answer:
      "One connected system with scoped access - for example your CRM, CMS, analytics, an ad platform or your email tool. Each connection shows its scopes, health and dependent workflows in the dashboard.",
  },
  {
    question: "Why is Scale priced 'from'?",
    answer:
      "Scale deployments vary in segments, regions, products and compliance context, so the final monthly fee is confirmed after a scope review. Core and Growth base prices are exactly as listed.",
  },
  {
    question: "Are there hidden usage charges?",
    answer:
      "No. When you approach a plan limit the dashboard tells you, and you decide: reprioritize existing workflows or change scope. Nothing is charged silently.",
  },
  {
    question: "What do we pay third parties for?",
    answer:
      "Your own vendor costs: your martech subscriptions, advertising spend and data products. They are your accounts, billed directly to you - which also means you keep them if we ever part ways. The GrokBot agent system is included in your Teamulate subscription, so there is nothing extra to pay for the agents themselves.",
  },
  {
    question: "Is there an annual discount?",
    answer: "Not at this time. Pricing is monthly, in USD, with the setup fee due at the start of onboarding.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Transparent plans. Client-owned everything.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Every plan includes the full 11-agent department, the dashboard, structured onboarding and human oversight.
            Plans differ in operating capacity: how many recurring workflows run and how many systems connect.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <InViewEvent key={plan.key} event="pricing_plan_viewed" props={{ plan: plan.key, route: "/pricing/" }}>
              <Card className={`h-full ${plan.recommended ? "border-2 border-brand" : ""}`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-ink">{plan.name}</h2>
                  {plan.recommended ? <StatusChip tone="info" label="Recommended" /> : null}
                </div>
                <p className="mt-4 text-3xl font-bold tabular-nums text-ink">
                  {plan.monthlyPrefix ? `${plan.monthlyPrefix} ` : ""}
                  {formatUsd(plan.monthlyUsd)}
                  <span className="text-sm font-medium text-ink-muted"> / month</span>
                </p>
                <p className="mt-1 text-sm tabular-nums text-ink-muted">Setup: {formatUsd(plan.setupUsd)}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-ink">
                  <li className="flex justify-between gap-2">
                    <span className="text-ink-muted">Active recurring workflows</span>
                    <strong className="tabular-nums">{plan.activeRecurringWorkflows}</strong>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span className="text-ink-muted">Integrations</span>
                    <strong className="tabular-nums">{plan.integrations}</strong>
                  </li>
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{plan.bestFor}</p>
                <div className="mt-6">
                  <CtaLink
                    href="/request-demo/"
                    ctaId={`pricing-${plan.key}`}
                    kind={plan.recommended ? "primary" : "secondary"}
                    className="w-full"
                  >
                    Discuss the right plan
                  </CtaLink>
                </div>
              </Card>
            </InViewEvent>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-muted">All prices in USD.</p>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Included everywhere" title="What all plans share" />
        <ul className="grid gap-3 md:grid-cols-2">
          {ALL_PLANS_SHARE.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-(--tm-radius-sm) border border-line bg-surface px-4 py-3 text-sm text-ink">
              <span aria-hidden className="mt-0.5 text-positive">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Setup" title="What the setup fee covers" />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SETUP_FEE_COVERS.map((item, i) => (
            <li key={item} className="flex items-start gap-3 rounded-(--tm-radius-sm) border border-line bg-surface px-4 py-3 text-sm text-ink">
              <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs font-bold text-ink-muted">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Ownership boundary" title="What stays yours - and billed to you directly" />
        <Card className="max-w-3xl border-l-4 border-l-brand">
          <p className="text-sm leading-relaxed text-ink">{COPY.ownershipDisclaimer}</p>
        </Card>
      </Section>

      <Section>
        <SectionHeading eyebrow="Choosing" title="Which plan fits?" />
        <div className="grid gap-4 md:grid-cols-3">
          {PLANS.map((plan) => (
            <Card key={plan.key}>
              <h3 className="text-base font-bold text-ink">Choose {plan.name} if…</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{plan.bestFor}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="FAQ" title="Pricing questions" />
        <FAQAccordion items={PRICING_FAQ} />
      </Section>

      <Section>
        <div className="rounded-(--tm-radius-lg) bg-navy-950 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Scope the right plan for your goals</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            A focused review of your goals, stack and recurring work - so the plan matches the workload, not the other
            way around.
          </p>
          <div className="mt-6">
            <CtaLink href="/request-demo/" ctaId="pricing-final" kind="primary">
              Discuss the right plan
            </CtaLink>
          </div>
        </div>
      </Section>
    </>
  );
}
