# Analytics Event Dictionary

Transport: first-party `trackEvent()` in `src/lib/analytics.ts` → `window.dataLayer` (+ dev console). Vendor transports attach later without changing call sites (ADR-006). Demo interactions carry `surface: "demo"` and must never be mixed with authenticated product events. Essential auth/security telemetry (Phase 2) is separate from optional marketing analytics; the site functions if optional analytics is declined.

## Allowed properties (public events)

`route`, `ctaId`, `contentType`, `contentId`, `referrerCategory`, `utm*`, `sessionId` (anonymous), `viewportCategory`, `experimentVariant`, `surface`, `step`, `field` (name only, never value), `plan`, `errorCode`.

**Never sent:** form free text, emails, CRM values, confidential campaign names, client data, secrets.

## Public events (implemented where the surface exists in Phase 1)

| Event | Fired when | Key props |
|---|---|---|
| `page_viewed` | route change | route |
| `primary_cta_clicked` | primary CTA | ctaId, route |
| `secondary_cta_clicked` | secondary CTA | ctaId, route |
| `nav_item_clicked` | header/footer nav | ctaId |
| `workflow_demo_started` / `_step_viewed` / `_completed` | how-it-works guided example | step |
| `dashboard_demo_opened` | `/demo/dashboard/` mount | surface=demo |
| `dashboard_demo_interaction` | tab change, approval decision, reset | surface=demo, ctaId |
| `pricing_plan_viewed` | plan card in viewport | plan |
| `pricing_comparison_expanded` | comparison toggle | — |
| `research_asset_viewed` / `research_pdf_downloaded` | (deferred with research hub) | contentId |
| `form_viewed` / `form_started` / `form_validation_error` / `form_submitted` / `form_accepted` | lead forms | route, field (errors), errorCode |
| `login_clicked` | header login | — |

## Authenticated product events (Phase 2+)

`login_succeeded`, `organization_switched`, `overview_viewed`, `goal_created`, `goal_activated`, `work_requested`, `task_opened`, `campaign_opened`, `approval_opened`, `approval_decided`, `asset_downloaded`, `workflow_run_requested`, `workflow_run_opened`, `integration_connect_started`, `integration_connected`, `knowledge_proposed`, `report_exported`, `support_ticket_created`, `settings_changed` — organization pseudonymous ID only when privacy policy and vendor configuration permit.

## Conversion attribution (spec §47.5)

Captured on form submission (server side): first known source, latest source, campaign/content/CTA, landing page. Self-reported source, CRM lifecycle progression and qualified/disqualified status attach when the CRM handoff activates. No causality claims beyond model.
