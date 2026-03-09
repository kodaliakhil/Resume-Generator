import { NextRequest } from "next/server";
import { ResumeFormSchema, type ResumeFormData } from "@/lib/schemas/form";
import { compileResume } from "@/lib/compile/service";
import { sanitizeFilename } from "@/lib/compile/sandbox";
import { logger } from "@/lib/logger";
 
export const runtime = "nodejs";           // Ensure Node runtime (not edge) for spawn/tectonic
export const dynamic = "force-dynamic";    // Avoid static optimization
 
type ErrorBody = {
  code: string;
  message: string;
  details?: string; // redacted compile log
};
 
function jsonError(status: number, body: ErrorBody) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
 
export async function POST(req: NextRequest) {
  // 1) Parse and validate JSON body with Zod
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return jsonError(400, { code: "BAD_REQUEST", message: "Request body must be valid JSON." });
  }
 
  const parsed = ResumeFormSchema.safeParse(payload);
  if (!parsed.success) {
    return jsonError(422, {
      code: "VALIDATION_ERROR",
      message: "Invalid form data.",
      details: parsed.error.flatten().formErrors.join("; ")
    });
  }
 
  const data: ResumeFormData = parsed.data;
 
  // 2) Compile with service (includes caching, sandboxing, redacted logs)
  const result = await compileResume(data, {
    timeoutMs: 15000,       // default per NFR
    memoryLimitKb: undefined, // rely on container limits by default
    offline: true           // ensure no network at runtime
  });
 
  if (!result.ok) {
    // Surface redacted logs in "details", safe to return to client.
    return jsonError(500, {
      code: result.code,
      message: result.message,
      details: result.details
    });
  }
 
  // 3) Build filename from user's full name (sanitized)
  const base = sanitizeFilename(data.profile.fullName || "resume");
  const filename = `${base}-resume.pdf`;
 
  // 4) Stream PDF response with correct headers
  const pdfBytes = result.pdf;
  logger.info("compile ok", { usedCache: result.usedCache, cacheKey: result.cacheKey });
 
  return new Response(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(pdfBytes.byteLength),
      // Force download; frontend can change to inline if needed
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
}
 