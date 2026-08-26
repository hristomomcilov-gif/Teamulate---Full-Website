import type { Metadata } from "next";
import { COPY } from "@/content/copy";
import { AGENTS } from "@/content/agents";
import { PLANS, formatUsd } from "@/content/plans";
import { absoluteUrl } from "@/lib/site";
import { Card, Eyebrow, Section, SectionHeading, StatusChip } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { FAQAccordion } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "The Autonomous AI Marketing Department",
  description:
    "What Teamulate is, who it is for, what it includes, how it works, what it connects to, what stays human-controlled and what your team receives.",
  alternates: { canonical: absoluteUrl("/autonomous-ai-marketing-department/") },
};

const WHAT_YOU_RECEIVE = [
  { title: "An approved business knowledge base", body: "Your audience, positioning, claims, brand voice and constraints - captured, approved and versioned. The system works from it, not from guesses." },
  { title: "Strategos, an AI Head of Marketing", body: "One orchestrator that turns goals into briefs, delegation, dependencies and an operating cadence." },
  { title: "Eight execution specialists", body: "Research, content, search, demand, creative, web, lifecycle and CRM operations - working in parallel as one department." },
  { title: "Recurring end-to-end workflows", body: "Not one-off tasks: trigger, owner, action, independent QA, approval, controlled execution, measurement and a next action." },
  { title: "One dashboard for proof and control", body: "Goals, work, campaigns, approvals, pipeline and performance in one place, with data freshness and limitations stated." },
  { title: "Human authority where it matters", body: "Strategy, material spend, brand, sensitive claims and irreversible decisions stay with named human owners." },
];

const ONBOARDING_STAGES = [
  "Scope & authority",
  "Discovery",
  "Provision",
  "Integrate",
  "Baseline",
  "Configure policies",
  "Staging & QA",
  "Go live",
  "Hypercare",
];

const OBJECTIONS = [
  {
    question: "We already tried AI tools and they created more review work.",
    answer:
      "Tools generate drafts; a department completes work. Every Teamulate output passes independent QA (Guardian) before you see it, and approvals arrive as complete decision packets - context, evidence, impact and rollback plan - not raw drafts.",
  },
  {
    question: "How is this different from an agency?",
    answer:
      "It runs inside your accounts, on your data, with a visible operating cadence and an audit trail. Nothing leaves with a vendor: assets, systems and learning stay yours. And you see the work as it happens, not in a monthly deck.",
  },
  {
    question: "What if it makes a mistake in our tools?",
    answer:
      "External actions are scoped and tiered. Routine reversible work runs inside policy; anything material requires an action-specific, expiring human approval. Spend caps, action limits, rollback plans and a kill switch are part of the platform, not promises.",
  },
  {
    question: "Will it understand our niche?",
    answer:
      "The system works from an approved business knowledge base built during onboarding - your ICP, terminology, claims and proof. It does not publish claims that have not been approved.",
  },
];

