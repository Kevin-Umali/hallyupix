import { pgTable, text, varchar, jsonb, timestamp, serial } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { productStatusEnum } from "./enums";
import { users } from "./users.model";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  sellerId: text("seller_id")
    .references(() => users.id)
    .notNull(),
  tags: jsonb("tags"),
  platforms: jsonb("platforms"),
  originCategory: text("origin_category"),
  productStatus: productStatusEnum("product_status").default("Pre-order"),
  tax: text("tax"),
  deadlineOfDownPayment: text("deadline_of_down_payment"),
  estimatedTimeOfArrival: text("estimated_time_of_arrival"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectProductSchema = createSelectSchema(products);
export const insertProductSchema = createInsertSchema(products);
export const updateProductSchema = createUpdateSchema(products);

export type Product = z.infer<typeof selectProductSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
