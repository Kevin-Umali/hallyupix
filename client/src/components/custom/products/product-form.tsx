// components/product-form/index.tsx
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BasicInfoFields } from "./basic-info";
import { CategoryStatusFields } from "./category-status";
import { VariantFields } from "./variant-fields";
import { PreOrderFields } from "./pre-order";

import { Separator } from "@/components/ui/separator";
import CloudinaryImageUploader from "../cloudinary-image-uploader";
import { Label } from "@/components/ui/label";

const variantSchema = z.object({
  variantName: z.string().min(1, "Variant name is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  quantityAvailable: z.number().min(0, "Quantity must be 0 or greater"),
  metadata: z.record(z.unknown()).default({}),
});

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  originCategory: z.string().min(1, "Category is required"),
  productStatus: z.enum(["Pre-order", "On-hand", "Reserved", "Sold Out"]),
  visibility: z.enum(["Public", "Private", "Hidden"]).default("Private"),
  minimumStockAlert: z.number().min(0),
  fee: z.number().min(0),
  platforms: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  deadlineOfDownPayment: z.string().optional(),
  estimatedTimeOfArrival: z.string().optional(),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

interface ProductFormProps {
  initialData?: z.infer<typeof productSchema>;
  onSubmit: (data: z.infer<typeof productSchema>) => Promise<void>;
  onClose: () => void;
}

export const ProductForm = ({ initialData, onSubmit, onClose }: ProductFormProps) => {
  const form = useForm({
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      originCategory: initialData?.originCategory ?? "",
      productStatus: initialData?.productStatus ?? "Pre-order",
      visibility: initialData?.visibility ?? "Private",
      minimumStockAlert: initialData?.minimumStockAlert ?? 0,
      fee: initialData?.fee ?? 0,
      platforms: initialData?.platforms ?? [],
      tags: initialData?.tags ?? [],
      deadlineOfDownPayment: initialData?.deadlineOfDownPayment ?? "",
      estimatedTimeOfArrival: initialData?.estimatedTimeOfArrival ?? "",
      variants: initialData?.variants ?? [
        {
          variantName: "",
          sku: "",
          price: 0,
          quantityAvailable: 0,
          metadata: {},
        },
      ],
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
      onClose();
    },
    validators: {
      onChange: productSchema,
    },
  });

  const handleImageUpload = (images: Array<{ url: string; publicId: string }>) => {
    console.log("Uploaded images:", images);
    // You can store these in form state or handle them separately
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="space-y-6"
    >
      {/* Basic Information Section */}
      <div>
        <h3 className="text-lg font-medium">Basic Information</h3>
        <p className="text-sm text-muted-foreground">Add the main details of your product.</p>
        <Separator className="my-4" />
        <BasicInfoFields form={form} />
      </div>

      {/* Category and Status Section */}
      <div>
        <h3 className="text-lg font-medium">Category & Status</h3>
        <p className="text-sm text-muted-foreground">Set the product category and current status.</p>
        <Separator className="my-4" />
        <CategoryStatusFields form={form} />
      </div>

      {/* Variants Section */}
      <div>
        <h3 className="text-lg font-medium">Product Variants</h3>
        <p className="text-sm text-muted-foreground">Add different versions of your product with their own SKUs and prices.</p>
        <Separator className="my-4" />
        <VariantFields form={form} />
      </div>

      {/* Pre-order Fields */}
      {form.getFieldValue("productStatus") === "Pre-order" && (
        <div>
          <h3 className="text-lg font-medium">Pre-order Details</h3>
          <p className="text-sm text-muted-foreground">Set important dates for pre-order management.</p>
          <Separator className="my-4" />
          <PreOrderFields form={form} />
        </div>
      )}

      {/* Product Images */}
      <div>
        <h3 className="text-lg font-medium">Product Images</h3>
        <p className="text-sm text-muted-foreground">Upload images of your product. You can add multiple images.</p>
        <Separator className="my-4" />
        <div className="space-y-2">
          <Label>Product Images</Label>
          <CloudinaryImageUploader multiple showPreview onUploadComplete={handleImageUpload} />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? "Saving..." : initialData ? "Update Product" : "Create Product"}
            </Button>
          )}
        />
      </div>
    </form>
  );
};

export default ProductForm;
