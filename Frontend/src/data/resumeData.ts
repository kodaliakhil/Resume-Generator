import type { ResumeData } from "../types/resume";

export const mockResume: ResumeData = {
  personalInfo: {
    name: "Akhil Kodali",
    email: "akhil@example.com",
    phone: "+31 123456789",
    location: "Amsterdam, Netherlands",
    linkedin: "linkedin.com/in/akhil",
    github: "github.com/akhil",
  },

  summary:
    "Software Engineer with experience in React, TypeScript, .NET and Azure. Passionate about building scalable enterprise applications.",

  skills: [
    {
      id: "1",
      name: "Frontend",
      skills: ["React", "TypeScript", "HTML", "CSS"],
    },
    {
      id: "2",
      name: "Backend",
      skills: ["Node.js", "Express"],
    },
    {
      id: "3",
      name: "Database",
      skills: ["SQL Server", "MongoDB"],
    },
  ],

  experience: [
    {
      company: "Microsoft",
      jobTitle: "Software Engineer",
      startDate: "2023-01",
      endDate: "Present",
      bulletPoints: [
        "Developed reusable React components used across multiple applications.",
        "Reduced API response time by 40%.",
        "Implemented CI/CD pipelines using Azure DevOps.",
        "Collaborated with cross-functional teams to deliver enterprise features.",
      ],
    },
  ],

  projects: [
    {
      title: "Resume Generator",
      technologies: "React, TypeScript, .NET",
      description:
        "Web application for generating professional resumes in PDF format.",
      projectLink: "https://github.com/akhil/resume-generator",
    },
  ],

  education: [
    {
      institution: "University of Amsterdam",
      degree: "Master of Computer Science",
      graduationYear: "2021",
    },
  ],

  certifications: [
    {
      name: "Microsoft Azure Administrator Associate",
      issuer: "Microsoft",
      year: "2024",
    },
  ],
};

export const initialResumeData: ResumeData = {
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
