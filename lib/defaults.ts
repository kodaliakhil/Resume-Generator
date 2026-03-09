import type { ResumeFormData } from "./schemas/form";
 
export const defaultFormData: ResumeFormData = {
  templateId: "classic",
  theme: {
    accentColor: "#2F6FED",
    fontSizeScale: 1.0,
    spacingScale: 1.0,
    showIcons: false,
    showPhoto: false
  },
  profile: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    links: [],
    summary: ""
  },
  experience: [
    {
      company: "",
      role: "",
      location: "",
      startDate: "2024-01",
      endDate: undefined,
      current: true,
      bullets: []
    }
  ],
  projects: [],
  education: [
    {
      school: "",
      degree: "",
      startDate: "2020-01",
      endDate: "2024-01",
      gpa: "",
      highlights: []
    }
  ],
  skills: {
    primary: [],
    secondary: [],
    tools: []
  },
  certifications: [],
  extras: []
};