import { AGENTS, type AgentProfile } from "@/content/agents";
import { COPY } from "@/content/copy";

/**
 * Visitor copy for the /preview/site-message-v1/ homepage draft (Site Message &
 * Experience Audit deltas, 8 Sep 2026). PREVIEW ONLY - src/app/page.tsx (the
 * live homepage) never imports this file.
 *
 * Only the audit deltas live here; everything else on the preview page reuses
 * the shipped homepage patterns and locked strings verbatim:
 *  1. Problem-first hero (buyer pain first, the department as the answer)
 *  2. Buyer-problem chooser
 *  3. Human control in two layers (named human decision owner + independent assurance)
 *  4. Three outcome systems instead of the eleven-card roster
 *  5. Build Log panel (Tenant 0 evidence - only things that are live, each with a link)
 *  6. One standardized CTA set (same label always goes to the same place)
 *  P1 (coherent with the above): tenure stated as exactly 12 years, "Who runs it"
 *     links to the live /about-chris/, problem-first meta description.
 *
 * Locks honoured: Strategos prepares / Chris approves; autonomy is always bounded;
 * 90% people-cost only (modeled, not a guarantee); no invented metrics; no city or
 * address.
 * Guardrails: src/tests/site-message-v1.test.ts.
 */

export const SMV1_PATH = "/preview/site-message-v1/";

/** One CTA set for the whole page. A label never points at two destinations. */
export const SMV1_CTA = {
  primary: { label: "Book a demo", href: "/request-demo/" },
  secondary: { label: "See the team in action", href: "/team/" },
  demo: { label: "Try the demo dashboard", href: "/demo/dashboard/" },
} as const;

export const SMV1_META = {
  title: "Teamulate - site message v1 (preview draft)",
  description:
    "Too much marketing to do and too few people to do it? Teamulate is a complete AI marketing department - 11 specialist agents, one dashboard, a human approving the decisions that matter.",
} as const;

export const SMV1_RIBBON = {
  label: "Preview draft",
  text: "site message v1 - problem-first homepage for review. noindex, not linked from navigation, not the live homepage.",
  liveLabel: "Open the live homepage",
  liveHref: "/",
} as const;

/* 1. Problem-first hero ------------------------------------------------------ */

export const SMV1_HERO = {
  eyebrow: "For B2B teams with more marketing than people",
  headline: "Too much marketing to do. Too few people to do it.",
  dek: "Teamulate is a complete AI marketing department: 11 specialist agents under one strategy, working from one dashboard, with a human approving the decisions that matter.",
  proofChips: ["11 Agents", "1 Dashboard", "24/7"],
  tenant0: "Teamulate is building and marketing Teamulate with the same AI-operated system it offers to clients.",
} as const;

/* 2. Buyer-problem chooser -------------------------------------------------- */

export type BuyerProblem = {
  id: string;
  /** The pain, in the buyer's words. */
  pain: string;
  /** What the department does about it - capacity and visibility, never a result promise. */
  answer: string;
  /** On-page anchor of the section that takes this problem on. */
  anchor: `#${string}`;
  /** Deeper live page. */
  link: { label: string; href: string };
};

export const SMV1_CHOOSER = {
  eyebrow: "Start with your problem",
  title: "Which of these sounds like you?",
  lede: "Pick the one that hurts most. Each answer points to the part of the department that takes it on, and to the live page that shows how.",
} as const;

export const SMV1_PROBLEMS: BuyerProblem[] = [
  {
    id: "no-hands",
    pain: "We have a plan. Nobody has the hands to execute it.",
    answer:
      "Recurring work - research, campaigns, landing pages, sequences, reporting - runs as scheduled workflows inside your approved stack. You choose which ones; the department keeps them moving.",
    anchor: "#outcome-demand",
    link: { label: "Workflow library", href: "/workflows/" },
  },
  {
    id: "stalled-search",
    pain: "Content and search stalled months ago.",
    answer:
      "Wordsmith, Seeker and Pixel plan, write, optimize and design on a cadence - for Google and for AI answer engines - and Guardian checks every claim before anything ships.",
    anchor: "#outcome-visibility",
    link: { label: "What is an AI marketing team?", href: "/ai-marketing-team/" },
  },
  {
    id: "no-owner",
    pain: "We tried AI tools. Nobody owns the outcome.",
    answer:
      "Strategos prepares the strategy and coordinates the seats. Chris approves it and stays the named decision owner. A tool does not own outcomes; a department with a head does.",
    anchor: "#control",
    link: { label: "How it works", href: "/how-it-works/" },
  },
  {
    id: "cost-and-visibility",
    pain: "We can't afford a full team, and we can't see what agency hours buy.",
    answer:
      "One flat retainer instead of a stack of salaries - modeled at up to 90% lower people-cost than building the department - and one dashboard that shows what ran, what is waiting for approval and what your tools recorded.",
    anchor: "#glance",
    link: { label: "Marketing team cost 2026", href: "/research/marketing-team-cost-2026/" },
  },
];

/* 3. Human control, two layers --------------------------------------------- */

