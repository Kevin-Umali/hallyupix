// images.model.ts
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { products } from "./products.model";
import { productVariants } from "./product-variants.model";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  productId: serial("product_id").references(() => products.id),
  variantId: serial("variant_id").references(() => productVariants.id),
  imageUrl: varchar("image_url", { length: 1000 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectImageSchema = createSelectSchema(images);
export const insertImageSchema = createInsertSchema(images);
export const updateImageSchema = createUpdateSchema(images);
