import type { NextRequest } from "next/server";
import { newsletterSchema } from "@/lib/forms/schemas";
import { handlePublicSubmission } from "@/lib/forms/handler";

export async function POST(request: NextRequest) {
  return handlePublicSubmission(request, "newsletter", newsletterSchema);
}
