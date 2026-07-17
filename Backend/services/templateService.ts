import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { ResumeData } from "../types/resume";

export const generateResumeHtml = (
  resumeData: ResumeData,
  templateName = "faang",
): string => {
  const templatePath = path.join(
    process.cwd(),
    "/templates",
    `${templateName}.hbs`,
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  const source = fs.readFileSync(templatePath, "utf8");

  const template = Handlebars.compile(source);

  return template({
    ...resumeData,

    contactLine: [
      resumeData.personalInfo.email,
      resumeData.personalInfo.phone,
      resumeData.personalInfo.location,
      resumeData.personalInfo.linkedin,
      resumeData.personalInfo.github,
    ]
      .filter(Boolean)
      .join(" | "),

    skillsLine: resumeData.skills.join(", "),
  });
};
