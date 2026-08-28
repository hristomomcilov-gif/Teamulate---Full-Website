import { describe, expect, it } from "vitest";
import {
  DEMO_AGENTS,
  DEMO_APPROVALS,
  DEMO_GOALS,
  DEMO_INTEGRATIONS,
  DEMO_ORG,
} from "@/lib/demo/fixtures";
import { CAMPAIGN_TRANSITIONS, canTransition } from "@/domain/state-machines";

describe("demo fixtures (spec §60)", () => {
  it("uses the fictional sample organization", () => {
    expect(DEMO_ORG.name).toBe("Northstar Technical Services");
    expect(DEMO_ORG.mode).toBe("demo");
  });

  it("has one goal on track, one at risk and one awaiting baseline", () => {
    expect(DEMO_GOALS.map((g) => g.status).sort()).toEqual(["at-risk", "awaiting-baseline", "on-track"]);
  });

  it("never renders unknown data as zero", () => {
    const baselineGoal = DEMO_GOALS.find((g) => g.status === "awaiting-baseline")!;
    expect(baselineGoal.current).toBeNull();
    expect(baselineGoal.current).not.toBe(0);
  });

  it("includes 11 agents", () => {
    expect(DEMO_AGENTS).toHaveLength(11);
  });

  it("includes P1 informational, P2 routine, P3 launch and blocked P4 approvals", () => {
    expect(DEMO_APPROVALS.map((a) => a.tier).sort()).toEqual(["P1", "P2", "P3", "P4"]);
    const p4 = DEMO_APPROVALS.find((a) => a.tier === "P4")!;
    expect(p4.status).toBe("rejected");
  });

  it("includes healthy, degraded and not-connected integrations", () => {
    const statuses = DEMO_INTEGRATIONS.map((i) => i.status);
    expect(statuses.filter((s) => s === "connected")).toHaveLength(2);
    expect(statuses).toContain("degraded");
    expect(statuses).toContain("not_connected");
  });

  it("demo approval flow follows the legal campaign state machine", () => {
    expect(canTransition(CAMPAIGN_TRANSITIONS, "awaiting_launch_approval", "scheduled")).toBe(true);
    expect(canTransition(CAMPAIGN_TRANSITIONS, "scheduled", "live")).toBe(true);
  });
});
