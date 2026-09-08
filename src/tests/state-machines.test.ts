import { describe, expect, it } from "vitest";
import {
  APPROVAL_TRANSITIONS,
  CAMPAIGN_TRANSITIONS,
  INTEGRATION_TRANSITIONS,
  IllegalTransitionError,
  TASK_TRANSITIONS,
  assertTransition,
  canTransition,
} from "@/domain/state-machines";

describe("task state machine (spec §42.2)", () => {
  it("allows the documented happy path", () => {
    expect(canTransition(TASK_TRANSITIONS, "backlog", "ready")).toBe(true);
    expect(canTransition(TASK_TRANSITIONS, "ready", "in_progress")).toBe(true);
    expect(canTransition(TASK_TRANSITIONS, "in_progress", "qa_review")).toBe(true);
    expect(canTransition(TASK_TRANSITIONS, "qa_review", "awaiting_approval")).toBe(true);
    expect(canTransition(TASK_TRANSITIONS, "awaiting_approval", "executing")).toBe(true);
    expect(canTransition(TASK_TRANSITIONS, "executing", "completed")).toBe(true);
    expect(canTransition(TASK_TRANSITIONS, "completed", "archived")).toBe(true);
  });

  it("rejects illegal transitions with a domain error", () => {
    expect(canTransition(TASK_TRANSITIONS, "backlog", "completed")).toBe(false);
    expect(() => assertTransition("task", TASK_TRANSITIONS, "backlog", "completed")).toThrow(IllegalTransitionError);
  });
});

describe("approval state machine (spec §42.3)", () => {
  it("executed is an immutable terminal state", () => {
    expect(APPROVAL_TRANSITIONS.executed).toHaveLength(0);
  });

  it("pending can be decided, expired or revoked", () => {
    for (const to of ["approved", "rejected", "changes_requested", "expired", "revoked"] as const) {
      expect(canTransition(APPROVAL_TRANSITIONS, "pending", to)).toBe(true);
    }
  });

  it("an approval cannot jump from draft to executing", () => {
    expect(canTransition(APPROVAL_TRANSITIONS, "draft", "executing")).toBe(false);
  });
});

describe("campaign state machine (spec §42.4)", () => {
  it("launch requires the approval gate", () => {
    expect(canTransition(CAMPAIGN_TRANSITIONS, "qa", "live")).toBe(false);
    expect(canTransition(CAMPAIGN_TRANSITIONS, "qa", "awaiting_launch_approval")).toBe(true);
    expect(canTransition(CAMPAIGN_TRANSITIONS, "awaiting_launch_approval", "scheduled")).toBe(true);
    expect(canTransition(CAMPAIGN_TRANSITIONS, "scheduled", "live")).toBe(true);
  });
});

describe("integration state machine (spec §42.6)", () => {
  it("expired auth requires reauthorization", () => {
    expect(canTransition(INTEGRATION_TRANSITIONS, "auth_expired", "connected")).toBe(false);
    expect(canTransition(INTEGRATION_TRANSITIONS, "auth_expired", "pending_authorization")).toBe(true);
  });
});
