import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HEADER_NAV, SITEMAP_ROUTES } from "@/lib/site";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

describe("2026-09-08 About nav + live About Chris", () => {
  it("header has an About dropdown with exactly Chris and The Team", () => {
    const about = HEADER_NAV.find((g) => g.label === "About");
    expect(about?.items).toEqual([
      { label: "Chris", href: "/about-chris/" },
      { label: "The Team", href: "/team/" },
    ]);
  });

  it("removes the old top-level Team link so /team/ only appears under About", () => {
    expect(HEADER_NAV.map((g) => g.label)).not.toContain("Team");
    const groupsLinkingTeam = HEADER_NAV.filter((g) => g.items.some((i) => i.href === "/team/"));
    expect(groupsLinkingTeam.map((g) => g.label)).toEqual(["About"]);
    expect(HEADER_NAV.filter((g) => g.items.some((i) => i.href === "/about-chris/")).map((g) => g.label)).toEqual([
      "About",
    ]);
  });

  it("keeps the rest of the lean top bar and the Launch Demo CTA untouched", () => {
    expect(HEADER_NAV.map((g) => g.label)).toEqual(["How it works", "About", "Pricing", "Blog", "Demo"]);
    expect(HEADER_NAV.find((g) => g.label === "Demo")?.items[0].href).toBe("/demo/dashboard/");
    const header = src("src/components/SiteHeader.tsx");
    expect(header).toContain("HEADER_NAV.map(");
    expect(header).toContain('href="/demo/dashboard/"');
    expect(header).toContain("Launch Demo");
    expect(header).toContain('href="/app/"');
  });

  it("shares the header on every page via SiteChrome in the root layout", () => {
    expect(src("src/app/layout.tsx")).toContain("<SiteChrome>{children}</SiteChrome>");
    const chrome = src("src/components/SiteChrome.tsx");
    expect(chrome).toContain("<SiteHeader />");
    expect(chrome).toContain("<SiteFooter />");
  });

  it("ships /about-chris/ as live visitor copy with no draft or preview chrome", () => {
    const page = src("src/app/about-chris/page.tsx");
    expect(page).toContain("<h1");
    expect(page).toContain("Chris Momchilov");
    expect(page).toContain('alternates: { canonical: absoluteUrl(PAGE_PATH) }');
    expect(page).not.toMatch(/\bDRAFT\b/);
    expect(page).not.toMatch(/preview only/i);
    expect(page).not.toMatch(/not published/i);
    expect(page).not.toMatch(/noindex/i);
    expect(page).not.toMatch(/robots:/);
    expect(page).not.toMatch(/resume-backed/i);
    expect(page).not.toMatch(/Barrie|Ontario/i);
    expect(SITEMAP_ROUTES).toContain("/about-chris/");
    for (const asset of [
      "public/about-chris/hero-card-4x3.webp",
      "public/about-chris/og-about-chris-1200x630.webp",
      "public/about-chris/ai-systems-diagram.svg",
    ]) {
      expect(existsSync(resolve(process.cwd(), asset))).toBe(true);
    }
  });
});
