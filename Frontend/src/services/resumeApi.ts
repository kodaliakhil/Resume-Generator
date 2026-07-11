import type { ResumeData } from "../types/resume";
import { API_BASE_URL } from "../constants/api";

export const generateResumePdf = async (
  resumeData: ResumeData,
): Promise<Blob> => {
  const response = await fetch(`${API_BASE_URL}/api/resume/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resumeData),
  });

  if (!response.ok) {
    throw new Error("Failed to generate PDF");
  }

  return response.blob();
};
