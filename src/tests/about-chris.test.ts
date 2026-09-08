import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HEADER_NAV, SITEMAP_ROUTES } from "@/lib/site";
import { sitemapLocs } from "@/lib/sitemap-xml";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

describe("About Chris locks", () => {
  it("states Chris's marketing experience as exactly 12 years — never 10+ or 10 years", () => {
    const page = src("src/app/about-chris/page.tsx");
    expect(page).toContain("12 years in B2B marketing.");
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
});
