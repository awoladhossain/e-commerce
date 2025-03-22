import express from "express";
import { upload } from "../config/cloudinary.js";
import { handleImageUploader } from "../controllers/products.controller.js";

const router = express.Router();

router.post("/image-upload", upload.single("my_file"), handleImageUploader);

export default router;
