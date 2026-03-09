import { describe, it, expect } from "vitest";
import { mapToTemplateVars } from "@/lib/latex/mapping";
import type { ResumeFormData } from "@/lib/schemas/form";
 
const base: ResumeFormData = {
  templateId: "classic",
  theme: { accentColor: "#2F6FED", fontSizeScale: 1, spacingScale: 1, showIcons: false, showPhoto: false },
  profile: {
    fullName: "Akhil #1",
    title: "Full-stack & ABAP",
    email: "me@example.com",
    phone: "99999",
    location: "Hyderabad",
    links: [{ label: "GitHub", url: "https://github.com/akhil_k" }],
    summary: "I build systems.\nLoves TypeScript."
  },
  experience: [
    {
      company: "Wipro & Co.",
      role: "Project Engineer",
      location: "Hyderabad",
      startDate: "2024-01",
      endDate: undefined,
      current: true,
      bullets: ["Resolved 100+ incidents", "Zero downtime deployments"]
    }
  ],
  projects: [
    {
      name: "ResumeGen",
      link: "https://ex.com",
      description: "Generate resumes with LaTeX.",
      bullets: ["Built with Next.js", "Tectonic compile"],
      tech: ["React", "Node.js", "LaTeX"]
    }
  ],
  education: [
    {
      school: "ABC University",
      degree: "B.Tech",
      startDate: "2019-06",
      endDate: "2023-05",
      gpa: "8.7",
      highlights: ["Top 10%"]
    }
  ],
  skills: { primary: ["React", "TypeScript"], secondary: ["AWS"], tools: ["Git", "Docker"] },
  certifications: [{ name: "AWS Cloud Practitioner", issuer: "AWS", date: "2026-02" }],
  extras: [{ sectionTitle: "Achievements", bullets: ["Hackathon Winner"] }]
};
 
describe("mapToTemplateVars", () => {
  it("produces escaped and non-empty basic fields", () => {
    const vars = mapToTemplateVars(base);
    expect(vars.fullName).toContain("\\#1"); // escaped hash
    expect(vars.title).toContain("\\&"); // escaped ampersand
    expect(vars.summary).toMatch(/\\+/); // newline converted to \\ or \par
    expect(vars.linksInline).toMatch(/\\href\{/); // href generated
  });
 
  it("omits empty sections gracefully", () => {
    const clone = structuredClone(base);
    clone.experience = [];
    clone.projects = [];
    clone.education = [];
    clone.skills = { primary: [], secondary: [], tools: [] };
    clone.certifications = [];
    clone.extras = [];
 
    const vars = mapToTemplateVars(clone);
    expect(vars.experienceBlock).toBe("");
    expect(vars.projectsBlock).toBe("");
    expect(vars.educationBlock).toBe("");
    expect(vars.skillsBlock).toBe("");
    expect(vars.certsBlock).toBe("");
    expect(vars.extrasBlock).toBe("");
  });
 
  it("sets theme variables as strings", () => {
    const vars = mapToTemplateVars(base);
    expect(vars.accentColor).toBe("#2F6FED");
    expect(vars.fontSizeScale).toBe("1");
    expect(vars.spacingScale).toBe("1");
    expect(["0", "1"]).toContain(vars.showIcons);
    expect(["0", "1"]).toContain(vars.showPhoto);
  });
});
 