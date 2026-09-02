/**
 * Explicit state machines per spec §42. Status is never inferred from
 * conversation text; transitions outside these maps are domain errors.
 */
import type { ApprovalStatus, CampaignStatus, IntegrationStatus, TaskStatus } from "./enums";

type TransitionMap<S extends string> = Readonly<Record<S, readonly S[]>>;

export const TASK_TRANSITIONS: TransitionMap<TaskStatus> = {
  backlog: ["ready"],
  ready: ["in_progress"],
  in_progress: ["blocked", "waiting_input", "qa_review", "failed"],
  blocked: ["ready", "cancelled"],
  waiting_input: ["ready", "cancelled"],
  qa_review: ["changes_requested", "awaiting_approval", "scheduled", "completed"],
  changes_requested: ["in_progress"],
  awaiting_approval: ["scheduled", "executing", "changes_requested", "cancelled"],
  scheduled: ["executing", "cancelled"],
  executing: ["completed", "failed", "rolled_back"],
  failed: ["ready", "cancelled", "incident"],
  completed: ["archived"],
  cancelled: [],
  rolled_back: [],
  incident: [],
  archived: [],
};

export const APPROVAL_TRANSITIONS: TransitionMap<ApprovalStatus> = {
  draft: ["pending"],
  pending: ["approved", "rejected", "changes_requested", "expired", "revoked"],
  changes_requested: ["draft"],
  approved: ["executing", "revoked", "expired"],
  executing: ["executed", "failed", "partially_executed"],
  executed: [], // immutable terminal state
  rejected: [],
  expired: [],
  revoked: [],
  failed: [],
  partially_executed: [],
};

export const CAMPAIGN_TRANSITIONS: TransitionMap<CampaignStatus> = {
  idea: ["research"],
  research: ["brief_draft"],
  brief_draft: ["awaiting_strategy_approval"],
  awaiting_strategy_approval: ["approved", "brief_draft", "cancelled"],
  approved: ["building"],
  building: ["qa"],
  qa: ["awaiting_launch_approval"],
  awaiting_launch_approval: ["scheduled", "building", "cancelled"],
  scheduled: ["live", "cancelled"],
  live: ["optimizing", "paused", "completed"],
  optimizing: ["live", "paused", "completed"],
  paused: ["live", "completed", "cancelled"],
  completed: ["archived"],
  cancelled: [],
  archived: [],
};

export const INTEGRATION_TRANSITIONS: TransitionMap<IntegrationStatus> = {
  not_connected: ["pending_authorization", "setup_required"],
  setup_required: ["pending_authorization"],
  pending_authorization: ["connected", "connected_read_only", "error"],
  connected: ["degraded", "auth_expiring", "paused", "disconnected"],
  connected_read_only: ["degraded", "auth_expiring", "paused", "disconnected"],
  auth_expiring: ["connected", "auth_expired"],
  auth_expired: ["pending_authorization", "disconnected"],
  degraded: ["connected", "error", "paused"],
  error: ["pending_authorization", "disconnected"],
  paused: ["connected", "disconnected"],
  disconnected: ["pending_authorization"],
};

export class IllegalTransitionError extends Error {
  constructor(entity: string, from: string, to: string) {
    super(`Illegal ${entity} transition: ${from} -> ${to}`);
    this.name = "IllegalTransitionError";
  }
}

export function canTransition<S extends string>(map: TransitionMap<S>, from: S, to: S): boolean {
  return (map[from] ?? []).includes(to);
}

export function assertTransition<S extends string>(entity: string, map: TransitionMap<S>, from: S, to: S): S {
  if (!canTransition(map, from, to)) {
    throw new IllegalTransitionError(entity, from, to);
  }
  return to;
}