export default function ProductPage() {
  return (
    <>
      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>{COPY.category}</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            A managed autonomous marketing department, operating inside your tools
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{COPY.thirtySecondExplanation}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/request-demo/" ctaId="product-hero-primary" kind="primary">
              See the team in action
            </CtaLink>
            <CtaLink href="/contact/" ctaId="product-hero-secondary" kind="secondary">
              Request a stack review
            </CtaLink>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="What you receive" title="Six things every deployment includes" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHAT_YOU_RECEIVE.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Not another AI tool"
          title="Managed operating capacity, not another subscription to operate"
          lede="A tool gives your team more buttons. Teamulate gives your business a running department: goals become briefs, briefs become work, work passes QA and approvals, approved actions execute in your tools, and results feed the next decision. You manage the decisions, not the machine."
        />
        <Card className="max-w-4xl bg-navy-950 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/50">The product unit: a closed workflow</p>
          <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-sm font-medium leading-relaxed">
            {["Trigger", "Validated input", "Owner", "Action", "Independent QA", "Approval", "Controlled execution", "Measurement", "Memory update", "Next action"].map((stage, i, arr) => (
              <span key={stage} className="inline-flex items-center gap-2">
                <span className="rounded bg-white/10 px-2 py-0.5">{stage}</span>
                {i < arr.length - 1 ? <span aria-hidden className="text-white/40">→</span> : null}
              </span>
            ))}
          </p>
          <p className="mt-4 text-sm text-white/70">
            No “magic” activity exists in the system: every piece of work has an owner, a status, evidence, a policy
            state and an outcome you can trace.
          </p>
        </Card>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="The team" title="Eleven agents, three responsibilities" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <StatusChip tone="info" label="Orchestration" />
            <p className="mt-3 text-sm font-semibold text-ink">Strategos</p>
            <p className="mt-1 text-sm text-ink-muted">Prioritizes, briefs, delegates and runs the operating cadence.</p>
          </Card>
          <Card>
            <StatusChip tone="neutral" label="Execution" />
            <p className="mt-3 text-sm font-semibold text-ink">
              {AGENTS.filter((a) => a.type === "specialist").map((a) => a.name).join(" · ")}
            </p>
            <p className="mt-1 text-sm text-ink-muted">Research, content, search, demand, creative, web, lifecycle and CRM operations.</p>
          </Card>
          <Card>
            <StatusChip tone="positive" label="Independent assurance" />
            <p className="mt-3 text-sm font-semibold text-ink">Guardian · Metric</p>
            <p className="mt-1 text-sm text-ink-muted">QA, governance and brand assurance; validated measurement and attribution - independent from execution.</p>
          </Card>
        </div>
        <div className="mt-8">
          <CtaLink href="/team/" ctaId="product-team" kind="secondary">
            Meet the full team
          </CtaLink>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Workflows" title="Work is organized by outcome, not by channel" />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { outcome: "Recover qualified visibility", example: "Content refresh and redistribution: detect decline, diagnose, revise, QA, publish under policy, measure for 28 days." },
            { outcome: "Create qualified conversations", example: "Campaign workflow: research, messaging, assets, landing page, tracking, QA, launch approval, measured outcome." },
            { outcome: "Keep the pipeline trustworthy", example: "CRM hygiene: dedupe, source coverage, routing checks and data-quality reporting inside safe thresholds." },
            { outcome: "Learn what actually works", example: "Experiment workflow: hypothesis, configuration, independent readout, scale / hold / stop recommendation." },
          ].map((w) => (
            <Card key={w.outcome}>
              <h3 className="text-sm font-semibold text-ink">{w.outcome}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{w.example}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Proof and control" title={COPY.dashboardMessage} lede="The dashboard is a proof and control surface: goals, active work, the approval queue, campaigns, pipeline and performance - with data freshness and attribution limitations always visible. Execution happens through approved integrations and controls, never a hidden console." />
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/dashboard/" ctaId="product-dashboard" kind="secondary">
            See the dashboard
          </CtaLink>
          <CtaLink href="/demo/dashboard/" ctaId="product-demo" kind="primary">
            Open the interactive demo
          </CtaLink>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Ownership" title="Your environment. Your accounts. Your data." lede={COPY.ownershipDisclaimer} />
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <h3 className="text-sm font-semibold text-ink">One client, one environment</h3>
            <p className="mt-2 text-sm text-ink-muted">Each client deployment is separate and client-owned. No shared admin accounts, no mixed data, no shared memory between clients.</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-ink">Scoped, revocable access</h3>
            <p className="mt-2 text-sm text-ink-muted">Teamulate receives least-privilege access per integration according to the signed scope - and you can revoke it.</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-ink">{COPY.controlMessage}</h3>
            <p className="mt-2 text-sm text-ink-muted">A P0-P4 approval model with expiring, action-specific approvals, spend limits, audit trail and rollback paths.</p>
          </Card>
        </div>
        <div className="mt-8">
          <CtaLink href="/security-governance/" ctaId="product-security" kind="secondary">
            Review security &amp; governance
          </CtaLink>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Plans" title="Plan fit at a glance" />
        <div className="grid gap-4 md:grid-cols-3">
          {PLANS.map((plan) => (
            <Card key={plan.key}>
              <h3 className="text-base font-bold text-ink">{plan.name}</h3>
              <p className="mt-1 text-sm tabular-nums text-ink-muted">
                {plan.monthlyPrefix ? "From " : ""}
                {formatUsd(plan.monthlyUsd)}/mo · setup {formatUsd(plan.setupUsd)}
              </p>
              <p className="mt-3 text-sm text-ink-muted">{plan.bestFor}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <CtaLink href="/pricing/" ctaId="product-pricing" kind="secondary">
            Compare plans and scope
          </CtaLink>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Onboarding" title="A structured path to go-live" lede="Implementation follows nine gated stages - each with explicit exit conditions, not checkbox completion." />
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ONBOARDING_STAGES.map((stage, i) => (
            <li key={stage} className="flex items-center gap-3 rounded-(--tm-radius-sm) border border-line bg-surface px-4 py-3 text-sm font-medium text-ink">
              <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs font-bold text-ink-muted">
                {i + 1}
              </span>
              {stage}
            </li>
          ))}
        </ol>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Objections" title="Fair questions, straight answers" />
        <FAQAccordion items={OBJECTIONS} />
      </Section>

      <Section>
        <div className="rounded-(--tm-radius-lg) bg-navy-950 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Is Teamulate the right fit for your stack?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            The next step is a focused review of your goals, current stack and the recurring work you want to move forward.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink href="/request-demo/" ctaId="product-final-primary" kind="primary">
              Request a stack review
            </CtaLink>
          </div>
        </div>
      </Section>
    </>
  );
}
