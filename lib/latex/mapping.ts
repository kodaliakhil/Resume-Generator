import type { ResumeFormData } from "@/lib/schemas/form";
import { escapeLatex, inlineJoin, itemize, makeHref } from "./escape";

/**
 * Returns a flat map of template variables => safe LaTeX strings.
 * Keys to be used in templates as \VAR{key}.
 *
 * Example keys:
 * - Basic profile: fullName, title, email, phone, location, summary
 * - Inline links: linksInline
 * - Sections: experienceBlock, projectsBlock, educationBlock, skillsBlock, certsBlock, extrasBlock
 * - Theme: accentColor, fontSizeScale, spacingScale, showIcons, showPhoto
 */
export function mapToTemplateVars(form: ResumeFormData): Record<string, string> {
  const vars: Record<string, string> = {};

  // --- Profile
  const p = form.profile;
  vars["fullName"] = escapeLatex(p.fullName);
  vars["title"] = escapeLatex(p.title);
  vars["email"] = escapeLatex(p.email);
  vars["phone"] = escapeLatex(p.phone ?? "");
  vars["location"] = escapeLatex(p.location ?? "");
  vars["summary"] = escapeLatex(p.summary ?? "", {
    convertNewlines: true,
    paragraphBreaks: true,
  });

  // Links → inline "Label (url)" with href. Show up to 6 for brevity
  const links = (p.links ?? []).slice(0, 6).map((l) => makeHref(l.url, l.label));
  vars["linksInline"] = inlineJoin(links);

  // --- Experience
  vars["experienceBlock"] = sectionExperience(form);

  // --- Projects
  vars["projectsBlock"] = sectionProjects(form);

  // --- Education
  vars["educationBlock"] = sectionEducation(form);

  // --- Skills
  vars["skillsBlock"] = sectionSkills(form);

  // --- Certifications
  vars["certsBlock"] = sectionCerts(form);

  // --- Extras
  vars["extrasBlock"] = sectionExtras(form);

  // --- Theme
  vars["accentColor"] = escapeLatex(form.theme.accentColor);
  vars["fontSizeScale"] = String(form.theme.fontSizeScale);
  vars["spacingScale"] = String(form.theme.spacingScale);
  vars["showIcons"] = form.theme.showIcons ? "1" : "0";
  vars["showPhoto"] = form.theme.showPhoto ? "1" : "0";
  
// lib/latex/mapping.ts (add near theme mapping)
  const hex = (form.theme.accentColor || "").replace(/^#/, "");
  // Basic validation to ensure 3 or 6 hex chars; fallback to blue if invalid
  const validHex = /^[0-9a-fA-F]{6}$/.test(hex) || /^[0-9a-fA-F]{3}$/.test(hex) ? hex : "2F6FED";
  vars["accentColorHex"] = validHex;
  // --- Template id (if a template wants to branch via internal macros)
  vars["templateId"] = form.templateId;

  return vars;
}

function formatDateRange(start: string, end?: string, current?: boolean): string {
  const s = escapeLatex(start);
  const e = current ? "Present" : escapeLatex(end ?? "");
  return end || current ? `${s} -- ${e}` : s;
}

function bulletList(items: string[]): string {
  return itemize(items.map((b) => escapeLatex(b, { convertNewlines: true })));
}

function sectionExperience(form: ResumeFormData): string {
  const parts: string[] = [];
  for (const it of form.experience ?? []) {
    const company = escapeLatex(it.company);
    const role = escapeLatex(it.role);
    const loc = escapeLatex(it.location ?? "");
    const dates = formatDateRange(it.startDate, it.endDate, it.current);

    const headerRight: string[] = [];
    if (loc) headerRight.push(loc);
    if (dates) headerRight.push(dates);

    const header = `\\textbf{${role}} at ${company}`;
    const right = headerRight.join(" \\textbar\\ ");

    const bullets = bulletList(it.bullets ?? []);
    const block = [
      "\\par\\noindent",
      `\\textbf{${header}} \\hfill {\\small ${right}}`,
      bullets ? `\n${bullets}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    parts.push(block);
  }
  return parts.join("\n\n");
}

function sectionProjects(form: ResumeFormData): string {
  const parts: string[] = [];
  for (const it of form.projects ?? []) {
    const name = escapeLatex(it.name);
    const link = it.link ? makeHref(it.link, "link") : "";
    const desc = escapeLatex(it.description ?? "", { convertNewlines: true });

    const tech = (it.tech ?? []).map((t) => escapeLatex(t));
    const techLine = tech.length ? `{\\small \\emph{Tech:} ${inlineJoin(tech, ", ")}}` : "";

    const bullets = bulletList(it.bullets ?? []);
    const title = link ? `${name} (${link})` : name;

    const block = [
      "\\par\\noindent",
      `\\textbf{${title}}`,
      desc ? `{\\small ${desc}}` : "",
      techLine,
      bullets ? `\n${bullets}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    parts.push(block);
  }
  return parts.join("\n\n");
}

function sectionEducation(form: ResumeFormData): string {
  const parts: string[] = [];
  for (const it of form.education ?? []) {
    const school = escapeLatex(it.school);
    const degree = escapeLatex(it.degree);
    const dates = formatDateRange(it.startDate, it.endDate, false);
    const gpa = it.gpa ? `GPA: ${escapeLatex(it.gpa)}` : "";

    const highlights = bulletList(it.highlights ?? []);
    const right = [dates, gpa].filter(Boolean).join(" \\textbar\\ ");

    const block = [
      "\\par\\noindent",
      `\\textbf{${degree}} — ${school} \\hfill {\\small ${right}}`,
      highlights ? `\n${highlights}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    parts.push(block);
  }
  return parts.join("\n\n");
}

function sectionSkills(form: ResumeFormData): string {
  const p = (form.skills?.primary ?? []).map((s) => escapeLatex(s));
  const s = (form.skills?.secondary ?? []).map((t) => escapeLatex(t));
  const tools = (form.skills?.tools ?? []).map((t) => escapeLatex(t));

  const lines: string[] = [];
  if (p.length) lines.push(`\\textbf{Primary:} ${inlineJoin(p, ", ")}`);
  if (s.length) lines.push(`\\textbf{Secondary:} ${inlineJoin(s, ", ")}`);
  if (tools.length) lines.push(`\\textbf{Tools:} ${inlineJoin(tools, ", ")}`);

  if (!lines.length) return "";
  return ["\\par\\noindent", ...lines.map((l) => `{\\small ${l}}`)].join("\n");
}

function sectionCerts(form: ResumeFormData): string {
  const items = (form.certifications ?? []).map((c) => {
    const nm = escapeLatex(c.name);
    const isr = escapeLatex(c.issuer);
    const d = escapeLatex(c.date);
    return `\\item ${nm} — ${isr} (${d})`;
  });
  if (!items.length) return "";
  return ["\\begin{itemize}", ...items, "\\end{itemize}"].join("\n");
}

function sectionExtras(form: ResumeFormData): string {
  const parts: string[] = [];
  for (const ex of form.extras ?? []) {
    const title = escapeLatex(ex.sectionTitle);
    const bullets = bulletList(ex.bullets ?? []);
    const block = ["\\par\\noindent", `\\textbf{${title}}`, bullets].filter(Boolean).join("\n");
    parts.push(block);
  }
  return parts.join("\n\n");
}
