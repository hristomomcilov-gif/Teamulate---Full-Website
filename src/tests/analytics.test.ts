import { describe, expect, it } from "vitest";
import { isPublicEvent, sanitizeProperties } from "@/lib/analytics";

describe("analytics allowlist (spec §47.4)", () => {
  it("recognizes dictionary events only", () => {
    expect(isPublicEvent("page_viewed")).toBe(true);
    expect(isPublicEvent("form_accepted")).toBe(true);
    expect(isPublicEvent("made_up_event")).toBe(false);
  });

  it("drops properties outside the allowlist (no PII leakage)", () => {
    const sanitized = sanitizeProperties({
      route: "/pricing/",
      plan: "growth",
      email: "jane@example.com",
      message: "confidential free text",
      primaryChallenge: "secret",
    });
    expect(sanitized).toEqual({ route: "/pricing/", plan: "growth" });
    expect(JSON.stringify(sanitized)).not.toContain("example.com");
  });
});
