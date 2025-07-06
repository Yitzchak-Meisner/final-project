import express from "express";
import { upload } from "../middlewares/multer";
import { uploadImage } from "../controllers/uploadController";

const router = express.Router();

// POST /api/upload
router.post("/", upload.single("image"), uploadImage);

export default router;
