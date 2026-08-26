import type { Metadata } from "next";
import { COPY } from "@/content/copy";
import { AGENTS, TEAM_STRUCTURE_SENTENCE } from "@/content/agents";
import { PLANS, formatUsd } from "@/content/plans";
import { absoluteUrl } from "@/lib/site";
import { Card, Container, DemoBadge, Eyebrow, Section, SectionHeading, StatusChip } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Teamulate | A Full Marketing Department Without Building One",
  description:
    "Teamulate builds and operates a dedicated autonomous marketing department inside the tools your B2B company already uses - with visible workflows, approvals and performance in one dashboard.",
  alternates: { canonical: absoluteUrl("/") },
};

const HOW_IT_WORKS_STEPS = [
  { n: 1, title: "Learn your business", body: "Onboarding builds an approved business knowledge base: audience, positioning, claims and constraints." },
  { n: 2, title: "Set goals and guardrails", body: "You define measurable goals, budget caps, approval owners and what always needs a human decision." },
  { n: 3, title: "Strategos coordinates the team", body: "The AI Head of Marketing turns goals into briefs, tasks and dependencies across the department." },
  { n: 4, title: "Specialists execute and Guardian checks", body: "Eight specialists produce the work; independent QA validates brand, claims and release readiness." },
  { n: 5, title: "Dashboard shows results, decisions and next actions", body: "You see what is running, what changed, what needs your decision and what happens next." },
];

const OUTPUT_CATEGORIES = [
  "Research and strategy",
  "Content and social media",
  "SEO and GEO",
  "Creative and video",
  "Campaigns and demand generation",
  "Email and lifecycle",
  "Landing pages and CRO",
  "CRM and marketing operations",
  "Analytics and attribution",
];

const PROOF_SURFACES = [
  "Goals and priority work",
  "Campaigns and workflow status",
  "Approval queue",
  "Pipeline and performance",
  "Next actions and risks",
];

const STACK_CATEGORIES = ["CRM", "CMS / website", "Analytics", "Advertising", "Email / lifecycle", "Social", "Cloud files / knowledge", "Collaboration"];

const FAQ_ITEMS = [
  {
    question: "Do we need to replace our current tools?",
    answer:
      "No. Teamulate is configured around a defined, client-approved stack - your CRM, website, analytics, advertising, email and social tools. Exact integrations and permissions are confirmed during onboarding.",
  },
  {
    question: "Is the system fully autonomous?",
    answer:
      "No, and by design. Routine, reversible work moves automatically inside approved guardrails. Strategy, material spend, sensitive claims and irreversible actions always require a named human decision owner.",
  },
  {
    question: "Does Teamulate guarantee pipeline or revenue?",
    answer:
      "No. Teamulate provides measurable operating capacity and full visibility into the work and its results. Outcomes depend on your market, offer and inputs, and we report them with attribution models and limitations stated.",
  },
  {
    question: "Who owns the accounts, data and assets?",
    answer:
      "You do. Every client deployment is a client-owned environment: your AWS, your GrokBot, your martech subscriptions, your data and every asset produced. Teamulate receives scoped, revocable access.",
  },
  {
    question: "What happens if we need more than the plan allows?",
    answer:
      "Nothing changes silently. The dashboard shows workflow and integration usage against your plan; when you approach a limit you can reprioritize or request a scope change. There are no surprise overage charges.",
  },
  {
    question: "Can approval rules be customized?",
    answer:
      "Yes. The P0-P4 approval matrix is configured per client: named approvers, budget thresholds, publishing rights, sensitive claim categories and expiring, action-specific approvals.",
  },
  {
    question: "How does onboarding work?",
    answer:
      "A structured nine-stage process: scope and authority, discovery, environment provisioning, integrations, measurement baseline, policy configuration, staging and QA, go-live, and a hypercare period.",
  },
  {
    question: "How do we access the dashboard?",
    answer:
      "Client users are invited after a signed scope, with time-limited invitations, role-based access and MFA for privileged roles. There is no self-service sign-up.",
  },
];

