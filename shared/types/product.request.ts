// shared/types/product.request.ts
import { z } from "zod";
import { ProductSchema } from "./product.types";

export const SaveProductRequestSchema = ProductSchema.omit({
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
  productStatus: z.string().min(1, "Product status is required"),
  visibility: z.string(),
  inventoryStatus: z.string().min(1, "Inventory status is required"),
  minimumStockAlert: z.number().min(1, "Minimum stock alert is required"),
  releaseDate: z.string().optional(),
  isLimitedEdition: z.boolean(),
});

export const UpdateProductRequestSchema = SaveProductRequestSchema.extend({
  id: z.number().min(1, "Product ID is required"),
});

export type SaveProductRequest = z.infer<typeof SaveProductRequestSchema>;
export type UpdateProductRequest = z.infer<typeof UpdateProductRequestSchema>;
