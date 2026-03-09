/**
 * Robust LaTeX escaping and normalization utilities.
 *
 * Security note:
 *  - We never inject raw user text into LaTeX.
 *  - Always pass ALL user-provided text through escapeLatex().
 *  - For structured blocks (itemize, sections), build the LaTeX yourself and
 *    only interpolate escaped strings.
 */

export type EscapeOptions = {
  /**
   * Convert single newlines to LaTeX line breaks (\\).
   * Useful for paragraphs like "summary".
   */
  convertNewlines?: boolean;
  /**
   * Convert two or more consecutive newlines into paragraph breaks (\par).
   */
  paragraphBreaks?: boolean;
};

const SPECIALS: Record<string, string> = {
  "\\": "\\textbackslash{}",
  "{": "\\{",
  "}": "\\}",
  $: "\\$",
  "&": "\\&",
  "#": "\\#",
  _: "\\_",
  "%": "\\%",
  "~": "\\textasciitilde{}",
  "^": "\\textasciicircum{}",
};

const SPECIALS_REGEX = /[\\{}$&#_%~^]/g;

/**
 * Escape special LaTeX characters in arbitrary text.
 * Also normalizes CRLF to LF and optionally converts newlines to LaTeX.
 */
export function escapeLatex(input: unknown, opts: EscapeOptions = {}): string {
  const text = String(input ?? "");
  // Normalize newlines first
  let s = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Escape LaTeX specials
  s = s.replace(SPECIALS_REGEX, (m) => SPECIALS[m] ?? m);

  if (opts.paragraphBreaks) {
    // Replace 2+ newlines with paragraph break
    s = s.replace(/\n{2,}/g, "\n\\par\n");
  }
  if (opts.convertNewlines) {
    // Remaining single newlines become line breaks
    s = s.replace(/\n/g, " \\\\\n");
  }
  return s;
}

/**
 * Escape text for LaTeX and wrap hyperref/URL safely.
 * Both URL and label are escaped.
 */
export function makeHref(url: string, label?: string): string {
  const u = escapeLatex(url);
  const l = escapeLatex(label ?? url);
  return `\\href{${u}}{${l}}`;
}

/**
 * Utility: join inline tokens with a separator (default bullet).
 * Tokens are expected to be already escaped.
 */
export function inlineJoin(tokens: string[], sep = " \\textbullet\\ "): string {
  const items = tokens.filter((t) => t.trim().length > 0);
  return items.join(sep);
}

/**
 * Build an itemize environment from items (strings already escaped).
 * If empty, returns empty string (no dangling environments).
 */
export function itemize(items: string[]): string {
  const filtered = items.filter((it) => it.trim().length > 0);
  if (filtered.length === 0) return "";
  const lines = filtered.map((it) => `  \\item ${it}`);
  return ["\\begin{itemize}", ...lines, "\\end{itemize}"].join("\n");
}
