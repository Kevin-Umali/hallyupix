// shared/types/product.types.ts
import { z } from "zod";

export const ProductStatusEnum = z.enum(["Pre-order", "On-hand", "Reserved", "Sold Out"]);
export const ProductVisibilityEnum = z.enum(["Public", "Private", "Hidden"]);

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  platforms: z.array(z.string()),
  originCategory: z.string(),
  productStatus: ProductStatusEnum.nullable(),
  visibility: ProductVisibilityEnum.nullable(),
  inventoryStatus: z.string(),
  minimumStockAlert: z.number().nullable(),
  fee: z.string(),
  deadlineOfDownPayment: z.string().nullable(),
  estimatedTimeOfArrival: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProductStatus = z.infer<typeof ProductStatusEnum>;
export type ProductVisibility = z.infer<typeof ProductVisibilityEnum>;
export type Product = z.infer<typeof ProductSchema>;
