/**
 * Central site configuration. Canonical URLs are generated here only
 * (spec §6.1). Domain assumption A1 is documented in
 * docs/KNOWN_GAPS_AND_ASSUMPTIONS.md.
 */
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
 * Only routes with final approved content appear in navigation
 * (phased routing rule, spec §6.2). Deferred routes are tracked in
 * docs/ROUTE_INVENTORY.md and are intentionally absent here.
 */
export const HEADER_NAV: NavGroup[] = [
  {
    label: "Product",
    items: [
      {
        label: "Autonomous Marketing Department",
        href: "/autonomous-ai-marketing-department/",
        description: "What the product is and what you receive",
      },
      { label: "How It Works", href: "/how-it-works/", description: "The end-to-end operating model" },
      { label: "The 11-Agent Team", href: "/team/", description: "One head, eight specialists, two assurance agents" },
      { label: "Dashboard", href: "/dashboard/", description: "Proof and control in one place" },
      { label: "Security & Governance", href: "/security-governance/", description: "Approvals, permissions and audit" },
    ],
  },
  {
    label: "Pricing",
    items: [{ label: "Plans & scope", href: "/pricing/", description: "Core, Growth and Scale" }],
  },
  {
    label: "Company",
    items: [{ label: "Contact", href: "/contact/", description: "Talk to Teamulate" }],
  },
];

export const FOOTER_GROUPS: NavGroup[] = [
  {
    label: "Product",
    items: [
      { label: "Autonomous Marketing Department", href: "/autonomous-ai-marketing-department/" },
      { label: "How It Works", href: "/how-it-works/" },
      { label: "The 11-Agent Team", href: "/team/" },
      { label: "Dashboard", href: "/dashboard/" },
      { label: "Interactive Demo", href: "/demo/dashboard/" },
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

/** Routes included in the XML sitemap. Demo, app, admin and api are excluded. */
export const SITEMAP_ROUTES = [
  "/",
  "/autonomous-ai-marketing-department/",
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
