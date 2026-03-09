import { describe, it, expect } from "vitest";
import { renderTemplate } from "@/lib/latex/template";
 
describe("renderTemplate", () => {
  it("replaces \\VAR{key} occurrences", () => {
    const tpl = "Hello, \\VAR{name}! Your title is \\VAR{title}.";
    const out = renderTemplate(tpl, { name: "Alice", title: "Engineer" });
    expect(out).toBe("Hello, Alice! Your title is Engineer.");
  });
 
  it("uses empty string for missing keys", () => {
    const tpl = "A=\\VAR{a}, B=\\VAR{b}";
    const out = renderTemplate(tpl, { a: "1" });
    expect(out).toBe("A=1, B=");
  });
});