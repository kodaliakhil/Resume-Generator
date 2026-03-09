import { describe, it, expect, vi } from "vitest";
import fs from "fs";
import path from "path";
 
import { compileResume } from "@/lib/compile/service";
import { runTectonic } from "@/lib/compile/tectonic";
 
// Sample minimal form data
const formBase = {
  templateId: "classic",
  theme: { accentColor: "#2F6FED", fontSizeScale: 1, spacingScale: 1, showIcons: false, showPhoto: false },
  profile: {
    fullName: "Jane Doe",
    title: "Software Engineer",
    email: "jane@example.com",
    phone: "",
    location: "",
    links: [],
    summary: "Hello"
  },
  experience: [],
  projects: [],
  education: [],
  skills: { primary: [], secondary: [], tools: [] },
  certifications: [],
  extras: []
} as any;
 
describe("compileResume service", () => {
  it("returns ok=true with a PDF buffer when tectonic succeeds", async () => {
    // Mock runTectonic to create a dummy PDF file in the workdir
    const spy = vi.spyOn(require("@/lib/compile/tectonic"), "runTectonic").mockImplementation(async (opts: any) => {
      const pdfPath = path.join(opts.workdir, "main.pdf");
      fs.writeFileSync(pdfPath, Buffer.from("%PDF-1.4\n% dummy\n", "utf8"));
      return { code: 0, stdout: "ok", stderr: "", pdfPath };
    });
 
    const res = await compileResume(formBase);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.pdf.byteLength).toBeGreaterThan(0);
      expect(res.usedCache).toBe(false);
    }
 
    // second call should hit cache
    const res2 = await compileResume(formBase);
    expect(res2.ok).toBe(true);
    if (res2.ok) {
      expect(res2.usedCache).toBe(true);
    }
 
    spy.mockRestore();
  });
 
  it("returns ok=false with details when tectonic fails", async () => {
    const spy = vi.spyOn(require("@/lib/compile/tectonic"), "runTectonic").mockImplementation(async (opts: any) => {
      return { code: 1, stdout: "log", stderr: "error: latex", pdfPath: undefined };
    });
 
    const res = await compileResume(formBase);
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.code).toBe("COMPILE_ERROR");
      expect(res.details).toContain("latex");
    }
 
    spy.mockRestore();
  });
});