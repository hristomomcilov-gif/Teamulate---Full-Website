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

/** Canonical site root with trailing slash (schema.org Organization.url). */
export const SITE_URL = `${SITE.domain}/`;

/**
 * One-line Organization description matching the live homepage.
 * AI marketing team / department — not “fully autonomous”. No invented location.
 */
export const ORGANIZATION_DESCRIPTION =
  "Teamulate is an AI marketing team and department — a complete marketing department built around your business, working continuously from one dashboard.";

/** Live T lockup already used as the Apple / profile icon. Do not invent a new logo. */
export const ORGANIZATION_LOGO_URL = `${SITE.domain}/apple-icon.png`;

/**
 * Sitewide Organization JSON-LD. Merge into the existing @graph; do not add a
 * second Organization. No PostalAddress / Barrie / Ontario / Canada. No sameAs
 * until a real official profile is linked from the live site.
 */
export const ORGANIZATION_JSON_LD = {
  "@type": ["Organization", "Brand"],
  "@id": `${SITE_URL}#organization`,
  name: "Teamulate",
  legalName: "Teamulate",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: ORGANIZATION_LOGO_URL,
  },
  description: ORGANIZATION_DESCRIPTION,
} as const;

/** 1200×630 share graphic. Public marketing routes must point at this exact URL. */
export const MARKETING_SHARE_IMAGE_URL = `${SITE.domain}/assets/og/teamulate-og.png`;

export const MARKETING_SHARE_IMAGE = {
  url: MARKETING_SHARE_IMAGE_URL,
  secureUrl: MARKETING_SHARE_IMAGE_URL,
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

/**
 * Open Graph + Twitter tags for public marketing routes.
 * Do not spread onto /app/, login, dashboard, or shop paths.
 */
export const marketingShareMetadata = {
  openGraph: {
    siteName: SITE.name,
    type: "website" as const,
    images: [MARKETING_SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image" as const,
    images: [MARKETING_SHARE_IMAGE_URL],
  },
};

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
  { label: "Blog", items: [{ label: "Blog", href: "/blog/" }] },
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
      { label: "Blog", href: "/blog/" },
      { label: "Contact", href: "/contact/" },
      { label: "Request a demonstration", href: "/request-demo/" },
      { label: "Client login", href: "/app/" },
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

/**
 * Routes included in the XML sitemap. lastmod is omitted: we do not have
 * trustworthy per-URL modification dates (build-time `new Date()` is not real).
 * Preview, demo, app, auth, admin, api, login, shop, stg are excluded.
 */
export const SITEMAP_ROUTES = [
  "/",
  "/autonomous-ai-marketing-department/",
  "/ai-marketing-team/",
  "/ai-marketing-automation/",
  "/workflows/",
  "/research/marketing-team-cost-2026/",
  "/compare/ai-vs-agency-vs-fractional-vs-inhouse/",
  "/blog/",
  "/blog/11-human-hires-vs-11-ai-specialists/",
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
