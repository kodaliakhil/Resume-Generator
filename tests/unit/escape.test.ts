import { describe, it, expect } from "vitest";
import { escapeLatex, makeHref, itemize } from "@/lib/latex/escape";
 
describe("escapeLatex", () => {
  it("escapes all special characters", () => {
    const s = `# $ % & ~ _ ^ \\ { }`;
    const out = escapeLatex(s);
    expect(out).toContain("\\#");
    expect(out).toContain("\\$");
    expect(out).toContain("\\%");
    expect(out).toContain("\\&");
    expect(out).toContain("\\textasciitilde{}");
    expect(out).toContain("\\_");
    expect(out).toContain("\\textasciicircum{}");
    expect(out).toContain("\\textbackslash{}");
    expect(out).toContain("\\{");
    expect(out).toContain("\\}");
  });
 
  it("normalizes newlines and converts to LaTeX breaks when asked", () => {
    const s = "Line1\r\nLine2\n\nLine4";
    const out = escapeLatex(s, { convertNewlines: true, paragraphBreaks: true });
    expect(out).toContain("\\par"); // for the double newline
    expect(out).toContain("\\\\"); // for single newline linebreaks
  });
});
 
describe("makeHref", () => {
  it("wraps url and label safely", () => {
    const out = makeHref("https://ex.com/a_b?x=1#h", "Profile & Links");
    // underscores and ampersands are escaped
    expect(out).toMatch(/\\href\{https:\/\/ex\.com\/a\\_b\?x=1\\#h\}\{Profile \\& Links\}/);
  });
});
 
describe("itemize", () => {
  it("returns empty when list is empty or whitespace", () => {
    expect(itemize([])).toBe("");
    expect(itemize(["  "])).toBe("");
  });
 
  it("creates a valid itemize environment", () => {
    const out = itemize(["Hello", "World"]);
    expect(out).toMatch(/\\begin\{itemize\}[\s\S]*\\item Hello[\s\S]*\\item World[\s\S]*\\end\{itemize\}/);
  });
});