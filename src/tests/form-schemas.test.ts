import { describe, expect, it } from "vitest";
import { contactSchema, demoRequestSchema } from "@/lib/forms/schemas";

const validDemoRequest = {
  email: "Jane.Doe@Example.com",
  firstName: "Jane",
  lastName: "Doe",
  company: "Example Corp",
  companyWebsite: "example.com",
  jobRole: "Marketing leader",
  companySize: "51-200",
  marketingTeamSize: "1-2",
  primaryChallenge: "Backlog grows faster than we can execute.",
  currentStack: "HubSpot, WordPress",
  country: "Canada",
  consent: true,
  idempotencyKey: "6f9619ff-8b86-4d01-b42d-00cf4fc964ff",
  website_url_confirm: "",
};

describe("demoRequestSchema (spec §19.2)", () => {
  it("accepts a valid submission and normalizes email", () => {
    const parsed = demoRequestSchema.parse(validDemoRequest);
    expect(parsed.email).toBe("jane.doe@example.com");
  });

  it("rejects missing consent", () => {
    const result = demoRequestSchema.safeParse({ ...validDemoRequest, consent: false });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email and website", () => {
    expect(demoRequestSchema.safeParse({ ...validDemoRequest, email: "not-an-email" }).success).toBe(false);
    expect(demoRequestSchema.safeParse({ ...validDemoRequest, companyWebsite: "not a url" }).success).toBe(false);
  });

  it("rejects a non-UUID idempotency key", () => {
    expect(demoRequestSchema.safeParse({ ...validDemoRequest, idempotencyKey: "abc" }).success).toBe(false);
  });

  it("rejects unknown enum values for ranges", () => {
    expect(demoRequestSchema.safeParse({ ...validDemoRequest, companySize: "a-lot" }).success).toBe(false);
  });
});

describe("contactSchema", () => {
  it("accepts a minimal valid contact", () => {
    const result = contactSchema.safeParse({
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Doe",
      company: "Example Corp",
      message: "Hello",
      consent: true,
      idempotencyKey: "6f9619ff-8b86-4d01-b42d-00cf4fc964ff",
      website_url_confirm: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty message", () => {
    const result = contactSchema.safeParse({
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Doe",
      company: "Example Corp",
      message: "",
      consent: true,
      idempotencyKey: "6f9619ff-8b86-4d01-b42d-00cf4fc964ff",
    });
    expect(result.success).toBe(false);
  });
});
