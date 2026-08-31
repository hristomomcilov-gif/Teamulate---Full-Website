import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { FOOTER_GROUPS } from "@/lib/site";
import { PLANS } from "@/content/plans";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

describe("Chris homepage markup (31 Aug 2026)", () => {
  const home = src("src/app/page.tsx");
  const header = src("src/components/SiteHeader.tsx");
  const mock = src("src/components/home/DashboardMockup.tsx");
  const founder = src("src/components/home/FounderCard.tsx");

  it("points header Launch Demo at the live demo and hero primary at Team", () => {
    expect(header).toContain('href="/demo/dashboard/"');
    expect(header).toContain("Launch Demo");
    expect(header).not.toContain("See the team in action");
    expect(home).toContain('href="/team/" ctaId="hero-primary"');
    expect(home).toContain("See the team in action →");
  });

  it("aligns hero copy with the mock and keeps Inter-weight classes", () => {
    expect(home).toContain("grid items-start gap-12 lg:grid-cols-2");
    expect(home).toMatch(/<h1 className="[^"]*font-bold/);
    expect(home).toMatch(/mt-5 text-lg font-medium leading-relaxed text-ink-muted/);
    expect(home).not.toContain("Get started for free");
  });

  it("cuts Lead Funnel from the homepage hero mock only", () => {
    expect(mock).not.toContain("Lead Funnel");
    expect(mock).not.toContain("DEMO_FUNNEL");
    expect(src("src/components/demo/DemoDashboard.tsx")).toContain("Lead Funnel");
  });

  it("centers the first-customer badge", () => {
    expect(founder).toContain("flex-col items-center");
    expect(founder).toContain("text-center");
    expect(founder).toContain("We are our own first customer.");
  });

  it("drops extra proof-card body copy", () => {
    expect(home).not.toContain("No daily blog slop");
    expect(home).not.toContain("AI-operated seats. You stay on the gates.");
    expect(home).not.toContain("No invented lift.");
  });
});

describe("Login wiring", () => {
  it("points header, footer, and intercept at /app/", () => {
    const header = src("src/components/SiteHeader.tsx");
    const publicIntercept = src("public/login-intercept.js");
    const hostingIntercept = src("hosting/login-intercept.js");
    const clientLogin = FOOTER_GROUPS.flatMap((group) => group.items).find(
      (item) => item.label === "Client login",
    );

    expect(header).toContain('href="/app/"');
    expect(header).not.toContain("/client-login.html");
    expect(clientLogin?.href).toBe("/app/");
    expect(publicIntercept).toContain('window.location.href = "/app/"');
    expect(hostingIntercept).toContain('window.location.href = "/app/"');
    expect(publicIntercept).not.toContain("/client-login.html");
    expect(hostingIntercept).not.toContain("/client-login.html");
  });
});

describe("Locked public prices and legal chips", () => {
  it("keeps Core / Growth / Scale CAD prices with no Scale 'from'", () => {
    expect(PLANS.map((plan) => [plan.key, plan.setupCad, plan.monthlyCad])).toEqual([
      ["core", 7500, 5000],
      ["growth", 12500, 7500],
      ["scale", 20000, 12000],
    ]);
    expect(JSON.stringify(PLANS)).not.toMatch(/from/i);
    expect(src("src/app/page.tsx")).not.toMatch(/from C\$/);
    expect(src("src/app/pricing/page.tsx")).not.toContain("Why is Scale priced");
  });

  it("removes the yellow interim chips and keeps the legal pages", () => {
    const privacy = src("src/app/privacy/page.tsx");
    const terms = src("src/app/terms/page.tsx");
    expect(privacy).toContain("Privacy Policy");
    expect(privacy).toContain("This interim statement describes");
    expect(privacy).not.toContain("Interim policy - final version pending legal counsel review");
    expect(privacy).not.toContain("StatusChip");
    expect(terms).toContain("Terms of Use");
    expect(terms).toContain("These interim terms govern");
    expect(terms).not.toContain("Interim terms - final version pending legal counsel review");
    expect(terms).not.toContain("StatusChip");
  });
});
