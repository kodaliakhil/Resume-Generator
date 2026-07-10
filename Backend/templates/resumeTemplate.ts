import { ResumeData } from "../types/resume";

const renderSectionHeading = (title: string): string => {
  return `
    <h2 class="section-title">
      ${title}
    </h2>
  `;
};

export const generateResumeHtml = (resumeData: ResumeData): string => {
  const {
    personalInfo,
    summary,
    skills,
    experience,
    projects,
    education,
    certifications,
  } = resumeData;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>${personalInfo.name || "Resume"}</title>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #111827;
    background: #ffffff;
    line-height: 1.5;
    font-size: 12px;
    padding: 32px;
  }

  .resume {
    max-width: 800px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 24px;
  }

  .name {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .contact {
    font-size: 12px;
    color: #374151;
  }

  .section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 16px;
    font-weight: 700;
    border-bottom: 1px solid #d1d5db;
    padding-bottom: 4px;
    margin-bottom: 10px;
  }

  .skills {
    display: block;
  }

  .item {
    margin-bottom: 14px;
  }

  .item-title {
    font-size: 13px;
    font-weight: 700;
  }

  .item-subtitle {
    color: #4b5563;
    margin-bottom: 4px;
  }

  .description {
    white-space: pre-wrap;
  }

  ul {
    padding-left: 18px;
  }

  li {
    margin-bottom: 4px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
</style>
</head>

<body>

<div class="resume">

  <header class="header">
    <div class="name">
      ${personalInfo.name}
    </div>

    <div class="contact">
      ${[
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.linkedin,
        personalInfo.github,
      ]
        .filter(Boolean)
        .join(" | ")}
    </div>
  </header>

  ${
    summary
      ? `
      <section class="section">
        ${renderSectionHeading("Professional Summary")}
        <p>${summary}</p>
      </section>
    `
      : ""
  }

  ${
    skills.length
      ? `
      <section class="section">
        ${renderSectionHeading("Skills")}
        <p class="skills">
          ${skills.join(", ")}
        </p>
      </section>
    `
      : ""
  }

  ${
    experience.length
      ? `
      <section class="section">
        ${renderSectionHeading("Experience")}

        ${experience
          .map(
            (job) => `
          <div class="item">

            <div class="item-title">
              ${job.jobTitle}
            </div>

            <div class="item-subtitle">
              ${job.company} | ${job.startDate} - ${job.endDate}
            </div>

            <div class="description">
              ${job.description}
            </div>

          </div>
        `,
          )
          .join("")}

      </section>
    `
      : ""
  }

  ${
    projects.length
      ? `
      <section class="section">
        ${renderSectionHeading("Projects")}

        ${projects
          .map(
            (project) => `
          <div class="item">

            <div class="item-title">
              ${project.title}
            </div>

            <div>
              ${project.description}
            </div>

            <div>
              Technologies: ${project.technologies}
            </div>

            ${
              project.projectLink
                ? `
                <div>
                  ${project.projectLink}
                </div>
                `
                : ""
            }

          </div>
        `,
          )
          .join("")}

      </section>
    `
      : ""
  }

  ${
    education.length
      ? `
      <section class="section">
        ${renderSectionHeading("Education")}

        ${education
          .map(
            (item) => `
          <div class="item">

            <div class="item-title">
              ${item.degree}
            </div>

            <div class="item-subtitle">
              ${item.institution}
            </div>

            <div>
              Graduation Year: ${item.graduationYear}
            </div>

          </div>
        `,
          )
          .join("")}

      </section>
    `
      : ""
  }

  ${
    certifications.length
      ? `
      <section class="section">
        ${renderSectionHeading("Certifications")}

        ${certifications
          .map(
            (certification) => `
          <div class="item">

            <div class="item-title">
              ${certification.name}
            </div>

            <div class="item-subtitle">
              ${certification.issuer}
            </div>

            <div>
              ${certification.year}
            </div>

          </div>
        `,
          )
          .join("")}

      </section>
    `
      : ""
  }

</div>

</body>
</html>
`;
};
