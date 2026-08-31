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

  it("puts the first-customer shield on the left of the copy", () => {
    expect(founder).toContain("flex-row items-center");
    expect(founder).toContain("text-left");
    expect(founder).toContain("min-w-0 flex-1");
    expect(founder).toContain("h-11 w-11");
    expect(founder).toContain("We are our own first customer.");
    expect(founder).not.toMatch(/flex-col items-center[\s\S]{0,200}We are our own first customer/);
    expect(founder).not.toMatch(/text-center[\s\S]{0,120}We are our own first customer/);
  });

  it("uses the square transparent coins icon on a row layout", () => {
    expect(home).toContain('src="/assets/glance-90-coins-square.png"');
    expect(home).toContain("flex flex-row items-center gap-4");
    expect(home).toContain("sm:gap-8 sm:p-8");
    expect(home).toContain("min-w-0 flex-1");
    expect(home).toContain("leading-snug");
    expect(home).toContain("width={80}");
    expect(home).toContain("height={80}");
    expect(home).toContain('style={{ width: "5rem", height: "5rem" }}');
    expect(home).toContain("h-20 w-20 shrink-0 object-contain");
    expect(home).not.toContain("h-[7.5rem]");
    expect(home).not.toContain("11rem");
    expect(home).not.toContain("width={276}");
    expect(home).not.toMatch(/Lower people-cost[^>]{0,80}whitespace-nowrap/);
    expect(home).not.toMatch(
      /flex flex-row items-center[^"]*justify-between[^"]*"[\s\S]{0,400}glance-90-coins-square/,
    );
    expect(home).not.toContain("glance-90-coins-arrow.png");
    expect(home).not.toContain("flex-col gap-4");
    const png = readFileSync(resolve(process.cwd(), "public/assets/glance-90-coins-square.png"));
    expect(png.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
    expect(png.readUInt32BE(16)).toBe(276);
    expect(png.readUInt32BE(20)).toBe(276);
    expect(png[25]).toBe(6); // RGBA
  });

  it("locks Strategos-prepares / Chris-approves strategy copy", () => {
    expect(founder).toContain(
      "Strategos prepares the strategy; Chris approves it and monitors execution, with his sign-off on the",
    );
    expect(founder).not.toMatch(/He sets the\s+strategy/);
    expect(home).toContain(
      "Strategos prepares the strategy. Chris approves it and monitors the work. The department executes.",
    );
    expect(home).not.toContain("Chris sets the strategy");
    const agents = src("src/content/agents.ts");
    expect(agents).toContain(
      "Prepares the strategy, aligns the team, and drives results across the entire funnel.",
    );
    expect(agents).not.toContain("Sets the strategy, aligns the team");
    expect(src("src/app/team/page.tsx")).not.toMatch(/sets the strategy/i);
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
