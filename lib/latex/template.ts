/**
* Minimal template renderer for \VAR{key} placeholders.
* - Only replaces placeholders with provided values.
* - Does NOT evaluate code or include files (safe-by-design).
* - Keys are [a-zA-Z0-9_.-]+ for simplicity.
*/
const VAR_REGEX = /\\VAR\{([a-zA-Z0-9_.-]+)\}/g;
 
export function renderTemplate(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(VAR_REGEX, (_, key: string) => {
    // Use empty string if missing to avoid "undefined"
    return vars[key] ?? "";
  });
}
 
/**
* Utility: flatten nested objects into "dotted" keys
* { profile: { fullName: "A" } } -> { "profile.fullName": "A" }
* Not used by default (we generate flat vars), but handy if needed.
*/
export function flatten(obj: unknown, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof obj !== "object" || obj === null) return out;
 
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "object" && v !== null) {
      Object.assign(out, flatten(v as any, key));
    } else if (v != null) {
      out[key] = String(v);
    }
  }
  return out;
}
 