/**
 * Commercial source of truth: Teamulate Workflow Entitlement Matrix v1.0,
 * effective 27 Aug 2026. Plans sell operating capacity (simultaneously
 * active recurring workflows), not a frozen named set.
 *
 * Canonical W01-W60: no extras, no drops. 25 Core + 22 Growth + 13 Scale.
 * The catalog "Core" column in older research PDFs is NOT the commercial
 * Core package - commercial_min_plan is what this file encodes.
 */

export type PlanKey = "core" | "growth" | "scale";
export type WorkflowMode = "standard" | "scoped" | "conditional";

export type CatalogWorkflow = {
  id: string;
  name: string;
  owner: string;
  minPlan: PlanKey;
  mode: WorkflowMode;
};

const W = (id: string, name: string, owner: string, minPlan: PlanKey, mode: WorkflowMode = "standard"): CatalogWorkflow => ({
  id,
  name,
  owner,
  minPlan,
  mode,
});

/** CORE LIBRARY - 25 eligible, activate up to 8. */
export const CORE_LIBRARY: CatalogWorkflow[] = [
  W("W01", "Campaign intake & priority triage", "Strategos", "core"),
  W("W04", "Competitor change monitoring", "Scout", "core"),
  W("W05", "Competitive messaging / pricing intelligence", "Scout", "core"),
  W("W06", "Sales-call & support-ticket mining", "Scout", "core", "scoped"),
  W("W07", "Win/loss/churn learning loop", "Scout", "core", "scoped"),
  W("W08", "Brand/message integrity & approved-claims loop", "Guardian", "core"),
  W("W10", "Editorial opportunity backlog", "Wordsmith", "core"),
  W("W11", "Content asset production", "Wordsmith", "core"),
  W("W12", "Content repurposing factory", "Wordsmith", "core"),
  W("W13", "Content refresh / decay program", "Wordsmith", "core"),
  W("W14", "Keyword & intent research", "Seeker", "core"),
  W("W15", "Technical SEO monitoring & remediation", "Seeker", "core", "scoped"),
  W("W16", "On-page + internal-link optimization", "Seeker", "core"),
  W("W17", "AI-search visibility & citation monitoring", "Seeker", "core"),
  W("W18", "Prompt/question research + answer-ready optimization", "Seeker", "core"),
  W("W19", "Social calendar & post production", "Wordsmith", "core"),
  W("W20", "Social publishing & queue management", "Wordsmith", "core"),
  W("W21", "Social listening, comments & DM triage", "Wordsmith", "core", "scoped"),
  W("W24", "Newsletter production & optimization", "Socialite", "core"),
  W("W27", "Deliverability & list hygiene", "Nexus", "core"),
  W("W31", "Website / form / tracking health monitoring", "Flow", "core"),
  W("W35", "KPI anomaly triage", "Metric", "core"),
  W("W37", "Weekly performance summary + next actions", "Metric", "core"),
  W("W39", "Integration / workflow health monitoring", "Nexus", "core", "scoped"),
  W("W41", "Taxonomy / UTM / campaign-ID enforcement", "Nexus", "core"),
];

/** GROWTH EXTENSION - +22 (47 eligible), activate up to 20. */
export const GROWTH_EXTENSION: CatalogWorkflow[] = [
  W("W02", "Integrated monthly campaign planning", "Strategos", "growth"),
  W("W03", "Budget pacing & allocation control", "Strategos", "growth"),
  W("W09", "Product/offer launch readiness & sales enablement", "Scout", "growth", "scoped"),
  W("W25", "Lead nurture journey", "Socialite", "growth"),
  W("W26", "Behavior-triggered messaging", "Socialite", "growth"),
  W("W28", "Paid campaign build & trafficking", "GrowthTrack", "growth"),
  W("W29", "Paid pacing & guardrailed optimization", "GrowthTrack", "growth"),
  W("W30", "Paid creative / targeting experiment", "GrowthTrack", "growth", "scoped"),
  W("W32", "Landing page / CMS release workflow", "Flow", "growth"),
  W("W33", "CRO opportunity backlog", "Flow", "growth"),
  W("W34", "Experiment setup → QA → readout → rollout", "Flow", "growth"),
  W("W36", "Attribution & pipeline reconciliation", "Metric", "growth"),
  W("W38", "Monthly performance / quarterly business review", "Metric", "growth"),
  W("W40", "Workflow automation build / change management", "Nexus", "growth", "scoped"),
  W("W42", "CRM hygiene, dedupe & enrichment", "Nexus", "growth"),
  W("W43", "Lifecycle stage + lead/account scoring", "Nexus", "growth"),
  W("W44", "Ownership, routing & SLA workflow", "Nexus", "growth"),
  W("W45", "Consent, suppression & preference enforcement", "Nexus", "growth"),
  W("W46", "Target-account list + enrichment", "GrowthTrack", "growth"),
  W("W47", "Personalized prospect research + outbound sequence", "GrowthTrack", "growth", "scoped"),
  W("W48", "Inbound lead qualification → nurture / sales handoff", "Nexus", "growth"),
  W("W55", "Creative asset variant factory", "Pixel", "growth"),
];

