import { pgTable, text, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { products } from "./products.model";
import { z } from "zod";

export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: serial("product_id")
    .references(() => products.id)
    .notNull(),
  variantName: varchar("variant_name", { length: 255 }).notNull(),
  price: text("price").notNull(),
  quantityAvailable: text("quantity_available").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectProductVariantSchema = createSelectSchema(productVariants);
export const insertProductVariantSchema = createInsertSchema(productVariants);
export const updateProductVariantSchema = createUpdateSchema(productVariants);

export type ProductVariant = z.infer<typeof selectProductVariantSchema>;
export type InsertProductVariant = z.infer<typeof insertProductVariantSchema>;
export type UpdateProductVariant = z.infer<typeof updateProductVariantSchema>;
