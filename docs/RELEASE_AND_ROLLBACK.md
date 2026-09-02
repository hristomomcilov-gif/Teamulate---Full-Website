# Release and Rollback

## Current pipeline (Phase 1)

1. Feature branch → pull request against protected `main`.
2. CI expectations: `npm run lint`, `npm test`, `npm run build` must pass (workflow to be added when hosting/CI provider is confirmed by Chris).
3. Preview deployment per PR once hosting is connected (Vercel-compatible output; no provider lock-in committed).
4. Production deploy from `main` only.

## Release gates (spec §53.4)

Acceptance criteria passed · critical tests green · no known P0 security defects · monitoring ready · rollback ready · content approved for public routes · analytics events documented · migrations reviewed (n/a until Phase 2) · feature flags configured.

## Rollback paths by feature

| Feature | Rollback |
|---|---|
| Entire Phase 0/1 change set | Revert to commit `1a37126` (empty repo baseline) |
| Any public page/content | Revert the content module commit; pages are stateless |
| Lead forms | Disable via `flags.leadFormsEnabled` (`src/lib/flags.ts`); CTA falls back to `mailto:` contact |
| Demo dashboard | Remove route from nav + set `flags.demoDashboardEnabled = false`; route returns 404 |
| Analytics | Transport no-ops when disabled; no vendor coupling |
| Sitemap/robots | Generated from route registry; single-file revert |
| Outbox submissions | Data-at-rest in `.data/outbox/` (or durable store in production); export before any destructive change |

## Database migrations

None exist in Phase 1. From Phase 2: forward + rollback/compensation plan per migration, no destructive column removal in the same release as dependent code, bounded backfills, old+new schema compatibility during the migration window, fixture-tested tenant migrations.

## Incident rollback options (target)

Application version rollback · feature flag off · integration write pause · workflow pause · database forward-fix/restore · asset version restore · public redirect/unpublish.
