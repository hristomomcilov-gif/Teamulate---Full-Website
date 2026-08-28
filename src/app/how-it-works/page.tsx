import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { Card, Eyebrow, Section, SectionHeading } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";
import { WorkflowDemo } from "@/components/WorkflowDemo";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The Teamulate operating model end to end: business context, goal intake, planning, parallel execution, independent assurance, approvals, controlled execution, measurement and learning.",
  alternates: { canonical: absoluteUrl("/how-it-works/") },
};

const STAGES = [
  {
    n: 1,
    title: "Business context",
    body: "Onboarding produces the working memory of your department: a Business Context Profile, ICP & Segment Map, Positioning & Message Map, Channel & Funnel Baseline, Integration & Access Plan, Approval & Autonomy Policy, Measurement Plan and First 90-Day Priorities.",
  },
  {
    n: 2,
    title: "Goal intake",
    body: "You or Strategos create a measurable goal with an owner, timeframe, constraints, KPI and approved data sources. AI can draft the wording and measurement plan, but a strategic goal never activates without human approval.",
  },
  {
    n: 3,
    title: "Planning and delegation",
    body: "Strategos creates the brief, dependencies and task graph, and shows exactly which agents are involved and why. Nothing is delegated invisibly.",
  },
  {
    n: 4,
    title: "Parallel execution",
    body: "Specialists produce normalized outputs: Scout's research memos, Wordsmith's copy, Seeker's search briefs, Pixel's creative packages, Flow's pages, GrowthTrack's campaign builds, Socialite's lifecycle flows, Nexus's tracking and routing.",
  },
  {
    n: 5,
    title: "Independent assurance",
    body: "Guardian checks brand, claims, facts, policy and release readiness. Metric independently validates measurement and evidence. Neither reports to the executing specialist.",
  },
  {
    n: 6,
    title: "Approval",
    body: "The P0-P4 model decides what runs automatically and what waits for a human. Approval requests arrive as complete packets: what, why now, risk tier, preview, evidence, QA result, impact of approve / reject / delay, rollback plan and an expiration time.",
  },
  {
    n: 7,
    title: "Controlled execution",
    body: "Approved actions execute through scoped integration access with spend and action limits enforced independently of the agent. The approval is bound to the exact action - a changed payload invalidates it.",
  },
  {
    n: 8,
    title: "Measure and learn",
    body: "Metric validates the data and states confidence and limitations. Strategos decides scale, hold or stop. The system records what was learned and the next action - so the department improves with every cycle.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Cause, action, visible result
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Every piece of work in Teamulate follows the same closed loop: a trigger, a validated input, an owner, an
            action, independent QA, an approval where required, controlled execution, measurement and a next action.
            Here is the full journey from your business context to a measured outcome.
          </p>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="The operating model" title="Eight stages, one cadence" />
        <ol className="grid gap-4 md:grid-cols-2">
          {STAGES.map((stage) => (
            <li key={stage.n}>
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {stage.n}
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-ink">{stage.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{stage.body}</p>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Interactive workflow demo"
          title="Walk through one real workflow"
          lede="Step through how a single goal - qualified conversations for a technical-services webinar - moves through the department. Sample data, clearly labelled."
        />
        <WorkflowDemo />
      </Section>

      <Section muted>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">Want to see the dashboard side of this?</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              The interactive demo shows the same workflow from the client&apos;s seat: the goal, the work, the
              approval decision and the measured result.
            </p>
          </div>
          <CtaLink href="/demo/dashboard/" ctaId="how-demo" kind="primary">
            See the workflow demo
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
