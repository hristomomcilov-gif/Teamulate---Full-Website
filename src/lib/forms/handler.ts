import { NextResponse, type NextRequest } from "next/server";
import type { ZodType } from "zod";
import { alreadySubmitted, persistSubmission, type OutboxRecord } from "./outbox";
import { getCrmAdapter } from "./crm";
import { isRateLimited } from "./rate-limit";
import { flags } from "@/lib/flags";

function requestId(): string {
  return `req_${crypto.randomUUID().replaceAll("-", "").slice(0, 20)}`;
}

function errorResponse(status: number, code: string, message: string, details?: Record<string, unknown>) {
  return NextResponse.json(
    { error: { code, message, requestId: requestId(), details: details ?? {} } },
    { status },
  );
}

/**
 * Shared pipeline for public lead forms (spec §19.4, §43):
 * rate limit → validate → honeypot → idempotency → persist to outbox → CRM adapter.
 * Never exposes provider errors or internal IDs to the visitor.
 */
export async function handlePublicSubmission(
  request: NextRequest,
  kind: OutboxRecord["kind"],
  schema: ZodType<{ idempotencyKey: string; website_url_confirm?: string }>,
): Promise<NextResponse> {
  if (!flags.leadFormsEnabled) {
    return errorResponse(503, "maintenance", "Submissions are temporarily unavailable. Please email us instead.");
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`${kind}:${ip}`)) {
    return errorResponse(429, "rate_limited", "Too many submissions. Please try again in a minute.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "validation_error", "Request body must be valid JSON.");
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path.join(".") || "form";
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return errorResponse(422, "validation_error", "Some fields need attention.", { fieldErrors });
  }

  const data = parsed.data;

  // Honeypot filled: pretend success, store nothing (spec: no account enumeration / bot feedback).
  if (data.website_url_confirm && data.website_url_confirm.length > 0) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  // Idempotent replay returns success without duplicating the record.
  if (await alreadySubmitted(data.idempotencyKey)) {
    return NextResponse.json({ ok: true, duplicate: true }, { status: 202 });
  }

  const url = new URL(request.url);
  const { idempotencyKey, website_url_confirm: _hp, ...payload } = data as Record<string, unknown> & {
    idempotencyKey: string;
    website_url_confirm?: string;
  };
  void _hp;

  const record: OutboxRecord = {
    id: `sub_${crypto.randomUUID()}`,
    kind,
    receivedAt: new Date().toISOString(),
    payload,
    attribution: {
      landingPath: request.headers.get("x-landing-path") ?? undefined,
      referrerCategory: request.headers.get("referer") ? "referral" : "direct",
      utmSource: url.searchParams.get("utm_source") ?? undefined,
      utmMedium: url.searchParams.get("utm_medium") ?? undefined,
      utmCampaign: url.searchParams.get("utm_campaign") ?? undefined,
      ctaId: request.headers.get("x-cta-id") ?? undefined,
    },
    crmSync: { status: "pending", attempts: 0 },
  };

  try {
    await persistSubmission(idempotencyKey, record);
  } catch {
    return errorResponse(500, "internal_error", "We could not save your request. Please try again or email us.");
  }

  // CRM adapter is a no-op until credentials exist; failures never block the visitor.
  try {
    await getCrmAdapter().syncSubmission(record);
  } catch {
    // Outbox retains the record for retry; never surface provider errors.
  }

  return NextResponse.json({ ok: true }, { status: 202 });
}
