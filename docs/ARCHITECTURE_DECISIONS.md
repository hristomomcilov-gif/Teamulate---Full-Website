# Architecture Decision Records

ADR template fields: Title / Status / Context / Decision / Alternatives / Consequences / Security & privacy impact / Migration & rollback / Owner and date.

---

## ADR-001: Adopt the spec fallback stack (Next.js App Router + TypeScript + Tailwind)

- **Status:** accepted
- **Context:** The repo audit (`CURRENT_STATE_AUDIT.md`) found an empty repository. Spec §1.1 gives an existing stack precedence, but none exists; §40.1 defines the greenfield fallback.
- **Decision:** Next.js 16 (App Router), TypeScript strict, Tailwind CSS 4, Zod validation, Vitest for unit tests. Versions pinned via `package-lock.json`.
- **Alternatives:** Astro (weaker fit for the future authenticated dashboard); Remix (smaller ecosystem for this team); plain static site (cannot host the Phase 3+ portal in the same domain model).
- **Consequences:** One codebase serves marketing pages (static/server-rendered) and, later, the authenticated app under `/app`. Marketing pages ship minimal client JS.
- **Security/privacy:** Server-side validation on all API routes from day one; no client-trusted input.
- **Rollback:** Revert to commit `1a37126` (empty repo).
- **Owner:** Cursor agent, 2026-08-26.

## ADR-002: Fallback design tokens from spec §7.2

- **Status:** accepted
- **Context:** No existing brand tokens found in source control. Spec §7.2 provides an explicit fallback palette and says live brand tokens take precedence *after audit* — the audit found none.
- **Decision:** Implement the `--tm-*` CSS custom properties exactly as specified, exposed through Tailwind theme mapping. Typography: Inter (spec-approved fallback) with system sans fallback.
- **Consequences:** If Chris later provides live brand tokens, they replace values in one file (`src/app/globals.css`) without component changes.
- **Rollback:** Token file swap.

## ADR-003: Trailing-slash canonical URLs

- **Status:** accepted
- **Context:** Spec §6.1 says trailing slash "only if current framework already enforces it" — no current framework existed, and every route in the spec's own registry is written with a trailing slash.
- **Decision:** `trailingSlash: true` in `next.config.ts`; canonicals generated centrally in `src/lib/site.ts` (`absoluteUrl()`).
- **Consequences:** Consistent canonical form matching the spec registry; Next.js 308-redirects the non-slash variant.

## ADR-004: Lead capture via server-side outbox; HubSpot deferred behind an adapter seam

- **Status:** accepted
- **Context:** Spec §19.4 requires HubSpot handoff with graceful fallback ("store in secure outbox, alert operations and retry"). No HubSpot credentials exist in this environment, and secrets must never be invented or committed.
- **Decision:** `/api/v1/public/demo-requests` and `/api/v1/public/contact` validate with Zod, deduplicate via idempotency key, and persist to a server-side outbox (`.data/outbox/`, gitignored; on serverless hosting this must be re-pointed to a durable store before production — flagged in `KNOWN_GAPS_AND_ASSUMPTIONS.md`). CRM sync is an isolated `CrmAdapter` interface with a `NoopOutboxCrmAdapter` implementation; a `HubSpotCrmAdapter` is added when credentials are provisioned.
- **Alternatives:** Embedding HubSpot forms (rejected: no portal ID available, weaker validation control); blocking form launch on CRM setup (rejected: Phase 1 exit requires working submission).
- **Security/privacy:** No secrets in source; no form free-text sent to analytics; no HubSpot errors ever surfaced to visitors.
- **Rollback:** Forms can be disabled by feature flag in `src/lib/flags.ts`.

## ADR-005: Demo isolation

- **Status:** accepted
- **Context:** Spec §13.2 and §60 require a clearly fictional demo with no production reach.
- **Decision:** `/demo/dashboard/` is a client-side experience over deterministic fixtures in `src/lib/demo/fixtures.ts` ("Northstar Technical Services — Sample Company"). Demo state lives only in browser memory/session; a Reset control restores fixtures. Every screen renders a persistent "Interactive product demo — sample data, not a customer account" banner. Route is `noindex` and excluded from sitemap. No demo code path can call integration or CRM adapters.
- **Consequences:** Demo interactions are tagged `surface: "demo"` in analytics events so they never mix with product events.

## ADR-006: Analytics as a first-party event dictionary with a pluggable transport

- **Status:** accepted
- **Context:** Spec §47 defines events and forbids sending sensitive values to vendors. No analytics vendor is configured yet.
- **Decision:** `src/lib/analytics.ts` implements `trackEvent(name, props)` validating names against `ANALYTICS_EVENT_DICTIONARY.md`, pushing to `window.dataLayer` (created if absent) and console in development. Vendor transports attach later without touching call sites. Property allowlist enforced at the helper level.
- **Security/privacy:** No form free text, emails or client data in event properties.

## ADR-007: No placeholder route publication

- **Status:** accepted
- **Context:** Spec §6.2 phased routing rule.
- **Decision:** Only the 13 P0 routes ship. P1/P2 routes are not created as empty files; they are tracked in `ROUTE_INVENTORY.md` with blocking gates. `/privacy/` and `/terms/` ship with visibly labelled "pending legal review" status per Phase 1 scope ("privacy/terms placeholders pending legal review" is explicitly in the §62.2 build list); they are minimal, honest and carry no fabricated legal claims.

## ADR-008: State machines, multi-tenancy, auth, orchestration adapter — deferred, contracts documented

- **Status:** proposed (implementation in Phases 2–3)
- **Context:** Spec §62.8 forbids building the control plane before the public conversion layer and warns against skipping the tenant/security foundation.
- **Decision:** Domain contracts (enums, state machines, approval token model, orchestration adapter interface) are documented now in `DATA_MODEL.md` and `API_AND_EVENT_CONTRACTS.md`, and TypeScript enum/type definitions live in `src/domain/` so the demo fixtures and future app share one vocabulary. No database, auth or RLS is implemented in Phase 1.
- **Consequences:** Demo and Tenant 0 can later use the same domain model with different adapters/data (Phase 3 exit criterion).
