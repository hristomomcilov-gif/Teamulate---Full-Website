"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import {
  DEMO_AGENTS,
  DEMO_APPROVALS,
  DEMO_CAMPAIGN,
  DEMO_GOALS,
  DEMO_INTEGRATIONS,
  DEMO_ORG,
  DEMO_PERFORMANCE,
  DEMO_WORK,
  DEMO_WORKFLOW_RUN,
} from "@/lib/demo/fixtures";
import { StatusChip } from "@/components/ui";

const TABS = ["Overview", "Campaign", "Approvals", "Agents & workflow", "Performance", "Integrations"] as const;
type Tab = (typeof TABS)[number];

type DemoState = {
  launchApproved: boolean;
};

const INITIAL_STATE: DemoState = { launchApproved: false };

function freshnessChip(freshness: string) {
  switch (freshness) {
    case "fresh":
    case "live":
      return <StatusChip tone="positive" label="Fresh" />;
    case "delayed":
      return <StatusChip tone="attention" label="Delayed" />;
    case "unavailable":
      return <StatusChip tone="critical" label="Not connected" />;
    default:
      return <StatusChip tone="neutral" label={freshness} />;
  }
}

function taskChip(status: string) {
  switch (status) {
    case "completed":
      return <StatusChip tone="positive" label="Completed" />;
    case "awaiting_approval":
      return <StatusChip tone="attention" label="Awaiting approval" />;
    case "in_progress":
      return <StatusChip tone="info" label="In progress" />;
    case "qa_review":
      return <StatusChip tone="info" label="QA review" />;
    case "ready":
      return <StatusChip tone="neutral" label="Ready" />;
    case "scheduled":
      return <StatusChip tone="info" label="Scheduled" />;
    default:
      return <StatusChip tone="neutral" label={status.replaceAll("_", " ")} />;
  }
}

function agentChip(status: string) {
  switch (status) {
    case "working":
      return <StatusChip tone="info" label="Working" />;
    case "available":
      return <StatusChip tone="positive" label="Available" />;
    case "waiting":
      return <StatusChip tone="neutral" label="Waiting" />;
    case "blocked":
      return <StatusChip tone="attention" label="Blocked" />;
    default:
      return <StatusChip tone="neutral" label={status} />;
  }
}

