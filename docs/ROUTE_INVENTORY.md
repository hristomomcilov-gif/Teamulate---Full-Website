# Route Inventory

**Status legend:** `create` (new in this build), `deferred` (target state, gated by phase), `absent` (not yet started).
There were no pre-existing routes, so no `keep`, `revise`, `merge`, `redirect` or `retire` entries exist.

## Public routes — P0 (Phase 1, this build)

| Route | Status | In navigation | In sitemap | Notes |
|---|---|---|---|---|
| `/` | create | yes | yes | Homepage per spec §9 |
| `/autonomous-ai-marketing-department/` | create | yes | yes | Core product page §10 |
| `/how-it-works/` | create | yes | yes | Operating model §11 |
| `/team/` | create | yes | yes | 11-agent team §12 |
| `/dashboard/` | create | yes | yes | Dashboard product proof page §13.1 |
| `/demo/dashboard/` | create | yes (CTA) | **no** | Interactive sample data demo §13.2; `noindex` |
| `/pricing/` | create | yes | yes | Core/Growth/Scale §14 |
| `/security-governance/` | create | yes | yes | P0–P4 model §15 |
| `/contact/` | create | yes (footer) | yes | Qualification form §19 |
| `/request-demo/` | create | yes (CTA) | yes | Focused conversion form §19 |
| `/login/` | create | yes (header) | no | Auth entry shell; sign-in enabled in Phase 2 |
| `/privacy/` | create | footer | yes | Placeholder pending legal review (labelled) |
| `/terms/` | create | footer | yes | Placeholder pending legal review (labelled) |

## SEO launch pages (created 2026-08-27, indexable, in sitemap)

| Route | Status | Notes |
|---|---|---|
| `/ai-marketing-team/` | create | Definition pillar; FAQ schema; 11 named seats |
| `/ai-marketing-automation/` | create | MOFU contrast (TM-09 lock); comparison table; FAQ schema |
| `/workflows/` | create | Entitlement Matrix v1.0 (27 Aug): 60 eligible workflows W01-W60, activate 8/20/35 by plan; ItemList + FAQ schema |
| `/research/marketing-team-cost-2026/` | create | Honest cost page from 21 Aug 2026 master research; Article schema; author Chris Momchilov, Barrie |
| `/compare/ai-vs-agency-vs-fractional-vs-inhouse/` | create | Four-option comparison, no fake metrics; FAQ schema |

## Public routes — P1/P2 (deferred, feature-gated, not in nav or sitemap)

| Route | Status | Blocking gate |
|---|---|---|
| `/ai-agents-for-marketing/` | absent | Final approved pillar content |
| `/integrations/` + provider pages | absent | Tested connector or documented manual path (spec §16.1) |
| `/industries/` + vertical pages | absent | Non-generic vertical content (spec §17 warning) |
| `/compare/ai-vs-agency-vs-fractional-vs-inhouse/` | absent | Approved comparison content |
| `/research/` + flagship assets | absent | Methodology/source register per §18, §55.4 |
| `/geo-ai-search/` | absent | Approved capability content |
| `/about/`, `/teamulate-runs-teamulate/` | absent | Tenant 0 evidence to publish |
| `/resources/`, `/blog/`, `/case-studies/`, `/changelog/` | absent | Real content only; case studies require customer permission |
| `/acceptable-use/`, `/subprocessors/`, `/cookie-settings/` | absent | Legal review / consent tooling |

## Auth routes (Phase 2 — absent)

`/invite/[token]`, `/verify-email`, `/forgot-password`, `/reset-password/[token]`, `/mfa/*`, `/logout`, `/access-denied`

## App routes `/app/*` (Phases 2–5 — absent)

Full registry per spec §6.4. None published; the app shell ships only after auth + tenant RLS foundation (Phase 2 exit criteria).

## Admin routes `/admin/*` (Phase 6 — absent)

Full registry per spec §6.5.

## Routing conventions adopted

- Lowercase kebab-case; trailing slashes enforced via `trailingSlash: true` in `next.config.ts` (matches spec URL forms like `/how-it-works/`).
- Canonical URLs generated centrally from `src/lib/site.ts`.
- `/demo/*`, `/app/*`, `/admin/*`, `/api/*` excluded from sitemap and disallowed in robots.
- Locale prefix not implemented in v1; all UI copy routed through central constants so the architecture stays localization-ready.
