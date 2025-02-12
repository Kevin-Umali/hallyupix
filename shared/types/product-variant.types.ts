// shared/types/product-variant.types.ts
import { z } from "zod";

export const ProductVariantSchema = z.object({
  id: z.number(),
  productId: z.number(),
  variantName: z.string(),
  sku: z.string(),
  price: z.string(),
  quantityAvailable: z.number(),
  metadata: z.record(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProductVariant = z.infer<typeof ProductVariantSchema>;