export const SMV1_CONTROL = {
  eyebrow: "Who is in control",
  /** Approved control message (spec §56). */
  title: COPY.controlMessage,
  lede: "Two layers sit above the execution seats. Neither is optional, and neither is an agent pretending to be a person.",
  layers: [
    {
      n: "Layer 1",
      title: "A named human decision owner",
      body:
        "Strategos prepares the strategy. Chris approves it and monitors the work. New strategy, goal changes, material spend, sensitive claims and anything irreversible wait for a human decision (P3-P4). Routine, reversible work runs inside approved thresholds (P0-P2).",
      listTitle: "Always waits for a human",
    },
    {
      n: "Layer 2",
      title: "Independent assurance inside the department",
      body:
        "Metric and Guardian do not report to any execution seat. Guardian passes, revises or blocks work before it ships and validates every claim. Metric validates the dashboard against what your tools actually recorded. Empty is allowed; invented lift is not.",
      listTitle: "Checked before release",
    },
  ],
  link: { label: "The P0-P4 approval model", href: "/security-governance/" },
  founderEyebrow: "The human above the agents",
} as const;

/**
 * Examples of P3/P4 gates, quoted from the roster's approvalRequiredActions so
 * the page can never promise a gate the roster does not define.
 */
export const SMV1_HUMAN_GATES = [
  "New strategy",
  "Goal changes",
  "Material budget shifts",
  "Campaign launches",
  "External publishing outside approved policy",
  "Sensitive imagery",
] as const;

/** Guardian + Metric outputs, quoted from the roster's typicalOutputs. */
export const SMV1_ASSURANCE_CHECKS = [
  "Pass/revise/block",
  "Claim validation",
  "Preflight",
  "Validated dashboard",
  "Attribution",
] as const;

/* 4. Three outcome systems -------------------------------------------------- */

export type OutcomeSystem = {
  id: "demand" | "visibility" | "control";
  name: string;
  /** The buyer problem this system exists for. */
  problem: string;
  /** Roster slugs staffed on this system. Every agent appears in exactly one system. */
  seats: string[];
  /** What the system produces - outputs, not guaranteed results. */
  produces: string[];
  /** What the client sees in the dashboard. */
  youSee: string;
  accent: string;
};

export const SMV1_OUTCOMES = {
  eyebrow: "What the department runs",
  title: "Three systems. One department.",
  lede: "Eleven agents are organized into three outcome systems, so you buy capacity against a problem - not a roster to manage.",
  rosterLead: "Behind the three systems:",
  rosterLink: { label: "Meet the full team", href: "/team/" },
} as const;

export const SMV1_SYSTEMS: OutcomeSystem[] = [
  {
    id: "demand",
    name: "Demand & pipeline",
    problem: "Not enough qualified conversations.",
    seats: ["scout", "growthtrack", "flow", "socialite"],
    produces: [
      "Research briefs, ICP and positioning",
      "Campaign plans and paid pacing inside budget policy",
      "Landing pages and forms",
      "Nurture and lifecycle sequences",
    ],
    youSee: "Campaigns, spend against policy, leads and pipeline as your CRM records them.",
    accent: "bg-brand",
  },
  {
    id: "visibility",
    name: "Content & search visibility",
    problem: "Nobody finds you - in Google or in AI answers.",
    seats: ["wordsmith", "seeker", "pixel"],
    produces: [
      "Editorial plan, articles, newsletters and social posts",
      "SEO/GEO opportunity map and issue queue",
      "Design packages, image and video variants",
    ],
    youSee: "What published, what ranks and what AI answers cite - from your search tools, not estimates.",
    accent: "bg-brand-blue",
  },
  {
    id: "control",
    name: "Measurement & control",
    problem: "You can't tell what marketing did, or trust the numbers.",
    seats: ["strategos", "nexus", "metric", "guardian"],
    produces: [
      "Prioritized plan and decision packets",
      "CRM schema, scoring and routing hygiene",
      "Validated dashboard and attribution readouts",
      "Pass / revise / block on every release",
    ],
    youSee: "Goals, approvals waiting, QA results and measured outcomes in one place.",
    accent: "bg-positive",
  },
];

export function seatsFor(system: OutcomeSystem): AgentProfile[] {
  return system.seats.map((slug) => {
    const agent = AGENTS.find((a) => a.slug === slug);
    if (!agent) throw new Error(`Unknown agent slug in outcome system ${system.id}: ${slug}`);
    return agent;
  });
}

/* 5. Build Log --------------------------------------------------------------- */

export type BuildLogStatus = "live" | "in review";

export type BuildLogEntry = {
  /** ISO date the item went live (or was submitted for review). */
  date: string;
  status: BuildLogStatus;
  title: string;
  detail: string;
  /** Live page that proves the entry. Omitted only for items still in review. */
  href?: string;
};

export const SMV1_BUILD_LOG = {
  eyebrow: "Build log",
  title: "What we have actually shipped",
  lede: `${COPY.tenant0Message} This log lists what is live on teamulate.ca, with a link to each item. It is evidence of the operating system working on our own marketing - not a customer result.`,
  footnote: "Dates are when the item went live on teamulate.ca. Items marked in review are not live and may change.",
} as const;

