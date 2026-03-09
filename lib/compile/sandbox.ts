import fs from "fs";
import os from "os";
import path from "path";
 
/** Create a unique temp workdir under system tmp */
export function createWorkdir(prefix = "resumegen-"): string {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  return base; // e.g., /tmp/resumegen-abc123
}
 
export function writeFileSafe(dir: string, rel: string, data: string | Buffer) {
  const filePath = path.join(dir, rel);
  const parent = path.dirname(filePath);
  fs.mkdirSync(parent, { recursive: true });
  fs.writeFileSync(filePath, data);
}
 
export function readFileSafe(dir: string, rel: string): Buffer {
  const filePath = path.join(dir, rel);
  return fs.readFileSync(filePath);
}
 
export function exists(dir: string, rel: string): boolean {
  return fs.existsSync(path.join(dir, rel));
}
 
export function cleanupDir(dir: string) {
  try {
    // recursive delete; ignore errors
    fs.rmSync(dir, { recursive: true, force: true });
  } catch {}
}
 
/**
* Redact absolute filesystem paths and the tmp workdir name from logs.
*
* Goals:
*  - Replace the *exact* workdir with "<tmp>".
*  - Redact absolute UNIX paths (/var/tmp/x/y.tex) to "<path>/y.tex" (keep filename).
*  - Redact absolute Windows paths (C:\Users\X\file.log) to "<path>\file.log".
*  - Avoid breaking URLs (http://..., https://...) or mailto: links.
*
* Notes:
*  - We intentionally keep the trailing filename to help debugging without leaking host paths.
*  - We run specific substitutions (workdir) before generic ones.
*/
export function redactLogs(log: string, workdir: string): string {
  if (!log) return "";
 
  let out = String(log);
 
  // 1) Redact the exact workdir path first (escape for regex literally).
  //    Example: /tmp/resumegen-abc123  ->  <tmp>
  //    Works for Windows paths too (backslashes will be escaped properly).
  const workdirEscaped = workdir.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  out = out.replace(new RegExp(workdirEscaped, "g"), "<tmp>");
 
  // Helper to keep the trailing filename/last segment
  const keepTail = (full: string, sep: "/" | "\\") => {
    const parts = full.split(sep);
    const tail = parts[parts.length - 1] || "";
    return `<path>${sep}${tail}`;
  };
 
  // 2) Redact absolute UNIX-like paths:
  //    Match tokens that start with "/" and do NOT start with "http://" or "https://"
  //    We'll work token-wise by splitting and joining to avoid clobbering URLs.
  out = out.replace(/(^|[\s'"])(\/[^\s'"]+)/g, (m, prefix, pathToken: string) => {
    // Skip URLs that look like protocol://...
    if (/^\/\//.test(pathToken)) return m; // could be //network/share — leave it to Windows-like rule below
    // If it looks like /path/to/something
    return prefix + keepTail(pathToken, "/");
  });
 
  // 3) Redact absolute Windows drive-letter paths:
  //    Example: C:\Users\Name\file.log  ->  <path>\file.log
  //    Also covers UNC paths like \\server\share\dir\file
  //    We'll handle UNC separately to keep intent clear.
 
  // 3a) Drive-letter absolute paths: X:\something\... (use a conservative class for the drive)
  out = out.replace(/(^|[\s'"])([A-Za-z]:\\[^\s'"]+)/g, (m, prefix, winPath: string) => {
    return prefix + keepTail(winPath, "\\");
  });
 
  // 3b) UNC paths: \\server\share\path\file
  out = out.replace(/(^|[\s'"])(\\\\[^\s'"]+)/g, (m, prefix, uncPath: string) => {
    return prefix + keepTail(uncPath, "\\");
  });
 
  // 4) Optional: compact repeated placeholders like "<tmp>/main.tex" then redacted again.
  //    (Generally safe to skip; included here for cleanliness.)
  out = out.replace(/<tmp>[\\/]<tmp>/g, "<tmp>");
 
  return out;
}
 
/** Basic filename sanitizer for download names (used in API task) */
export function sanitizeFilename(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "");
  return base || "resume";
}