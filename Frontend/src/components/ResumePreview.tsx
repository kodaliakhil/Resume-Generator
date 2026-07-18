import ResumeSection from "./ResumeSection";
import type { ResumeData } from "../types/resume";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

function ResumePreview({ resumeData }: ResumePreviewProps) {
  const {
    personalInfo,
    summary,
    skills,
    experience,
    projects,
    education,
    certifications,
  } = resumeData;

  return (
    <div className="overflow-hidden rounded-lg bg-white p-6 shadow-lg md:p-8 lg:p-10">
      <div className="mx-auto w-full max-w-198.5">
        <header className="mb-6 text-center">
          <h1 className="wrap-break-word text-3xl font-bold">
            {personalInfo.name || "Your Name"}
          </h1>

          <p className="mt-2 wrap-break-word text-sm">
            {personalInfo.email}
            {personalInfo.email && personalInfo.phone && " | "}
            {personalInfo.phone}
            {(personalInfo.email || personalInfo.phone) &&
              personalInfo.location &&
              " | "}
            {personalInfo.location}
          </p>

          {personalInfo.linkedin && (
            <p className="wrap-break-word text-sm">{personalInfo.linkedin}</p>
          )}

          {personalInfo.github && (
            <p className="wrap-break-word text-sm">{personalInfo.github}</p>
          )}
        </header>

        <ResumeSection title="Professional Summary">
          <p className="wrap-break-word text-sm leading-6">
            {summary || "Your professional summary will appear here."}
          </p>
        </ResumeSection>

        <ResumeSection title="Skills">
          {skills.length > 0 ? (
            skills.map((domain) => (
              <div key={domain.id} className="flex">
                <h4 className="font-semibold">{domain.name}:</h4>
                <span className="wrap-break-word">{domain.skills.join(", ")}</span>
              </div>
            ))
          ) : (
            <p>Skills will appear here.</p>
          )}
        </ResumeSection>

        <ResumeSection title="Experience">
          {experience.length > 0 ? (
            experience.map((item, index) => (
              <div key={index} className="mb-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.jobTitle}</h3>

                  <span className="text-sm text-gray-600">
                    {item.startDate} - {item.endDate}
                  </span>
                </div>

                <p className="font-medium">{item.company}</p>

                {item.bulletPoints?.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    {item.bulletPoints.map((point, bulletIndex) => (
                      <li key={bulletIndex}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Experience entries will appear here.
            </p>
          )}
        </ResumeSection>

        <ResumeSection title="Projects">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{project.title}</h3>

                <p className="wrap-break-word text-sm">{project.description}</p>

                <p className="wrap-break-word text-sm">
                  Technologies: {project.technologies}
                </p>

                {project.projectLink && (
                  <p className="wrap-break-word text-sm">
                    {project.projectLink}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Projects will appear here.</p>
          )}
        </ResumeSection>

        <ResumeSection title="Education">
          {education.length > 0 ? (
            education.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{item.degree}</h3>

                <p className="wrap-break-word">{item.institution}</p>

                <p>{item.graduationYear}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Education details will appear here.
            </p>
          )}
        </ResumeSection>

        <ResumeSection title="Certifications">
          {certifications.length > 0 ? (
            certifications.map((certification, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{certification.name}</h3>

                <p className="wrap-break-word">
                  {certification.issuer}
                  {" • "}
                  {certification.year}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Certifications will appear here.
            </p>
          )}
        </ResumeSection>
      </div>
    </div>
  );
}

export default ResumePreview;
