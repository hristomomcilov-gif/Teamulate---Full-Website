import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HEADER_NAV, SITEMAP_ROUTES, absoluteUrl } from "@/lib/site";
import { sitemapLocs } from "@/lib/sitemap-xml";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

describe("About Chris locks", () => {
  it("states Chris's marketing experience as exactly 12 years — never 10+ or 10 years", () => {
    const page = src("src/app/about-chris/page.tsx");
    expect(page).toContain(
      'const HERO_DEK = "12 years in B2B marketing. Builder of a live multi-agent AI marketing system.";',
    );
    expect(page).toContain("{HERO_DEK}");
    expect(page).toContain(
      '{ value: "12", label: "Years leading marketing across SaaS, enterprise tech, fintech & ecommerce" }',
    );
    expect(page).not.toMatch(/10\+/);
    expect(page).not.toMatch(/\b10 years\b/i);
    expect(page).not.toMatch(/\bten years\b/i);
  });

  it("replaces the standalone Team link with an About dropdown (Chris, The Team)", () => {
    expect(HEADER_NAV.map((group) => group.label)).toEqual(["How it works", "About", "Pricing", "Blog", "Demo"]);

    const about = HEADER_NAV.find((group) => group.label === "About");
    expect(about?.items).toEqual([
      { label: "Chris", href: "/about-chris/" },
      { label: "The Team", href: "/team/" },
    ]);

    expect(HEADER_NAV.find((group) => group.label === "How it works")?.items).toEqual([
      { label: "How it works", href: "/how-it-works/" },
    ]);
    expect(HEADER_NAV.find((group) => group.label === "Pricing")?.items).toEqual([{ label: "Pricing", href: "/pricing/" }]);
    expect(HEADER_NAV.find((group) => group.label === "Blog")?.items).toEqual([{ label: "Blog", href: "/blog/" }]);
    expect(HEADER_NAV.find((group) => group.label === "Demo")?.items).toEqual([
      { label: "Demo", href: "/demo/dashboard/" },
    ]);
  });

  it("publishes /about-chris/ in the sitemap and keeps the page indexable", () => {
    expect(SITEMAP_ROUTES).toContain("/about-chris/");
    expect(sitemapLocs()).toContain("https://teamulate.ca/about-chris/");
    expect(src("public/sitemap.xml")).toContain("<loc>https://teamulate.ca/about-chris/</loc>");
    expect(src("public/sitemap.php")).toContain("https://teamulate.ca/about-chris/");
    expect(src("hosting/sitemap.php")).toContain("https://teamulate.ca/about-chris/");

    const page = src("src/app/about-chris/page.tsx");
    expect(page).toContain("robots: { index: true, follow: true }");
    expect(page).not.toMatch(/index:\s*false/);
    expect(page).not.toMatch(/noindex/i);
  });

  it("ships Open Graph + Twitter share metadata with a 1200×630 PNG for LinkedIn / X scrapers", () => {
    const page = src("src/app/about-chris/page.tsx");
    expect(page).toContain('const OG_IMAGE = "/about-chris/og-about-chris-1200x630.png";');
    expect(page).not.toContain("og-about-chris-1200x630.webp");
    expect(page).toContain("alternates: { canonical: absoluteUrl(PAGE_PATH) }");
    expect(page).toContain('const PAGE_PATH = "/about-chris/";');
    expect(page).toContain('const PAGE_TITLE = "About Chris Momchilov";');
    expect(page).toContain("const SHARE_TITLE = `${PAGE_TITLE} | ${SITE.name}`;");
    expect(page).toContain('type: "website"');
    expect(page).toContain('card: "summary_large_image"');
    expect(page).toContain('type: "image/png" as const');
    expect(page).toContain("width: 1200,");
    expect(page).toContain("height: 630,");
    // Both OG and Twitter descriptions are the 12-years dek.
    expect(page.match(/description: HERO_DEK,/g)).toHaveLength(2);
    expect(page.match(/title: SHARE_TITLE,/g)).toHaveLength(2);
    expect(absoluteUrl("/about-chris/og-about-chris-1200x630.png")).toBe(
      "https://teamulate.ca/about-chris/og-about-chris-1200x630.png",
    );

    const pngPath = resolve(process.cwd(), "public/about-chris/og-about-chris-1200x630.png");
    expect(existsSync(pngPath)).toBe(true);
    const png = readFileSync(pngPath);
    expect(png.subarray(0, 8)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });
});
