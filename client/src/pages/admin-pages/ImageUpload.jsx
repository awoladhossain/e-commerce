/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";

// 3.54

const ImageUpload = ({ file, setFile, uploadedImgUrl, setUploadedImgUrl,setImageLoadingState }) => {
  const inputRef = useRef(null);
  const handleChangeImageFile = (e) => {
    console.log(e.target.files);
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleOnDrag = (e) => {
    e.preventDefault();
  };
  const handleOnDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files?.[0];
    console.log(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleRemoveImage = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const uploadImageInCloudinary = async () => {
    setImageLoadingState(true);
    if (!file) return;
    const data = new FormData();
    data.append("my_file", file);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/products/image-upload",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log("Response from server:", res.data.result.url);
      console.log(res.data.imageUrl);
      console.log(res.data.imageId);
      setUploadedImgUrl(res.data.imageUrl);
      setImageLoadingState(false);
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
    }
  };
  useEffect(() => {
    if (file !== null) {
      uploadImageInCloudinary();
    }
  }, [file]);
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className="border-2 border-dashed border-gray-400 rounded-md"
        onDragOver={handleOnDrag}
        onDrop={handleOnDrop}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleChangeImageFile}
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center
          h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or select file</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{file?.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
