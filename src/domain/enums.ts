/** Canonical enums per spec Appendix C and §41–42. Shared by demo fixtures and the future portal. */

export type RiskTier = "P0" | "P1" | "P2" | "P3" | "P4";
export type HealthState = "healthy" | "warning" | "degraded" | "critical" | "unknown";
export type DataFreshness = "live" | "fresh" | "delayed" | "stale" | "unavailable";
export type Confidence = "high" | "medium" | "low" | "unknown";
export type ActorType = "user" | "agent" | "service" | "system";
export type EvidenceStatus = "unverified" | "verified" | "approved" | "disputed" | "retired";
export type ActionOutcome = "success" | "failure" | "partial" | "blocked" | "rolled_back";
export type AutonomyMode =
  | "read_only"
  | "observe"
  | "recommend"
  | "draft"
  | "staging_execute"
  | "production_with_approval"
  | "bounded_autonomy"
  | "paused";

export type TaskStatus =
  | "backlog"
  | "ready"
  | "in_progress"
  | "blocked"
  | "waiting_input"
  | "qa_review"
  | "changes_requested"
  | "awaiting_approval"
  | "scheduled"
  | "executing"
  | "completed"
  | "failed"
  | "cancelled"
  | "rolled_back"
  | "incident"
  | "archived";

export type ApprovalStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "changes_requested"
  | "expired"
  | "revoked"
  | "executing"
  | "executed"
  | "failed"
  | "partially_executed";

export type CampaignStatus =
  | "idea"
  | "research"
  | "brief_draft"
  | "awaiting_strategy_approval"
  | "approved"
  | "building"
  | "qa"
  | "awaiting_launch_approval"
  | "scheduled"
  | "live"
  | "optimizing"
  | "paused"
  | "completed"
  | "cancelled"
  | "archived";

export type IntegrationStatus =
  | "not_connected"
  | "setup_required"
  | "pending_authorization"
  | "connected"
  | "connected_read_only"
  | "degraded"
  | "auth_expiring"
  | "auth_expired"
  | "error"
  | "paused"
  | "disconnected";

export type AgentType = "orchestrator" | "specialist" | "assurance";
export type AgentStatus = "available" | "working" | "waiting" | "blocked" | "degraded" | "offline";
