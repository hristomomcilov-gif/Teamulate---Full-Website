import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SETUP_BILLING_NOTE, SETUP_PERIOD_LEDE } from "@/content/plans";

function src(relative: string) {
  return readFileSync(resolve(process.cwd(), relative), "utf8");
}

const VISITOR_MARKETING_PAGES = [
  "src/app/page.tsx",
  "src/app/how-it-works/page.tsx",
  "src/app/pricing/page.tsx",
  "src/app/autonomous-ai-marketing-department/page.tsx",
  "src/app/ai-marketing-team/page.tsx",
  "src/app/ai-marketing-automation/page.tsx",
  "src/app/ai-agents-for-marketing/page.tsx",
  "src/content/copy.ts",
  "src/content/plans.ts",
];

describe("2026-09-09 Chris lock: public setup period is 30 days", () => {
  it("/how-it-works/ names First 30-Day Priorities and the 30-day nine-stage setup", () => {
    const page = src("src/app/how-it-works/page.tsx");
    expect(page).toContain("First 30-Day Priorities");
    expect(page).toContain(
      "That setup runs over 30 days: nine stages from scope to go-live, including a hypercare period after launch.",
    );
  });

  it("homepage onboarding FAQ carries the full Wordsmith answer", () => {
    const home = src("src/app/page.tsx");
    expect(home).toContain(
      "A structured nine-stage process: scope and authority, discovery, environment provisioning, integrations, measurement baseline, policy configuration, staging and QA, go-live, and a hypercare period. The initial setup period is 30 days — one month to stand up the operating department on your stack, with human approvals where they matter.",
    );
  });

  it("/pricing/ setup fee section states the 30-day setup period", () => {
    expect(SETUP_PERIOD_LEDE).toBe(
      "The setup fee covers the initial 30-day setup period — discovery through go-live and hypercare — so the department can run on your stack.",
    );
    expect(SETUP_BILLING_NOTE).toBe(
      "Monthly plans begin once setup is underway under the signed scope; the setup fee is due at the start of onboarding.",
    );
    const pricing = src("src/app/pricing/page.tsx");
    expect(pricing).toContain("SETUP_PERIOD_LEDE");
    expect(pricing).toContain("SETUP_BILLING_NOTE");
  });

  it("no visitor marketing page describes setup as 90 days", () => {
    for (const file of VISITOR_MARKETING_PAGES) {
      const text = src(file);
      expect(text, file).not.toContain("First 90-Day");
      expect(text, file).not.toContain("90-Day Priorities");
      expect(text, file).not.toMatch(/90[- ]day (setup|onboarding)/i);
    }
  });

  it("does not disturb the locked 'Up to 90%' people-cost claim", () => {
    expect(src("src/app/page.tsx")).toContain("Up to 90%");
  });
});
