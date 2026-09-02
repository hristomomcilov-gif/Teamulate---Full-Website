# Content Model

## Phase 1 approach

Public P0 pages are typed TypeScript content modules (`src/content/`) rendered by server components — no CMS yet (spec §40.1: CMS/MDX "only when editorial workflow requires it"). All approved directional copy comes verbatim from spec §56 (category sentence, hero, three benefits, 30-second explanation, control/dashboard/Tenant-0 messages, form confirmation). Core message, pricing and claims cannot be changed without a decision from Chris.

## Content document type (target, spec §18.3)

`ContentDocument` with type (research/guide/comparison/integration/industry/article/case-study/changelog), slug, status workflow (`draft → editorial_review → factual_review → brand_review → approved → scheduled → published → update_due → archived`), author/reviewer, methodology, source refs, fact labels, primary CTA, related routes, SEO metadata, MDX body. Implemented when the research hub ships (E27).

## Claim guardrails (enforced now)

Prohibited: "Fully autonomous", "Guaranteed leads/revenue", "Works with every tool", "Knows your business", "24/7 support", "Replaces your entire marketing team", "Trusted by thousands", fabricated testimonials/logos/results/certifications.

Allowed: "Autonomous for routine work, governed where it matters", "Always-on monitoring", "Works from an approved business knowledge base", "Supports a defined, client-approved stack", "Human oversight for strategy and high-impact decisions", "A dedicated marketing operating system inside the tools you already use".

## Claims registry (target, spec §55.3)

Each claim: exact wording, category, evidence, geography, approved channels, expiry/review date, owner, status, prohibited variants. Feeds Guardian QA and public rendering in Phase 5.

## Research quality gate (spec §55.4)

No research page publishes without: question+answer, methodology, source register, fact/assumption labels, updated date, author/reviewer, original value, internal links, CTA, mobile+a11y QA. Case studies additionally require real customer permission and evidence.

## Public page checklist

Appendix F checklist applies before any route enters navigation/sitemap; tracked per route in `ROUTE_INVENTORY.md`.