export const SMV1_BUILD_LOG_ENTRIES: BuildLogEntry[] = [
  {
    date: "2026-09-08",
    status: "live",
    title: "MSP, managed IT and cyber hub",
    detail: "A vertical page for MSPs and cybersecurity providers: seat map, approval boundaries and fit criteria.",
    href: "/for/msp-managed-it-cyber/",
  },
  {
    date: "2026-09-08",
    status: "live",
    title: "About Chris",
    detail: "Founder page: 12 years in B2B marketing and the systems behind Teamulate. About now sits in the header.",
    href: "/about-chris/",
  },
  {
    date: "2026-09-02",
    status: "live",
    title: "Organization identity",
    detail: "Sitemap fix, Organization JSON-LD with disambiguation, and six social profiles in the footer.",
    href: "/",
  },
  {
    date: "2026-09-01",
    status: "live",
    title: "Research: Who AI Search Cites in 2026",
    detail: "Sources cited in Google AI Overviews for ordinary marketing questions on 1 September 2026.",
    href: "/blog/who-ai-search-cites-2026/",
  },
  {
    date: "2026-09-01",
    status: "live",
    title: "Blog: 11 human hires vs 11 AI specialists",
    detail: "The August 2026 cost report and its article. Public savings copy locked at 90%.",
    href: "/blog/11-human-hires-vs-11-ai-specialists/",
  },
  {
    date: "2026-08-30",
    status: "live",
    title: "Interactive demo on the real dashboard",
    detail: "The demo walkthrough runs on the same Marketing Dashboard chrome as the client app, with sample data labelled as such.",
    href: "/demo/dashboard/",
  },
  {
    date: "2026-08-27",
    status: "live",
    title: "Public site and six guide pages",
    detail: "Homepage, how it works, team, pricing, security & governance, and the six guides - from the autonomous marketing department to the 2026 cost research.",
    href: "/autonomous-ai-marketing-department/",
  },
  {
    date: "2026-09-08",
    status: "in review",
    title: "Department chart redesign for the Team page",
    detail: "Glassmorphism organization chart for /team/, in preview for Chris's review.",
  },
  {
    date: "2026-09-08",
    status: "in review",
    title: "Site message v1 (this page)",
    detail: "Problem-first homepage draft from the Site Message & Experience Audit.",
  },
];

/* Kept from the live homepage (verbatim strings) ----------------------------- */

export const SMV1_GLANCE = {
  eyebrow: "The contrast",
  title: "The system at a glance",
  headline: "Up to 90%",
  headlineCaption: "Lower people-cost than building the department",
  stats: [
    { value: "11", label: "AI specialists" },
    { value: "24/7", label: "Operations" },
    { value: "60", label: "Eligible library workflows" },
    { value: "231", label: "Marketing functions mapped" },
  ],
  /** Chris lock (2026-09-08): exactly 12 years, no plus sign. */
  tenure: { value: "12 years", label: "Marketing experience behind the system" },
} as const;

export const SMV1_RESOURCES = {
  eyebrow: "Resources",
  title: "What we can actually show",
  lede: "No invented articles. Three honest doors - not a magazine of fake proof.",
  whoRunsIt: { label: "Who runs it", link: { label: "About Chris", href: "/about-chris/" } },
} as const;

/** Problem-first ordering of the live FAQ; answers are verbatim from the live homepage. */
export const SMV1_FAQ = [
  {
    question: "Is the system fully autonomous?",
    answer:
      "No, and by design. Routine, reversible work moves automatically inside approved guardrails. Strategy, material spend, sensitive claims and irreversible actions always require a named human decision owner.",
  },
  {
    question: "Does Teamulate guarantee pipeline or revenue?",
    answer:
      "No. Teamulate provides measurable operating capacity and full visibility into the work and its results. Outcomes depend on your market, offer and inputs, and we report them with attribution models and limitations stated.",
  },
  {
    question: "Do we need to replace our current tools?",
    answer:
      "No. Teamulate is configured around a defined, client-approved stack - your CRM, website, analytics, advertising, email and social tools. Exact integrations and permissions are confirmed during onboarding.",
  },
  {
    question: "Who owns the accounts, data and assets?",
    answer:
      "You do. Every client deployment is a separate environment: your marketing accounts, your subscriptions, your data and every asset produced stay yours. The GrokBot agent system that runs the department is included in your subscription and operated by Teamulate, with scoped, revocable access to your tools.",
  },
  {
    question: "Can approval rules be customized?",
    answer:
      "Yes. The P0-P4 approval matrix is configured per client: named approvers, budget thresholds, publishing rights, sensitive claim categories and expiring, action-specific approvals.",
  },
  {
    question: "What happens if we need more than the plan allows?",
    answer:
      "Nothing changes silently. The dashboard shows workflow and integration usage against your plan; when you approach a limit you can reprioritize or request a scope change. There are no surprise overage charges.",
  },
];

export const SMV1_FINAL = {
  /** Approved headline (spec §56). */
  title: COPY.hero.headline,
  body: "The next step is a focused review of your goals, current stack and the recurring work you want to move forward.",
} as const;
