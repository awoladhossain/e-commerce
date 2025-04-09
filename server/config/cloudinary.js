import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dsun6tsg5",
  api_key: "521964231315231",
  api_secret: "jj1D68WCoc_EDbjFd_5tuBlmVXA",
  // secure: true,
});

const storage = new multer.memoryStorage();

const imageUploader = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer); // Send the buffer to Cloudinary
  });
};

const upload = multer({ storage });

export { imageUploader, upload };
