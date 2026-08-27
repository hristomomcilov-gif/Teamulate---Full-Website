"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-(--tm-radius-sm) border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-brand";

/**
 * Locked mechanism (27 Aug): credentials are checked against the Apache
 * Basic Auth realm on /app/ via fetch with an Authorization header, only on
 * explicit submit. Valid -> full navigation to /app/. 401 -> inline error.
 * No auto-redirect on load, no meta refresh, no credentials in the repo.
 */
export function LoginForm() {
  const [status, setStatus] = useState<"idle" | "checking">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");
    if (!username || !password) {
      setError("Enter your username and password.");
      return;
    }
    setStatus("checking");
    try {
      const res = await fetch("/app/", {
        headers: { Authorization: "Basic " + btoa(username + ":" + password) },
        credentials: "include",
      });
      if (res.ok) {
        window.location.replace("/app/");
        return;
      }
      setError(res.status === 401 ? "Wrong username or password" : "Sign-in is unavailable right now. Please try again.");
      setStatus("idle");
    } catch {
      setError("Sign-in is unavailable right now. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-medium text-ink">
          Username
        </label>
        <input id="username" name="username" type="text" autoComplete="username" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      {error ? (
        <p role="alert" className="rounded-(--tm-radius-sm) border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "checking"}
        className="min-h-11 w-full rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-[#4a38d8] disabled:opacity-60"
      >
        {status === "checking" ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
