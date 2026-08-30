/**
 * Demo-profile sample from the live /app/ Marketing Dashboard.
 * Filled 27 Aug 2026 for the demo user (Tenant 0).
 * Do not invent metrics, ROI, customer names, or zero-fill gaps.
 */
import { AGENTS } from "@/content/agents";

export const DEMO_PROFILE = {
  mode: "demo" as const,
  productTitle: "Marketing Dashboard",
  user: {
    initials: "CM",
    name: "Chris Momchilov",
  },
  period: {
    start: "2026-08-24",
    end: "2026-08-30",
    label: "Aug 24–30 2026",
  },
  filledOn: "2026-08-27",
  sampleLabel: "sample",
};

/** Sidebar order matches the live /app/ chrome. */
export const DEMO_NAV = [
  "Dashboard",
  "Campaigns",
  "Content",
  "Leads",
  "SEO",
  "Social",
  "Reports",
  "Settings",
] as const;

export type DemoNavItem = (typeof DEMO_NAV)[number];

export type DemoKpi = {
  id: "traffic" | "leads" | "conversion" | "meetings" | "content";
  label: string;
  display: string;
  note?: string;
};

/**
 * Exact demo-profile KPIs from /app/ for the week of Aug 24–30 2026.
 * Conversion 2.39% is leads / sessions (6,840 / 286,400).
 */
export const DEMO_KPIS: DemoKpi[] = [
  {
    id: "traffic",
    label: "Website Traffic",
    display: "286,400",
    note: "sessions this week",
  },
  { id: "leads", label: "Leads", display: "6,840" },
  { id: "conversion", label: "Conversion", display: "2.39%" },
  { id: "meetings", label: "Meetings", display: "412" },
  { id: "content", label: "Content", display: "67" },
];

/**
 * Funnel stages from the live /app/ sample. Rates are stage-to-prior as shown
 * on the product (Leads / Visitors, MQLs / Leads, Meetings / MQLs).
 */
export const DEMO_FUNNEL = [
  { stage: "Visitors", value: 286_400, display: "286,400" },
  { stage: "Leads", value: 6_840, display: "6,840", rate: "2.39%" },
  { stage: "MQLs", value: 1_710, display: "1,710", rate: "25.0%" },
  { stage: "Meetings", value: 412, display: "412", rate: "24.1%" },
] as const;

/**
 * Exact Performance Overview paths from /app/index.html for Aug 24–30.
 * Rising then plateauing. Do not invent a different shape or daily totals.
 */
export const DEMO_PERFORMANCE_CHART = {
  trafficPath: "M48 118 C 140 92, 200 104, 232 98 S 320 70, 368 62 S 500 68, 600 48",
  leadsPath: "M48 132 C 140 118, 210 124, 248 110 S 340 78, 400 64 S 520 58, 600 42",
  trafficColor: "#2f6bff",
  leadsColor: "#8fb0ff",
  trafficLabel: "Website Traffic",
  leadsLabel: "Leads Generated",
  leftAxis: ["50K", "25K", "0"] as const,
  rightAxis: ["1.2K", "0.6K", "0"] as const,
  xLabels: ["Aug 24", "25", "26", "27", "28", "29", "30"] as const,
};

/**
 * Channel mix from the live /app/ sample. Sums to 100 — not invented.
 * Session counts are the same week total (286,400) split by those percents.
 */
export const DEMO_CHANNEL_MIX = [
  { channel: "Organic Search", percent: 38, color: "#2f6bff" },
  { channel: "Paid", percent: 24, color: "#5b8cff" },
  { channel: "Social", percent: 16, color: "#8fb0ff" },
  { channel: "Email", percent: 12, color: "#b7c9f0" },
  { channel: "Events", percent: 10, color: "#d4def5" },
] as const;

const TRAFFIC_TOTAL = 286_400;

export const DEMO_CHANNEL_ROWS = DEMO_CHANNEL_MIX.map((row) => {
  const sessions = (TRAFFIC_TOTAL * row.percent) / 100;
  return {
    ...row,
    sessions,
    sessionsDisplay: sessions.toLocaleString("en-CA"),
  };
});

export const DEMO_ORGANIC = DEMO_CHANNEL_ROWS.find((row) => row.channel === "Organic Search")!;
export const DEMO_SOCIAL = DEMO_CHANNEL_ROWS.find((row) => row.channel === "Social")!;
export const DEMO_PAID = DEMO_CHANNEL_ROWS.find((row) => row.channel === "Paid")!;

/**
 * Product agent codes as shown on /app/ (Strategos/T-Head, Seeker/T-Search,
 * Wordsmith/T-Content). Remaining seats use the same T-{discipline} pattern
 * from the locked roster tags — no new role names.
 */
const AGENT_CODES: Record<string, string> = {
  Strategos: "T-Head",
  Seeker: "T-Search",
  Wordsmith: "T-Content",
  Scout: "T-Insight",
  GrowthTrack: "T-Demand",
  Pixel: "T-Design",
  Flow: "T-Site",
  Socialite: "T-Nurture",
  Nexus: "T-Ops",
  Metric: "T-Analytics",
  Guardian: "T-QA",
};

export const DEMO_AGENTS = AGENTS.map((agent) => ({
  name: agent.name,
  code: AGENT_CODES[agent.name],
  role: agent.role,
  tag: agent.tag,
}));

/** Only settings stay gated on the public demo. No real account PII. */
export const DEMO_OMITTED = {
  settings: "Account settings are not part of this public sample.",
} as const;
