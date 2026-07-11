import { ResumeData } from "../types/resume";

export const validateResume = (data: ResumeData): string[] => {
  const errors: string[] = [];

  if (!data.personalInfo?.name?.trim()) {
    errors.push("Name is required.");
  }

  if (!data.personalInfo?.email?.trim()) {
    errors.push("Email is required.");
  }

  if (!data.personalInfo?.phone?.trim()) {
    errors.push("Phone number is required.");
  }

  if (!data.skills || data.skills.length === 0) {
    errors.push("At least one skill is required.");
  }

  return errors;
};
