import { useState } from "react";
import ResumePreview from "./components/ResumePreview";
import { useResume } from "./hooks/useResume";
import CertificationsSection from "./sections/CertificationsSection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import ProfessionalSummarySection from "./sections/ProfessionalSummarySection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import type { ResumeData } from "./types/resume";

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

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  return (
    // <main className="min-h-screen bg-slate-200 p-6">
    //   <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
    //     <div className="space-y-6">
    //       <PersonalInfoSection />
    //       <ProfessionalSummarySection />
    //       <SkillsSection />
    //       <ExperienceSection />
    //       <ProjectsSection />
    //       <EducationSection />
    //       <CertificationsSection />
    //     </div>

    //     <div>
    //       <ResumePreview />
    //     </div>
    //   </div>
    // </main>

    <main className="min-h-screen bg-slate-200 p-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <PersonalInfoSection
            value={resumeData.personalInfo}
            onChange={(data) =>
              setResumeData((previous) => ({
                ...previous,
                personalInfo: data,
              }))
            }
          />

          <ProfessionalSummarySection
            value={resumeData.summary}
            onChange={(summary) =>
              setResumeData((previous) => ({
                ...previous,
                summary,
              }))
            }
          />
          <SkillsSection
            value={resumeData.skills}
            onChange={(skills) =>
              setResumeData((previous) => ({
                ...previous,
                skills,
              }))
            }
          />

          <ExperienceSection
            value={resumeData.experience}
            onChange={(experience) =>
              setResumeData((previous) => ({
                ...previous,
                experience,
              }))
            }
          />

          <ProjectsSection
            value={resumeData.projects}
            onChange={(projects) =>
              setResumeData((previous) => ({
                ...previous,
                projects,
              }))
            }
          />

          <EducationSection
            value={resumeData.education}
            onChange={(education) =>
              setResumeData((previous) => ({
                ...previous,
                education,
              }))
            }
          />

          <CertificationsSection
            value={resumeData.certifications}
            onChange={(certifications) =>
              setResumeData((previous) => ({
                ...previous,
                certifications,
              }))
            }
          />
        </div>

        <ResumePreview resumeData={resumeData} />
      </div>
    </main>
  );
}

export default App;
