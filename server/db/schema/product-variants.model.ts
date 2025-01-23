// product-variants.model.ts
import { pgTable, varchar, timestamp, serial, numeric, integer, jsonb, index } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { products } from "./products.model";
import { z } from "zod";

export const productVariants = pgTable(
  "product_variants",
  {
    id: serial("id").primaryKey(),
    productId: serial("product_id")
      .references(() => products.id)
      .notNull(),
    variantName: varchar("variant_name", { length: 255 }).notNull(),
    sku: varchar("sku", { length: 100 }).unique(), // SKU for inventory tracking
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    quantityAvailable: integer("quantity_available").notNull().default(0),
    metadata: jsonb("metadata").default("{}"), // Additional details (e.g., weight, dimensions)
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("product_variants_sku_idx").on(table.sku),
    index("product_variants_product_id_idx").on(table.productId),
    index("product_variants_quantity_idx").on(table.quantityAvailable),
    index("price_quantity_idx").on(table.price, table.quantityAvailable),
  ]
);

export const selectProductVariantSchema = createSelectSchema(productVariants);
export const insertProductVariantSchema = createInsertSchema(productVariants);
export const updateProductVariantSchema = createUpdateSchema(productVariants);
