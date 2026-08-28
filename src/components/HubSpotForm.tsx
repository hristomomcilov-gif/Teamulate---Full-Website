"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * HubSpot form, Teamulate-styled (portal 247113907, region na2).
 *
 * Why not the official v2 embed: these form IDs were built in HubSpot's new
 * editor, so `hbspt.forms.create` renders them inside a sandboxed IFRAME
 * (verified 28 Aug 2026) - page CSS cannot restyle fields inside an iframe,
 * and the brief requires the fields to match the live Teamulate look.
 * Instead we render the exact fields each form defines (fetched from the
 * form definitions: First Name / Last Name / Email; newsletter is
 * email-only) with site markup, and submit to HubSpot's documented public
 * Forms Submission API v3. Submissions land in the same forms and portal.
 * No mailto fallback remains on submit.
 */

const PORTAL_ID = "247113907";
const SUBMIT_BASE = `https://api-na2.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}`;

const inputClass =
  "w-full rounded-(--tm-radius-sm) border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-brand focus:outline-none";

type Variant = "lead" | "newsletter";

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

async function submitToHubSpot(formId: string, fields: { name: string; value: string }[]): Promise<boolean> {
  const hutk = getCookie("hubspotutk");
  const res = await fetch(`${SUBMIT_BASE}/${formId}`, {
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
  return res.ok;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function HubSpotForm({
  formId,
  variant = "lead",
  submitLabel = "Submit",
  successMessage = "Thank you. We have received your request. The next step is a focused review of your goals, current stack and the recurring work you want to move forward.",
}: {
  formId: string;
  variant?: Variant;
  submitLabel?: string;
  successMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "accepted" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim().toLowerCase();
    const firstname = String(data.get("firstname") ?? "").trim();
    const lastname = String(data.get("lastname") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!EMAIL_RE.test(email)) nextErrors.email = "Enter a valid email.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    const fields = [{ name: "email", value: email }];
    if (variant === "lead") {
      if (firstname) fields.push({ name: "firstname", value: firstname });
      if (lastname) fields.push({ name: "lastname", value: lastname });
    }
    try {
      const ok = await submitToHubSpot(formId, fields);
      setStatus(ok ? "accepted" : "error");
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
          <label htmlFor={`nl-email-${formId.slice(0, 8)}`} className="sr-only">
            Email address
          </label>
          <input
            id={`nl-email-${formId.slice(0, 8)}`}
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
        <div>
          <label htmlFor="firstname" className="mb-1 block text-sm font-medium text-ink">
            First Name
          </label>
          <input id="firstname" name="firstname" autoComplete="given-name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastname" className="mb-1 block text-sm font-medium text-ink">
            Last Name
          </label>
          <input id="lastname" name="lastname" autoComplete="family-name" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Email<span aria-hidden className="text-critical"> *</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="mt-1 text-xs font-medium text-critical">
            {errors.email}
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
