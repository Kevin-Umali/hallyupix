// shared/types/product-variant.request.ts
import { ProductVariantSchema } from "./product-variant.types";
import { ProductSchema, ProductStatusEnum, ProductVisibilityEnum } from "./product.types";
import { z } from "zod";

export const CreateProductWithVariantsRequestSchema = ProductSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
}).extend({
  title: z.string().min(1, "Product title is required"),
  description: z.string().min(1, "Product description is required"),
  tags: z.array(z.string()).optional(),
  origin: z.string().min(1, "Origin category is required"),
  artist: z.string().min(1, "Artist is required"),
  merchType: z.string().min(1, "Merch type is required"),
  productStatus: ProductStatusEnum,
  visibility: ProductVisibilityEnum,
  inventoryStatus: z.string().min(1, "Inventory status is required"),
  minimumStockAlert: z.number().min(1, "Minimum stock alert is required"),
  releaseDate: z.string().optional(),
  isLimitedEdition: z.boolean(),
  variants: z
    .array(
      ProductVariantSchema.omit({
        id: true,
        productId: true,
        updatedAt: true,
        createdAt: true,
      }).extend({
        variantName: z.string().min(1, "Variant name is required"),
        sku: z.string().min(1, "SKU is required"),
        price: z.number().min(1, "Price is required"),
        quantityAvailable: z.number().min(1, "Quantity available is required"),
        metadata: z.array(z.object({ key: z.string().min(1, "Key is required"), value: z.string().min(1, "Value is required") })).optional(),
      })
    )
    .min(1, "At least one variant is required"),
});

export const UpdateProductWithVariantsRequestSchema = CreateProductWithVariantsRequestSchema.extend({
  id: z.number().min(1, "Product ID is required"),
});

export type CreateProductWithVariantsRequest = z.infer<typeof CreateProductWithVariantsRequestSchema>;
export type UpdateProductWithVariantsRequest = z.infer<typeof UpdateProductWithVariantsRequestSchema>;
