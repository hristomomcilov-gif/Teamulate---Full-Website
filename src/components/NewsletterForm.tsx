import { HubSpotForm } from "@/components/HubSpotForm";

/**
 * Footer newsletter: HubSpot embed (email-only), styled to the site tokens
 * via the .tm-hs-form--newsletter CSS. Honest by design - no list is live
 * yet and the note below says so.
 */
export function NewsletterForm() {
  return (
    <div>
      <HubSpotForm
        formId="75437d08-8527-461c-8169-9cb6f12e4d79"
        variant="newsletter"
        submitLabel="Subscribe"
        successMessage="Saved. We will only email you once updates actually exist."
      />
      <p className="mt-2 text-xs text-ink-muted">No list yet. This does not add you to a live mailing cadence.</p>
    </div>
  );
}
