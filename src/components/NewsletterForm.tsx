"use client";

import { useMemo, useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const idempotencyKey = useMemo(() => crypto.randomUUID(), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const email = new FormData(e.currentTarget).get("email");
    try {
      const res = await fetch("/api/v1/public/newsletter/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, idempotencyKey }),
      });
      if (res.status === 202) {
        setStatus("saved");
        return;
      }
      const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      setError(body?.error?.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setError("We could not reach the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "saved") {
    return (
      <p role="status" className="rounded-full border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-900">
        Saved. No list is live yet - you will not receive email until one exists.
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
          disabled={status === "submitting"}
          className="min-h-12 rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-[#4a38d8] disabled:opacity-60"
        >
          {status === "submitting" ? "Saving…" : "Subscribe"}
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
