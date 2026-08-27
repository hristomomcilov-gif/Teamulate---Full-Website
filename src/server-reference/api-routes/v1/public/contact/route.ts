import type { NextRequest } from "next/server";
import { contactSchema } from "@/lib/forms/schemas";
import { handlePublicSubmission } from "@/lib/forms/handler";

export async function POST(request: NextRequest) {
  return handlePublicSubmission(request, "contact", contactSchema);
}
