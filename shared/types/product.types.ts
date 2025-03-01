// shared/types/product.types.ts
import { z } from "zod";

export const ProductStatusEnum = z.enum(["Pre-order", "On-hand", "Reserved", "Secured", "Sold Out"]);
export const ProductVisibilityEnum = z.enum(["Public", "Private", "Hidden"]);

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  origin: z.string(),
  artist: z.string(),
  merchType: z.string(),
  productStatus: ProductStatusEnum.nullable(),
  visibility: ProductVisibilityEnum.nullable(),
  inventoryStatus: z.string(),
  minimumStockAlert: z.number().nullable(),
  releaseDate: z.string().nullable(),
  isLimitedEdition: z.boolean().nullable().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProductStatus = z.infer<typeof ProductStatusEnum>;
export type ProductVisibility = z.infer<typeof ProductVisibilityEnum>;
export type Product = z.infer<typeof ProductSchema>;
