"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Full native Teamulate forms submitting to HubSpot Forms API v3
 * (portal 247113907, region na2). The UI keeps the complete live field set;
 * the payload sends every field under the locked property names below.
 *
 * HubSpot properties expected (standard: firstname, lastname, email,
 * company, website, jobtitle, country, message). CUSTOM properties that must
 * exist in the portal - create them as single-line/dropdown/multi-line
 * contact properties if missing:
 *   - company_size (dropdown: 1-10; 11-50; 51-200; 201-500; 500+)
 *   - marketing_team_size (dropdown: 0 (no dedicated marketer); 1-2; 3-5; 6-10; 10+)
 *   - primary_challenge (multi-line text)
 *   - current_stack (single-line text)
 *   - consent (single checkbox / boolean)
 * If the API rejects unknown fields (FIELD_NOT_IN_FORM_DEFINITION /
 * INVALID_FORM_FIELD), the submit automatically retries WITHOUT the rejected
 * fields so the lead is never lost, and logs the rejected names to the
 * console as `[hubspot] rejected fields: ...` for follow-up.
 *
 * Not the iframe embed by design: new-editor forms render in a sandboxed
 * iframe that site CSS cannot style (verified 28 Aug 2026).
 */

const PORTAL_ID = "247113907";
const SUBMIT_BASE = `https://api-na2.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}`;

export const JOB_ROLES = ["Founder / CEO", "Marketing leader", "Operations / RevOps", "Finance", "IT / Security", "Other"] as const;
export const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;
export const TEAM_SIZES = ["0 (no dedicated marketer)", "1-2", "3-5", "6-10", "10+"] as const;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const inputClass =
  "w-full rounded-(--tm-radius-sm) border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-brand focus:outline-none";

type Variant = "demo" | "contact" | "newsletter";
type FieldValue = { name: string; value: string };

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

