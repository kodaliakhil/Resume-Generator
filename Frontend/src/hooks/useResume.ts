import { useState } from "react";
import type { ResumeData } from "../types/resume";

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    location: "",
  },
  summary: "",
  skills: [],
  experience: [],
  projects: [],
  education: [],
  certifications: [],
};

export function useResume() {
  const [resumeData, setResumeData] =
    useState<ResumeData>(
      initialResumeData
    );

  return {
    resumeData,
    setResumeData,
  };
}