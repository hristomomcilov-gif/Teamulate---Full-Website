# Teamulate — Public Website & Client Portal

Teamulate is a managed autonomous marketing department for growing B2B companies. This repository contains the public website, the interactive product demo and (in later phases) the authenticated client portal and admin console.

**Canonical specification:** the Teamulate Master Website & Dashboard Technical Specification. Start with the docs below before changing code.

## Documentation (read first)

| File | Purpose |
|---|---|
| `docs/CURRENT_STATE_AUDIT.md` | What actually existed before this build (Phase 0 audit) |
| `docs/ROUTE_INVENTORY.md` | Every current and planned route with status and gates |
| `docs/ARCHITECTURE_DECISIONS.md` | ADRs for stack, tokens, forms, demo isolation and more |
| `docs/IMPLEMENTATION_STATUS.md` | Phase-by-phase progress, blockers and test status |
| `docs/DATA_MODEL.md` | Domain vocabulary, enums and state machines |
| `docs/API_AND_EVENT_CONTRACTS.md` | Implemented and target API/event contracts |
| `docs/SECURITY_MODEL.md` | Enforced and target security controls |
| `docs/ANALYTICS_EVENT_DICTIONARY.md` | Event names and property allowlist |
| `docs/CONTENT_MODEL.md` | Copy governance and claim guardrails |
| `docs/RELEASE_AND_ROLLBACK.md` | Release gates and per-feature rollback |
| `docs/KNOWN_GAPS_AND_ASSUMPTIONS.md` | Open assumptions and decisions needed |

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS 4 · Zod · Vitest. See ADR-001 for rationale (greenfield fallback per spec §40.1).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm test           # Vitest unit tests
npm run build
```

## Structure

```
src/
  app/            # Routes (public P0 pages, demo, api)
  components/     # Shared UI + client islands
  content/        # Approved copy, agents roster, plan data
  domain/         # Enums, state machines, orchestration contracts
  lib/            # Site config, analytics, forms, demo fixtures, flags
  tests/          # Vitest unit tests
docs/             # Audit, ADRs, contracts, status (source of truth)
```

## Ground rules (from the master spec)

- No secrets, client data or credentials in source control, prompts or logs.
- No fabricated testimonials, logos, numbers or claims. No placeholder routes.
- Pricing, positioning and public claims change only by decision of Chris.
- Unknown data is shown as `Not connected` / `No data yet` — never as `0`.
- Demo surfaces are labelled sample data and isolated from anything real.
