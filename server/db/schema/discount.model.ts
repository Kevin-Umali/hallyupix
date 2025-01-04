// discounts.model.ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { products } from "./products.model";
import { productVariants } from "./product-variants.model";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const discounts = pgTable("discounts", {
  id: serial("id").primaryKey(),
  productId: serial("product_id").references(() => products.id),
  variantId: serial("variant_id").references(() => productVariants.id),
  discountType: text("discount_type").notNull(), // "percentage" or "flat"
  value: text("value").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectDiscountSchema = createSelectSchema(discounts);
export const insertDiscountSchema = createInsertSchema(discounts);
export const updateDiscountSchema = createUpdateSchema(discounts);

export type Discount = z.infer<typeof selectDiscountSchema>;
export type InsertDiscount = z.infer<typeof insertDiscountSchema>;
export type UpdateDiscount = z.infer<typeof updateDiscountSchema>;
