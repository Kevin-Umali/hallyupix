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
  platforms: z.array(z.string()).min(1, "At least one platform is required"),
  originCategory: z.string().min(1, "Origin category is required"),
  productStatus: z.string(),
  visibility: z.string(),
  inventoryStatus: z.string().min(1, "Inventory status is required"),
  minimumStockAlert: z.number().min(1, "Minimum stock alert is required"),
  fee: z.number().min(1, "Fee is required"),
  deadlineOfDownPayment: z.string().optional(),
  estimatedTimeOfArrival: z.string().optional(),
});

export const UpdateProductRequestSchema = SaveProductRequestSchema.extend({
  id: z.number().min(1, "Product ID is required"),
});

export type SaveProductRequest = z.infer<typeof SaveProductRequestSchema>;
export type UpdateProductRequest = z.infer<typeof UpdateProductRequestSchema>;
