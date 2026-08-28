/**
 * Deterministic demo fixtures per spec §60. Fictional organization, clearly
 * labelled sample data. No real client data; no production reach (ADR-005).
 */
import type {
  AgentStatus,
  ApprovalStatus,
  CampaignStatus,
  DataFreshness,
  IntegrationStatus,
  RiskTier,
  TaskStatus,
} from "@/domain/enums";

export const DEMO_ORG = {
  id: "org_demo",
  name: "Northstar Technical Services",
  label: "Sample Company",
  mode: "demo" as const,
  profile: "75 employees · 2-person marketing team · B2B technical services",
};

export type DemoGoal = {
  id: string;
  title: string;
  status: "on-track" | "at-risk" | "awaiting-baseline";
  metric: string;
  current: number | null;
  target: number | null;
  confidence: "high" | "medium" | "low" | "unknown";
  note: string;
};

export const DEMO_GOALS: DemoGoal[] = [
  {
    id: "goal_1",
    title: "Create qualified opportunities for the new service line",
    status: "at-risk",
    metric: "Qualified opportunities",
    current: 7,
    target: 12,
    confidence: "medium",
    note: "At risk: campaign launch is waiting on your approval below.",
  },
  {
    id: "goal_2",
    title: "Grow qualified organic visibility for core services",
    status: "on-track",
    metric: "Qualified organic sessions / month",
    current: 3480,
    target: 4000,
    confidence: "high",
    note: "Content refresh workflow is compounding as planned.",
  },
  {
    id: "goal_3",
    title: "Improve lead-to-meeting conversion",
    status: "awaiting-baseline",
    metric: "Lead-to-meeting rate",
    current: null,
    target: null,
    confidence: "unknown",
    note: "No data yet - baseline requires 30 days of validated CRM routing data.",
  },
];

export type DemoWorkItem = {
  id: string;
  title: string;
  type: string;
  status: TaskStatus;
  owner: string;
  due: string;
  goalId: string;
  note?: string;
};

export const DEMO_WORK: DemoWorkItem[] = [
  { id: "task_1", title: "Publish technical-services campaign landing page", type: "Web/CRO", status: "awaiting_approval", owner: "Flow", due: "Aug 27", goalId: "goal_1", note: "Page built and QA-passed; publishing is bundled into the launch approval." },
  { id: "task_2", title: "Webinar promotion campaign build", type: "Demand / paid", status: "awaiting_approval", owner: "GrowthTrack", due: "Aug 27", goalId: "goal_1", note: "Campaign drafted with C$3,000 cap; awaiting launch approval." },
  { id: "task_3", title: "Refresh: 'Preventive maintenance guide' article", type: "SEO/GEO", status: "in_progress", owner: "Seeker", due: "Aug 29", goalId: "goal_2" },
  { id: "task_4", title: "Competitor positioning update - Q3", type: "Research", status: "qa_review", owner: "Scout", due: "Aug 28", goalId: "goal_1" },
  { id: "task_5", title: "Nurture flow for webinar registrants", type: "Lifecycle", status: "ready", owner: "Socialite", due: "Sep 2", goalId: "goal_1" },
  { id: "task_6", title: "CRM source-field hygiene sweep", type: "CRM / operations", status: "completed", owner: "Nexus", due: "Aug 24", goalId: "goal_3" },
];

export type DemoCampaign = {
  id: string;
  name: string;
  objective: string;
  status: CampaignStatus;
  owner: string;
  spendCapUsd: number;
  primaryKpi: string;
  nextDecision: string;
};

export const DEMO_CAMPAIGN: DemoCampaign = {
  id: "cmp_1",
  name: "Q3 Technical Services Webinar",
  objective: "Generate qualified conversations for the new service line",
  status: "awaiting_launch_approval",
  owner: "Strategos",
  spendCapUsd: 3000,
  primaryKpi: "Qualified registrations",
  nextDecision: "P3 launch + budget approval",
};

export type DemoApproval = {
  id: string;
  tier: RiskTier;
  title: string;
  summary: string;
  requestedBy: string;
  status: ApprovalStatus;
  dueAt: string;
  impact: string;
  rollbackPlan: string;
  qaResult: string;
  evidence: string[];
  blockedReason?: string;
};

