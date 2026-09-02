# Implementation Status

**Last updated:** 2026-08-27 — **LIVE-approved static export for teamulate.ca** (Apache/SuperHosting, no Node). Chris approved go-live from this branch; Skipper deploys `teamulate-live-export.zip` via SFTP.

## Static-export deployment mode (2026-08-27)

- `next.config.ts`: `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`. The export in `out/` (zipped as `teamulate-live-export.zip`) drops onto the Apache document root; shop/demo folders on the live host are untouched by this repo.
- **Works fully static:** all 13 public routes, the interactive demo dashboard (client-side fixtures), robots.txt, sitemap.xml, favicon/apple icon, GA4.
- **Cannot run without Node (documented, preserved in `src/server-reference/`):** the form POST pipeline (API routes, server validation, outbox, idempotency, rate limiting, CRM adapter seam). Forms (28 Aug): HubSpot embeds - portal 247113907 (na2); demo request 10fb9f2d-fdae-47db-8ce8-f986de3a5e08, contact ebf145a0-8999-4d1d-ab8c-2cfd3610b888, footer newsletter 75437d08-8527-461c-8169-9cb6f12e4d79 - restyled to site tokens via .tm-hs-form CSS; the mailto fallback is retired. HubSpot loads only via the form components on marketing pages.
- **GA4:** official gtag with Measurement ID `G-N9TCF45QX6` in the root layout — applies only to this repo's marketing/demo routes; `/preview/` and shop paths are separate deployments and never receive the tag.
- **Apache to-do (server-side, not in repo to avoid touching shared docroot config):** security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) and `X-Robots-Tag: noindex` for `/demo/` — previously set via Next headers, now ignored in export mode.
- **27 Aug content lock verified:** 11 agents only (Strategos head + Scout, Wordsmith, Seeker, GrowthTrack, Pixel, Flow, Socialite, Nexus, Metric, Guardian); no AWS references; GrokBot included in subscription; prices locked to CAD (27 Aug evening lock, same numerals): Core C$7,500 + C$5,000/mo, Growth C$12,500 + C$7,500/mo, Scale C$20,000 + from C$12,000/mo; public savings claim 90%.

## SEO launch pages (2026-08-27, second export)

Six indexable routes shipped in the live visual system per Chief of Staff brief: `/autonomous-ai-marketing-department/` (beachhead rework with verbatim entity line + direct answer), `/ai-marketing-team/`, `/workflows/` (rewritten 27 Aug to Workflow Entitlement Matrix v1.0: 60 eligible W01-W60, Core 25 / Growth +22 / Scale +13, activate 8/20/35; ItemList + FAQ schema), `/ai-marketing-automation/` (TM-09 contrast), `/research/marketing-team-cost-2026/` (Article schema, author Chris Momchilov, Barrie; 10 RH roles, ~US$1,094,367 / ~C$875,210 loaded; research math: Core C$60,000/yr vs C$875,210 ≈93.1% lower (public rounded claim 90%); lean 4-FTE C$363,934 ≈83.5% shown as secondary research row only; Scout/Socialite/Guardian excluded as no RH line; full disclosure block), `/compare/ai-vs-agency-vs-fractional-vs-inhouse/`. Locked entity line rendered site-wide via footer. Homepage stat now "60 eligible library workflows"; all "18 named workflows" sales copy retired per Entitlement Matrix (the 18 operating titles remain only as an in-run illustration strip). Robots now also disallows `/preview/`; sitemap includes the six URLs and excludes preview/demo/app/admin/api/login. No Offer schema on cost/compare pages.

Previous status: Phase 0 + Phase 1 complete; homepage redesigned to founder-provided reference design — see `KNOWN_GAPS_AND_ASSUMPTIONS.md`, "Founder design direction".

## Phase 0 — Current-state audit and foundations

| Task | Status | Notes |
|---|---|---|
| Read full specification | done | |
| Repo / deployment audit | done | `CURRENT_STATE_AUDIT.md` — repo was empty; greenfield |
| Route inventory | done | `ROUTE_INVENTORY.md` |
| Design-token inventory | done | None existed; fallback tokens adopted (ADR-002) |
| Dependency / security review | done | Fresh lockfile; no secrets in repo |
| Analytics and form audit | done | None existed; dictionary created |
| Target architecture decisions | done | `ARCHITECTURE_DECISIONS.md` ADR-001..008 |
| Content gap map | done | See `KNOWN_GAPS_AND_ASSUMPTIONS.md` |
| Implementation status file | done | This file |

**Phase 0 exit criteria:** met. What exists and what will change is stated; no duplicate route/component strategy; pre-change state reproducible at commit `1a37126`; rollback path documented in `RELEASE_AND_ROLLBACK.md`.

## Phase 1 — Public conversion foundation

| Deliverable | Status | Notes |
|---|---|---|
| Global header/footer | done | `SiteHeader`, `SiteFooter`, mobile drawer, mega-menu groups per §8 |
| Homepage | done | All 14 sections per §9.3, approved copy from §56 |
| Core product page | done | §10 sections |
| How it works | done | §11 eight-stage journey + guided workflow example |
| Team page | done | §12, 11-agent roster with detail template |
| Dashboard product page | done | §13.1 |
| Public demo shell | done | `/demo/dashboard/` — 6 screens, sample-data banner, reset, approval interaction (§13.2, §60) |
| Pricing | done | §14 plan data, ownership disclaimer, FAQ |
| Security / governance | done | §15 incl. required disclaimer, no certification claims |
| Request-demo / contact forms | done | Zod-validated, idempotent, server outbox; CRM adapter seam (ADR-004) |
| Privacy / terms placeholders | done | Visibly labelled pending legal review |
| Login shell | done | Invitation-only message; sign-in activates in Phase 2 |
| Metadata, sitemap, robots | done | Demo/app/admin/api disallowed; canonical helper |
| Analytics events | done | First-party dictionary + `trackEvent` transport stub |
| HubSpot handoff | **blocked** | Requires HubSpot credentials/portal decision from Chris; outbox fallback active |
| Responsive / accessibility / performance QA | partial | Semantic HTML, skip link, keyboard nav, reduced-motion; manual screen-reader pass and real-device audit still to run |

**Phase 1 exit criteria:** visitor can understand the category, explore proof (demo) and submit a qualified request — met in code. No fabricated proof — verified. Formal mobile/a11y/perf gates — pending manual QA run (tracked below).

## Blockers requiring Chris

1. HubSpot portal / credentials for CRM handoff (outbox fallback in place).
2. Production domain confirmation (currently `https://teamulate.ca` assumed in `src/lib/site.ts` — see `KNOWN_GAPS_AND_ASSUMPTIONS.md`).
3. Legal counsel review of `/privacy/` and `/terms/`.
4. ~~Final logo / wordmark~~ — resolved 2026-08-26: founder-provided SVG logo integrated (header, footer, favicon, apple icon; source at `public/brand/teamulate-logo.svg`, inline component `src/components/BrandLogo.tsx`).
5. Decision on hosting provider (Vercel-compatible output; nothing provider-specific committed).
6. Which Tenant 0 metrics may be public (Tenant 0 page deferred until then).

## Phases 2–6

Not started, by design (spec §62.8 phase order rule). Domain vocabulary shared with the demo lives in `src/domain/` so Phase 3 reuses it.

## Test status (this batch)

- `npm run lint` — pass
- `npm run build` — pass (all routes compile, static where possible)
- `npm test` (Vitest) — pass: form schema validation, demo fixture determinism/state-machine legality, analytics allowlist
