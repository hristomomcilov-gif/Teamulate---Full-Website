import type { Metadata } from "next";
import { COPY } from "@/content/copy";
import { absoluteUrl, marketingShareMetadata } from "@/lib/site";
import { Card, Eyebrow, Section, SectionHeading, StatusChip } from "@/components/ui";
import { CtaLink } from "@/components/CtaLink";

export const metadata: Metadata = {
  title: "Security & Governance",
  description:
    "The Teamulate operating model for control: P0-P4 approvals, client-owned environments, least-privilege access, independent QA and measurement, audit trails, rollback and kill switches.",
  alternates: { canonical: absoluteUrl("/security-governance/") },
  ...marketingShareMetadata,
};

const P_TIERS = [
  { tier: "P0", rule: "Autonomous - internal, reversible, low risk", examples: "Monitoring, analysis, research, summaries, issue creation" },
  { tier: "P1", rule: "Autonomous inside thresholds", examples: "Safe retries, routing, hygiene, bounded metadata changes" },
  { tier: "P2", rule: "Controlled external action", examples: "Routine publishing or communication under approved content, audience and policy" },
  { tier: "P3", rule: "Human approval required", examples: "New strategy, audience or offer; meaningful budget, targeting or production changes" },
  { tier: "P4", rule: "Executive / legal / security authority", examples: "Contract or legal matters, sensitive claims, privacy or security incidents, destructive actions" },
];

const CONTROLS = [
  { title: "Client ownership and environment separation", body: "One client, one environment. Your accounts, your data, your assets. Client environments and Teamulate's own environment never share memory or credentials." },
  { title: "Least-privilege access", body: "Every integration gets the minimum scopes the signed scope requires - visible in the dashboard, revocable by you." },
  { title: "Secrets stay outside prompts", body: "Credentials live in a managed secrets facility, referenced by connection ID. They never appear in prompts, agent memory, forms, logs or analytics." },
  { title: "Action-specific, expiring approvals", body: "An approval authorizes exactly one action, bound to its content, audience, budget and target. Change anything and the approval is invalid. Every approval expires." },
  { title: "Spend and action limits", body: "Budget caps, batch limits, publish counts and allowed audiences are enforced by the platform - independently of what any agent requests." },
  { title: "Independent Guardian and Metric", body: "QA and measurement are separate agents that do not report to execution. Guardian can block a release; Metric reports what actually happened, with confidence stated." },
  { title: "Append-only audit trail", body: "Who acted, on what, under which policy and approval, with before/after evidence and outcomes. Exports are themselves audited." },
  { title: "Rollback and kill switch", body: "Documented rollback or compensation per workflow where technically possible; pause switches per workflow, per integration, per tenant - and a global external-write stop." },
];

export default function SecurityGovernancePage() {
  return (
    <>
      <Section className="pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Security &amp; governance</Eyebrow>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{COPY.controlMessage}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            The core principle: the system must remain safe even when an AI agent is wrong. Safety comes from technical
            boundaries - permissions, approvals, limits, audit and rollback - not from trusting agent instructions.
          </p>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="The approval model" title="P0-P4: what runs, what waits for a human" />
        <div className="overflow-x-auto rounded-(--tm-radius-md) border border-line bg-surface">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">P0 to P4 approval tiers with default rules and examples</caption>
            <thead>
              <tr className="border-b border-line bg-surface-muted">
                <th scope="col" className="px-4 py-3 font-semibold text-ink">Tier</th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink">Default rule</th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink">Examples</th>
              </tr>
            </thead>
            <tbody>
              {P_TIERS.map((row) => (
                <tr key={row.tier} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-bold text-ink">{row.tier}</td>
                  <td className="px-4 py-3 text-ink">{row.rule}</td>
                  <td className="px-4 py-3 text-ink-muted">{row.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          Risk tiers are assigned by policy, not user convenience - the UI cannot downgrade risk, and P3/P4 actions
          cannot execute without a valid, unexpired, action-bound approval.
        </p>
      </Section>

      <Section>
        <SectionHeading eyebrow="Controls" title="How control is enforced" />
        <div className="grid gap-6 md:grid-cols-2">
          {CONTROLS.map((control) => (
            <Card key={control.title}>
              <h2 className="text-base font-semibold text-ink">{control.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{control.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Operations" title="Incidents and offboarding" />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <StatusChip tone="attention" label="Incidents" />
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Incidents follow an explicit lifecycle - open, triaged, contained, investigating, recovering, monitoring,
              resolved - with severity levels, named owners and audited changes. Security-critical notifications reach
              named contacts immediately and cannot be silently disabled.
            </p>
          </Card>
          <Card>
            <StatusChip tone="info" label="Offboarding" />
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              A documented 12-step process: stop workflows, revoke approvals and connectors, export agreed data and
              evidence, transfer asset ownership, remove access, apply retention policy and obtain sign-off. Because
              everything runs in your accounts, you keep everything.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <Card className="max-w-3xl border-l-4 border-l-attention">
          <p className="text-sm font-semibold text-ink">Disclaimer</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{COPY.securityDisclaimer}</p>
        </Card>
      </Section>

      <Section muted>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">Have a security questionnaire?</h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              We will walk through your requirements, the access model and the approval configuration for your stack.
            </p>
          </div>
          <CtaLink href="/contact/" ctaId="security-final" kind="primary">
            Review your requirements
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
