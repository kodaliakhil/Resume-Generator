import type { ResumeData } from "../types/resume";

export const validateResume = (
  resumeData: ResumeData
): string[] => {
  const errors: string[] = [];

  const { personalInfo } = resumeData;

  if (!personalInfo.name.trim()) {
    errors.push("Name is required.");
  }

  if (!personalInfo.email.trim()) {
    errors.push("Email is required.");
  }

  if (!personalInfo.phone.trim()) {
    errors.push("Phone number is required.");
  }

  if (resumeData.skills.length === 0) {
    errors.push("At least one skill is required.");
  }

  return errors;
};