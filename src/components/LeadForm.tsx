"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { COMPANY_SIZE_RANGES, JOB_ROLES, TEAM_SIZE_RANGES } from "@/lib/forms/schemas";
import { COPY } from "@/content/copy";

type Variant = "demo-request" | "contact";

type FieldErrors = Record<string, string>;

const inputClass =
  "w-full rounded-(--tm-radius-sm) border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-brand";

function Field({
  label,
  name,
  error,
  required = true,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-ink">
        {label}
        {required ? <span aria-hidden className="text-critical"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} role="alert" className="mt-1 text-xs font-medium text-critical">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function LeadForm({ variant }: { variant: Variant }) {
  const pathname = usePathname() ?? "";
  const [status, setStatus] = useState<"idle" | "submitting" | "accepted" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const startedRef = useRef(false);
  const idempotencyKey = useMemo(() => crypto.randomUUID(), []);

  useEffect(() => {
    trackEvent("form_viewed", { route: pathname });
  }, [pathname]);

  const onFirstInteraction = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("form_started", { route: pathname });
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setServerMessage(null);

    const formData = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.consent = formData.get("consent") === "on";
    payload.idempotencyKey = idempotencyKey;

    trackEvent("form_submitted", { route: pathname });

    try {
      // Trailing slash matches the canonical URL form (ADR-003) and avoids a 308 redirect.
      const endpoint =
        variant === "demo-request" ? "/api/v1/public/demo-requests/" : "/api/v1/public/contact/";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-landing-path": pathname },
        body: JSON.stringify(payload),
      });

      if (res.status === 202) {
        setStatus("accepted");
        trackEvent("form_accepted", { route: pathname });
        return;
      }

      const body = (await res.json().catch(() => null)) as
        | { error?: { code?: string; message?: string; details?: { fieldErrors?: FieldErrors } } }
        | null;
      const fieldErrors = body?.error?.details?.fieldErrors ?? {};
      setErrors(fieldErrors);
      setServerMessage(body?.error?.message ?? "Something went wrong. Please try again.");
      setStatus("error");
      for (const field of Object.keys(fieldErrors)) {
        trackEvent("form_validation_error", { route: pathname, field, errorCode: body?.error?.code ?? "unknown" });
      }
    } catch {
      setServerMessage("We could not reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "accepted") {
    return (
      <div role="status" className="rounded-(--tm-radius-md) border border-green-200 bg-green-50 p-6">
        <p className="text-base font-semibold text-green-900">Request received</p>
        <p className="mt-2 text-sm leading-relaxed text-green-900/80">{COPY.formConfirmation}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={onFirstInteraction} noValidate className="space-y-4">
      {/* Honeypot — hidden from real users and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website_url_confirm">Leave this field empty</label>
        <input id="website_url_confirm" name="website_url_confirm" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" error={errors.firstName}>
          <input id="firstName" name="firstName" autoComplete="given-name" className={inputClass} aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "firstName-error" : undefined} />
        </Field>
        <Field label="Last name" name="lastName" error={errors.lastName}>
          <input id="lastName" name="lastName" autoComplete="family-name" className={inputClass} aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "lastName-error" : undefined} />
        </Field>
      </div>

      <Field label="Work email" name="email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
      </Field>

      <Field label="Company" name="company" error={errors.company}>
        <input id="company" name="company" autoComplete="organization" className={inputClass} aria-invalid={!!errors.company} aria-describedby={errors.company ? "company-error" : undefined} />
      </Field>

      {variant === "demo-request" ? (
        <>
          <Field label="Company website" name="companyWebsite" error={errors.companyWebsite}>
            <input id="companyWebsite" name="companyWebsite" type="text" inputMode="url" placeholder="yourcompany.com" className={inputClass} aria-invalid={!!errors.companyWebsite} aria-describedby={errors.companyWebsite ? "companyWebsite-error" : undefined} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your role" name="jobRole" error={errors.jobRole}>
              <select id="jobRole" name="jobRole" defaultValue="" className={inputClass} aria-invalid={!!errors.jobRole}>
                <option value="" disabled>Select…</option>
                {JOB_ROLES.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </Field>
            <Field label="Country / region" name="country" error={errors.country}>
              <input id="country" name="country" autoComplete="country-name" className={inputClass} aria-invalid={!!errors.country} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company size" name="companySize" error={errors.companySize}>
              <select id="companySize" name="companySize" defaultValue="" className={inputClass} aria-invalid={!!errors.companySize}>
                <option value="" disabled>Select…</option>
                {COMPANY_SIZE_RANGES.map((range) => (
                  <option key={range} value={range}>{range} employees</option>
                ))}
              </select>
            </Field>
            <Field label="Marketing team size" name="marketingTeamSize" error={errors.marketingTeamSize}>
              <select id="marketingTeamSize" name="marketingTeamSize" defaultValue="" className={inputClass} aria-invalid={!!errors.marketingTeamSize}>
                <option value="" disabled>Select…</option>
                {TEAM_SIZE_RANGES.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Primary challenge" name="primaryChallenge" error={errors.primaryChallenge}>
            <textarea id="primaryChallenge" name="primaryChallenge" rows={3} className={inputClass} placeholder="What marketing work most needs to move forward?" aria-invalid={!!errors.primaryChallenge} />
          </Field>
          <Field label="Current CRM / marketing stack" name="currentStack" required={false} error={errors.currentStack}>
            <input id="currentStack" name="currentStack" className={inputClass} placeholder="e.g. HubSpot, WordPress, GA4, Google Ads (optional)" />
          </Field>
        </>
      ) : (
        <Field label="Message" name="message" error={errors.message}>
          <textarea id="message" name="message" rows={5} className={inputClass} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        </Field>
      )}

      <div>
        <label className="flex items-start gap-2.5 text-sm text-ink-muted">
          <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 rounded border-line" aria-describedby={errors.consent ? "consent-error" : undefined} />
          <span>
            I understand Teamulate will use this information to respond to my request, as described in the{" "}
            <a href="/privacy/" className="text-brand underline">privacy policy</a>. This is not a marketing
            subscription.
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" role="alert" className="mt-1 text-xs font-medium text-critical">{errors.consent}</p>
        ) : null}
      </div>

      {serverMessage ? (
        <p role="alert" className="rounded-(--tm-radius-sm) border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {serverMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-11 w-full rounded-(--tm-radius-sm) bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2f5ad0] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : variant === "demo-request" ? "Request demonstration" : "Submit inquiry"}
      </button>
      <p className="text-xs text-ink-muted">
        We never ask for passwords, API keys or confidential data in this form.
      </p>
    </form>
  );
}
