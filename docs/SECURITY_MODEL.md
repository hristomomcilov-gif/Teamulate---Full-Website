# Security Model

**Scope of this document:** what is enforced in Phase 1, and the binding target-state controls for Phases 2+ (spec §45).

## Enforced in Phase 1

- **No secrets in source control.** No API keys, tokens, credentials or client data anywhere in the repo, prompts or logs. Verified before each commit.
- **Server-side validation** on all public API routes (Zod). Client input is never trusted; organization/tenant concepts do not exist yet on the public surface.
- **No account enumeration:** the login shell exposes no credential form until Phase 2 auth ships.
- **Form abuse resistance:** per-IP in-memory rate limiting on public form endpoints, idempotency keys prevent duplicate records, honeypot field rejects naive bots silently.
- **Demo isolation:** `/demo/dashboard/` runs entirely on client-side fixture state; it has no code path to CRM, integrations or any backend mutation. Labelled sample data on every screen; `noindex`.
- **No sensitive data to analytics:** event property allowlist enforced in `src/lib/analytics.ts`; form free text and emails are excluded.
- **Secure headers** configured in `next.config.ts`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` minimal.
- **Error hygiene:** public error envelope only; no stack traces or internals.

## Target-state controls (Phase 2+, binding)

- Tenant isolation: `organization_id` on every tenant record + Postgres RLS; automated Org A / Org B isolation tests in CI; separate client-owned GrokBot/AWS accounts; no shared browser sessions or broad admin accounts across clients.
- Identity: MFA for privileged roles, least privilege, short-lived tokens, session rotation, re-auth for P4, capability-based permissions (spec §4.3) enforced at backend/database layer — hidden links and disabled buttons are not security controls.
- Secrets: managed vault only; referenced by connection ID; masked in logs/UI; rotation policy; disconnect revokes tokens/webhooks.
- Approval enforcement: risk tier assigned by policy; approval hash binds exact action; P3/P4 require valid server-side token at execution time; P2 requires policy + QA; spend/action limits enforced independently; bulk approval disabled for P3/P4.
- Prompt-injection defense: all external content (email, web, uploads, CRM notes, tool outputs) treated as untrusted; instructions separated from content; tool allowlists; quarantine for suspicious attachments; injection indicators recorded.
- Kill switch: pause workflow / integration writes / all tenant external writes / orchestration dispatch / identities; global emergency stop for Teamulate admin; state highly visible and audited.
- Audit: append-only, tenant-scoped, actor + object + policy + approval + before/after hash + outcome; exports audited; cross-tenant reads require reason.
- File uploads: MIME + extension validation, size limits, scan/quarantine, private-by-default storage, signed time-limited URLs, no execution, metadata stripping.
- Offboarding: 12-step sequence per spec §45.12.

## Security acceptance tests (Phase 2/3 CI gates, from spec §45.13)

Org A cannot read Org B by guessed ID · service identity cannot broaden scope · P3 fails without approval · modified payload invalidates approval · revoked approval cannot execute · expired session rejected · preview builds cannot access production secrets · invalid webhook signature rejected · duplicate webhook does not duplicate action · MIME-mismatch quarantined · kill switch blocks writes · audit survives object archive.

## Prohibited claims (enforced in content)

No SOC 2 / ISO 27001 / HIPAA / PCI claims, no "military-grade encryption", no universal data-residency claims, no claim that separate agents in one GrokBot account are isolated security boundaries. `/security-governance/` carries the required disclaimer verbatim (spec §15.3).
