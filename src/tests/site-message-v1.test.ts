import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { AGENTS } from "@/content/agents";
import { COPY } from "@/content/copy";
import {
  SMV1_ASSURANCE_CHECKS,
  SMV1_BUILD_LOG_ENTRIES,
  SMV1_CONTROL,
  SMV1_CTA,
  SMV1_FAQ,
  SMV1_GLANCE,
  SMV1_HERO,
  SMV1_HUMAN_GATES,
  SMV1_PATH,
  SMV1_PROBLEMS,
  SMV1_SYSTEMS,
  seatsFor,
} from "@/content/site-message-v1";
import { FOOTER_GROUPS, HEADER_NAV, SITEMAP_ROUTES } from "@/lib/site";
import { isBlockedSitemapPath } from "@/lib/sitemap-xml";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

/** Live paths that are not in SITEMAP_ROUTES but exist on teamulate.ca. */
const LIVE_NON_SITEMAP_PATHS = ["/demo/dashboard/", "/for/msp-managed-it-cyber/", "/blog/who-ai-search-cites-2026/"];
const LIVE_PATHS = [...SITEMAP_ROUTES, ...LIVE_NON_SITEMAP_PATHS];

describe("2026-09-08 /preview/site-message-v1/ homepage draft (PREVIEW ONLY)", () => {
  const page = src("src/app/preview/site-message-v1/page.tsx");
  const sections = src("src/components/home/SiteMessageV1Sections.tsx");
  const content = src("src/content/site-message-v1.ts");
  const all = page + sections + content;
  const liveHome = src("src/app/page.tsx");

  it("is a noindex draft with no canonical, no share tags, and stays out of nav + sitemap", () => {
    expect(SMV1_PATH).toBe("/preview/site-message-v1/");
    expect(page).toContain("robots: { index: false, follow: false");
    expect(page).not.toContain("alternates:");
    expect(page).not.toContain("marketingShareMetadata");
    expect(page).toContain("SMV1_RIBBON");
    expect(content).toMatch(/label: "Preview draft"/);
    expect(SITEMAP_ROUTES).not.toContain(SMV1_PATH);
    expect(isBlockedSitemapPath(SMV1_PATH)).toBe(true);
    expect(src("src/app/robots.ts")).toContain('"/preview/"');
    for (const group of [...HEADER_NAV, ...FOOTER_GROUPS]) {
      expect(group.items.some((item) => item.href.startsWith("/preview/"))).toBe(false);
    }
    expect(src("public/sitemap.xml")).not.toContain("/preview/");
    expect(src("public/sitemap.php")).not.toContain("/preview/");
  });

  it("leaves the live homepage as the public root, untouched", () => {
    expect(liveHome).not.toContain("site-message-v1");
    expect(liveHome).not.toContain("SiteMessageV1");
    expect(liveHome).toContain("Teamulate — Your AI Marketing Team");
    expect(liveHome).toContain('href="/team/" ctaId="hero-primary"');
    expect(liveHome).toContain('alternates: { canonical: absoluteUrl("/") }');
    expect(liveHome).not.toMatch(/robots:/);
  });

  it("keeps the shared SiteChrome and never touches Launch Demo, /demo/, /app/ or the glance asset", () => {
    expect(page).not.toContain("SiteHeader");
    expect(page).not.toContain("SiteFooter");
    expect(src("src/app/layout.tsx")).toContain("<SiteChrome>{children}</SiteChrome>");
    const header = src("src/components/SiteHeader.tsx");
    expect(header).toContain("Launch Demo");
    expect(header).toContain('href="/demo/dashboard/"');
    expect(header).toContain('href="/app/"');
    expect(page).toContain('src="/assets/glance-90-coins-square.png"');
    expect(all).not.toContain("glance-90-coins-arrow");
    expect(all).toContain("Up to 90%");
    expect(all).toContain("Lower people-cost than building the department");
    expect(SMV1_GLANCE.headline).toBe("Up to 90%");
    expect(SMV1_GLANCE.headlineCaption).toBe("Lower people-cost than building the department");
  });

  it("delta 1: hero starts with the buyer problem and answers with the department", () => {
    expect(SMV1_HERO.headline).toBe("Too much marketing to do. Too few people to do it.");
    expect(SMV1_HERO.dek).toMatch(/complete AI marketing department/);
    expect(SMV1_HERO.dek).toMatch(/human approving the decisions that matter/);
    expect(SMV1_HERO.proofChips).toEqual(["11 Agents", "1 Dashboard", "24/7"]);
    expect(page).not.toContain("Teamulate — Your AI Marketing Team");
    // The hero H1 is the problem, not the brand name.
    expect(page).toMatch(/<h1[^>]*>\s*\{SMV1_HERO\.headline\}/);
    expect(page).toContain("<DashboardMockup />");
  });

  it("delta 2: every buyer problem maps to an on-page section and a live page", () => {
    expect(SMV1_PROBLEMS.length).toBeGreaterThanOrEqual(3);
    const anchors = new Set(["#control", "#glance", ...SMV1_SYSTEMS.map((s) => `#outcome-${s.id}`)]);
    for (const problem of SMV1_PROBLEMS) {
      expect(anchors.has(problem.anchor)).toBe(true);
      expect(LIVE_PATHS).toContain(problem.link.href);
      expect(problem.pain.length).toBeGreaterThan(10);
      expect(problem.answer).not.toMatch(/guarantee|guaranteed/i);
    }
    expect(new Set(SMV1_PROBLEMS.map((p) => p.id)).size).toBe(SMV1_PROBLEMS.length);
    expect(sections).toContain('id="control"');
    expect(page).toContain('id="glance"');
    expect(sections).toContain("id={`outcome-${system.id}`}");
  });

  it("delta 3: two-layer human control quotes the roster's gates and assurance outputs", () => {
    expect(SMV1_CONTROL.title).toBe(COPY.controlMessage);
    expect(SMV1_CONTROL.layers).toHaveLength(2);
    expect(SMV1_CONTROL.layers[0].title).toMatch(/named human decision owner/i);
    expect(SMV1_CONTROL.layers[1].title).toMatch(/independent assurance/i);
    const gates = new Set(AGENTS.flatMap((a) => a.approvalRequiredActions));
    for (const gate of SMV1_HUMAN_GATES) expect(gates.has(gate)).toBe(true);
    const assuranceOutputs = new Set(AGENTS.filter((a) => a.type === "assurance").flatMap((a) => a.typicalOutputs));
    for (const check of SMV1_ASSURANCE_CHECKS) expect(assuranceOutputs.has(check)).toBe(true);
    expect(SMV1_CONTROL.link.href).toBe("/security-governance/");
    expect(sections).toContain("<FounderCard />");
  });

  it("delta 4: three outcome systems cover all eleven agents exactly once - no roster on the page", () => {
    expect(SMV1_SYSTEMS).toHaveLength(3);
    const slugs = SMV1_SYSTEMS.flatMap((s) => s.seats);
    expect(slugs.length).toBe(AGENTS.length);
    expect(new Set(slugs).size).toBe(AGENTS.length);
    expect([...slugs].sort()).toEqual(AGENTS.map((a) => a.slug).sort());
    for (const system of SMV1_SYSTEMS) {
      expect(seatsFor(system).map((a) => a.slug)).toEqual(system.seats);
      expect(system.produces.length).toBeGreaterThanOrEqual(3);
      expect(system.youSee).not.toMatch(/guarantee/i);
    }
    // Assurance seats live in the control system, not in an execution system.
    const control = SMV1_SYSTEMS.find((s) => s.id === "control")!;
    expect(control.seats).toEqual(expect.arrayContaining(["strategos", "metric", "guardian"]));
    // The eleven-card roster from the live homepage is not repeated here.
    expect(page).not.toContain("teamAgents.map");
    expect(page).not.toContain("Team lead");
    expect(all).toContain("Meet the full team");
  });

  it("delta 5: the Build Log only lists live items with a link, and labels review items honestly", () => {
    expect(SMV1_BUILD_LOG_ENTRIES.length).toBeGreaterThanOrEqual(5);
    for (const entry of SMV1_BUILD_LOG_ENTRIES) {
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(entry.date).getTime())).toBe(false);
      if (entry.status === "live") {
        expect(entry.href).toBeTruthy();
        expect(LIVE_PATHS).toContain(entry.href);
      } else {
        expect(entry.status).toBe("in review");
        expect(entry.href).toBeUndefined();
      }
      expect(entry.detail).not.toMatch(/\d+\s?%\s?(lift|increase|growth|more leads)/i);
    }
    // Newest first among live entries.
    const liveDates = SMV1_BUILD_LOG_ENTRIES.filter((e) => e.status === "live").map((e) => e.date);
    expect([...liveDates].sort().reverse()).toEqual(liveDates);
    expect(content).toContain("not a customer result");
    expect(sections).toContain('label="In review"');
  });

  it("delta 6: one CTA set - a label never points at two destinations", () => {
    expect(SMV1_CTA.primary).toEqual({ label: "Book a demo", href: "/request-demo/" });
    expect(SMV1_CTA.secondary).toEqual({ label: "See the team in action", href: "/team/" });
    expect(SMV1_CTA.demo).toEqual({ label: "Try the demo dashboard", href: "/demo/dashboard/" });
    // Every CtaLink on the page uses the set, never a literal href or literal label.
    const ctaHrefs = [...page.matchAll(/<CtaLink\s+href=\{?([^\s}]+)\}?/g)].map((m) => m[1]);
    expect(ctaHrefs.length).toBeGreaterThanOrEqual(4);
    for (const href of ctaHrefs) expect(href).toMatch(/^SMV1_CTA\.(primary|secondary|demo)\.href$/);
    expect(page).not.toMatch(/<CtaLink[^>]*href="\//);
    expect(sections).not.toContain("<CtaLink");
    // Live-homepage variants that broke the rule are gone from the preview.
    expect(page).not.toContain("Book a Demo");
    expect(page).not.toMatch(/See the team in action →/);
    expect(all).not.toContain("Meet your department");
  });

  it("P1: tenure is exactly 12 years, and 'Who runs it' resolves to the live About Chris page", () => {
    expect(SMV1_GLANCE.tenure.value).toBe("12 years");
    expect(all).not.toMatch(/12\+|10\+ years|over a decade|a decade|Twelve\+/);
    expect(page).not.toContain("Publishing soon");
    expect(content).toContain('href: "/about-chris/"');
    expect(SITEMAP_ROUTES).toContain("/about-chris/");
  });

  it("respects the marketing locks: Strategos prepares / Chris approves, not fully autonomous, 90% only, no Barrie", () => {
    expect(all).toMatch(/Strategos prepares the strategy/);
    expect(all).not.toMatch(/sets the strategy/i);
    expect(all).not.toMatch(/95\s?%/);
    expect(all).not.toMatch(/Barrie|Ontario/i);
    expect(all).not.toMatch(/human\s*\+\s*ai/i);
    const percentages = new Set(all.match(/\d+\s?%/g));
    expect([...percentages].every((p) => p.replace(/\s/g, "") === "90%")).toBe(true);
    // The only "fully autonomous" wording allowed is the live FAQ question that answers "No".
    expect(all.match(/fully autonomous/gi)?.length).toBe(1);
    const faq = SMV1_FAQ.find((item) => /fully autonomous/i.test(item.question));
    expect(faq?.answer).toMatch(/^No, and by design/);
  });

  it("ships a self-contained preview export that never touches the live root", () => {
    const script = src("scripts/export-preview-site-message.sh");
    expect(script).toContain('PREVIEW_PATH="/preview/site-message-v1"');
    expect(script).toContain("TEAMULATE_PREVIEW_EXPORT=1 npm run build");
    expect(script).toContain("previews/preview-site-message-v1.zip");
    expect(script).toContain("scripts/preview-site-message-htaccess");
    expect(src("scripts/preview-site-message-htaccess")).toContain('X-Robots-Tag "noindex, nofollow"');
    const live = src("scripts/export-live.sh");
    expect(live).toContain('-x "preview/*"');
    expect(live).toContain("out/preview");
  });
});
