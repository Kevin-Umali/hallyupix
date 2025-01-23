// discounts.model.ts
import { numeric, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { products } from "./products.model";
import { productVariants } from "./product-variants.model";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { discountTypeEnum } from "./enums";

export const discounts = pgTable("discounts", {
  id: serial("id").primaryKey(),
  productId: serial("product_id").references(() => products.id),
  variantId: serial("variant_id").references(() => productVariants.id),
  discountType: discountTypeEnum("discount_type").notNull().default("Flat"), // Ensures "percentage" or "flat"
  value: numeric("value", { precision: 10, scale: 2 }).notNull(), // Percentage (e.g., 10.00) or flat discount (e.g., 100.00)
  startDate: timestamp("start_date").notNull(), // Required discount start date
  endDate: timestamp("end_date").notNull(), // Required discount end date
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectDiscountSchema = createSelectSchema(discounts);
export const insertDiscountSchema = createInsertSchema(discounts);
export const updateDiscountSchema = createUpdateSchema(discounts);