function HeroVisual() {
  return (
    <div aria-label="Product illustration: a goal moves through delegation, approval and execution to a measured result" className="rounded-(--tm-radius-lg) border border-line bg-navy-950 p-4 shadow-card sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-white/60">Teamulate dashboard</p>
        <DemoBadge />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-(--tm-radius-sm) bg-white/5 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50">Goal</p>
          <p className="mt-1 text-sm font-semibold text-white">Qualified opportunities for the new service line</p>
          <div className="mt-2"><StatusChip tone="attention" label="At risk - landing page delayed" /></div>
        </div>
        <div className="rounded-(--tm-radius-sm) bg-white/5 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50">Strategos delegates</p>
          <ul className="mt-1 space-y-1 text-sm text-white/90">
            <li>Flow → Landing page <span className="text-positive">✓ done</span></li>
            <li>Guardian → QA preflight <span className="text-positive">✓ passed</span></li>
            <li>GrowthTrack → Campaign build <span className="text-white/60">in progress</span></li>
          </ul>
        </div>
        <div className="rounded-(--tm-radius-sm) bg-white/5 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50">Awaiting your approval</p>
          <p className="mt-1 text-sm font-semibold text-white">P3 · Launch campaign + USD 3,000 budget cap</p>
          <div className="mt-2"><StatusChip tone="attention" label="Decision required" /></div>
        </div>
        <div className="rounded-(--tm-radius-sm) bg-white/5 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50">Live campaign result</p>
          <p className="mt-1 text-sm font-semibold text-white">Webinar program · 41 qualified registrations</p>
          <div className="mt-2"><StatusChip tone="positive" label="Live · measured" /></div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Section 1 - Hero */}
      <Section className="pt-16 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Autonomous marketing department for growing B2B companies.</Eyebrow>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl xl:text-6xl">
              {COPY.hero.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">{COPY.hero.subheadline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/request-demo/" ctaId="hero-primary" kind="primary">
                {COPY.hero.primaryCta}
              </CtaLink>
              <CtaLink href="/how-it-works/" ctaId="hero-secondary" kind="secondary">
                {COPY.hero.secondaryCta}
              </CtaLink>
            </div>
          </div>
          <HeroVisual />
        </div>
      </Section>

      {/* Section 2 - Problem / capacity gap */}
      <Section muted>
        <SectionHeading
          eyebrow="The capacity gap"
          title="Your marketing workload has outgrown your team."
          lede="Three problems show up in almost every growing B2B company:"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "The backlog outgrows execution", body: "Campaigns, content, pages and reporting pile up faster than your team can ship them." },
            { title: "Tools without an operator", body: "The stack is purchased but disconnected or underused - capability without capacity." },
            { title: "Handoffs without a cadence", body: "Agencies, freelancers and internal staff each own a piece, with no single operating rhythm." },
          ].map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Section 3 - Outcome stack */}
      <Section>
        <SectionHeading eyebrow="What you get" title="Capacity, connection and visibility" />
        <div className="grid gap-6 md:grid-cols-3">
          {COPY.benefits.map((benefit) => (
            <Card key={benefit.title} className="border-t-4 border-t-brand">
              <h3 className="text-lg font-semibold text-ink">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{benefit.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Section 4 - How it works */}
      <Section muted>
        <SectionHeading eyebrow="How it works" title="From your goals to measured results in five steps" />
        <ol className="grid gap-4 md:grid-cols-5">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <li key={step.n} className="rounded-(--tm-radius-md) border border-line bg-surface p-5">
              <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {step.n}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <CtaLink href="/how-it-works/" ctaId="home-how-it-works" kind="secondary">
            See the full operating model
          </CtaLink>
        </div>
      </Section>

      {/* Section 5 - Meet the department */}
      <Section>
        <SectionHeading
          eyebrow="Meet the department"
          title="One head. Eight specialists. Two independent assurance agents."
          lede={TEAM_STRUCTURE_SENTENCE}
        />
        <div className="mb-6 rounded-(--tm-radius-md) border-2 border-brand bg-surface p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-lg font-bold text-ink">Strategos</p>
              <p className="text-sm text-ink-muted">Head of Marketing / Orchestrator - turns goals into briefs, delegation and cadence</p>
            </div>
            <StatusChip tone="info" label="Team lead" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {AGENTS.filter((a) => a.slug !== "strategos").map((agent) => (
            <div key={agent.slug} className="rounded-(--tm-radius-md) border border-line bg-surface p-4" style={{ borderTopColor: agent.accent, borderTopWidth: 3 }}>
              <p className="text-sm font-bold text-ink">{agent.name}</p>
              <p className="mt-0.5 text-xs text-ink-muted">{agent.role}</p>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                {agent.type === "assurance" ? "Independent assurance" : "Execution specialist"}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <CtaLink href="/team/" ctaId="home-team" kind="secondary">
            Meet your department
          </CtaLink>
        </div>
      </Section>

      {/* Section 6 - What the team creates */}
      <Section muted>
        <SectionHeading eyebrow="Output" title="What the team creates" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {OUTPUT_CATEGORIES.map((category) => (
            <li key={category} className="flex items-center gap-2 rounded-(--tm-radius-sm) border border-line bg-surface px-4 py-3 text-sm font-medium text-ink">
              <span aria-hidden className="text-brand">▸</span>
              {category}
            </li>
          ))}
        </ul>
      </Section>

      {/* Section 7 - Dashboard proof */}
      <Section>
        <SectionHeading eyebrow="Proof, not promises" title="See what is running, what changed and what happens next." />
        <div className="grid gap-6 lg:grid-cols-2">
          <ul className="space-y-3">
            {PROOF_SURFACES.map((surface) => (
              <li key={surface} className="flex items-center gap-3 rounded-(--tm-radius-sm) border border-line bg-surface px-4 py-3 text-sm font-medium text-ink">
                <span aria-hidden className="text-positive">✓</span>
                {surface}
              </li>
            ))}
          </ul>
          <Card className="flex flex-col justify-between bg-surface-muted">
            <div>
              <DemoBadge />
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                The interactive demo walks through one complete workflow with clearly labelled sample data: a goal at
                risk, the work that unblocked it, an approval decision, and the measured result.
              </p>
            </div>
            <div className="mt-6">
              <CtaLink href="/demo/dashboard/" ctaId="home-demo" kind="primary">
                Open the interactive dashboard demo
              </CtaLink>
            </div>
          </Card>
        </div>
      </Section>

      {/* Section 8 - Autonomy and control */}
      <Section muted>
        <SectionHeading eyebrow="Control" title="Autonomous where safe. Gated where it matters." />
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <StatusChip tone="positive" label="Moves automatically" />
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Routine monitoring, research, drafts and reversible internal work keep moving without waiting on anyone.
            </p>
          </Card>
          <Card>
            <StatusChip tone="info" label="Runs inside policy" />
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Approved routine external actions run inside pre-agreed content, audience and spend policies with QA checks.
            </p>
          </Card>
          <Card>
            <StatusChip tone="attention" label="Always human-decided" />
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Strategy, material spend, sensitive claims and irreversible actions always come to a named human owner.
            </p>
          </Card>
        </div>
        <div className="mt-8">
          <CtaLink href="/security-governance/" ctaId="home-governance" kind="secondary">
            See security &amp; governance
          </CtaLink>
        </div>
      </Section>

      {/* Section 9 - Existing stack */}
      <Section>
        <SectionHeading eyebrow="Your stack" title="Works inside the tools you already use" lede={COPY.stackDisclaimer} />
        <ul className="flex flex-wrap gap-3">
          {STACK_CATEGORIES.map((category) => (
            <li key={category} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink">
              {category}
            </li>
          ))}
        </ul>
      </Section>

      {/* Section 10 - Plans preview */}
      <Section muted>
        <SectionHeading eyebrow="Plans" title="Transparent scope. Client-owned everything." />
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <Card key={plan.key} className={plan.recommended ? "border-2 border-brand" : ""}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-ink">{plan.name}</h3>
                {plan.recommended ? <StatusChip tone="info" label="Recommended" /> : null}
              </div>
              <p className="mt-3 text-2xl font-bold tabular-nums text-ink">
                {plan.monthlyPrefix ? `${plan.monthlyPrefix} ` : ""}
                {formatUsd(plan.monthlyUsd)}
                <span className="text-sm font-medium text-ink-muted"> / month</span>
              </p>
              <p className="text-sm text-ink-muted">Setup {formatUsd(plan.setupUsd)}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-muted">
                <li>{plan.activeRecurringWorkflows} active recurring workflows</li>
                <li>{plan.integrations} integrations</li>
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <CtaLink href="/pricing/" ctaId="home-pricing" kind="secondary">
            Compare plans and scope
          </CtaLink>
        </div>
      </Section>

      {/* Section 11 - Teamulate runs Teamulate */}
      <Section>
        <SectionHeading eyebrow="Tenant 0" title="Teamulate runs Teamulate" lede={COPY.tenant0Message} />
        <Card className="max-w-3xl">
          <p className="text-sm leading-relaxed text-ink-muted">
            Teamulate is its own first deployment: the same agents, workflows, approvals and dashboard that clients
            receive are used to market Teamulate itself. We publish what the system actually does - activity, assets,
            experiments and lessons - with facts, results and limitations labelled. We do not claim customer outcomes
            before customers exist.
          </p>
          <p className="mt-3 text-sm font-medium text-ink">
            A public Tenant 0 progress page is in preparation and will link from here once the first metrics are
            approved for publication.
          </p>
        </Card>
      </Section>

      {/* Section 12 - Original research */}
      <Section muted>
        <SectionHeading
          eyebrow="Research"
          title="Original research, built the slow way"
          lede="Flagship reports publish as crawlable HTML with methodology, sources, updated dates and fact labels - no thin summaries."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Marketing Team Cost Benchmark - US & Canada 2026", desc: "What a real marketing department costs to build and run, with methodology." },
            { title: "60 AI Marketing Workflows", desc: "A mapped catalog of recurring marketing workflows and their automation boundaries." },
            { title: "Multi-Agent Marketing Architecture", desc: "How an 11-agent department is structured, governed and quality-assured." },
          ].map((asset) => (
            <Card key={asset.title}>
              <h3 className="text-sm font-semibold text-ink">{asset.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{asset.desc}</p>
              <p className="mt-3"><StatusChip tone="neutral" label="Publishing soon - in factual review" /></p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Section 13 - FAQ */}
      <Section>
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <FAQAccordion items={FAQ_ITEMS} />
      </Section>

      {/* Section 14 - Final CTA */}
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">A full marketing department. Without building one.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">{COPY.thirtySecondExplanation}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink href="/request-demo/" ctaId="home-final-primary" kind="primary">
              See the team in action
            </CtaLink>
            <Link href="/contact/" className="inline-flex min-h-11 items-center justify-center rounded-(--tm-radius-sm) border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Request a stack review
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
