import { Router, Request, Response } from "express"
import { ResumeData } from "../types/resume";

const router = Router();

router.post(
  "/pdf",
  (
    req: Request<unknown, unknown, ResumeData>,
    res: Response
  ): void => {
    const resumeData = req.body;

    if (!resumeData) {
      res.status(400).json({
        success: false,
        message: "Resume data is required",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Resume data received successfully",
      data: resumeData,
    });
  }
);

export default router;