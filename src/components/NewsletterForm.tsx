import { HubSpotForm } from "@/components/HubSpotForm";

/**
 * Footer newsletter: email-only. Submission target is unchanged.
 * Visitor-facing copy must not name vendors.
 */
export function NewsletterForm() {
  return (
    <HubSpotForm
      formId="75437d08-8527-461c-8169-9cb6f12e4d79"
      variant="newsletter"
      submitLabel="Subscribe"
      successMessage="You're signed up for the newsletter."
    />
  );
}
