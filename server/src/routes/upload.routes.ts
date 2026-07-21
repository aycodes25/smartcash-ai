import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { uploadFile } from "../controllers/upload.controller";

const router = Router();

router.post(
  "/",
  upload.single("statement"),
  uploadFile
);

export default router;