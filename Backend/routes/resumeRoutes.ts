import { Router, Request, Response } from "express";

import { ResumeData } from "../types/resume";
import { generateResumeHtml } from "../templates/resumeTemplate";
import { generatePdf } from "../services/pdfService";

const router = Router();

router.post(
  "/pdf",
  async (
    req: Request<unknown, unknown, ResumeData>,
    res: Response,
  ): Promise<void> => {
    try {
      const resumeData = req.body;

      if (!resumeData) {
        res.status(400).json({
          success: false,

          message: "Resume data is required",
        });

        return;
      }

      const html = generateResumeHtml(resumeData);

      const pdf = await generatePdf(html);

      res.setHeader(
        "Content-Type",

        "application/pdf",
      );

      res.setHeader(
        "Content-Disposition",

        'attachment; filename="resume.pdf"',
      );

      res.setHeader(
        "Content-Length",

        pdf.length,
      );

      res.send(pdf);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        message: "Failed to generate PDF",
      });
    }
  },
);

export default router;
