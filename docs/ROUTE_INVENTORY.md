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
| `/resources/`, `/case-studies/`, `/changelog/` | absent | Real content only; case studies require customer permission |
| `/blog/` | create | Blog index. Header + footer nav. Cards: Who AI Search Cites in 2026 (index card only; article is a live static page, source not in this repo) and 11 vs 11. |
| `/blog/11-human-hires-vs-11-ai-specialists/` | create | First article from the August 2026 11 vs 11 report. Public savings copy locked at 90%. |
| `/acceptable-use/`, `/subprocessors/`, `/cookie-settings/` | absent | Legal review / consent tooling |

## Vertical hub — preview / staging only (Gate A, Batch W1)

| Route | Status | In navigation | In sitemap | Notes |
|---|---|---|---|---|
| `/for/msp-managed-it-cyber/` | create (preview) | no | **no** | MSP · managed IT · cyber hub from the V3.1 draft. `noindex,nofollow` until Chris gives an explicit publish yes; then flip robots, add to `SITEMAP_ROUTES` + `public/sitemap.xml` + `public/sitemap.php`. Wave A 2a on HOLD: no second MSP URL. Copy in `src/content/msp-hub.ts`; guardrails in `src/tests/msp-hub.test.ts`. |

## Preview drafts — `/preview/*` (noindex, never in nav or sitemap)

`/preview/` is a separate SuperHosting deployment (hosting/README.md). Routes here are review drafts: `robots` meta `noindex,nofollow`, `/preview/` disallowed in `robots.txt`, blocked by the sitemap generator, and stripped from the live-root zip by `scripts/export-live.sh`.

| Route | Status | In navigation | In sitemap | Notes |
|---|---|---|---|---|
| `/preview/team/` | create (preview draft, 8 Sep 2026) | no | **no** | Glassmorphism redesign of the `/team/` "How the department is organized" section (`src/components/team/DepartmentOrgChart.tsx`, copy in `src/content/team-chart.ts`). Same hero + final CTA as live `/team/`, shared SiteChrome. Live `/team/` is untouched. Locks: Strategos *prepares* the strategy; human oversight; 90% not 95%; no Barrie; no "fully autonomous". Guardrails in `src/tests/preview-team.test.ts`. |
| `/preview/site-message-v1/` | create (preview draft, 8 Sep 2026) | no | **no** | Homepage with the Site Message & Experience Audit deltas applied: problem-first hero, buyer-problem chooser, two-layer human control (named human decision owner + independent assurance), three outcome systems instead of the 11-card roster, Build Log panel (live items only, each linked), one CTA set (`Book a demo` → `/request-demo/`, `See the team in action` → `/team/`, `Try the demo dashboard` → `/demo/dashboard/`). P1: tenure "12 years", "Who runs it" → `/about-chris/`. Everything else (hero mockup, founder card, 90% glance card with `glance-90-coins-square.png`, asset gallery, pricing, resources, FAQ) is the shipped homepage markup. Copy in `src/content/site-message-v1.ts`, sections in `src/components/home/SiteMessageV1Sections.tsx`. Live `/` is untouched. Guardrails in `src/tests/site-message-v1.test.ts`. |

**Deploy (Flow):** run `./scripts/export-preview-team.sh` → `previews/preview-team.zip`. SFTP/extract its contents into **`teamulate.ca/preview/team/`** only (`index.html`, `*.txt`, `_next/`, `.htaccess` with `X-Robots-Tag: noindex, nofollow`). The bundle is self-contained (its assets are rewritten to `/preview/team/_next/`), so nothing is uploaded to the document root, `/_next/`, or `/team/`. To adopt the design on live `/team/`, replace the "Structure" section in `src/app/team/page.tsx` with `<DepartmentOrgChart />` (seat cards then anchor to the on-page profiles) and delete the preview route.

**Pixel assets for site message v1** live in `public/preview/site-message-v1/` (never under `/assets/`): `signature-workflow.svg` (Goal → Strategos *Reports to Chris* → Agents → Guardian + Metric → Client yes → Dashboard; the committed file is an interim render of that spec in the About-Chris diagram style until Pixel's original replaces it byte-for-byte) and `dashboard-hero-annotated.webp` (demo UI callouts only, sample data labelled sample). The hero renders the webp only when the file exists at build time and otherwise keeps the shipped `DashboardMockup`, so a missing binary never ships a broken image.

**Deploy site message v1 (Flow):** run `./scripts/export-preview-site-message.sh` → `previews/preview-site-message-v1.zip`. SFTP/extract into **`teamulate.ca/preview/site-message-v1/`** only; same self-contained layout (assets rewritten to `/preview/site-message-v1/_next/`, own noindex `.htaccess`, the Pixel assets alongside `index.html`). Nothing goes to the document root, `/_next/`, `demo/`, `app/` or the glance assets. **Live HOLD:** adopting it on `/` is a separate, explicit decision from Chris; the route inventory row above flips to `/` only then.

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
