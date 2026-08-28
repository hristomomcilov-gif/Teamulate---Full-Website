import { HubSpotForm } from "@/components/HubSpotForm";

/**
 * Footer newsletter: email-only, submits to HubSpot (form 75437d08-…).
 * Copy is honest about what actually happens: the email is stored in
 * HubSpot as interest in future updates; no regular cadence exists yet.
 */
export function NewsletterForm() {
  return (
    <div>
      <HubSpotForm
        formId="75437d08-8527-461c-8169-9cb6f12e4d79"
        variant="newsletter"
        submitLabel="Subscribe"
        successMessage="Saved - your email is stored in HubSpot for future Teamulate updates. No regular newsletter exists yet, so you will only hear from us when real updates ship."
      />
      <p className="mt-2 text-xs text-ink-muted">
        Submitting stores your email in HubSpot as interest in future Teamulate updates. There is no regular newsletter
        cadence yet - you will not receive a blast until one exists.
      </p>
    </div>
  );
}
