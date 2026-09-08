import { describe, expect, it } from "vitest";
import {
  COMMON_CORE_STARTER,
  CORE_LIBRARY,
  GROWTH_EXTENSION,
  SCALE_EXTENSION,
  WORKFLOW_CATALOG,
} from "@/content/workflows";

const ROSTER = [
  "Strategos",
  "Scout",
  "Wordsmith",
  "Seeker",
  "GrowthTrack",
  "Pixel",
  "Flow",
  "Socialite",
  "Nexus",
  "Metric",
  "Guardian",
];

describe("Workflow Entitlement Matrix v1.0 (27 Aug 2026)", () => {
  it("has exactly 25 + 22 + 13 = 60 workflows", () => {
    expect(CORE_LIBRARY).toHaveLength(25);
    expect(GROWTH_EXTENSION).toHaveLength(22);
    expect(SCALE_EXTENSION).toHaveLength(13);
    expect(WORKFLOW_CATALOG).toHaveLength(60);
  });

  it("has unique IDs covering W01..W60 with no extras or drops", () => {
    const ids = WORKFLOW_CATALOG.map((w) => w.id).sort();
    const expected = Array.from({ length: 60 }, (_, i) => `W${String(i + 1).padStart(2, "0")}`).sort();
    expect(ids).toEqual(expected);
  });

  it("owners are the 11 locked seats (plus the optional commerce module for W60 only)", () => {
    for (const w of WORKFLOW_CATALOG) {
      if (w.id === "W60") {
        expect(w.owner).toBe("Optional Commerce Module");
      } else {
        expect(ROSTER).toContain(w.owner);
      }
    }
  });

  it("common Core starter is 8 workflows, all from the Core library", () => {
    expect(COMMON_CORE_STARTER).toHaveLength(8);
    for (const w of COMMON_CORE_STARTER) {
      expect(w.minPlan).toBe("core");
    }
  });

  it("W25 lead nurture requires Growth (Core cannot run it)", () => {
    const w25 = WORKFLOW_CATALOG.find((w) => w.id === "W25")!;
    expect(w25.minPlan).toBe("growth");
  });
});
