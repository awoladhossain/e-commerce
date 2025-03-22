import { imageUploader } from "../config/cloudinary.js";

const handleImageUploader = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Upload image buffer using the new upload stream method
    const result = await imageUploader(req.file.buffer);

    console.log("Cloudinary Upload Result:", result); // Debugging

    if (!result || !result.secure_url) {
      return res.status(500).json({ success: false, message: "Image upload failed" });
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Error in handleImageUploader:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export { handleImageUploader };