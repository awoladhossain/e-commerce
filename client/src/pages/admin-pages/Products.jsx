import { addProductFormElements } from "@/components/config";
import Form from "@/components/forms/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import ImageUpload from "./ImageUpload";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");

  const onSubmit = () => {};
  return (
    <div>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openCreateProductsDialog}
          onOpenChange={() => {
            setOpenCreateProductsDialog(false);
          }}
        >
          <SheetContent slide="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ImageUpload
              file={imageFile}
              setFile={setImageFile}
              uploadedImgUrl={uploadedImgUrl}
              setUploadedImgUrl={setUploadedImgUrl}
            />
            <div className="py-6">
              <Form
                formData={formData}
                setFormData={setFormData}
                formControls={addProductFormElements}
                buttonText="Add Product"
                onSubmit={onSubmit}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AdminProducts;
