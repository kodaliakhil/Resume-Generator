import { Router, Request, Response } from "express";

import { ResumeData } from "../types/resume";
import { generateResumeHtml } from "../templates/resumeTemplate";
import { generatePdf } from "../services/pdfService";
import { validateResume } from "../utils/validateResume";

const router = Router();

router.post(
  "/pdf",
  async (
    req: Request<unknown, unknown, ResumeData>,
    res: Response,
  ): Promise<void> => {
    try {
      const resumeData = req.body;

      if (!resumeData || Object.keys(resumeData).length === 0) {
        res.status(400).json({
          success: false,
          message: "Resume data is required",
        });

        return;
      }

      const validationErrors = validateResume(resumeData);

      if (validationErrors.length > 0) {
        res.status(400).json({
          success: false,
          errors: validationErrors,
        });

        return;
      }

      const html = generateResumeHtml(resumeData);

      const pdf = await generatePdf(html);

      const downloadFileName = resumeData.personalInfo?.name?.trim()
        ? `${resumeData.personalInfo.name
            .trim()
            .replace(/\s+/g, "_")}_Resume.pdf`
        : "resume.pdf";

      res.setHeader("Content-Type", "application/pdf");

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${downloadFileName}"`,
      );

      res.setHeader("Content-Length", pdf.length.toString());

      res.setHeader("Cache-Control", "no-store");

      res.send(pdf);

      return;
    } catch (error: unknown) {
      console.error("PDF generation failed:", error);

      res.status(500).json({
        success: false,
        message: "Failed to generate PDF",
      });
    }
  },
);

export default router;