async function postSubmission(formId: string, fields: FieldValue[]): Promise<Response> {
  const hutk = getCookie("hubspotutk");
  return fetch(`${SUBMIT_BASE}/${formId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: fields.map((f) => ({ objectTypeId: "0-1", name: f.name, value: f.value })),
      context: {
        pageUri: window.location.href,
        pageName: document.title,
        ...(hutk ? { hutk } : {}),
      },
    }),
  });
}

/** Submit with automatic one-shot retry that drops API-rejected field names. */
async function submitToHubSpot(formId: string, fields: FieldValue[]): Promise<boolean> {
  let res = await postSubmission(formId, fields);
  if (res.ok) return true;
  if (res.status === 400) {
    const body = await res.text().catch(() => "");
    const rejected = Array.from(new Set(Array.from(body.matchAll(/fields\.([a-zA-Z0-9_]+)/g)).map((m) => m[1])));
    if (rejected.length > 0) {
      console.warn("[hubspot] rejected fields:", rejected.join(", "), "- retrying without them");
      const filtered = fields.filter((f) => !rejected.includes(f.name));
      if (filtered.length > 0) {
        res = await postSubmission(formId, filtered);
        return res.ok;
      }
    }
  }
  return false;
}

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

export function HubSpotForm({
  formId,
  variant,
  submitLabel = "Submit",
  successMessage = "Thank you. We have received your request. The next step is a focused review of your goals, current stack and the recurring work you want to move forward.",
}: {
  formId: string;
  variant: Variant;
  submitLabel?: string;
  successMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "accepted" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();

    const nextErrors: Record<string, string> = {};
    const requireText = (name: string, message: string) => {
      if (!value(name)) nextErrors[name] = message;
    };

    const email = value("email").toLowerCase();
    if (!EMAIL_RE.test(email)) nextErrors.email = "Enter a valid work email.";

    if (variant !== "newsletter") {
      requireText("firstname", "First name is required.");
      requireText("lastname", "Last name is required.");
      requireText("company", "Company is required.");
      if (data.get("consent") !== "on") nextErrors.consent = "Please acknowledge the privacy notice.";
    }
    if (variant === "demo") {
      requireText("website", "Company website is required.");
      requireText("jobtitle", "Select your role.");
      requireText("country", "Country / region is required.");
      requireText("company_size", "Select a company size.");
      requireText("marketing_team_size", "Select a team size.");
      requireText("primary_challenge", "Tell us your primary challenge.");
    }
    if (variant === "contact") {
      requireText("message", "Message is required.");
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const fields: FieldValue[] = [{ name: "email", value: email }];
    const push = (name: string) => {
      const v = value(name);
      if (v) fields.push({ name, value: v });
    };
    if (variant !== "newsletter") {
      push("firstname");
      push("lastname");
      push("company");
      fields.push({ name: "consent", value: "true" });
    }
    if (variant === "demo") {
      push("website");
      push("jobtitle");
      push("country");
      push("company_size");
      push("marketing_team_size");
      push("primary_challenge");
      push("current_stack");
    }
    if (variant === "contact") {
      push("message");
    }

    setStatus("submitting");
    try {
      setStatus((await submitToHubSpot(formId, fields)) ? "accepted" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "accepted") {
    return (
      <div role="status" className="rounded-(--tm-radius-md) border border-green-200 bg-green-50 p-5">
        <p className="text-sm font-semibold leading-relaxed text-green-900">{successMessage}</p>
      </div>
    );
  }

  if (variant === "newsletter") {
    return (
      <form onSubmit={onSubmit} noValidate>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="min-h-12 flex-1 rounded-full border border-line bg-surface px-5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-brand focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="min-h-12 rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-[#4a38d8] disabled:opacity-60"
          >
            {status === "submitting" ? "Saving…" : submitLabel}
          </button>
        </div>
        {errors.email ? (
          <p role="alert" className="mt-2 text-xs font-medium text-critical">
            {errors.email}
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="mt-2 text-xs font-medium text-critical">
            Could not save right now - please try again, or email {CONTACT_EMAIL}.
          </p>
        ) : null}
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstname" error={errors.firstname}>
          <input id="firstname" name="firstname" autoComplete="given-name" className={inputClass} aria-invalid={!!errors.firstname} />
        </Field>
        <Field label="Last name" name="lastname" error={errors.lastname}>
          <input id="lastname" name="lastname" autoComplete="family-name" className={inputClass} aria-invalid={!!errors.lastname} />
        </Field>
      </div>

      <Field label="Work email" name="email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} />
      </Field>

      <Field label="Company" name="company" error={errors.company}>
        <input id="company" name="company" autoComplete="organization" className={inputClass} aria-invalid={!!errors.company} />
      </Field>

      {variant === "demo" ? (
        <>
          <Field label="Company website" name="website" error={errors.website}>
            <input id="website" name="website" type="text" inputMode="url" placeholder="yourcompany.com" className={inputClass} aria-invalid={!!errors.website} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your role" name="jobtitle" error={errors.jobtitle}>
              <select id="jobtitle" name="jobtitle" defaultValue="" className={inputClass} aria-invalid={!!errors.jobtitle}>
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
            <Field label="Company size" name="company_size" error={errors.company_size}>
              <select id="company_size" name="company_size" defaultValue="" className={inputClass} aria-invalid={!!errors.company_size}>
                <option value="" disabled>Select…</option>
                {COMPANY_SIZES.map((size) => (
                  <option key={size} value={size}>{size} employees</option>
                ))}
              </select>
            </Field>
            <Field label="Marketing team size" name="marketing_team_size" error={errors.marketing_team_size}>
              <select id="marketing_team_size" name="marketing_team_size" defaultValue="" className={inputClass} aria-invalid={!!errors.marketing_team_size}>
                <option value="" disabled>Select…</option>
                {TEAM_SIZES.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Primary challenge" name="primary_challenge" error={errors.primary_challenge}>
            <textarea id="primary_challenge" name="primary_challenge" rows={3} className={inputClass} placeholder="What marketing work most needs to move forward?" aria-invalid={!!errors.primary_challenge} />
          </Field>
          <Field label="Current CRM / marketing stack" name="current_stack" required={false}>
            <input id="current_stack" name="current_stack" className={inputClass} placeholder="e.g. HubSpot, WordPress, GA4, Google Ads (optional)" />
          </Field>
        </>
      ) : null}

      {variant === "contact" ? (
        <Field label="Message" name="message" error={errors.message}>
          <textarea id="message" name="message" rows={5} className={inputClass} aria-invalid={!!errors.message} />
        </Field>
      ) : null}

      <div>
        <label className="flex items-start gap-2.5 text-sm text-ink-muted">
          <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 rounded border-line accent-[#5b47f0]" aria-describedby={errors.consent ? "consent-error" : undefined} />
          <span>
            I understand Teamulate will use this information to respond to my request, as described in the{" "}
            <a href="/privacy/" className="text-brand underline">privacy policy</a>. This is not a marketing
            subscription.
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" role="alert" className="mt-1 text-xs font-medium text-critical">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p role="alert" className="rounded-(--tm-radius-sm) border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          The form could not submit right now. Please try again, or email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-11 w-full rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-[#4a38d8] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : submitLabel}
      </button>
    </form>
  );
}
