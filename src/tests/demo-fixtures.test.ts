import { describe, expect, it } from "vitest";
import {
  DEMO_AGENTS,
  DEMO_CHANNEL_MIX,
  DEMO_CHANNEL_ROWS,
  DEMO_FUNNEL,
  DEMO_KPIS,
  DEMO_NAV,
  DEMO_OMITTED,
  DEMO_PERFORMANCE_CHART,
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
  });

  it("does not invent a fictional company name", () => {
    const blob = JSON.stringify({ DEMO_PROFILE, DEMO_KPIS, DEMO_FUNNEL, DEMO_AGENTS });
    expect(blob).not.toMatch(/Northstar/i);
  });

  it("does not keep the retired hero mock numbers", () => {
    const blob = JSON.stringify(DEMO_KPIS);
    expect(blob).not.toContain("12,480");
    expect(blob).not.toContain("164");
    expect(blob).not.toContain("3.4%");
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
  });

  it("funnel matches /app/ stages and conversion math", () => {
    expect(DEMO_FUNNEL.map((row) => [row.stage, row.display, "rate" in row ? row.rate : undefined])).toEqual([
      ["Visitors", "286,400", undefined],
      ["Leads", "6,840", "2.39%"],
      ["MQLs", "1,710", "25.0%"],
      ["Meetings", "412", "24.1%"],
    ]);
    const visitors = DEMO_FUNNEL.find((s) => s.stage === "Visitors")!.value;
    const leads = DEMO_FUNNEL.find((s) => s.stage === "Leads")!.value;
    const mqls = DEMO_FUNNEL.find((s) => s.stage === "MQLs")!.value;
    const meetings = DEMO_FUNNEL.find((s) => s.stage === "Meetings")!.value;
    expect((leads / visitors) * 100).toBeCloseTo(2.39, 2);
    expect((mqls / leads) * 100).toBeCloseTo(25.0, 1);
    expect((meetings / mqls) * 100).toBeCloseTo(24.1, 1);
    expect(DEMO_FUNNEL.every((row) => row.value > 0)).toBe(true);
  });

  it("keeps the exact /app/ Performance Overview paths", () => {
    expect(DEMO_PERFORMANCE_CHART.trafficPath).toBe(
      "M48 118 C 140 92, 200 104, 232 98 S 320 70, 368 62 S 500 68, 600 48",
    );
    expect(DEMO_PERFORMANCE_CHART.leadsPath).toBe(
      "M48 132 C 140 118, 210 124, 248 110 S 340 78, 400 64 S 520 58, 600 42",
    );
    expect(DEMO_PERFORMANCE_CHART.trafficColor).toBe("#2f6bff");
    expect(DEMO_PERFORMANCE_CHART.leadsColor).toBe("#8fb0ff");
    expect([...DEMO_PERFORMANCE_CHART.leftAxis]).toEqual(["50K", "25K", "0"]);
    expect([...DEMO_PERFORMANCE_CHART.rightAxis]).toEqual(["1.2K", "0.6K", "0"]);
    expect([...DEMO_PERFORMANCE_CHART.xLabels]).toEqual(["Aug 24", "25", "26", "27", "28", "29", "30"]);
  });

  it("keeps the exact /app/ channel mix", () => {
    expect(DEMO_CHANNEL_MIX.map((row) => [row.channel, row.percent])).toEqual([
      ["Organic Search", 38],
      ["Paid", 24],
      ["Social", 16],
      ["Email", 12],
      ["Events", 10],
    ]);
    expect(DEMO_CHANNEL_MIX.reduce((sum, row) => sum + row.percent, 0)).toBe(100);
  });

  it("does not claim filled Tenant 0 series are omitted", () => {
    const omitted = JSON.stringify(DEMO_OMITTED);
    expect(omitted).not.toMatch(/Daily series/i);
    expect(omitted).not.toMatch(/Channel mix/i);
    expect(omitted).not.toMatch(/Week total only/i);
    expect(omitted).not.toMatch(/No campaigns/i);
    expect(omitted).not.toMatch(/No social metrics/i);
    expect(omitted).not.toMatch(/Search Console/i);
    expect(omitted).not.toMatch(/No recommendations/i);
    expect(DEMO_OMITTED.settings).toMatch(/not part of this public sample/i);
  });

  it("splits the week traffic total by the /app/ channel mix", () => {
    expect(DEMO_CHANNEL_ROWS.map((row) => [row.channel, row.sessions])).toEqual([
      ["Organic Search", 108_832],
      ["Paid", 68_736],
      ["Social", 45_824],
      ["Email", 34_368],
      ["Events", 28_640],
    ]);
    expect(DEMO_CHANNEL_ROWS.reduce((sum, row) => sum + row.sessions, 0)).toBe(286_400);
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
