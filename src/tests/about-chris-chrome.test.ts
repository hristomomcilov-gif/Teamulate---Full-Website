import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

const NAV_CLASSES =
  'class="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8"';

function headerCss(page: string) {
  const start = page.indexOf("SiteChrome header");
  const end = page.indexOf("</style>");
  expect(start).toBeGreaterThan(-1);
  return page.slice(start, end);
}

describe("2026-09-09 live /about-chris/ overlay header matches the homepage SiteChrome", () => {
  const page = src("hosting/about-chris/index.html");
  const header = src("src/components/SiteHeader.tsx");
  const css = headerCss(page);

  it("uses the exact SiteHeader nav container markup", () => {
    expect(page).toContain(NAV_CLASSES);
    expect(header).toContain(NAV_CLASSES.replace('class="', 'className="'));
    expect(page).toContain('class="hidden items-center gap-1 lg:flex"');
    expect(page).toContain('class="hidden items-center gap-3 lg:flex"');
  });

  it("keeps the responsive nav padding (px-5 → sm:px-8) instead of forcing 20px at every width", () => {
    expect(css).toMatch(/@media \(min-width: 640px\) \{[^}]*\.sm\\:px-8 \{ padding-left: 32px; padding-right: 32px; \}/);
    // The old override `header.sticky .px-5{...}` sat outside any media query and beat
    // the sm:px-8 rule, which is what made the header look wider than the homepage.
    const px5 = css.indexOf("header.sticky .px-5 {");
    const smPx8 = css.indexOf("header.sticky .sm\\:px-8 {");
    expect(px5).toBeGreaterThan(-1);
    expect(smPx8).toBeGreaterThan(px5);
    expect(css).not.toMatch(/\.site-nav|\.desktop-nav|max-width:\s*1100px/);
  });

  it("resets <button> and <a> inside the header like Tailwind preflight (no UA box around About ▾)", () => {
    expect(css).toMatch(/header\.sticky button \{[^}]*border: 0 solid;[^}]*background-color: transparent;[^}]*font: inherit;/);
    expect(css).toMatch(/header\.sticky a \{ color: inherit; text-decoration: inherit; \}/);
    expect(css).toContain("header.sticky .hover\\:underline:hover { text-decoration: underline; }");
  });

  it("uses the homepage design tokens, not the old approximations", () => {
    expect(css).toContain("border-bottom: 1px solid #dbe3f0;");
    expect(css).toContain("header.sticky .text-ink { color: #0b1631; }");
    expect(css).toContain("header.sticky .text-brand { color: #5b47f0; }");
    expect(css).toContain("header.sticky .rounded-md { border-radius: 14px; }");
    expect(css).toContain("header.sticky .hover\\:bg-\\[\\#4a38d8\\]:hover { background-color: #4a38d8; }");
    expect(css).toContain('font-family: "Teamulate Inter", Inter, ui-sans-serif, system-ui');
    expect(css).toContain("/_next/static/media/83afe278b6a6bb3c-s.p.2bn3s6zvc0dyp.woff2");
    expect(css).not.toMatch(/#D5DCE6|#1A2744/);
  });

  it("does not touch the page body: hero, tiles, quote and CTAs are the locked live copy", () => {
    expect(page).toContain("<h1>Chris Momchilov</h1>");
    expect(page).toContain("12 years in B2B marketing. Builder of a live multi-agent AI marketing system");
    expect(page).toContain("<div class=\"stat\"><b>12</b>");
    expect(page).toContain("<div class=\"stat\"><b>11</b>");
    expect(page).toContain("<div class=\"stat\"><b>28×</b>");
    expect(page).toContain("I don’t just use AI — I built a live multi-agent marketing system and run it with human oversight.");
    expect(page).toContain('href="https://teamulate.ca/request-demo/">See the department</a>');
    expect(page).toContain('href="https://www.youtube.com/@SingularityDrive"');
    expect(page).not.toMatch(/10\+/);
    expect(page).not.toMatch(/class="draft-banner"|preview only|noindex/i);
    expect(page).toContain('<meta name="robots" content="index, follow"/>');
  });

  it("keeps Launch Demo, Login and the mobile drawer wiring", () => {
    expect(page).toContain('href="/demo/dashboard/">Launch Demo</a>');
    expect(page).toContain('href="/app/" class="inline-flex');
    expect(page).toContain('aria-controls="mobile-nav"');
    expect(page).toContain('<div id="mobile-nav" class="tm-mobile-nav" hidden>');
    expect(page).toContain('src="/js/launch-demo.js"');
    expect(page).toContain('src="/js/full-doc-nav.js?v=1"');
    expect(page).toContain('src="/js/about-nav.js?v=');
  });
});

describe("2026-09-09 /js/about-nav.js dropdown trigger", () => {
  const js = src("hosting/js/about-nav.js");

  it("renders About as text + chevron with inline resets so no page can draw a UA button box", () => {
    expect(js).toContain('var VER = "3";');
    expect(js).toContain('btn.style.background = "transparent";');
    expect(js).toContain('btn.style.border = "0";');
    expect(js).toContain('btn.style.font = "inherit";');
    expect(js).toContain('btn.style.padding = "8px 12px";');
    expect(js).toContain("'About <span aria-hidden=\"true\" style=\"font-size:10px\">▾</span>'");
    expect(js).toContain("styleTrigger(btn);");
  });

  it("keeps the same children and highlights About when Chris or The Team is current", () => {
    expect(js).toContain('chris.href = "/about-chris/";');
    expect(js).toContain('chris.textContent = "Chris";');
    expect(js).toContain('team.href = "/team/";');
    expect(js).toContain('team.textContent = "The Team";');
    expect(js).toContain('(chrisActive || teamActive ? "text-brand" : "text-ink")');
  });
});
