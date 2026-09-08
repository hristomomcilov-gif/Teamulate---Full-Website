import type { Metadata } from "next";
import { AGENTS, TEAM_STRUCTURE_SENTENCE } from "@/content/agents";
import { absoluteUrl, marketingShareMetadata } from "@/lib/site";
import { Card, Eyebrow, Section, SectionHeading, StatusChip } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";

export const metadata: Metadata = {
  title: "The 11-Agent Team",
  description:
    "One AI Head of Marketing, eight execution specialists and two independent assurance agents - one coordinated department with clear responsibilities, collaboration paths and outputs.",
  alternates: { canonical: absoluteUrl("/team/") },
  ...marketingShareMetadata,
};

function AgentDetail({ slug }: { slug: string }) {
  const agent = AGENTS.find((a) => a.slug === slug)!;
  return (
    <Card id={agent.slug} className="scroll-mt-24">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-ink">{agent.name}</h3>
          <p className="text-sm text-ink-muted">{agent.role}</p>
        </div>
        <StatusChip
          tone={agent.type === "orchestrator" ? "info" : agent.type === "assurance" ? "positive" : "neutral"}
          label={agent.type === "orchestrator" ? "Orchestrator" : agent.type === "assurance" ? "Independent assurance" : "Execution specialist"}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{agent.mission}</p>
      <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <p className="font-semibold text-ink">Primary responsibilities</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-ink-muted">
            {agent.responsibilities.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-ink">Typical outputs</p>
            <p className="mt-1 text-ink-muted">{agent.typicalOutputs.join(", ")}</p>
          </div>
          <div>
            <p className="font-semibold text-ink">Works closely with</p>
            <p className="mt-1 text-ink-muted">{agent.worksCloselyWith.join(", ")}</p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-ink">Autonomous actions</p>
          <p className="mt-1 text-ink-muted">{agent.autonomousActions.join(", ")}</p>
        </div>
        <div>
          <p className="font-semibold text-ink">Requires approval</p>
          <p className="mt-1 text-ink-muted">{agent.approvalRequiredActions.join(", ")}</p>
        </div>
      </div>
      <p className="mt-4 rounded-(--tm-radius-sm) bg-surface-muted px-3 py-2 text-xs text-ink-muted">
        Direct email: <code className="font-mono text-ink">{agent.emailFormat}</code> - requests are ingested into a
        tenant-scoped thread and never bypass QA, policy or approvals.
      </p>
    </Card>
  );
}

export default function TeamPage() {
  const specialists = AGENTS.filter((a) => a.type === "specialist");
  const assurance = AGENTS.filter((a) => a.type === "assurance");

  return (
    <>
      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>The team</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            One coordinated department, not eleven chatbots
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            {TEAM_STRUCTURE_SENTENCE}. Every agent has a defined role, defined inputs and outputs, defined collaboration
            paths - and defined boundaries on what it may do autonomously and what always requires your approval.
          </p>
        </div>
      </Section>

      {/* Organizational diagram */}
      <Section muted>
        <SectionHeading eyebrow="Structure" title="How the department is organized" />
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="rounded-(--tm-radius-md) border-2 border-brand bg-surface p-4">
            <p className="font-bold text-ink">Strategos</p>
            <p className="text-xs text-ink-muted">Head of Marketing / Orchestrator</p>
          </div>
          <p aria-hidden className="text-ink-muted">↓ delegates and coordinates</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {specialists.map((agent) => (
              <a key={agent.slug} href={`#${agent.slug}`} className="rounded-(--tm-radius-sm) border border-line bg-surface p-3 hover:border-brand">
                <p className="text-sm font-semibold text-ink">{agent.name}</p>
                <p className="text-[11px] text-ink-muted">{agent.role}</p>
              </a>
            ))}
          </div>
          <p aria-hidden className="text-ink-muted">↔ independently checked by</p>
          <div className="grid grid-cols-2 gap-2">
            {assurance.map((agent) => (
              <a key={agent.slug} href={`#${agent.slug}`} className="rounded-(--tm-radius-sm) border border-green-300 bg-green-50 p-3 hover:border-positive">
                <p className="text-sm font-semibold text-ink">{agent.name}</p>
                <p className="text-[11px] text-ink-muted">{agent.role}</p>
              </a>
            ))}
          </div>
          <p className="text-xs text-ink-muted">
            Guardian and Metric are an independent assurance layer - they do not report to any execution specialist.
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Profiles" title="Every agent, in detail" />
        <div className="space-y-6">
          {AGENTS.map((agent) => (
            <AgentDetail key={agent.slug} slug={agent.slug} />
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">See the department at work</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              Watch a goal move through delegation, QA, approval and measurement in the interactive demo.
            </p>
          </div>
          <CtaLink href="/request-demo/" ctaId="team-final" kind="primary">
            Meet your department
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
