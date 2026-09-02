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

## Founder design direction (2026-08-26)

Chris provided a homepage design reference (mobile screenshot) and asked for the homepage to match its content and look. Changes applied on that authority (rank 2 in the source-of-truth hierarchy, above the master spec):

- Hero H1 is now "Your AI Marketing Team" (spec §56 hero "A full marketing department. Without building one." moved to the footer tagline and final CTA, matching the reference).
- Primary brand accent switched to violet (`--tm-violet-600: #5b47f0`), pill-shaped CTAs, lavender surfaces, larger card radii.
- Added sections: "Chris Momchilov runs the department", 7-step Learn→Improve loop, "The system at a glance" (incl. "Up to 95% lower people-cost" — kept with the reference's methodology note and "Modeled, not a guarantee"; the full cost model must publish with the research hub), "What your team creates" gallery with generated mascot/product illustrations (decorative, labelled), dark "Simple pricing" section with channel envelopes, "What we can actually show" resources doors, light footer with newsletter interest capture ("No list yet" honest note).
- **Open question for Chris:** the reference shows a larger roster with different names (Intel, Web, Ops, Cine, Lifecycle as separate seats). The build keeps the spec's canonical 11-agent roster (Scout·INSIGHT, Flow·SITE, Nexus·OPS, Socialite·NURTURE) styled per the reference. Confirm the final public roster naming; a Cine (video) seat is not in the spec's 11.
- ~~Reference's "working 24/7" phrasing softened to "Always-on"~~ — resolved 2026-08-27: Chris explicitly approved the "24/7" hero chip (refers to always-on system operation, not human support; "24/7 support" remains prohibited). Same decision: hero chips are "11 Agents / 1 Dashboard / 24/7" with checkmarks, two hero CTAs ("See the team in action" → demo, "Book a Demo" → request form), and the demo-data ribbon on the hero mockup replaced by illustrative sample numbers with the visible "Not live customer numbers" caption retained as the §9.3 label.

## Founder product decision (2026-08-26): AWS removed, GrokBot included in subscription

Chris revised the infrastructure/cost model: clients no longer provision AWS, and GrokBot runs on its own computer with its own files and logins for clients, **included in the monthly Teamulate subscription** (not billed separately). This supersedes the master spec's §5.4/§14.2 wording ("Client owns AWS, GrokBot…"). All public copy updated accordingly (ownership disclaimer, homepage pricing note and FAQ, pricing page FAQ). Client-owned boundary now covers: martech subscriptions, advertising spend, data products, marketing accounts, data and assets. The security principles are unchanged: per-client environment isolation, scoped revocable access to client tools, no shared credentials across clients.

## Founder pricing decision (2026-08-27 evening): CAD lock

Public pricing switched from USD to CAD with the SAME numerals (no FX conversion, no ~C$ equivalents): Core C$7,500 + C$5,000/mo; Growth C$12,500 + C$7,500/mo (Most Popular); Scale C$20,000 + from C$12,000/mo. Public savings claim is 90% (homepage/marketing cards). The cost research page keeps the honest math: C$60,000/yr vs Canada 10-role C$875,210 ≈ 93.1%; lean 4-FTE C$363,934 ≈ 83.5% as a secondary research row; US 10-role benchmark shown as context without a cross-currency percentage. Existing disclosure (2026 salary benchmarks, software/ads excluded, no 1:1 output promise) retained.

## Blockers requiring decisions from Chris (spec §66.2)

1. ~~HubSpot portal + credentials~~ - resolved 2026-08-28: HubSpot embedded forms live on request-demo, contact and footer newsletter (portal 247113907, na2).
2. Hosting provider and CI/CD target.
3. Legal counsel review of privacy/terms (placeholders are visibly labelled).
4. ~~Final logo/wordmark~~ — resolved: founder-provided SVG integrated. Note: the logo gradient (#7A67D8 → #7058CF) is a softer purple than the UI brand violet (#5b47f0); confirm whether UI accents should be retuned to the logo palette.
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
