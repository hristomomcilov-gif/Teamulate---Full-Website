"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { DemoBadge, StatusChip } from "@/components/ui";

type WorkflowStep = {
  n: number;
  actor: string;
  action: string;
  inputs: string;
  output: string;
  status: "completed" | "attention" | "info";
  statusLabel: string;
  nextDependency: string;
};

const STEPS: WorkflowStep[] = [
  { n: 1, actor: "Strategos", action: "Receives the goal and creates the campaign brief", inputs: "Goal, ICP, approved knowledge base, constraints", output: "Campaign brief with task graph and owners", status: "completed", statusLabel: "Completed", nextDependency: "Scout validates the audience" },
  { n: 2, actor: "Scout", action: "Validates audience and pain points", inputs: "Brief, approved research scope", output: "Audience validation memo with evidence", status: "completed", statusLabel: "Completed", nextDependency: "Wordsmith drafts messaging" },
  { n: 3, actor: "Wordsmith", action: "Creates the messaging and campaign copy", inputs: "Validated audience, message map, brand voice", output: "Messaging kit: invite copy, emails, social variants", status: "completed", statusLabel: "Completed", nextDependency: "Pixel produces assets" },
  { n: 4, actor: "Pixel", action: "Produces creative assets", inputs: "Messaging kit, brand assets, channel specs", output: "Design package: banners, social cards, slides", status: "completed", statusLabel: "Completed", nextDependency: "Flow builds the landing page" },
  { n: 5, actor: "Flow", action: "Builds the landing page and registration form", inputs: "Design package, conversion path, tracking plan", output: "Staging landing page with validated form", status: "completed", statusLabel: "Completed", nextDependency: "GrowthTrack prepares the campaign" },
  { n: 6, actor: "GrowthTrack", action: "Prepares the promotion campaign", inputs: "Budget cap, audiences, schedule", output: "Campaign build in draft, pacing plan", status: "completed", statusLabel: "Completed", nextDependency: "Nexus configures tracking" },
  { n: 7, actor: "Nexus", action: "Configures tracking and lead routing", inputs: "CRM schema, campaign taxonomy, routing rules", output: "Tracking + routing configured and tested", status: "completed", statusLabel: "Completed", nextDependency: "Guardian runs release preflight" },
  { n: 8, actor: "Guardian", action: "Checks brand, claims, facts and release readiness", inputs: "All outputs, claims registry, policies", output: "QA decision: PASS with 2 minor revisions applied", status: "completed", statusLabel: "QA passed", nextDependency: "Client approves budget and launch" },
  { n: 9, actor: "You (client approver)", action: "Approves the budget and external launch", inputs: "Approval packet: preview, impact, rollback plan, expiry", output: "P3 approval granted - action-specific and expiring", status: "attention", statusLabel: "Human decision", nextDependency: "Metric measures outcomes" },
  { n: 10, actor: "Metric", action: "Reports outcomes and confidence", inputs: "Registrations, attendance, pipeline, attribution model", output: "41 qualified registrations · confidence: medium · next action proposed", status: "info", statusLabel: "Measured", nextDependency: "Strategos decides scale / hold / stop" },
];

export function WorkflowDemo() {
  const [step, setStep] = useState(0);
  const started = useRef(false);
  const completed = useRef(false);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      trackEvent("workflow_demo_started", { route: "/how-it-works/" });
    }
  }, []);

  useEffect(() => {
    trackEvent("workflow_demo_step_viewed", { step: STEPS[step].n, route: "/how-it-works/" });
    if (step === STEPS.length - 1 && !completed.current) {
      completed.current = true;
      trackEvent("workflow_demo_completed", { route: "/how-it-works/" });
    }
  }, [step]);

  const current = STEPS[step];

  return (
    <div className="rounded-(--tm-radius-lg) border border-line bg-surface p-5 shadow-card sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Guided example</p>
          <p className="mt-1 text-base font-semibold text-ink">
            Goal: Generate qualified conversations for a technical-services webinar.
          </p>
        </div>
        <DemoBadge />
      </div>

      <div className="mb-6 flex flex-wrap gap-1.5" role="tablist" aria-label="Workflow steps">
        {STEPS.map((s, i) => (
          <button
            key={s.n}
            role="tab"
            aria-selected={i === step}
            aria-label={`Step ${s.n}: ${s.actor}`}
            onClick={() => setStep(i)}
            className={`flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-xs font-bold transition-colors ${
              i === step
                ? "bg-brand text-white"
                : i < step
                  ? "bg-green-100 text-green-800"
                  : "bg-surface-muted text-ink-muted"
            }`}
          >
            {s.n}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Step {current.n} of {STEPS.length}
          </p>
          <h3 className="mt-1 text-xl font-bold text-ink">{current.actor}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">{current.action}</p>
          <div className="mt-3">
            <StatusChip
              tone={current.status === "completed" ? "positive" : current.status === "attention" ? "attention" : "info"}
              label={current.statusLabel}
            />
          </div>
        </div>
        <dl className="space-y-3 rounded-(--tm-radius-md) bg-surface-muted p-4 text-sm">
          <div>
            <dt className="font-semibold text-ink">Inputs</dt>
            <dd className="mt-0.5 text-ink-muted">{current.inputs}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Output preview</dt>
            <dd className="mt-0.5 text-ink-muted">{current.output}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Next dependency</dt>
            <dd className="mt-0.5 text-ink-muted">{current.nextDependency}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="min-h-11 rounded-(--tm-radius-sm) border border-line px-4 text-sm font-semibold text-ink disabled:opacity-40"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))}
          disabled={step === STEPS.length - 1}
          className="min-h-11 rounded-(--tm-radius-sm) bg-brand px-4 text-sm font-semibold text-white disabled:opacity-40"
        >
          Next step →
        </button>
      </div>
    </div>
  );
}
