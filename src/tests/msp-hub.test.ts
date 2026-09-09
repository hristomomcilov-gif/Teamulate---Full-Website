import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { AGENTS } from "@/content/agents";
import {
  MSP_HUB_BYLINE,
  MSP_HUB_CTAS,
  MSP_HUB_DEK,
  MSP_HUB_EYEBROW,
  MSP_HUB_FIT,
  MSP_HUB_H1,
  MSP_HUB_META_DESCRIPTION,
  MSP_HUB_NOT_FIT,
  MSP_HUB_PATH,
  MSP_HUB_PROOF_CARDS,
  MSP_HUB_PULLQUOTE,
  MSP_HUB_SEAT_MAP,
  MSP_HUB_SEO_TITLE,
  MSP_HUB_SOURCES,
  MSP_HUB_UNFINISHED_WORK,
  MSP_HUB_WALL_SIGNALS,
} from "@/content/msp-hub";
import { FOOTER_GROUPS, HEADER_NAV, SITEMAP_ROUTES } from "@/lib/site";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

const PAGE = "src/app/for/msp-managed-it-cyber/page.tsx";
const CONTENT = "src/content/msp-hub.ts";

describe("/for/msp-managed-it-cyber/ hub (Gate A, W1 preview)", () => {
  const page = src(PAGE);
  const content = src(CONTENT);
  const visitorCopy = page + content;

  it("renders the locked V3.1 hero, meta and byline strings", () => {
    expect(MSP_HUB_PATH).toBe("/for/msp-managed-it-cyber/");
    expect(MSP_HUB_SEO_TITLE).toBe("AI Marketing Team for MSPs & Cybersecurity");
    expect(MSP_HUB_H1).toBe("AI marketing team for MSPs, managed IT, and cybersecurity firms");
    expect(MSP_HUB_EYEBROW).toBe("For MSPs · Managed IT · Cyber");
    expect(MSP_HUB_DEK).toBe(
      "When referrals slow and the bench is thin, you do not need another chatbot — you need named seats you can steer, with approvals that feel like change control.",
    );
    expect(MSP_HUB_META_DESCRIPTION).toBe(
      "Named AI marketing seats for managed IT and cybersecurity firms that already have a stack — and need throughput with human approvals.",
    );
    expect(MSP_HUB_BYLINE).toBe("Chris Momchilov · September 2026");
    expect(MSP_HUB_PULLQUOTE).toBe(
      "MSPs already run tickets, SLAs, and change control. Marketing is interesting when it inherits that control culture — not when it promises “more AI.”",
    );

    // The root layout template appends " | Teamulate" -> "AI Marketing Team for MSPs & Cybersecurity | Teamulate".
    expect(src("src/app/layout.tsx")).toContain('template: "%s | Teamulate"');
    expect(page).toContain("title: MSP_HUB_SEO_TITLE");
    expect(page).toContain("<h1");
    expect(page).toContain("{MSP_HUB_H1}");
    expect(page).toContain("<Eyebrow>{MSP_HUB_EYEBROW}</Eyebrow>");
    expect(page).toContain("{MSP_HUB_DEK}");
    expect(page).toContain("{MSP_HUB_BYLINE}");
    expect(page).toContain("<PullQuote");
    expect(page).toContain("{MSP_HUB_PULLQUOTE}");
  });

  it("shows the three proof cards with the locked figures and caveats", () => {
    expect(MSP_HUB_PROOF_CARDS.map((card) => card.value)).toEqual(["11", "90%", "Human"]);
    expect(MSP_HUB_PROOF_CARDS[0].label).toBe("Named Teamulate seats");
    expect(MSP_HUB_PROOF_CARDS[0].detail).toBe("Head + specialists + independent assurance");
    expect(MSP_HUB_PROOF_CARDS[1].label).toBe("Public people-cost comparison vs modeled 10-role department");
    expect(MSP_HUB_PROOF_CARDS[1].detail).toBe("People-cost only; not a guarantee; see research pages");
    expect(MSP_HUB_PROOF_CARDS[2].label).toBe("Strategy, spend, brand, and sensitive claims stay with your team");
    expect(AGENTS).toHaveLength(11);
  });

  it("is noindex,nofollow for preview and stays out of the public sitemap and navigation", () => {
    expect(page).toContain("robots: { index: false, follow: false }");
    expect(page).toContain("alternates: { canonical: absoluteUrl(MSP_HUB_PATH) }");
    expect(SITEMAP_ROUTES).not.toContain(MSP_HUB_PATH);
    expect(src("public/sitemap.xml")).not.toContain("/for/");
    expect(src("public/sitemap.php")).not.toContain("/for/");
    const navHrefs = [...HEADER_NAV, ...FOOTER_GROUPS].flatMap((group) => group.items.map((item) => item.href));
    expect(navHrefs).not.toContain(MSP_HUB_PATH);
  });

  it("is the only MSP URL (Wave A 2a HOLD)", () => {
    const forRoutes = readdirSync(resolve(process.cwd(), "src/app/for"));
    expect(forRoutes).toEqual(["msp-managed-it-cyber"]);
    const forPaths = new Set([...visitorCopy.matchAll(/\/for\/[a-z0-9-]+\//g)].map((match) => match[0]));
    expect([...forPaths]).toEqual([MSP_HUB_PATH]);
  });

  it("uses soft CTAs only: Request a demo primary, no Assessment CTA", () => {
    expect(MSP_HUB_CTAS.primary).toEqual({
      label: "Request a demo",
      href: "/request-demo/",
      ctaId: "msp-hub-request-demo",
    });
    expect(MSP_HUB_CTAS.secondary.map((cta) => cta.href)).toEqual(["/how-it-works/", "/pricing/", "/contact/"]);
    expect(visitorCopy).not.toMatch(/assessment/i);
    expect(visitorCopy).not.toMatch(/Launch Demo/);
  });

  it("links only to live Teamulate paths — never /demo/, /preview/ or /app/", () => {
    const hrefs = [...visitorCopy.matchAll(/href[=:]\s*["'{]+([^"'}]+)["'}]/g)].map((match) => match[1]);
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      if (!href.startsWith("/")) continue;
      expect(href).not.toMatch(/^\/(demo|preview|app|stg)\//);
    }
    expect(visitorCopy).not.toMatch(/\/demo\/|\/preview\/|\/app\//);
    for (const source of MSP_HUB_SOURCES) {
      expect(source.href.startsWith("/")).toBe(true);
      expect(SITEMAP_ROUTES).toContain(source.href);
    }
  });

  it("keeps fit / not-fit on stack, named approver and multi-workstream — no size, headcount or agency minimum", () => {
    const fitCopy = [...MSP_HUB_FIT, ...MSP_HUB_NOT_FIT].join("\n");
    expect(fitCopy).toMatch(/stack/i);
    expect(fitCopy).toMatch(/approver/i);
    expect(fitCopy).toMatch(/workstream/i);
    expect(fitCopy).not.toMatch(/headcount|employees|seats or more|\bFTE\b|revenue of|minimum retainer|agency minimum|\$\d/i);
    expect(fitCopy).not.toMatch(/\b\d+\+?\s*(people|staff|techs|engineers|clients)\b/i);
  });

  it("uses conditional language and invents no metrics or address", () => {
    for (const signal of MSP_HUB_WALL_SIGNALS) {
      expect(signal).toMatch(/\b(If|When)\b/);
      expect(signal).toMatch(/\bmay\b/);
    }
    for (const row of MSP_HUB_UNFINISHED_WORK) {
      expect(row.yours.length).toBeGreaterThan(0);
    }
    // The only percentage on the page is the public 90% people-cost comparison.
    const percentages = [...visitorCopy.matchAll(/\d+(?:\.\d+)?%/g)].map((match) => match[0]);
    expect(new Set(percentages)).toEqual(new Set(["90%"]));
    expect(visitorCopy).not.toMatch(/93\.1|83\.5|95%|up to 95/);
    expect(visitorCopy).toMatch(/not a guarantee/i);
    expect(visitorCopy).toMatch(/CAD/);
    expect(visitorCopy).not.toMatch(/Barrie|Ontario|PostalAddress|addressLocality|Canadian company/i);
    expect(visitorCopy).not.toMatch(/trusted by|testimonial/i);
    expect(visitorCopy).not.toMatch(/\bGuaranteed\b/);
    expect(visitorCopy).toMatch(/does not guarantee/);
  });

  it("maps every live roster seat and mirrors the Team page approval boundaries", () => {
    for (const agent of AGENTS) {
      expect(MSP_HUB_SEAT_MAP[agent.slug]).toBeTruthy();
    }
    expect(Object.keys(MSP_HUB_SEAT_MAP).sort()).toEqual(AGENTS.map((agent) => agent.slug).sort());
    expect(page).toContain("agent.approvalRequiredActions.join");
    expect(page).toContain("<ScrollTable");
    expect(page).not.toContain("dangerouslySetInnerHTML");
  });
});
