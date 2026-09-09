export type HubSpotFormVariant = "demo" | "contact" | "newsletter";
export type HubSpotFieldValue = { name: string; value: string };

/** Known HubSpot internal names for the same consent checkbox. */
const CONSENT_ALIASES = ["consent", "form_consent_checkbox"] as const;

/**
 * Contact form GUID ebf145a0-… requires `form_consent_checkbox`.
 * Demo and newsletter still accept `consent` (verified: demo POST with consent → 200).
 */
export function hubSpotConsentFieldName(variant: HubSpotFormVariant): "consent" | "form_consent_checkbox" {
  return variant === "contact" ? "form_consent_checkbox" : "consent";
}

export function mentionedHubSpotFieldNames(errorBody: string): string[] {
  return Array.from(new Set(Array.from(errorBody.matchAll(/fields\.([a-zA-Z0-9_]+)/g)).map((m) => m[1])));
}

/**
 * One-shot 400 recovery.
 * - Required-field missing + we sent a known alias → retry WITH the required name.
 * - Otherwise drop payload fields HubSpot named (existing behaviour).
 * Returns null when a retry would resubmit the same body.
 */
export function resolveHubSpotRetryFields(
  fields: HubSpotFieldValue[],
  errorBody: string,
): HubSpotFieldValue[] | null {
  const mentioned = mentionedHubSpotFieldNames(errorBody);
  if (mentioned.length === 0) return null;

  const requiredMissing = /REQUIRED_FIELD/i.test(errorBody) || /required field '[^']+' is missing/i.test(errorBody);

  if (requiredMissing) {
    const remapped = fields.map((field) => ({ ...field }));
    let changed = false;
    for (const name of mentioned) {
      if (!(CONSENT_ALIASES as readonly string[]).includes(name)) continue;
      if (remapped.some((field) => field.name === name)) continue;
      const alias = CONSENT_ALIASES.find((candidate) => candidate !== name);
      if (!alias) continue;
      const index = remapped.findIndex((field) => field.name === alias);
      if (index >= 0) {
        remapped[index] = { ...remapped[index], name };
        changed = true;
      }
    }
    if (changed) return remapped;
  }

  const filtered = fields.filter((field) => !mentioned.includes(field.name));
  if (filtered.length > 0 && filtered.length < fields.length) return filtered;
  return null;
}
