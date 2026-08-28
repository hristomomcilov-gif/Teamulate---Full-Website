# Data Model

**Status:** target-state contract (spec §41–42). Phase 1 implements no database; the demo dashboard and future portal share the TypeScript vocabulary in `src/domain/`. Persistence, RLS and migrations arrive in Phase 2 (PostgreSQL per ADR-001/§40.1 fallback).

## Multi-tenant rule

Every tenant-owned record carries `organization_id` and is protected by database-level tenant filtering (RLS). Shared global records limited to: public content, workflow templates, integration catalog, plan definitions, feature definitions, non-tenant system config.

## Common tenant-table fields

`id`, `organization_id`, `created_at`, `updated_at`, `created_by_actor_type/id`, `updated_by_actor_type/id`, `version`, `archived_at?`, bounded `metadata` JSONB. Filtered/joined/authorized fields are explicit columns, never buried in JSON.

## Entity inventory (per spec §41.3)

Identity, Commercial, Onboarding, Strategy, Work, Campaigns, Assets, Approvals, Agents, Workflows, Integrations, Knowledge, Measurement, Pipeline, Operations, Audit — full table list mirrors spec §41.3 verbatim and will be refined into migrations in Phase 2.

## Canonical enums (implemented in `src/domain/enums.ts`)

- `RiskTier`: P0–P4
- `TaskStatus`: backlog, ready, in_progress, blocked, waiting_input, qa_review, changes_requested, awaiting_approval, scheduled, executing, completed, failed, cancelled, archived
- `CampaignStatus`: idea … archived (spec §26.1)
- `ApprovalStatus`: draft, pending, approved, rejected, changes_requested, expired, revoked, executing, executed, failed, partially_executed
- `IntegrationStatus`: not_connected … disconnected (spec §34.2)
- `DataFreshness`, `Confidence`, `ActorType`, `HealthState`, `AutonomyMode`, `ActionOutcome` (spec Appendix C)

## State machines (implemented in `src/domain/state-machines.ts`)

Task, approval, campaign, onboarding-stage, integration and incident transition maps encoded as data (allowed-transition maps) per spec §42, with `canTransition(from, to)` guards. Illegal transitions are domain errors; no partial state. Unit-tested in `src/tests/`.

## Approval token model (Phase 3)

Single action; bound to organization + object + action hash + approver + expiration; invalidated on execution/rejection/revocation/expiry; execution re-compares current action hash with approved hash; append-only audit on every transition (spec §27.5).

## Data freshness

Every imported dataset/derived metric exposes: source system, source timestamp, received/processed timestamps, freshness status, expected latency, completeness. Unknown data is rendered as `Not connected` / `Unavailable` / `Delayed` / `No data yet` — never `0`.
