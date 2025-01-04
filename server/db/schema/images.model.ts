// images.model.ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { products } from "./products.model";
import { productVariants } from "./product-variants.model";
import { z } from "zod";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  productId: serial("product_id").references(() => products.id),
  variantId: serial("variant_id").references(() => productVariants.id),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectImageSchema = createSelectSchema(images);
export const insertImageSchema = createInsertSchema(images);
export const updateImageSchema = createUpdateSchema(images);

export type Image = z.infer<typeof selectImageSchema>;
export type InsertImage = z.infer<typeof insertImageSchema>;
export type UpdateImage = z.infer<typeof updateImageSchema>;
