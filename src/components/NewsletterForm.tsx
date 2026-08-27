"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Static-hosting fallback: opens a prefilled email instead of POSTing.
 * Honest by design - no list is live yet and the copy says so.
 */
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "accepted">("idle");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Newsletter interest")}&body=${encodeURIComponent(
      `Please add me to the Teamulate updates list when it launches.\n\nMy email: ${email}`,
    )}`;
    window.location.href = mailto;
    setStatus("accepted");
  }

  if (status === "accepted") {
    return (
      <p role="status" className="rounded-full border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-900">
        Send the opened email draft and you are set. No list is live yet - you will not receive email until one
        exists.
      </p>
    );
  }

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
          className="min-h-12 flex-1 rounded-full border border-line bg-surface px-5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-brand"
        />
        <button
          type="submit"
          className="min-h-12 rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-[#4a38d8]"
        >
          Subscribe
        </button>
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-xs font-medium text-critical">
          {error}
        </p>
      ) : null}
      <p className="mt-2 text-xs text-ink-muted">No list yet. This does not add you to HubSpot.</p>
    </form>
  );
}
