import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SITEMAP_ROUTES } from "@/lib/site";

const PAGE = "src/app/for/msp-managed-it-cyber/page.tsx";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

describe("MSP / managed IT / cyber hub (W1 batch, preview draft)", () => {
  const page = src(PAGE);

  it("exists at the single approved route with the locked SEO title", () => {
    expect(existsSync(resolve(process.cwd(), PAGE))).toBe(true);
    // Wave A 2a standalone is on HOLD: no second URL under /for/.
    expect(readdirSync(resolve(process.cwd(), "src/app/for"))).toEqual(["msp-managed-it-cyber"]);
    expect(page).toContain('const PAGE_PATH = "/for/msp-managed-it-cyber/"');
    // Root template is "%s | Teamulate", so the rendered title is exactly the approved one.
    expect(page).toContain('const PAGE_TITLE = "AI Marketing Team for MSPs & Cybersecurity"');
    expect(src("src/app/layout.tsx")).toContain('template: "%s | Teamulate"');
    expect(page).toContain("alternates: { canonical: absoluteUrl(PAGE_PATH) }");
  });

  it("stays a draft until the publish gate: noindex and out of the sitemap", () => {
    expect(page).toContain("robots: { index: false, follow: true }");
    expect(SITEMAP_ROUTES).not.toContain("/for/msp-managed-it-cyber/");
    expect(src("public/sitemap.xml")).not.toContain("/for/");
    expect(src("public/sitemap.php")).not.toContain("/for/");
    expect(src("public/llms.txt")).not.toContain("/for/");
  });

  it("uses soft demo/contact CTAs and the required conditional fit language", () => {
    expect(page).toContain('href="/request-demo/"');
    expect(page).toContain('href="/contact/"');
    expect(page).toContain("may take priority");
    expect(page).toContain("may limit your available time");
    expect(page).toContain("may not solve an ownership problem");
    expect(page).toMatch(/<h1[\s\S]*MSPs and cybersecurity providers[\s\S]*<\/h1>/);
  });

  it("keeps the copy visitor-facing and honest", () => {
    expect(page).not.toMatch(/assessment/i);
    expect(page).not.toMatch(/validation[- ]sprint|sprint/i);
    expect(page).not.toMatch(/agency minimum|minimum (spend|contract|retainer)/i);
    expect(page).not.toMatch(/\b\d+\s*[-–]\s*\d+\s*(people|person|employees|seats|technicians|staff)\b/i);
    expect(page).not.toMatch(/headcount/i);
    expect(page).not.toMatch(/Barrie|Ontario|PostalAddress|addressLocality/i);
    expect(page).not.toMatch(/95%/);
    expect(page).not.toMatch(/metrics\.json|demo overlay/i);
    expect(page).not.toMatch(/trusted by|testimonial|guaranteed results/i);
    expect(page).not.toMatch(/Wave A|Gate A|V3\.1|HOLD/); // no internal process notes in visitor copy
  });
});
