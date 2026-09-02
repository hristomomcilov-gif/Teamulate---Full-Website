import { SITEMAP_ROUTES, absoluteUrl } from "@/lib/site";

const BLOCKED_SITEMAP_PATHS = [
  "/preview/",
  "/stg/",
  "/app/",
  "/auth/",
  "/shop/",
  "/demo/",
  "/admin/",
  "/api/",
  "/login/",
] as const;

/**
 * Well-formed urlset without an XML declaration.
 * SuperHosting PHP with short_open_tag treats `<?xml` as PHP and returns HTTP 500.
 */
export function renderSitemapXml(routes: readonly string[] = SITEMAP_ROUTES): string {
  const locs = routes.map((route) => absoluteUrl(route));
  const body = locs
    .map((loc) => `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`)
    .join("\n");
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function sitemapLocs(routes: readonly string[] = SITEMAP_ROUTES): string[] {
  return routes.map((route) => absoluteUrl(route));
}

export function isBlockedSitemapPath(path: string): boolean {
  return BLOCKED_SITEMAP_PATHS.some((blocked) => path === blocked || path.startsWith(blocked));
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
