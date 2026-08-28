import { describe, expect, it } from "vitest";
import {
  DEMO_AGENTS,
  DEMO_FUNNEL,
  DEMO_KPIS,
  DEMO_NAV,
  DEMO_PROFILE,
} from "@/lib/demo/fixtures";

describe("demo fixtures (live /app/ sample profile)", () => {
  it("uses the demo profile, not a fictional customer", () => {
    expect(DEMO_PROFILE.mode).toBe("demo");
    expect(DEMO_PROFILE.productTitle).toBe("Marketing Dashboard");
    expect(DEMO_PROFILE.user.name).toBe("Chris Momchilov");
    expect(DEMO_PROFILE.user.initials).toBe("CM");
    expect(DEMO_PROFILE.period.label).toBe("Aug 24–30 2026");
    expect(DEMO_PROFILE.filledOn).toBe("2026-08-27");
    expect(DEMO_PROFILE.sampleLabel).toBe("sample");
  });

  it("does not invent a fictional company name", () => {
    const blob = JSON.stringify({ DEMO_PROFILE, DEMO_KPIS, DEMO_FUNNEL, DEMO_AGENTS });
    expect(blob).not.toMatch(/Northstar/i);
  });

  it("keeps the exact /app/ demo-profile KPI numbers", () => {
    expect(DEMO_KPIS.map((k) => [k.id, k.display])).toEqual([
      ["traffic", "286,400"],
      ["leads", "6,840"],
      ["conversion", "2.39%"],
      ["meetings", "412"],
      ["content", "67"],
    ]);
    expect(DEMO_KPIS.find((k) => k.id === "traffic")?.note).toBe("sessions this week");
    expect(DEMO_KPIS.find((k) => k.id === "traffic")?.sample).toBe(true);
  });

  it("conversion matches leads / sessions and is never zero-filled", () => {
    const sessions = DEMO_FUNNEL.find((s) => s.stage === "Sessions")!.value;
    const leads = DEMO_FUNNEL.find((s) => s.stage === "Leads")!.value;
    const rate = (leads / sessions) * 100;
    expect(rate).toBeCloseTo(2.39, 2);
    expect(DEMO_FUNNEL.every((row) => row.value > 0)).toBe(true);
  });

  it("matches the live /app/ sidebar order", () => {
    expect([...DEMO_NAV]).toEqual([
      "Dashboard",
      "Campaigns",
      "Content",
      "Leads",
      "SEO",
      "Social",
      "Reports",
      "Settings",
    ]);
  });

  it("lists the 11-agent roster with product codes", () => {
    expect(DEMO_AGENTS).toHaveLength(11);
    expect(DEMO_AGENTS.find((a) => a.name === "Strategos")?.code).toBe("T-Head");
    expect(DEMO_AGENTS.find((a) => a.name === "Seeker")?.code).toBe("T-Search");
    expect(DEMO_AGENTS.find((a) => a.name === "Wordsmith")?.code).toBe("T-Content");
    expect(DEMO_AGENTS.every((a) => a.code.startsWith("T-"))).toBe(true);
  });
});