/** SCALE EXTENSION - +13 (60 eligible), activate up to 35. */
export const SCALE_EXTENSION: CatalogWorkflow[] = [
  W("W22", "Community moderation & advocate identification", "Wordsmith", "scale", "conditional"),
  W("W23", "Creator discovery, brief & disclosure control", "Wordsmith", "scale", "conditional"),
  W("W49", "Customer onboarding / adoption communications", "Socialite", "scale"),
  W("W50", "Renewal / retention risk workflow", "Socialite", "scale"),
  W("W51", "Cross-sell / upsell opportunity workflow", "Socialite", "scale"),
  W("W52", "Testimonial / review / referral / advocacy pipeline", "Socialite", "scale"),
  W("W53", "Event/webinar promotion → attendance → follow-up", "Socialite", "scale", "conditional"),
  W("W54", "Reputation monitoring & crisis triage", "Guardian", "scale", "conditional"),
  W("W56", "Video repurposing / short-form distribution", "Pixel", "scale", "conditional"),
  W("W57", "Partner/referral lead workflow", "GrowthTrack", "scale", "conditional"),
  W("W58", "Localization adaptation & QA", "Wordsmith", "scale", "conditional"),
  W("W59", "Vendor/license utilization & renewal workflow", "Nexus", "scale", "scoped"),
  W("W60", "Commerce feed / merchandising / promo monitoring", "Optional Commerce Module", "scale", "conditional"),
];

export const WORKFLOW_CATALOG: CatalogWorkflow[] = [...CORE_LIBRARY, ...GROWTH_EXTENSION, ...SCALE_EXTENSION];

/** Typical first 8 for Core - swappable inside the Core library. */
export const COMMON_CORE_STARTER_IDS = ["W04", "W11", "W16", "W17", "W20", "W27", "W31", "W37"] as const;

export const COMMON_CORE_STARTER: CatalogWorkflow[] = COMMON_CORE_STARTER_IDS.map(
  (id) => CORE_LIBRARY.find((w) => w.id === id)!,
);

/** Plan entitlement summary per the matrix. */
export const PLAN_ENTITLEMENTS = [
  {
    key: "core" as PlanKey,
    name: "Core",
    monthly: "C$5,000/mo",
    setup: "C$7,500 setup",
    activeCap: 8,
    eligible: 25,
    idea: "The owned-channel engine: research, content, SEO/GEO, social, email, monitoring and reporting.",
    unlocks: "Activate up to 8 from the 25-workflow Core library. Paid media is not a Core capability.",
  },
  {
    key: "growth" as PlanKey,
    name: "Growth",
    monthly: "C$7,500/mo",
    setup: "C$12,500 setup",
    activeCap: 20,
    eligible: 47,
    recommended: true,
    idea: "The connected demand engine: everything in Core plus CRM, lifecycle, lead gen, paid media within ~$25K/mo, landing pages, one CRO experiment and attribution.",
    unlocks: "Activate up to 20 from 47 eligible workflows (Core 25 + Growth 22).",
  },
  {
    key: "scale" as PlanKey,
    name: "Scale",
    monthly: "From C$12,000/mo",
    setup: "C$20,000 setup",
    activeCap: 35,
    eligible: 60,
    idea: "Customer lifecycle plus advanced and conditional modules on top of the full demand engine.",
    unlocks: "Activate up to 35 from all 60 eligible workflows (Core 25 + Growth 22 + Scale 13).",
  },
];

/**
 * Operating titles from inside a single workflow run (kept as illustration
 * only - these are NOT the commercial catalog and not the product number).
 */
export const RUN_OPERATING_TITLES = [
  { title: "Audience brief", seat: "Scout" },
  { title: "Topic pass", seat: "Seeker" },
  { title: "Site page draft", seat: "Wordsmith" },
  { title: "Brand check", seat: "Guardian" },
  { title: "Publish checklist", seat: "Flow" },
  { title: "Tool report", seat: "Metric" },
  { title: "Next-pass note", seat: "Metric" },
];
