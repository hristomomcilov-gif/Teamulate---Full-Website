import { z } from "zod";

/**
 * Public qualification form fields per spec §19.2. No passwords, API keys,
 * ad account IDs or confidential data are ever requested.
 */

export const COMPANY_SIZE_RANGES = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;
export const TEAM_SIZE_RANGES = ["0 (no dedicated marketer)", "1-2", "3-5", "6-10", "10+"] as const;
export const JOB_ROLES = [
  "Founder / CEO",
  "Marketing leader",
  "Operations / RevOps",
  "Finance",
  "IT / Security",
  "Other",
] as const;

const baseFields = {
  email: z.string().trim().toLowerCase().email("Enter a valid work email."),
  firstName: z.string().trim().min(1, "First name is required.").max(100),
  lastName: z.string().trim().min(1, "Last name is required.").max(100),
  company: z.string().trim().min(1, "Company is required.").max(200),
  consent: z.literal(true, { message: "Please acknowledge the privacy notice." }),
  idempotencyKey: z.string().uuid("Invalid submission key."),
  /** Honeypot: must stay empty. Bots that fill it are silently accepted and dropped. */
  website_url_confirm: z.string().max(0).optional().or(z.literal("")),
};

export const demoRequestSchema = z.object({
  ...baseFields,
  companyWebsite: z
    .string()
    .trim()
    .min(1, "Company website is required.")
    .max(300)
    .refine((v) => /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+([/?#].*)?$/i.test(v), "Enter a valid website address."),
  jobRole: z.enum(JOB_ROLES, { message: "Select your role." }),
  companySize: z.enum(COMPANY_SIZE_RANGES, { message: "Select a company size." }),
  marketingTeamSize: z.enum(TEAM_SIZE_RANGES, { message: "Select a team size." }),
  primaryChallenge: z.string().trim().min(1, "Tell us your primary challenge.").max(2000),
  currentStack: z.string().trim().max(1000).optional().or(z.literal("")),
  country: z.string().trim().min(1, "Country / region is required.").max(120),
});

export const contactSchema = z.object({
  ...baseFields,
  message: z.string().trim().min(1, "Message is required.").max(5000),
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
