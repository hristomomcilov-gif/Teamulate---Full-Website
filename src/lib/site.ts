/**
 * Central site configuration. Canonical URLs are generated here only
 * (spec §6.1). Domain assumption A1 is documented in
 * docs/KNOWN_GAPS_AND_ASSUMPTIONS.md.
 */
export const CONTACT_EMAIL = "contact@teamulate.ca";

export const SITE = {
  name: "Teamulate",
  domain: "https://teamulate.ca",
  category: "Autonomous marketing department for growing B2B companies.",
  description:
    "Teamulate builds and operates a dedicated autonomous marketing department inside the tools your B2B company already uses - with visible workflows, approvals and performance in one dashboard.",
} as const;

export function absoluteUrl(path: string): string {
  const normalized = path.endsWith("/") || path.includes(".") ? path : `${path}/`;
  return `${SITE.domain}${normalized}`;
}

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; items: NavItem[] };

/**
 * Header nav locked by Chris/Skipper (27 Aug): lean top bar only.
 * The six SEO pages live in the footer "Guides" column, never the header.
 */
export const HEADER_NAV: NavGroup[] = [
  { label: "How it works", items: [{ label: "How it works", href: "/how-it-works/" }] },
  { label: "Team", items: [{ label: "Team", href: "/team/" }] },
  { label: "Pricing", items: [{ label: "Pricing", href: "/pricing/" }] },
  { label: "Demo", items: [{ label: "Demo", href: "/demo/dashboard/" }] },
];

export const FOOTER_GROUPS: NavGroup[] = [
  {
    label: "Product",
    items: [
      { label: "How It Works", href: "/how-it-works/" },
      { label: "The 11-Agent Team", href: "/team/" },
      { label: "Dashboard", href: "/dashboard/" },
      { label: "Interactive Demo", href: "/demo/dashboard/" },
    ],
  },
  {
    // The Guides column is the SEO door (locked order and English labels, 27 Aug).
    label: "Guides",
    items: [
      { label: "Autonomous Marketing Department", href: "/autonomous-ai-marketing-department/" },
      { label: "What is an AI marketing team?", href: "/ai-marketing-team/" },
      { label: "Workflow library", href: "/workflows/" },
      { label: "AI vs marketing automation", href: "/ai-marketing-automation/" },
      { label: "Marketing team cost 2026", href: "/research/marketing-team-cost-2026/" },
      { label: "Compare your options", href: "/compare/ai-vs-agency-vs-fractional-vs-inhouse/" },
    ],
  },
  {
    label: "Plans",
    items: [
      { label: "Pricing", href: "/pricing/" },
      { label: "Security & Governance", href: "/security-governance/" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "Contact", href: "/contact/" },
      { label: "Request a demonstration", href: "/request-demo/" },
      { label: "Client login", href: "/login/" },
    ],
  },
  {
    label: "Legal",
    items: [
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
    ],
  },
];

/** Routes included in the XML sitemap. Preview, demo, app, admin, api and login are excluded. */
export const SITEMAP_ROUTES = [
  "/",
  "/autonomous-ai-marketing-department/",
  "/ai-marketing-team/",
  "/ai-marketing-automation/",
  "/workflows/",
  "/research/marketing-team-cost-2026/",
  "/compare/ai-vs-agency-vs-fractional-vs-inhouse/",
  "/how-it-works/",
  "/team/",
  "/dashboard/",
  "/pricing/",
  "/security-governance/",
  "/contact/",
  "/request-demo/",
  "/privacy/",
  "/terms/",
] as const;

/** Locked entity line (27 Aug) - rendered verbatim on every page via the footer. */
export const ENTITY_LINE =
  "Teamulate is an autonomous AI marketing department for B2B companies. The department runs the work. Strategos is Head of Marketing. Chris Momchilov is the founder above Teamulate.";
