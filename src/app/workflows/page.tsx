import type { Metadata } from "next";
import Link from "next/link";
import { ENTITY_LINE, absoluteUrl, marketingShareMetadata } from "@/lib/site";
import {
  COMMON_CORE_STARTER,
  CORE_LIBRARY,
  GROWTH_EXTENSION,
  PLAN_ENTITLEMENTS,
  RUN_OPERATING_TITLES,
  SCALE_EXTENSION,
  WORKFLOW_CATALOG,
  type CatalogWorkflow,
} from "@/content/workflows";
import { Card, Eyebrow, Section, SectionHeading, StatusChip } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { RelatedGuides } from "@/components/RelatedGuides";

export const metadata: Metadata = {
  title: "Workflow Library - 60 Eligible Workflows, Activate 8, 20 or 35",
  description:
    "Teamulate plans sell operating capacity: a 60-workflow eligible library, with Core activating up to 8, Growth up to 20 and Scale up to 35 simultaneously active recurring workflows. All 11 seats on every plan.",
  alternates: { canonical: absoluteUrl("/workflows/") },
  robots: { index: true, follow: true },
  ...marketingShareMetadata,
};

const FAQ_ITEMS = [
  {
    question: "Do you run sixty workflows?",
    answer:
      "Sixty is the eligible library. A plan activates 8, 20, or 35 of them as simultaneously active recurring workflows. Eligible does not mean all sixty are running - your active set is chosen at onboarding inside your plan's cap.",
  },
  {
    question: "Is that sixty agents?",
    answer:
      "No. Eleven seats on every plan: Strategos (Head), Scout, Wordsmith, Seeker, GrowthTrack, Pixel, Flow, Socialite, Nexus, Metric and Guardian. Plans change how many workflows are active, never how many seats you get.",
  },
  {
    question: "Can Core run lead nurture?",
    answer:
      "No. Lead nurture journey (W25) has a minimum plan of Growth. Core is the owned-channel engine - research, content, SEO/GEO, social, email, monitoring and reporting. Paid media is not a Core capability either.",
  },
  {
    question: "Can I swap workflows inside my library?",
    answer:
      "Yes - if both workflows are eligible for your plan and you stay under your active cap, swaps stay in-plan. Activating a workflow with a higher minimum plan needs Growth or Scale, or a written change order.",
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
  name: "Teamulate eligible workflow library (Entitlement Matrix v1.0)",
  numberOfItems: WORKFLOW_CATALOG.length,
  itemListElement: WORKFLOW_CATALOG.map((w, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${w.id} ${w.name}`,
  })),
};

const ENTITLEMENT_RULES = [
  "8 / 20 / 35 means simultaneously active recurring workflows - not runs, not tasks, not agents.",
  "One workflow can run many times in a month and still counts as one active workflow.",
  "All 11 seats run the same operating model on every plan. Plans do not sell fewer agents.",
  "Eligible does not mean always-on. You pick your active set at onboarding, inside your cap. Swaps inside your library stay in-plan; a workflow with a higher minimum plan needs Growth/Scale or a written change order.",
  "The control plane - approvals, audit, rollback and baseline Guardian checks - is not a customer workflow slot.",
  "Conditional workflows activate only if the business motion, data, tools and risk controls exist. Once activated, they count toward the cap.",
  "Entitlement is not production readiness - being in the library does not mean a workflow is live and running for you.",
];

function ModeBadge({ mode }: { mode: CatalogWorkflow["mode"] }) {
  if (mode === "scoped") return <StatusChip tone="info" label="Scoped" />;
  if (mode === "conditional") return <StatusChip tone="attention" label="Conditional" />;
  return null;
}

function PlanBadge({ plan }: { plan: CatalogWorkflow["minPlan"] }) {
  const label = plan === "core" ? "Core+" : plan === "growth" ? "Growth+" : "Scale";
  return (
    <span className="rounded-full bg-lavender px-2.5 py-0.5 text-[11px] font-bold text-brand">{label}</span>
  );
}

function LibraryGroup({ title, subtitle, workflows }: { title: string; subtitle: string; workflows: CatalogWorkflow[] }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-extrabold text-ink">{title}</h3>
        <p className="text-sm font-semibold text-ink-muted">{subtitle}</p>
      </div>
      <ul className="grid gap-2 lg:grid-cols-2">
        {workflows.map((w) => (
          <li key={w.id} className="flex items-center justify-between gap-3 rounded-(--tm-radius-sm) border border-line bg-surface px-4 py-2.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="shrink-0 font-mono text-xs font-bold text-ink-muted">{w.id}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{w.name}</p>
                <p className="text-xs text-ink-muted">{w.owner}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <ModeBadge mode={w.mode} />
              <PlanBadge plan={w.minPlan} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WorkflowsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* 1. Hero */}
      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Workflow library</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Plans sell capacity. The library has 60 eligible workflows.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink">
            Your plan activates <strong>8, 20 or 35</strong> of them as simultaneously active recurring workflows -
            chosen at onboarding, swappable inside your library. All 11 seats work on every plan; plans never sell
            fewer agents.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{ENTITY_LINE}</p>
        </div>
      </Section>

      {/* 2. Plan cards */}
      <Section muted>
        <SectionHeading eyebrow="Entitlements" title="What each plan activates" />
        <div className="grid gap-5 lg:grid-cols-3">
          {PLAN_ENTITLEMENTS.map((plan) => (
            <Card key={plan.key} className={`flex h-full flex-col ${plan.recommended ? "border-2 border-brand" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-extrabold text-ink">{plan.name}</h3>
                {plan.recommended ? (
                  <span className="rounded-full bg-brand px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
                    Most popular
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm tabular-nums text-ink-muted">
                {plan.setup} · <strong className="text-ink">{plan.monthly}</strong>
              </p>
              <div className="mt-4 flex items-center gap-4 rounded-(--tm-radius-sm) bg-surface-muted px-4 py-3">
                <div>
                  <p className="text-2xl font-extrabold tabular-nums text-brand">{plan.activeCap}</p>
                  <p className="text-[11px] font-semibold text-ink-muted">active workflows</p>
                </div>
                <span aria-hidden className="text-ink-muted">/</span>
                <div>
                  <p className="text-2xl font-extrabold tabular-nums text-ink">{plan.eligible}</p>
                  <p className="text-[11px] font-semibold text-ink-muted">eligible library</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{plan.idea}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink">{plan.unlocks}</p>
              <div className="mt-auto pt-5">
                <CtaLink href="/pricing/" ctaId={`workflows-plan-${plan.key}`} kind="secondary" className="w-full">
                  See {plan.name} on the pricing page
                </CtaLink>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Rules in plain English */}
      <Section>
        <SectionHeading eyebrow="The rules, in plain English" title="How workflow entitlements work" />
        <ol className="max-w-3xl space-y-2.5">
          {ENTITLEMENT_RULES.map((rule, i) => (
            <li key={rule} className="flex items-start gap-3 rounded-(--tm-radius-sm) border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink">
              <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lavender text-xs font-bold text-brand">
                {i + 1}
              </span>
              {rule}
            </li>
          ))}
        </ol>
      </Section>

      {/* 3. Common Core starter */}
      <Section muted>
        <SectionHeading
          eyebrow="A typical first eight"
          title="The common Core starter set"
          lede="What most Core deployments activate first - swappable for any other workflow inside the 25-workflow Core library."
        />
        <ul className="grid gap-2 sm:grid-cols-2">
          {COMMON_CORE_STARTER.map((w) => (
            <li key={w.id} className="flex items-center gap-3 rounded-(--tm-radius-sm) border border-line bg-surface px-4 py-3">
              <span className="font-mono text-xs font-bold text-brand">{w.id}</span>
              <div>
                <p className="text-sm font-semibold text-ink">{w.name}</p>
                <p className="text-xs text-ink-muted">{w.owner}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Full library */}
      <Section>
        <SectionHeading
          eyebrow="The full library"
          title="All 60 eligible workflows"
          lede="Grouped by the minimum plan that can activate them. Scoped = boundaries defined per engagement. Conditional = only if the business motion, data, tools and risk controls exist; if activated, it counts toward your cap."
        />
        <div className="space-y-12">
          <LibraryGroup title="Core library" subtitle="25 eligible · Core activates up to 8" workflows={CORE_LIBRARY} />
          <LibraryGroup title="Growth extension" subtitle="+22 → 47 eligible · Growth activates up to 20" workflows={GROWTH_EXTENSION} />
          <LibraryGroup title="Scale extension" subtitle="+13 → 60 eligible · Scale activates up to 35" workflows={SCALE_EXTENSION} />
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          Entitlement is not production readiness: the library defines what your plan may activate, not what is already
          live and running.
        </p>
      </Section>

      {/* Secondary strip: how one workflow runs */}
      <Section muted>
        <SectionHeading
          eyebrow="Inside a run"
          title="How one workflow runs"
          lede="Every active workflow moves through named operating steps with named seats - for example, a content workflow:"
        />
        <ol className="flex flex-wrap items-center gap-2">
          {RUN_OPERATING_TITLES.map((step, i) => (
            <li key={step.title} className="flex items-center gap-2">
              <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold text-ink">
                {step.title} <span className="text-xs font-medium text-ink-muted">· {step.seat}</span>
              </span>
              {i < RUN_OPERATING_TITLES.length - 1 ? <span aria-hidden className="text-ink-muted">→</span> : null}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-ink-muted">
          Operating steps are how a single workflow executes - they are not the commercial catalog above.
        </p>
      </Section>

      {/* 5. FAQ */}
      <Section>
        <SectionHeading eyebrow="FAQ" title="Straight answers on the numbers" />
        <div className="max-w-3xl">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </Section>

      {/* 6. CTA */}
      <Section muted>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">Which capacity fits your motion?</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              Compare the plans side by side, or ask us to map your first active set against the library.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/pricing/" ctaId="workflows-pricing" kind="primary">
              Compare plans
            </CtaLink>
            <CtaLink href="/request-demo/" ctaId="workflows-demo" kind="secondary">
              Request a demonstration
            </CtaLink>
          </div>
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          Related: <Link href="/team/" className="font-semibold text-brand underline">the 11 seats</Link> ·{" "}
          <Link href="/how-it-works/" className="font-semibold text-brand underline">how the department works</Link>
        </p>
      </Section>
      <RelatedGuides current="/workflows/" />
    </>
  );
}
