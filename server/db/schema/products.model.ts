// products.model.ts
import { pgTable, text, varchar, jsonb, timestamp, serial, integer, index, boolean } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { productStatusEnum, productVisibilityEnum } from "./enums";
import { z } from "zod";
import { users } from "./users.model";
import { ProductStatusEnum, ProductVisibilityEnum } from "../../../shared/types/product.types";
import { relations } from "drizzle-orm";
import { productVariants } from "./product-variants.model";

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    sellerId: text("seller_id")
      .references(() => users.id)
      .notNull(),
    tags: jsonb("tags").$type<Array<string>>().default([]),
    origin: varchar("origin", { length: 100 }).notNull(),
    artist: varchar("artist", { length: 100 }).notNull(),
    merchType: varchar("merch_type", { length: 50 }).notNull(),
    productStatus: productStatusEnum("product_status").default("Pre-order"),
    visibility: productVisibilityEnum("visibility").default("Private"),
    inventoryStatus: varchar("inventory_status", { length: 50 }).notNull(),
    minimumStockAlert: integer("minimum_stock_alert").default(0),
    releaseDate: timestamp("release_date"),
    isLimitedEdition: boolean("is_limited_edition").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("products_seller_id_idx").on(table.sellerId),
    index("products_title_idx").on(table.title),
    index("products_status_idx").on(table.productStatus),
    index("products_visibility_idx").on(table.visibility),
  ]
);

export const productsRelations = relations(products, ({ many }) => ({
  variants: many(productVariants),
}));

export const selectProductSchema = createSelectSchema(products, {
  tags: z.array(z.string()),
  productStatus: ProductStatusEnum,
  visibility: ProductVisibilityEnum,
});
export const insertProductSchema = createInsertSchema(products, {
  tags: z.array(z.string()),
  productStatus: ProductStatusEnum,
  visibility: ProductVisibilityEnum,
});
export const updateProductSchema = createUpdateSchema(products, {
  tags: z.array(z.string()),
  productStatus: ProductStatusEnum,
  visibility: ProductVisibilityEnum,
});
