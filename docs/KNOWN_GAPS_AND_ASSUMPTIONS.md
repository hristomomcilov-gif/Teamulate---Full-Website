# Known Gaps and Assumptions

Marked per spec §1.3 — assumptions never silently become facts.

## Assumptions made in this build

| # | Assumption | Basis | Risk if wrong | Resolution owner |
|---|---|---|---|---|
| A1 | Production domain is `https://teamulate.ca` | Agent email format `…@teamulate.ca` in spec §12.4 | Canonicals/sitemap wrong — single constant in `src/lib/site.ts` | Chris |
| A2 | Spec fallback stack applies (repo was empty, no live site in this repository) | `CURRENT_STATE_AUDIT.md` | If a live site exists elsewhere, its stack takes precedence and this build becomes the migration target | Chris |
| A3 | Fallback design tokens (§7.2) and Inter font apply | No brand tokens found in source control | Token file swap needed | Chris |
| A4 | Trailing-slash URL form is canonical | Spec route registry uses trailing slashes | Central config change | — |
| A5 | English (Canada/US) public copy, no locale prefix | Spec §6.1 | — | — |
| A6 | Filesystem outbox (`.data/outbox/`) is acceptable until hosting decided | No infra provisioned | **Must** move to a durable store (DB/queue) before production traffic on serverless hosting | Chris + Phase 2 |

## Blockers requiring decisions from Chris (spec §66.2)

1. HubSpot portal + credentials for the CRM handoff.
2. Hosting provider and CI/CD target.
3. Legal counsel review of privacy/terms (placeholders are visibly labelled).
4. Final logo/wordmark (text wordmark in use).
5. Final public navigation labels (spec-derived defaults in use).
6. Which live Tenant 0 metrics may be public (Tenant 0 page deferred).
7. Which research assets publish first (research hub deferred).
8. Publicly stated response expectations for forms (confirmation copy makes no time promise, per §56.8).

## Content gaps (routes gated until real content exists)

- P1/P2 pillar, integrations, industries, research, compare, about and Tenant 0 pages — see `ROUTE_INVENTORY.md` for per-route gates.
- Case studies: no customers yet; route intentionally absent (spec §55.5).
- OG images: minimal branded fallback in use; per-content-type generation deferred.

## Technical debt / deferred hardening

- CSP header: deferred until analytics/vendor scripts are known (report-only rollout planned); other secure headers active.
- Real-device + screen-reader QA pass: pending manual run.
- Playwright E2E: deferred until Phase 2 introduces auth flows; Vitest unit coverage active.
- Rate limiting is in-memory (single instance); replace with durable store alongside A6.
- No cookie banner: no non-essential cookies are set in Phase 1; revisit when a consent-requiring vendor is added.
