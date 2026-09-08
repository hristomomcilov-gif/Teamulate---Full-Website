/**
 * /for/msp-managed-it-cyber/ — Gate A, Batch W1 (preview / staging only).
 * Visitor strings below are locked to the V3.1 brief. Conditional language
 * (if / when / may) is intentional. No invented metrics, no address.
 * Wave A 2a is on HOLD: this is the only MSP URL.
 */

export const MSP_HUB_PATH = "/for/msp-managed-it-cyber/";

export const MSP_HUB_SEO_TITLE = "AI Marketing Team for MSPs & Cybersecurity";
export const MSP_HUB_META_DESCRIPTION =
  "Named AI marketing seats for managed IT and cybersecurity firms that already have a stack — and need throughput with human approvals.";
export const MSP_HUB_EYEBROW = "For MSPs · Managed IT · Cyber";
export const MSP_HUB_H1 = "AI marketing team for MSPs, managed IT, and cybersecurity firms";
export const MSP_HUB_DEK =
  "When referrals slow and the bench is thin, you do not need another chatbot — you need named seats you can steer, with approvals that feel like change control.";
export const MSP_HUB_BYLINE = "Chris Momchilov · September 2026";
export const MSP_HUB_PULLQUOTE =
  "MSPs already run tickets, SLAs, and change control. Marketing is interesting when it inherits that control culture — not when it promises “more AI.”";

export const MSP_HUB_PROOF_CARDS = [
  {
    value: "11",
    label: "Named Teamulate seats",
    detail: "Head + specialists + independent assurance",
  },
  {
    value: "90%",
    label: "Public people-cost comparison vs modeled 10-role department",
    detail: "People-cost only; not a guarantee; see research pages",
  },
  {
    value: "Human",
    label: "Strategy, spend, brand, and sensitive claims stay with your team",
    detail: "Approvals are yours; the seats prepare the work",
  },
] as const;

export const MSP_HUB_WALL_SIGNALS = [
  "If referrals have carried the pipeline, a slower quarter may expose that there is no repeatable inbound motion behind them.",
  "If the same engineers who close tickets also write the blog, marketing may stall every time the queue spikes.",
  "When a vCISO, compliance, or co-managed IT offer launches, the service page, the one-pager, and the follow-up sequence may all be waiting on the same person.",
  "If a past agency retainer produced volume without control, your team may now distrust anything that publishes on its own.",
  "When vendor co-marketing funds or partner programs arrive with deadlines, the work may get done late — or not at all.",
] as const;

export type UnfinishedWorkRow = { work: string; why: string; seats: string; yours: string };

export const MSP_HUB_UNFINISHED_WORK: UnfinishedWorkRow[] = [
  {
    work: "Service pages for new offers (vCISO, compliance, co-managed IT)",
    why: "The technical owner is billable; the page waits.",
    seats: "Wordsmith drafts; Flow structures the page; Seeker checks search intent.",
    yours: "The offer, the positioning, and final approval.",
  },
  {
    work: "Case studies and client stories",
    why: "Client permission and technical review take time nobody has.",
    seats: "Wordsmith drafts from approved inputs; Guardian checks the claims.",
    yours: "Client consent and any named-client sign-off.",
  },
  {
    work: "Security and compliance explainers your clients keep asking about",
    why: "Accuracy risk if written by someone outside the practice.",
    seats: "Scout researches; Wordsmith drafts; Guardian flags sensitive claims.",
    yours: "Technical accuracy and approval of any sensitive claim.",
  },
  {
    work: "Lifecycle email to existing clients (renewals, QBR follow-ups, security-tier upgrades)",
    why: "No owner once onboarding is over.",
    seats: "Socialite drafts the sequences; Nexus wires the CRM segments.",
    yours: "Audience, offer, and send approval.",
  },
  {
    work: "Partner and vendor co-marketing",
    why: "Funds arrive with deadlines and no assigned owner.",
    seats: "GrowthTrack plans; Pixel produces the assets; Wordsmith writes.",
    yours: "Budget and anything partner-facing.",
  },
  {
    work: "Website conversion fixes you already know about",
    why: "Known issues, no time.",
    seats: "Flow proposes and previews; Pixel designs; Metric measures.",
    yours: "Production publishing, per your policy.",
  },
  {
    work: "A straight answer to “what did marketing actually produce?”",
    why: "The data lives in several tools.",
    seats: "Metric assembles the readout; Nexus keeps the CRM dependable.",
    yours: "Which KPIs count.",
  },
];

