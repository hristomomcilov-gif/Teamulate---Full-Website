/**
 * Plan data per spec §14.1 (project fact — cannot change without a decision
 * from Chris). Default currency USD; no annual discount; Scale uses "From"
 * because complexity varies.
 */
export type Plan = {
  key: "core" | "growth" | "scale";
  name: string;
  setupUsd: number;
  monthlyUsd: number;
  monthlyPrefix?: "From";
  activeRecurringWorkflows: number;
  integrations: number;
  recommended?: boolean;
  bestFor: string;
};

export const PLANS: Plan[] = [
  {
    key: "core",
    name: "Core",
    setupUsd: 7500,
    monthlyUsd: 5000,
    activeRecurringWorkflows: 8,
    integrations: 4,
    bestFor: "Teams that need dependable recurring execution on a focused channel mix.",
  },
  {
    key: "growth",
    name: "Growth",
    setupUsd: 12500,
    monthlyUsd: 7500,
    activeRecurringWorkflows: 20,
    integrations: 8,
    recommended: true,
    bestFor: "Teams running multi-channel campaigns with an active demand motion.",
  },
  {
    key: "scale",
    name: "Scale",
    setupUsd: 20000,
    monthlyUsd: 12000,
    monthlyPrefix: "From",
    activeRecurringWorkflows: 35,
    integrations: 12,
    bestFor: "Organizations with multiple segments, products or regions in motion.",
  },
];

export const ALL_PLANS_SHARE = [
  "The full 11-agent department: Strategos, eight execution specialists, and independent Guardian and Metric assurance",
  "A client-owned environment - your accounts, your data, your assets",
  "P0-P4 approval model with named human decision owners",
  "The client dashboard: goals, work, campaigns, approvals, pipeline and performance",
  "Structured onboarding and an approved business knowledge base",
  "Human oversight for strategy, spend, brand and sensitive decisions",
];

export const SETUP_FEE_COVERS = [
  "Discovery and business knowledge base construction",
  "Environment provisioning and access scoping",
  "Integration connection and health verification",
  "Approval and autonomy policy configuration",
  "Baseline measurement and KPI dictionary",
  "Staging runs, QA and go-live acceptance",
];

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
