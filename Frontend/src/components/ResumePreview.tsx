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
    <div className="mx-auto w-full max-w-[794px] bg-white p-10 shadow-lg">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">
          {personalInfo.name || "Your Name"}
        </h1>

        <p className="mt-2 text-sm">
          {personalInfo.email}
          {personalInfo.email && personalInfo.phone && " | "}
          {personalInfo.phone}
          {(personalInfo.email || personalInfo.phone) &&
            personalInfo.location &&
            " | "}
          {personalInfo.location}
        </p>

        <p className="text-sm">{personalInfo.linkedin}</p>

        <p className="text-sm">{personalInfo.github}</p>
      </header>

      <ResumeSection title="Professional Summary">
        <p className="text-sm leading-6">
          {summary || "Your professional summary will appear here."}
        </p>
      </ResumeSection>

      <ResumeSection title="Skills">
        <p>{skills.join(", ")}</p>3
      </ResumeSection>

      <ResumeSection title="Experience">
        {experience.map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{item.jobTitle}</h3>

            <p>{item.company}</p>

            <p className="text-sm">
              {item.startDate} - {item.endDate}
            </p>

            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Projects">
        {projects.map((project, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{project.title}</h3>

            <p>{project.description}</p>

            <p>Technologies: {project.technologies}</p>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Education">
        {education.map((item, index) => (
          <div key={index}>
            <h3 className="font-semibold">{item.degree}</h3>

            <p>{item.institution}</p>

            <p>{item.graduationYear}</p>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Certifications">
        {certifications.map((certification, index) => (
          <div key={index}>
            <h3 className="font-semibold">{certification.name}</h3>

            <p>
              {certification.issuer}
              {" • "}
              {certification.year}
            </p>
          </div>
        ))}
      </ResumeSection>
    </div>
  );
}

export default ResumePreview;

// import ResumeSection from "./ResumeSection";

// function ResumePreview() {
//   return (
//     <div className="mx-auto w-full max-w-[794px] bg-white p-10 text-slate-900 shadow-lg">
//       {/* Personal Information */}

//       <header className="mb-6 text-center">
//         <h1 className="text-3xl font-bold">John Doe</h1>

//         <p className="mt-2 text-sm">
//           john.doe@email.com | +91 9876543210 | Hyderabad
//         </p>

//         <p className="text-sm">linkedin.com/in/johndoe | github.com/johndoe</p>
//       </header>

//       {/* Professional Summary */}

//       <ResumeSection title="Professional Summary">
//         <p className="text-sm leading-6">
//           Full Stack Developer with experience building scalable web
//           applications using React, TypeScript, Node.js, and modern development
//           practices.
//         </p>
//       </ResumeSection>

//       {/* Skills */}

//       <ResumeSection title="Skills">
//         <p className="text-sm">
//           React, TypeScript, JavaScript, Node.js, Express.js, SQL, Tailwind CSS,
//           Git, REST APIs
//         </p>
//       </ResumeSection>

//       {/* Experience */}

//       <ResumeSection title="Experience">
//         <div>
//           <div className="flex items-center justify-between">
//             <h3 className="font-semibold">Senior Frontend Developer</h3>
//             <span className="text-sm">Jan 2022 - Present</span>{" "}
//           </div>

//           <p className="text-sm font-medium">ABC Technologies</p>

//           <p className="mt-2 text-sm leading-6">
//             Developed responsive web applications, improved performance, and
//             collaborated with cross-functional teams to deliver customer-focused
//             features.
//           </p>
//         </div>
//       </ResumeSection>

//       {/* Projects */}

//       <ResumeSection title="Projects">
//         <div>
//           <h3 className="font-semibold">Resume Builder MVP</h3>

//           <p className="mt-1 text-sm leading-6">
//             Built a resume builder application with live preview and PDF export
//             functionality using React and Node.js.
//           </p>

//           <p className="mt-1 text-sm">
//             Technologies: React, TypeScript, Express.js, Puppeteer
//           </p>
//         </div>
//       </ResumeSection>

//       {/* Education */}

//       <ResumeSection title="Education">
//         <div>
//           <h3 className="font-semibold">Bachelor of Technology</h3>

//           <p className="text-sm">XYZ University</p>

//           <p className="text-sm">2024</p>
//         </div>
//       </ResumeSection>

//       {/* Certifications */}

//       <ResumeSection title="Certifications">
//         <div>
//           <h3 className="font-semibold">AWS Cloud Practitioner</h3>

//           <p className="text-sm">Amazon Web Services • 2025</p>
//         </div>
//       </ResumeSection>
//     </div>
//   );
// }

// export default ResumePreview;
