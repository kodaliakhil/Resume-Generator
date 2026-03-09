import fs from "fs";
import path from "path";
import { mapToTemplateVars } from "@/lib/latex/mapping";
import { renderTemplate } from "@/lib/latex/template";
import { compileCache } from "./cache";
import { createWorkdir, writeFileSafe, readFileSafe, cleanupDir, redactLogs } from "./sandbox";
import { sha256Hex, stableStringify } from "@/lib/hash";
import { TEMPLATE_REGISTRY } from "@/lib/latex/templates/registry";
import { runTectonic } from "./tectonic";
import type { ResumeFormData } from "@/lib/schemas/form";
 
export type CompileOutcome =
  | { ok: true; pdf: Buffer; cacheKey: string; usedCache: boolean; log: string }
  | { ok: false; cacheKey: string; usedCache: boolean; code: string; message: string; details: string };
 
export type CompileOptions = {
  timeoutMs?: number;       // default 15000
  memoryLimitKb?: number;   // optional; Linux only via ulimit
  offline?: boolean;        // default true
};
 
function loadTemplateSource(templateId: string): string {
  const meta = TEMPLATE_REGISTRY[templateId];
  if (!meta) throw new Error(`Unknown templateId: ${templateId}`);
  const p = path.resolve(process.cwd(), meta.file);
  const src = fs.readFileSync(p, "utf8");
  if (src.length > 1_000_000) throw new Error("Template too large");
  return src;
}
 
function buildCacheKey(templateId: string, form: ResumeFormData, templateSrc: string): string {
  // Keyed by templateId + template source + normalized data (including theme)
  const norm = stableStringify(form);
  return sha256Hex("v1", templateId, templateSrc, norm);
}
 
/** Main entry: compile form data with a selected template to PDF Buffer */
export async function compileResume(form: ResumeFormData, opts: CompileOptions = {}): Promise<CompileOutcome> {
  const templateSrc = loadTemplateSource(form.templateId);
  const cacheKey = buildCacheKey(form.templateId, form, templateSrc);
 
  // Cache check
  const cached = compileCache.get(cacheKey);
  if (cached) {
    return { ok: true, pdf: cached.pdf, cacheKey, usedCache: true, log: cached.log };
  }
 
  // Map & render
  const vars = mapToTemplateVars(form);
  const tex = renderTemplate(templateSrc, vars);
 
  // Sandbox
  const workdir = createWorkdir();
  const mainTex = "main.tex";
  writeFileSafe(workdir, mainTex, tex);
 
  try {
    // Compile with Tectonic
    const result = await runTectonic({
      workdir,
      timeoutMs: opts.timeoutMs ?? 15000,
      memoryLimitKb: opts.memoryLimitKb,
      offline: opts.offline ?? true
    });
 
    const rawLog = (result.stdout || "") + "\n" + (result.stderr || "");
    const log = redactLogs(rawLog, workdir);
 
    if (result.code !== 0 || !result.pdfPath) {
      return {
        ok: false,
        cacheKey,
        usedCache: false,
        code: result.code === -1 ? "TIMEOUT" : result.code === -2 ? "SPAWN_ERROR" : "COMPILE_ERROR",
        message:
          result.code === -1
            ? "Compilation timed out."
            : result.code === -2
            ? "Tectonic failed to start."
            : "LaTeX compilation failed.",
        details: log
      };
    }
 
    const pdf = readFileSafe(workdir, "main.pdf");
 
    // Cache the successful output
    compileCache.set(cacheKey, pdf, log);
 
    return { ok: true, pdf, cacheKey, usedCache: false, log };
  } catch (err: any) {
    const msg = (err && err.message) || "Unknown error during compilation";
    return {
      ok: false,
      cacheKey,
      usedCache: false,
      code: "RUNTIME_ERROR",
      message: "Unexpected error during compilation.",
      details: msg
    };
  } finally {
    cleanupDir(workdir);
  }
}