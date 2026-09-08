# Server reference code (disabled for static export)

The live site on SuperHosting is a **static Apache deployment** (no Node
runtime), so the Next.js route handlers that previously lived in
`src/app/api/` cannot run there. They are preserved here unchanged, together
with their supporting libraries (`src/lib/forms/handler.ts`, `outbox.ts`,
`crm.ts`, `rate-limit.ts`), so they can be moved back into `src/app/api/`
verbatim when the site returns to Node-capable hosting (Phase 2+).

While the static export is live:

- Lead / contact / newsletter forms are **HubSpot embeds** (portal 247113907,
  region na2; see `src/components/HubSpotForm.tsx`), restyled to the site
  tokens via `.tm-hs-form` CSS in `globals.css`. Submissions go straight to
  HubSpot - the earlier `mailto:` fallback is retired (28 Aug 2026).
- The server outbox, idempotency, rate limiting and CRM adapter pipeline
  remain offline; if a Node backend returns, these routes can complement or
  replace the embeds.
