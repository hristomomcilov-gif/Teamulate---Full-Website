import type { NextRequest } from "next/server";
import { demoRequestSchema } from "@/lib/forms/schemas";
import { handlePublicSubmission } from "@/lib/forms/handler";

export async function POST(request: NextRequest) {
  return handlePublicSubmission(request, "demo-request", demoRequestSchema);
}
