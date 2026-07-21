import { Router } from "express";
import healthRoutes from "./health.routes";
import uploadRoutes from "./upload.routes";

const router = Router();

router.use("/health", healthRoutes);

router.use(
  "/upload",
  uploadRoutes
);

export default router;