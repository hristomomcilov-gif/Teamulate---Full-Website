import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  hubSpotConsentFieldName,
  mentionedHubSpotFieldNames,
  resolveHubSpotRetryFields,
} from "@/lib/forms/hubspot-fields";

const HUBSPOT_FORM = resolve(process.cwd(), "src/components/HubSpotForm.tsx");

const CONTACT_REQUIRED_MISSING = JSON.stringify({
  status: "error",
  message: "Error in 'fields.form_consent_checkbox'. Required field 'form_consent_checkbox' is missing",
  errors: [{ errorType: "REQUIRED_FIELD", message: "Required field 'form_consent_checkbox' is missing" }],
});

describe("hubSpotConsentFieldName", () => {
  it("sends form_consent_checkbox on contact and consent on demo/newsletter", () => {
    expect(hubSpotConsentFieldName("contact")).toBe("form_consent_checkbox");
    expect(hubSpotConsentFieldName("demo")).toBe("consent");
    expect(hubSpotConsentFieldName("newsletter")).toBe("consent");
  });
});

describe("HubSpotForm HTML checkbox", () => {
  it("keeps the input name as consent for client-side validation", () => {
    const source = readFileSync(HUBSPOT_FORM, "utf8");
    const checkboxNames = [...source.matchAll(/type="checkbox" name="([^"]+)"/g)].map((match) => match[1]);
    expect(checkboxNames.length).toBeGreaterThan(0);
    expect(checkboxNames.every((name) => name === "consent")).toBe(true);
    expect(source).toContain('data.get("consent")');
  });
});

describe("resolveHubSpotRetryFields", () => {
  const contactFields = [
    { name: "email", value: "jane@example.com" },
    { name: "firstname", value: "Jane" },
    { name: "consent", value: "true" },
  ];

  it("remaps consent → form_consent_checkbox when that required field is missing", () => {
    const retry = resolveHubSpotRetryFields(contactFields, CONTACT_REQUIRED_MISSING);
    expect(retry).toEqual([
      { name: "email", value: "jane@example.com" },
      { name: "firstname", value: "Jane" },
      { name: "form_consent_checkbox", value: "true" },
    ]);
    expect(retry?.some((field) => field.name === "consent")).toBe(false);
  });

  it("remaps form_consent_checkbox → consent in the reverse required-field case", () => {
    const retry = resolveHubSpotRetryFields(
      [
        { name: "email", value: "jane@example.com" },
        { name: "form_consent_checkbox", value: "true" },
      ],
      "REQUIRED_FIELD Error in 'fields.consent'. Required field 'consent' is missing",
    );
    expect(retry).toEqual([
      { name: "email", value: "jane@example.com" },
      { name: "consent", value: "true" },
    ]);
  });

  it("does not resubmit the same body when the missing required field is not in the payload", () => {
    expect(
      resolveHubSpotRetryFields(
        [
          { name: "email", value: "jane@example.com" },
          { name: "consent", value: "true" },
        ],
        CONTACT_REQUIRED_MISSING,
      )?.find((field) => field.name === "form_consent_checkbox"),
    ).toBeTruthy();

    expect(
      resolveHubSpotRetryFields(
        [{ name: "email", value: "jane@example.com" }],
        CONTACT_REQUIRED_MISSING,
      ),
    ).toBeNull();
  });

  it("still drops unknown fields that are actually in the payload", () => {
    const retry = resolveHubSpotRetryFields(
      [
        { name: "email", value: "jane@example.com" },
        { name: "current_stack", value: "HubSpot" },
      ],
      "FIELD_NOT_IN_FORM_DEFINITION Error in 'fields.current_stack'",
    );
    expect(retry).toEqual([{ name: "email", value: "jane@example.com" }]);
  });

  it("extracts HubSpot field names from fields.* paths", () => {
    expect(mentionedHubSpotFieldNames(CONTACT_REQUIRED_MISSING)).toEqual(["form_consent_checkbox"]);
  });
});
