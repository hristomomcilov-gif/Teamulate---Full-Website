# Server reference code (disabled for static export)

The live site on SuperHosting is a **static Apache deployment** (no Node
runtime), so the Next.js route handlers that previously lived in
`src/app/api/` cannot run there. They are preserved here unchanged, together
with their supporting libraries (`src/lib/forms/handler.ts`, `outbox.ts`,
`crm.ts`, `rate-limit.ts`), so they can be moved back into `src/app/api/`
verbatim when the site returns to Node-capable hosting (Phase 2+).

While the static export is live:

- Lead / contact / newsletter forms use a client-side `mailto:` fallback to
  `contact@teamulate.ca` (see `src/components/LeadForm.tsx` and
  `NewsletterForm.tsx`). No POST endpoint exists.
- The server outbox, idempotency, rate limiting and CRM adapter pipeline are
  offline. Submissions arrive as email instead.
- Form analytics events (`form_submitted` / `form_accepted`) still fire via
  GA4 on the client.
