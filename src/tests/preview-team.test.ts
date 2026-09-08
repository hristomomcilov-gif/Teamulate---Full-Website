import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { AGENTS } from "@/content/agents";
import { HEADER_NAV, FOOTER_GROUPS, SITEMAP_ROUTES } from "@/lib/site";
import { isBlockedSitemapPath } from "@/lib/sitemap-xml";
import {
  DEPARTMENT_EYEBROW,
  DEPARTMENT_HEADLINE_LINE_1,
  DEPARTMENT_HEADLINE_LINE_2,
  DEPARTMENT_SUBHEAD,
  SEAT_STYLES,
  STRATEGOS_CHART_BADGE,
  STRATEGOS_CHART_LINE,
} from "@/content/team-chart";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

const PREVIEW_PATH = "/preview/team/";
const SPECIALIST_ORDER = ["scout", "wordsmith", "seeker", "growthtrack", "pixel", "flow", "socialite", "nexus"];

describe("2026-09-08 /preview/team/ department redesign (PREVIEW DRAFT)", () => {
  const page = src("src/app/preview/team/page.tsx");
  const chart = src("src/components/team/DepartmentOrgChart.tsx") + src("src/content/team-chart.ts");
  const livePage = src("src/app/team/page.tsx");

  it("is a noindex draft with no canonical, no share tags, and stays out of nav + sitemap", () => {
    expect(page).toContain("robots: { index: false, follow: false");
    expect(page).not.toContain("alternates:");
    expect(page).not.toContain("marketingShareMetadata");
    expect(page).toMatch(/Preview draft/);
    expect(SITEMAP_ROUTES).not.toContain(PREVIEW_PATH);
    expect(isBlockedSitemapPath(PREVIEW_PATH)).toBe(true);
    expect(src("src/app/robots.ts")).toContain('"/preview/"');
    for (const group of [...HEADER_NAV, ...FOOTER_GROUPS]) {
      expect(group.items.some((item) => item.href.startsWith("/preview/"))).toBe(false);
    }
    expect(src("public/sitemap.xml")).not.toContain("/preview/");
  });

  it("leaves the live /team/ page untouched (old structure diagram still ships)", () => {
    expect(livePage).not.toContain("DepartmentOrgChart");
    expect(livePage).toContain('<SectionHeading eyebrow="Structure" title="How the department is organized" />');
    expect(livePage).toContain("↓ delegates and coordinates");
    expect(livePage).toContain('alternates: { canonical: absoluteUrl("/team/") }');
    expect(livePage).not.toMatch(/robots:/);
  });

  it("renders the locked heading copy from the visual reference", () => {
    expect(DEPARTMENT_EYEBROW.toUpperCase()).toBe("THE TEAM");
    expect(DEPARTMENT_HEADLINE_LINE_1).toBe("A complete marketing department.");
    expect(DEPARTMENT_HEADLINE_LINE_2).toBe("Built for results.");
    expect(DEPARTMENT_SUBHEAD).toBe(
      "Specialized AI agents, working together under human oversight, to grow your brand faster and smarter.",
    );
    // Chris lock (Skipper 2026-09-08): Strategos is not human, so never "HUMAN + AI".
    expect(STRATEGOS_CHART_BADGE).toBe("Reports to Chris");
    expect(chart).not.toMatch(/human\s*\+\s*ai/i);
    expect(page).not.toMatch(/human\s*\+\s*ai/i);
    expect(chart).toContain('SeatIcon slug="strategos"');
  });

  it("honours the Strategos-prepares / Chris-approves lock (never 'sets the strategy')", () => {
    expect(STRATEGOS_CHART_LINE).toBe("Prepares the strategy, aligns the team, drives results.");
    expect(chart).not.toMatch(/sets the strategy/i);
    expect(page).not.toMatch(/sets the strategy/i);
  });

  it("uses the Teamulate roster for every seat: 1 head + 8 specialists + 2 assurance", () => {
    const strategos = AGENTS.find((a) => a.slug === "strategos");
    expect(strategos?.role).toBe("Head of Marketing / Orchestrator");
    const specialists = AGENTS.filter((a) => a.type === "specialist").map((a) => a.slug);
    expect(specialists).toEqual(SPECIALIST_ORDER);
    const assurance = AGENTS.filter((a) => a.type === "assurance");
    expect(assurance.map((a) => `${a.name}: ${a.role}`)).toEqual([
      "Metric: Analytics & Attribution",
      "Guardian: QA, Governance & Brand Assurance",
    ]);
    // Role lines are read from AGENTS at render time, never hard-coded in the chart.
    expect(chart).toContain("{agent.role}");
    expect(chart).toContain('AGENTS.filter((a) => a.type === "specialist")');
    expect(chart).toContain('AGENTS.filter((a) => a.type === "assurance")');
    for (const slug of [...SPECIALIST_ORDER, "metric", "guardian"]) {
      expect(SEAT_STYLES[slug]?.verb).toBeTruthy();
    }
    expect(SPECIALIST_ORDER.map((slug) => SEAT_STYLES[slug].verb.toUpperCase())).toEqual([
      "DISCOVER",
      "CREATE",
      "OPTIMIZE",
      "SCALE",
      "DESIGN",
      "CONVERT",
      "ENGAGE",
      "OPERATE",
    ]);
  });

  it("respects the marketing locks: 90% not 95%, no Barrie, no 'fully autonomous', Chris = 12 years", () => {
    for (const file of [page, chart]) {
      expect(file).not.toMatch(/95\s?%/);
      expect(file).not.toMatch(/Barrie|Ontario/i);
      expect(file).not.toMatch(/fully autonomous/i);
      expect(file).not.toMatch(/10\+ years|over a decade|a decade/i);
      if (/Chris/.test(file) && /years/i.test(file)) {
        expect(file).toMatch(/12 years/);
      }
    }
  });

  it("keeps the shared SiteChrome (header + footer) - no custom chrome on the preview page", () => {
    expect(page).not.toContain("SiteHeader");
    expect(page).not.toContain("SiteFooter");
    expect(src("src/app/layout.tsx")).toContain("<SiteChrome>{children}</SiteChrome>");
  });

  it("ships a self-contained preview export that never touches the live root", () => {
    const script = src("scripts/export-preview-team.sh");
    expect(script).toContain('PREVIEW_PATH="/preview/team"');
    expect(script).toContain("TEAMULATE_PREVIEW_EXPORT=1 npm run build");
    expect(script).toContain("previews/preview-team.zip");
    expect(script).toContain("scripts/preview-team-htaccess");
    expect(src("scripts/preview-team-htaccess")).toContain('X-Robots-Tag "noindex, nofollow"');
    const live = src("scripts/export-live.sh");
    expect(live).toContain('-x "preview/*"');
    expect(live).toContain("out/preview");
    const config = src("next.config.ts");
    expect(config).toContain('process.env.TEAMULATE_PREVIEW_EXPORT === "1"');
    expect(config).toContain('NEXT_PUBLIC_PREVIEW_EXPORT: previewExport ? "1" : ""');
  });
});
