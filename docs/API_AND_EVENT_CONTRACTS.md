# API and Event Contracts

## Implemented in Phase 1

### `POST /api/v1/public/demo-requests`

- Body validated by `demoRequestSchema` (`src/lib/forms/schemas.ts`): work email, first/last name, company, website, job role, company size range, marketing team size range, primary challenge, optional stack, country/region, consent acknowledgement, `idempotencyKey` (client-generated UUID), plus optional progressive-qualification step fields.
- Behavior: server-side validation → idempotency check → persist to secure outbox → CRM adapter hand-off (no-op until HubSpot credentials exist) → `202 { ok: true }`.
- Never returns provider errors or internal IDs. Error envelope below.

### `POST /api/v1/public/contact`

Same pipeline with the contact schema.

### Error envelope (spec §43.3)

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "…", "requestId": "req_…", "details": {} } }
```

No stack traces, SQL, secrets or internal exception text in public responses.

## Deferred endpoint groups (Phases 2–5)

The full `/api/v1/*` registry from spec §43.2 (me/organizations/goals/tasks/campaigns/approvals/workflows/integrations/knowledge/activity/audit/support) ships with the authenticated portal. Every request: identity → membership → capability → tenant boundary → object ownership → approval state → policy/spend limits → CSRF → rate limit → audit (spec §4.3).

## Domain events (target, spec §43.4–43.5)

Event envelope: `eventId`, `eventType`, `eventVersion`, `occurredAt`, `organizationId`, `actor`, `object`, `requestId`, `data`, `sensitivity`. Critical state→event transitions use a transactional outbox (spec §43.7). Webhooks: signature verification, staleness rejection, idempotent processing by provider event ID, async processing, dead-letter, delivery-gap alerting.

## Orchestration adapter (spec §5.3)

`AgentOrchestratorAdapter` interface is defined in `src/domain/orchestration.ts` (submitTask / cancelTask / getTaskStatus / ingestResult / healthCheck). Phase order: `MockOrchestratorAdapter` (fixtures/tests/demo) → `ManualBridgeAdapter` (Tenant 0) → `GrokBotAdapter` (only after integration method, auth, reliability and error handling are verified). UI never assumes a direct stable GrokBot API.

## Integration adapter (spec §16.4)

`IntegrationAdapter` interface reserved for Phase 4; write operations are never invoked directly from UI components — they create `ControlledActionRequest`s that pass the approval control plane.