function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-(--tm-radius-md) border border-line bg-surface p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-ink">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export function DemoDashboard() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [state, setState] = useState<DemoState>(INITIAL_STATE);

  useEffect(() => {
    trackEvent("dashboard_demo_opened", { surface: "demo", route: "/demo/dashboard/" });
  }, []);

  const interact = (ctaId: string) => trackEvent("dashboard_demo_interaction", { surface: "demo", ctaId });

  const switchTab = (next: Tab) => {
    setTab(next);
    interact(`tab:${next}`);
  };

  const approveLaunch = () => {
    setState({ launchApproved: true });
    interact("approve-launch");
  };

  const reset = () => {
    setState(INITIAL_STATE);
    setTab("Overview");
    interact("reset");
  };

  const campaignStatus = state.launchApproved ? "live" : "awaiting_launch_approval";
  const pendingDecisions = useMemo(
    () => DEMO_APPROVALS.filter((a) => a.status === "pending" && !(a.id === "apr_1" && state.launchApproved)),
    [state.launchApproved],
  );

  return (
    <div className="rounded-(--tm-radius-lg) border border-line bg-surface-muted shadow-card">
      {/* Persistent demo label (spec §13.2) */}
      <p className="flex items-center justify-center gap-2 rounded-t-(--tm-radius-lg) bg-amber-100 px-4 py-2 text-center text-xs font-semibold text-amber-900">
        <span aria-hidden>◈</span> Interactive product demo - sample data, not a customer account.
      </p>

      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-navy-950 px-5 py-3">
        <div>
          <p className="text-sm font-bold text-white">{DEMO_ORG.name}</p>
          <p className="text-[11px] text-white/60">{DEMO_ORG.label} · {DEMO_ORG.profile}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden text-[11px] text-white/60 sm:block">Period: {DEMO_PERFORMANCE.period}</p>
          <button
            type="button"
            onClick={reset}
            className="min-h-9 rounded-md border border-white/30 px-3 text-xs font-semibold text-white hover:bg-white/10"
          >
            Reset demo
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Demo dashboard screens" className="flex gap-1 overflow-x-auto border-b border-line bg-surface px-3 py-2">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => switchTab(t)}
            className={`min-h-10 whitespace-nowrap rounded-md px-3 text-xs font-semibold transition-colors ${
              tab === t ? "bg-brand text-white" : "text-ink-muted hover:bg-surface-muted hover:text-ink"
            }`}
          >
            {t}
            {t === "Approvals" && pendingDecisions.length > 0 ? (
              <span className="ml-1.5 rounded-full bg-attention px-1.5 py-0.5 text-[10px] font-bold text-white">
                {pendingDecisions.length}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        {tab === "Overview" ? (
          <>
            <div className="grid gap-4 lg:grid-cols-3">
              {DEMO_GOALS.map((goal) => {
                const resolved = goal.id === "goal_1" && state.launchApproved;
                return (
                  <Panel key={goal.id} title={goal.metric}>
                    <p className="text-sm font-semibold text-ink">{goal.title}</p>
                    <p className="mt-2 text-2xl font-bold tabular-nums text-ink">
                      {goal.current === null ? "No data yet" : goal.current.toLocaleString("en-US")}
                      {goal.target !== null ? (
                        <span className="text-sm font-medium text-ink-muted"> / {goal.target.toLocaleString("en-US")}</span>
                      ) : null}
                    </p>
                    <div className="mt-2">
                      {resolved ? (
                        <StatusChip tone="positive" label="Unblocked - campaign live" />
                      ) : goal.status === "on-track" ? (
                        <StatusChip tone="positive" label="On track" />
                      ) : goal.status === "at-risk" ? (
                        <StatusChip tone="attention" label="At risk" />
                      ) : (
                        <StatusChip tone="neutral" label="Awaiting baseline" />
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                      {resolved ? "Launch approved - promotion is live and measurement has started." : goal.note}
                    </p>
                    <p className="mt-2 text-[11px] text-ink-muted">Confidence: {goal.confidence}</p>
                  </Panel>
                );
              })}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Panel
                title="Decisions required"
                action={<button type="button" onClick={() => switchTab("Approvals")} className="text-xs font-semibold text-brand hover:underline">Open queue →</button>}
              >
                {pendingDecisions.length === 0 ? (
                  <p className="text-sm text-ink-muted">No decisions waiting. Nice work.</p>
                ) : (
                  <ul className="space-y-2">
                    {pendingDecisions.map((a) => (
                      <li key={a.id} className="flex items-start justify-between gap-3 rounded-md border border-line bg-surface-muted px-3 py-2.5">
                        <div>
                          <p className="text-sm font-semibold text-ink">{a.title}</p>
                          <p className="text-xs text-ink-muted">Due {a.dueAt}</p>
                        </div>
                        <StatusChip tone={a.tier === "P3" || a.tier === "P4" ? "attention" : "info"} label={a.tier} />
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
              <Panel title="Work in motion">
                <ul className="space-y-2">
                  {DEMO_WORK.slice(0, 4).map((task) => {
                    const executed = state.launchApproved && task.status === "awaiting_approval";
                    return (
                      <li key={task.id} className="flex items-start justify-between gap-3 rounded-md border border-line bg-surface-muted px-3 py-2.5">
                        <div>
                          <p className="text-sm font-semibold text-ink">{task.title}</p>
                          <p className="text-xs text-ink-muted">{task.owner} · due {task.due}</p>
                        </div>
                        {executed ? taskChip("scheduled") : taskChip(task.status)}
                      </li>
                    );
                  })}
                </ul>
              </Panel>
            </div>
            <Panel title="What changed">
              <ul className="space-y-1.5 text-sm text-ink-muted">
                {state.launchApproved ? (
                  <li className="text-ink"><strong>Just now:</strong> You approved the P3 launch - landing page published, campaign scheduled and moving to live.</li>
                ) : null}
                <li>Guardian passed release preflight for the webinar campaign packet.</li>
                <li>Flow completed the campaign landing page (staging).</li>
                <li>Google Ads reporting is delayed ~9 hours - spend caps remain enforced.</li>
                <li>Guardian blocked one unverified competitor claim (see Approvals).</li>
              </ul>
            </Panel>
          </>
        ) : null}

        {tab === "Campaign" ? (
          <Panel title="Campaign detail">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-base font-bold text-ink">{DEMO_CAMPAIGN.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{DEMO_CAMPAIGN.objective}</p>
              </div>
              {campaignStatus === "live" ? (
                <StatusChip tone="positive" label="Live" />
              ) : (
                <StatusChip tone="attention" label="Awaiting launch approval" />
              )}
            </div>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-md bg-surface-muted p-3">
                <dt className="text-xs font-semibold text-ink-muted">Owner</dt>
                <dd className="mt-0.5 font-semibold text-ink">{DEMO_CAMPAIGN.owner}</dd>
              </div>
              <div className="rounded-md bg-surface-muted p-3">
                <dt className="text-xs font-semibold text-ink-muted">Budget cap</dt>
                <dd className="mt-0.5 font-semibold tabular-nums text-ink">USD {DEMO_CAMPAIGN.spendCapUsd.toLocaleString("en-US")}</dd>
              </div>
              <div className="rounded-md bg-surface-muted p-3">
                <dt className="text-xs font-semibold text-ink-muted">Primary KPI</dt>
                <dd className="mt-0.5 font-semibold text-ink">{DEMO_CAMPAIGN.primaryKpi}</dd>
              </div>
              <div className="rounded-md bg-surface-muted p-3">
                <dt className="text-xs font-semibold text-ink-muted">Next decision</dt>
                <dd className="mt-0.5 font-semibold text-ink">
                  {campaignStatus === "live" ? "None - measuring" : DEMO_CAMPAIGN.nextDecision}
                </dd>
              </div>
            </dl>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Campaign work</p>
              <ul className="mt-2 space-y-2">
                {DEMO_WORK.filter((t) => t.goalId === "goal_1").map((task) => {
                  const executed = state.launchApproved && task.status === "awaiting_approval";
                  return (
                    <li key={task.id} className="flex items-start justify-between gap-3 rounded-md border border-line bg-surface-muted px-3 py-2.5">
                      <div>
                        <p className="text-sm font-semibold text-ink">{task.title}</p>
                        <p className="text-xs text-ink-muted">{task.type} · {task.owner}{task.note ? ` · ${task.note}` : ""}</p>
                      </div>
                      {executed ? taskChip("completed") : taskChip(task.status)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Panel>
        ) : null}

        {tab === "Approvals" ? (
          <div className="space-y-4">
            {DEMO_APPROVALS.map((approval) => {
              const isLaunch = approval.id === "apr_1";
              const decided = isLaunch && state.launchApproved;
              return (
                <Panel key={approval.id} title={`${approval.tier} · ${approval.title}`}>
                  <div className="mb-3">
                    {decided ? (
                      <StatusChip tone="positive" label="Approved by you (demo)" />
                    ) : approval.status === "pending" ? (
                      <StatusChip tone="attention" label={`Pending · expires ${approval.dueAt}`} />
                    ) : approval.status === "executed" ? (
                      <StatusChip tone="positive" label="Executed" />
                    ) : (
                      <StatusChip tone="critical" label="Blocked by Guardian" />
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-ink">{approval.summary}</p>
                  <dl className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                    <div>
                      <dt className="text-xs font-semibold text-ink-muted">Requested by</dt>
                      <dd className="text-ink">{approval.requestedBy}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-ink-muted">QA result</dt>
                      <dd className="text-ink">{approval.qaResult}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-ink-muted">Impact</dt>
                      <dd className="text-ink-muted">{approval.impact}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-ink-muted">Rollback plan</dt>
                      <dd className="text-ink-muted">{approval.rollbackPlan}</dd>
                    </div>
                  </dl>
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-ink-muted">Evidence</p>
                    <ul className="mt-1 flex flex-wrap gap-1.5">
                      {approval.evidence.map((item) => (
                        <li key={item} className="rounded-full border border-line bg-surface-muted px-2.5 py-0.5 text-xs text-ink-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {approval.blockedReason ? (
                    <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
                      {approval.blockedReason}
                    </p>
                  ) : null}
                  {isLaunch && !decided ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={approveLaunch}
                        className="min-h-11 rounded-(--tm-radius-sm) bg-positive px-4 text-sm font-semibold text-white hover:opacity-90"
                      >
                        Approve (demo)
                      </button>
                      <button
                        type="button"
                        onClick={() => interact("request-changes")}
                        className="min-h-11 rounded-(--tm-radius-sm) border border-line bg-surface px-4 text-sm font-semibold text-ink"
                      >
                        Request changes
                      </button>
                    </div>
                  ) : null}
                  {decided ? (
                    <p className="mt-3 text-xs text-ink-muted">
                      In the real product this decision is recorded in the append-only audit trail with your identity,
                      the exact approved action hash and an expiry - and execution re-verifies it.
                    </p>
                  ) : null}
                </Panel>
              );
            })}
          </div>
        ) : null}

        {tab === "Agents & workflow" ? (
          <div className="space-y-4">
            <Panel title={DEMO_WORKFLOW_RUN.name}>
              <ol className="flex flex-wrap gap-1.5">
                {DEMO_WORKFLOW_RUN.stages.map((s) => {
                  const done = s.status === "done" || (state.launchApproved && (s.stage === "Approval" || s.stage === "Execute"));
                  const current = !done && (state.launchApproved ? s.stage === "Measure" : s.status === "current");
                  return (
                    <li
                      key={s.stage}
                      className={`rounded-md px-2.5 py-1.5 text-xs font-semibold ${
                        done ? "bg-green-100 text-green-800" : current ? "bg-brand text-white" : "bg-surface-muted text-ink-muted"
                      }`}
                    >
                      {done ? "✓ " : ""}{s.stage}
                    </li>
                  );
                })}
              </ol>
              <p className="mt-3 text-xs text-ink-muted">
                {state.launchApproved
                  ? "Approval and execution complete - the run is now in measurement."
                  : "The run is waiting at the approval stage - the P3 packet is in your queue."}
              </p>
            </Panel>
            <Panel title="Agent team">
              <ul className="grid gap-2 sm:grid-cols-2">
                {DEMO_AGENTS.map((agent) => {
                  const unblocked = state.launchApproved && agent.status === "blocked";
                  return (
                    <li key={agent.name} className="flex items-start justify-between gap-3 rounded-md border border-line bg-surface-muted px-3 py-2.5">
                      <div>
                        <p className="text-sm font-semibold text-ink">{agent.name}</p>
                        <p className="text-xs text-ink-muted">{agent.role}</p>
                        <p className="mt-1 text-xs text-ink-muted">{unblocked ? "Unblocked - executing launch" : agent.current}</p>
                      </div>
                      {unblocked ? agentChip("working") : agentChip(agent.status)}
                    </li>
                  );
                })}
              </ul>
            </Panel>
          </div>
        ) : null}

        {tab === "Performance" ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DEMO_PERFORMANCE.kpis.map((kpi) => (
                <Panel key={kpi.label} title={kpi.label}>
                  <p className="text-2xl font-bold tabular-nums text-ink">{kpi.value}</p>
                  <div className="mt-2">{freshnessChip(kpi.freshness)}</div>
                  <p className="mt-2 text-xs text-ink-muted">{kpi.note}</p>
                </Panel>
              ))}
            </div>
            {state.launchApproved ? (
              <Panel title="Campaign result (simulated)">
                <p className="text-sm text-ink">
                  Webinar promotion is live. Early result: <strong className="tabular-nums">+9 qualified registrations</strong> in the
                  first measurement window, spend pacing at <strong className="tabular-nums">$410 / $3,000 cap</strong>.
                </p>
                <p className="mt-2 text-xs text-ink-muted">
                  Simulated sample outcome for the demo narrative - not a performance claim.
                </p>
              </Panel>
            ) : null}
            <p className="rounded-md border border-line bg-surface px-4 py-3 text-xs leading-relaxed text-ink-muted">
              {DEMO_PERFORMANCE.attributionNote}
            </p>
          </div>
        ) : null}

        {tab === "Integrations" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {DEMO_INTEGRATIONS.map((integration) => (
              <Panel key={integration.provider} title={integration.provider}>
                <div className="flex items-center gap-2">
                  {integration.status === "connected" ? (
                    <StatusChip tone="positive" label="Connected" />
                  ) : integration.status === "degraded" ? (
                    <StatusChip tone="attention" label="Degraded" />
                  ) : (
                    <StatusChip tone="critical" label="Not connected" />
                  )}
                  {freshnessChip(integration.freshness)}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{integration.detail}</p>
                <p className="mt-2 text-xs text-ink-muted">Last successful sync: {integration.lastSync}</p>
              </Panel>
            ))}
          </div>
        ) : null}
      </div>

      {/* Demo CTA footer */}
      <div className="flex flex-col items-center justify-between gap-3 rounded-b-(--tm-radius-lg) border-t border-line bg-surface px-5 py-4 sm:flex-row">
        <p className="text-sm text-ink-muted">
          {state.launchApproved
            ? "You just completed the core loop: goal → work → QA → your approval → execution → measured result."
            : "Tip: open the Approvals tab and approve the campaign launch to see the system react."}
        </p>
        <Link
          href="/request-demo/"
          onClick={() => interact("demo-footer-cta")}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-[#4a38d8]"
        >
          Request live demonstration
        </Link>
      </div>
    </div>
  );
}
