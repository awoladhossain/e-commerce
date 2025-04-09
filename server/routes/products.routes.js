import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
  handleImageUploader,
} from "../controllers/products.controller.js";

const router = express.Router();

router.post("/image-upload", upload.single("my_file"), handleImageUploader);
router.post("/add-product", addProduct);
router.put("/edit-product/:id", editProduct);
router.delete("/delete-product/:id", deleteProduct);
router.get("/getAll-product", fetchAllProducts);
export default router;
