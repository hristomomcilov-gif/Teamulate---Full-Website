import type { Metadata } from "next";
import { COPY } from "@/content/copy";
import { absoluteUrl } from "@/lib/site";
import { Card, Eyebrow, Section, SectionHeading, StatusChip } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";

export const metadata: Metadata = {
  title: "The Client Dashboard",
  description:
    "One screen for what is running, what changed and what happens next: goals, work, campaigns, approvals, pipeline, performance, integration health and a full activity trail.",
  alternates: { canonical: absoluteUrl("/dashboard/") },
};

const SURFACES = [
  { title: "One-screen executive overview", body: "Goal progress, decisions required, work in motion, what changed and next actions - in a single view built for leadership.", tone: "info" as const, label: "Overview" },
  { title: "Approval queue", body: "Every human decision arrives as a complete packet: what, why now, preview, evidence, QA result, impact, rollback plan and an expiry.", tone: "attention" as const, label: "Decisions" },
  { title: "Active work and campaigns", body: "Explicit states, owners, blockers and due dates for every task and campaign. No mystery activity, no invisible progress.", tone: "neutral" as const, label: "Work" },
  { title: "Agent team activity", body: "Who is working on what, recent completed outputs, current blockers - responsibilities and evidence, never hidden reasoning.", tone: "neutral" as const, label: "Agents" },
  { title: "Pipeline and performance", body: "Validated metrics with attribution models labelled, data freshness visible, and unknowns shown as unknowns - never as zero.", tone: "positive" as const, label: "Results" },
  { title: "Integration health", body: "Connection status, scopes, last successful sync and dependent workflows for every connected tool.", tone: "info" as const, label: "Integrations" },
  { title: "Activity and audit trail", body: "A human-readable timeline of everything that happened, backed by an append-only audit trail.", tone: "neutral" as const, label: "Audit" },
];

export default function DashboardProductPage() {
  return (
    <>
      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>The dashboard</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{COPY.dashboardMessage}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            AI work is invisible by default. The Teamulate dashboard makes it visible, measurable and controllable: it
            is a proof and control surface, not an AI theatre. Execution happens through approved integrations and
            technical controls - and everything that happens is traceable here.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/demo/dashboard/" ctaId="dashboard-hero-demo" kind="primary">
              Open interactive demo
            </CtaLink>
            <CtaLink href="/request-demo/" ctaId="dashboard-hero-secondary" kind="secondary">
              Request live demonstration
            </CtaLink>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="What you see" title="Seven surfaces, one source of truth" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SURFACES.map((surface) => (
            <Card key={surface.title}>
              <StatusChip tone={surface.tone} label={surface.label} />
              <h2 className="mt-3 text-base font-semibold text-ink">{surface.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{surface.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="What you will not see"
          title="No hidden AI thoughts. No black box."
          lede="The dashboard shows action summaries, evidence, status, owners, inputs, outputs, policy checks and timestamps. It does not show hidden prompts, chain-of-thought, raw credentials or internal browser sessions - because a control surface must be trustworthy, not theatrical."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-l-4 border-l-positive">
            <p className="text-sm font-semibold text-ink">Always shown</p>
            <p className="mt-2 text-sm text-ink-muted">
              Data freshness, connected sources, confidence and limitations, demo vs live state, last updated time,
              owner and next action.
            </p>
          </Card>
          <Card className="border-l-4 border-l-critical">
            <p className="text-sm font-semibold text-ink">Never shown as fake certainty</p>
            <p className="mt-2 text-sm text-ink-muted">
              Unknown data is never rendered as “0”. You see “Not connected”, “Unavailable”, “Delayed” or “No data yet”
              - the real state, so you can trust the numbers that are there.
            </p>
          </Card>
        </div>
      </Section>

      <Section muted>
        <div className="rounded-(--tm-radius-lg) bg-navy-950 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Try it with sample data right now</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            The interactive demo takes 2-4 minutes: one complete workflow, one approval decision, one measured result.
          </p>
          <div className="mt-6">
            <CtaLink href="/demo/dashboard/" ctaId="dashboard-final-demo" kind="primary">
              Open interactive demo
            </CtaLink>
          </div>
        </div>
      </Section>
    </>
  );
}
