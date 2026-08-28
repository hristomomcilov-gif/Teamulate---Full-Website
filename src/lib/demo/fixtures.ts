/**
 * Demo-profile sample from the live /app/ Marketing Dashboard.
 * Filled 27 Aug 2026 for the demo user. Already labelled sample.
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
  sample?: boolean;
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
    sample: true,
  },
  { id: "leads", label: "Leads", display: "6,840" },
  { id: "conversion", label: "Conversion", display: "2.39%" },
  { id: "meetings", label: "Meetings", display: "412" },
  { id: "content", label: "Content", display: "67" },
];

/** Funnel stages that exist in the sample. No extra stages, no zeros. */
export const DEMO_FUNNEL = [
  { stage: "Sessions", value: 286_400, display: "286,400" },
  { stage: "Leads", value: 6_840, display: "6,840" },
  { stage: "Meetings", value: 412, display: "412" },
] as const;

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

/** Views with no sample rows/series stay omitted — never empty-zeroed. */
export const DEMO_OMITTED = {
  channelMix: "Channel mix is not in this sample.",
  campaigns: "No campaigns in this sample window.",
  recommendations: "No recommendations in this sample.",
  dailySeries: "Daily series is not in this sample. Week total only.",
  social: "No social metrics in this sample.",
  seoExtra: "No ranking or Search Console series in this sample.",
  settings: "Account settings are not part of this public sample.",
} as const;