export const DEMO_APPROVALS: DemoApproval[] = [
  {
    id: "apr_1",
    tier: "P3",
    title: "Approve campaign launch and C$3,000 budget cap",
    summary: "Publish the QA-passed landing page and launch the webinar promotion campaign with a hard C$3,000 spend cap.",
    requestedBy: "GrowthTrack (via Strategos)",
    status: "pending",
    dueAt: "Aug 27, 4:00 PM",
    impact: "Approve: campaign goes live on schedule. Reject: webinar misses the promotion window. Delay past expiry: approval must be re-issued.",
    rollbackPlan: "Unpublish landing page (previous version restored), pause campaign, redirect traffic to services hub.",
    qaResult: "Guardian: PASS - brand, claims and tracking verified. 2 minor copy revisions already applied.",
    evidence: ["Landing page preview (staging)", "Campaign build summary", "Audience definition", "Budget pacing plan"],
  },
  {
    id: "apr_2",
    tier: "P2",
    title: "Publish refreshed article: Preventive maintenance guide",
    summary: "Routine content refresh under the approved content policy. Runs automatically after QA unless you object.",
    requestedBy: "Seeker",
    status: "pending",
    dueAt: "Aug 29",
    impact: "Recovers declining organic visibility for a proven page.",
    rollbackPlan: "Restore previous article version.",
    qaResult: "Guardian: queued (runs before publication).",
    evidence: ["Decline diagnosis", "Revision diff"],
  },
  {
    id: "apr_3",
    tier: "P1",
    title: "Informational: retried HubSpot sync completed",
    summary: "A transient sync failure was retried within policy and completed. No action needed.",
    requestedBy: "Nexus",
    status: "executed",
    dueAt: "-",
    impact: "None - informational record.",
    rollbackPlan: "Not applicable.",
    qaResult: "Not applicable.",
    evidence: ["Sync run log reference"],
  },
  {
    id: "apr_4",
    tier: "P4",
    title: "BLOCKED: competitor comparison claim",
    summary: "Wordsmith proposed a competitor performance comparison. Guardian blocked it: the claim lacks approved evidence in the claims registry.",
    requestedBy: "Wordsmith",
    status: "rejected",
    dueAt: "-",
    impact: "Claim will not publish. Scout has been tasked to gather verifiable evidence first.",
    rollbackPlan: "Not applicable - blocked before any external action.",
    qaResult: "Guardian: BLOCK - unverified sensitive claim.",
    evidence: ["Claims registry check", "Guardian decision log"],
    blockedReason: "Sensitive claims require P4 executive approval and verified evidence.",
  },
];

export type DemoAgent = { name: string; role: string; status: AgentStatus; current: string };

export const DEMO_AGENTS: DemoAgent[] = [
  { name: "Strategos", role: "Head of Marketing", status: "working", current: "Coordinating webinar campaign launch" },
  { name: "Scout", role: "Intelligence & PMM", status: "working", current: "Q3 competitor positioning update" },
  { name: "Wordsmith", role: "Content & Social", status: "waiting", current: "Awaiting evidence for comparison claim" },
  { name: "Seeker", role: "Search & GEO", status: "working", current: "Refreshing maintenance guide article" },
  { name: "GrowthTrack", role: "Demand & Paid", status: "blocked", current: "Campaign ready - blocked on launch approval" },
  { name: "Pixel", role: "Creative Studio", status: "available", current: "Webinar assets delivered" },
  { name: "Flow", role: "Web & CRO", status: "blocked", current: "Landing page ready - blocked on launch approval" },
  { name: "Socialite", role: "Lifecycle", status: "available", current: "Nurture flow drafted" },
  { name: "Nexus", role: "Ops & CRM", status: "working", current: "Monitoring routing and sync health" },
  { name: "Metric", role: "Analytics (assurance)", status: "working", current: "Validating campaign tracking plan" },
  { name: "Guardian", role: "QA & Governance (assurance)", status: "available", current: "Preflight complete for launch packet" },
];

export type DemoWorkflowStage = { stage: string; status: "done" | "current" | "pending" };

export const DEMO_WORKFLOW_RUN: { name: string; stages: DemoWorkflowStage[] } = {
  name: "Webinar campaign workflow - run #4",
  stages: [
    { stage: "Triggered", status: "done" },
    { stage: "Input validated", status: "done" },
    { stage: "Owner assigned", status: "done" },
    { stage: "Build / action", status: "done" },
    { stage: "QA", status: "done" },
    { stage: "Approval", status: "current" },
    { stage: "Execute", status: "pending" },
    { stage: "Measure", status: "pending" },
    { stage: "Memory update", status: "pending" },
    { stage: "Next action", status: "pending" },
  ],
};

export type DemoIntegration = {
  provider: string;
  status: IntegrationStatus;
  freshness: DataFreshness;
  lastSync: string;
  detail: string;
};

export const DEMO_INTEGRATIONS: DemoIntegration[] = [
  { provider: "HubSpot", status: "connected", freshness: "fresh", lastSync: "12 minutes ago", detail: "Contacts, companies, deals and lifecycle stages syncing normally." },
  { provider: "WordPress", status: "connected", freshness: "fresh", lastSync: "1 hour ago", detail: "Draft, preview and policy-gated publishing available." },
  { provider: "Google Ads", status: "degraded", freshness: "delayed", lastSync: "9 hours ago", detail: "Reporting API delayed. Spend data may lag; caps remain enforced." },
  { provider: "GA4", status: "not_connected", freshness: "unavailable", lastSync: "-", detail: "Not connected. Web analytics unavailable until authorized during onboarding." },
];

export const DEMO_PERFORMANCE = {
  period: "Last 30 days",
  kpis: [
    { label: "Qualified registrations", value: "41", freshness: "fresh" as DataFreshness, note: "Webinar program to date" },
    { label: "Qualified pipeline", value: "$86,000", freshness: "fresh" as DataFreshness, note: "Influenced - multi-touch modelled" },
    { label: "Qualified organic sessions", value: "3,480", freshness: "fresh" as DataFreshness, note: "+12% vs previous period" },
    { label: "Ad spend (this campaign)", value: "Delayed", freshness: "delayed" as DataFreshness, note: "Google Ads reporting delayed ~9h; cap enforced at $3,000" },
  ],
  attributionNote:
    "Pipeline figures use a multi-touch model and are labelled as influenced, not directly sourced. Sales feedback completeness: 82%. Sample data for product illustration.",
};
