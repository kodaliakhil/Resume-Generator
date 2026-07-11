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
import { generateResumePdf } from "./services/resumeApi";

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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const handleGeneratePdf = async () => {
    try {
      setIsGeneratingPdf(true);

      const pdfBlob = await generateResumePdf(resumeData);

      const downloadUrl = window.URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");

      link.href = downloadUrl;
      const fileName = resumeData.personalInfo.name
        ? `${resumeData.personalInfo.name
            .trim()
            .replace(/\s+/g, "_")}_Resume.pdf`
        : "resume.pdf";

      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-200 p-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="mb-4">
            <button
              type="button"
              onClick={handleGeneratePdf}
              disabled={isGeneratingPdf}
              className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGeneratingPdf ? "Generating PDF..." : "Generate PDF"}
            </button>
          </div>
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
