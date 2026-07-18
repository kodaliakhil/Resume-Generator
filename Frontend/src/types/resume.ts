export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: SkillDomain[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface Experience {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  bulletPoints: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string;
  projectLink: string;
}

export interface Education {
  institution: string;
  degree: string;
  graduationYear: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface SkillDomain {
  id: string;
  name: string;
  skills: string[];
}


