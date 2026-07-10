import { Router, Request, Response } from "express";

import { ResumeData } from "../types/resume";
import { generateResumeHtml } from "../templates/resumeTemplate";

const router = Router();

router.post(
  "/pdf",
  (req: Request<unknown, unknown, ResumeData>, res: Response): void => {
    const resumeData = req.body;

    if (!resumeData) {
      res.status(400).json({
        success: false,
        message: "Resume data is required",
      });

      return;
    }

    const html = generateResumeHtml(resumeData);

    res.status(200).json({
      success: true,
      html,
    });
  },
);

export default router;
