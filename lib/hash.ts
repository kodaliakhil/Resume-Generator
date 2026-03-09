import { createHash } from "crypto";
 
/** Deterministic JSON stringify with key sorting */
export function stableStringify(value: unknown): string {
  return JSON.stringify(sortKeys(value));
}
 
function sortKeys(input: any): any {
  if (Array.isArray(input)) return input.map(sortKeys);
  if (input && typeof input === "object") {
    return Object.keys(input)
      .sort()
      .reduce((acc: any, k) => {
        acc[k] = sortKeys(input[k]);
        return acc;
      }, {});
  }
  return input;
}
 
export function sha256Hex(...parts: string[]): string {
  const h = createHash("sha256");
  for (const p of parts) h.update(p);
  return h.digest("hex");
}