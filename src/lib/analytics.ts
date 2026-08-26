/**
 * First-party analytics transport (ADR-006).
 * Event names and the property allowlist are governed by
 * docs/ANALYTICS_EVENT_DICTIONARY.md. Vendor transports attach here later
 * without changing call sites. Never pass form free text, emails or client
 * data — properties outside the allowlist are dropped.
 */

export const PUBLIC_EVENTS = [
  "page_viewed",
  "primary_cta_clicked",
  "secondary_cta_clicked",
  "nav_item_clicked",
  "workflow_demo_started",
  "workflow_demo_step_viewed",
  "workflow_demo_completed",
  "dashboard_demo_opened",
  "dashboard_demo_interaction",
  "pricing_plan_viewed",
  "pricing_comparison_expanded",
  "research_asset_viewed",
  "research_pdf_downloaded",
  "form_viewed",
  "form_started",
  "form_validation_error",
  "form_submitted",
  "form_accepted",
  "login_clicked",
] as const;

export type PublicEventName = (typeof PUBLIC_EVENTS)[number];

export const ALLOWED_PROPERTIES = [
  "route",
  "ctaId",
  "contentType",
  "contentId",
  "referrerCategory",
  "sessionId",
  "viewportCategory",
  "experimentVariant",
  "surface",
  "step",
  "field",
  "plan",
  "errorCode",
] as const;

type AllowedProperty = (typeof ALLOWED_PROPERTIES)[number];
export type EventProperties = Partial<Record<AllowedProperty, string | number>>;

export function sanitizeProperties(props: Record<string, unknown>): EventProperties {
  const out: EventProperties = {};
  for (const key of ALLOWED_PROPERTIES) {
    const value = props[key];
    if (typeof value === "string" || typeof value === "number") {
      out[key] = value;
    }
  }
  return out;
}

export function isPublicEvent(name: string): name is PublicEventName {
  return (PUBLIC_EVENTS as readonly string[]).includes(name);
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(name: PublicEventName, props: EventProperties = {}): void {
  if (typeof window === "undefined") return;
  if (!isPublicEvent(name)) return;
  const event = { event: name, ...sanitizeProperties(props) };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event);
  }
}
