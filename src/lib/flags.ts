/**
 * Minimal feature flags for Phase 1 rollback paths
 * (docs/RELEASE_AND_ROLLBACK.md). A full flag service with environment,
 * organization and role scoping arrives with the admin console (spec §39.4).
 */
export const flags = {
  leadFormsEnabled: true,
  demoDashboardEnabled: true,
} as const;
