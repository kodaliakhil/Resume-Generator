import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import resumeRoutes from "./routes/resumeRoutes";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(
  express.json({
    limit: "5mb",
  }),
);

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Resume Builder API is running",
  });
});

app.use("/api/resume", resumeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}:  http://localhost:${PORT}/`);
});