/** MSP-specific reading of each seat, keyed by roster slug. Names, roles and approval lines come from the live roster. */
export const MSP_HUB_SEAT_MAP: Record<string, string> = {
  strategos:
    "Turns a goal such as “more inbound from one vertical” or “upgrade existing clients to a security tier” into a prioritized plan, then delegates it.",
  scout: "Researches the verticals you serve, competing MSPs, and the questions buyers ask about managed security.",
  wordsmith: "Drafts service pages, articles, newsletters, and social posts in your voice, from approved inputs.",
  seeker: "Maps what your buyers search for — in Google and in AI answers — and works it into the content plan.",
  growthtrack: "Plans and paces demand programs, including partner co-marketing, inside approved budgets and audiences.",
  pixel: "Produces one-pagers, diagrams, and ad variants on your brand system.",
  flow: "Builds and previews landing pages and conversion fixes on staging before anything goes live.",
  socialite: "Drafts onboarding, renewal, and upgrade sequences for existing clients, with consent respected.",
  nexus: "Keeps CRM fields, routing, and tracking dependable so reports mean something.",
  metric: "Independently validates what happened, with confidence and limitations stated.",
  guardian: "Independently checks brand, claims, facts, and policy before anything ships — and can block a release.",
};

/** Fit is defined by stack, a named approver and multi-workstream demand — never by size, headcount or agency minimums. */
export const MSP_HUB_FIT = [
  "You already have a stack — a website, a CRM, email, and the systems your clients live in — that the seats can work inside.",
  "You can name one approver who owns marketing approvals the way a change manager owns change control.",
  "More than one marketing workstream is waiting — for example content plus lifecycle email plus web fixes — not a single one-off project.",
] as const;

export const MSP_HUB_NOT_FIT = [
  "You do not yet have a stack for the seats to work inside.",
  "Nobody can be named as the approver, or you want work to publish without a human gate.",
  "You have one isolated project in mind rather than ongoing, multi-workstream throughput.",
  "You need guaranteed leads, pipeline, or revenue. Teamulate does not guarantee results.",
] as const;

export const MSP_HUB_DECISION_MODELS = [
  {
    title: "Hire in-house",
    body: "Deep ownership and context. If the role is one person, capacity is one person, and coverage across content, web, lifecycle, and analytics may be thin.",
  },
  {
    title: "Agency retainer",
    body: "Breadth and production capacity. If control mattered last time, ask how approvals, audit, and rollback actually worked.",
  },
  {
    title: "Fractional marketing leader",
    body: "Senior judgment on a part-time basis. Execution still has to come from somewhere, and that somewhere is usually your bench.",
  },
  {
    title: "Managed AI department (Teamulate)",
    body: "Eleven named seats that draft, check, and queue work for your approval inside your own environment. Strategy, spend, brand, and sensitive claims stay human.",
  },
] as const;

/** Teamulate live marketing pages only (every href is a SITEMAP_ROUTES entry). */
export const MSP_HUB_SOURCES = [
  { label: "The 11-Agent Team", href: "/team/" },
  { label: "How it works", href: "/how-it-works/" },
  { label: "Security & Governance (P0–P4 approvals)", href: "/security-governance/" },
  { label: "Marketing team cost 2026 (research)", href: "/research/marketing-team-cost-2026/" },
  { label: "Pricing (CAD)", href: "/pricing/" },
  { label: "AI department vs agency vs fractional vs in-house", href: "/compare/ai-vs-agency-vs-fractional-vs-inhouse/" },
  { label: "Workflow library", href: "/workflows/" },
  { label: "11 Human Hires vs. 11 AI Specialists", href: "/blog/11-human-hires-vs-11-ai-specialists/" },
] as const;

export const MSP_HUB_TAKEAWAYS = [
  "If referrals slow and the bench is thin, the marketing that stalls is usually the unfinished work — service pages, case studies, lifecycle email, partner assets — not the strategy.",
  "Teamulate is eleven named seats you can steer, not an unnamed pile of agents: a Head, eight execution specialists, and two independent assurance seats.",
  "Approvals work like change control: action-bound, expiring, and logged. Strategy, spend, brand, and sensitive claims stay with your team.",
  "Fit is about your stack, a named approver, and more than one workstream waiting.",
  "The public 90% figure is a people-cost comparison against a modeled 10-role department. It is not a guarantee of results.",
] as const;

/** Soft CTAs only. Request a demo is primary; the three secondaries are the only other calls to action. */
export const MSP_HUB_CTAS = {
  primary: { label: "Request a demo", href: "/request-demo/", ctaId: "msp-hub-request-demo" },
  secondary: [
    { label: "How it works", href: "/how-it-works/", ctaId: "msp-hub-how-it-works" },
    { label: "Pricing", href: "/pricing/", ctaId: "msp-hub-pricing" },
    { label: "Contact", href: "/contact/", ctaId: "msp-hub-contact" },
  ],
} as const;
