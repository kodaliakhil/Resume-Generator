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
import { validateResume } from "./utils/validateResume";

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
  const [error, setError] = useState("");

  const handleGeneratePdf = async () => {
    try {
      setError("");

      const validationErrors = validateResume(resumeData);

      if (validationErrors.length > 0) {
        setError(validationErrors.join(" "));
        return;
      }

      setIsGeneratingPdf(true);

      const pdfBlob = await generateResumePdf(resumeData);

      const url = window.URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");

      const fileName = resumeData.personalInfo.name
        ? `${resumeData.personalInfo.name
            .trim()
            .replace(/\s+/g, "_")}_Resume.pdf`
        : "resume.pdf";

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      setError("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-4 shadow">
            <button
              type="button"
              onClick={handleGeneratePdf}
              disabled={isGeneratingPdf}
              className="w-full rounded-md bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isGeneratingPdf ? "Generating PDF..." : "Generate PDF"}
            </button>
            {error && (
              <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}
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
        <div className="lg:sticky lg:top-6 lg:self-start">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
    </main>
  );
}

export default App;
