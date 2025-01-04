// order-items.model.ts
import { index, integer, jsonb, numeric, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { orders } from "./orders.model";
import { productVariants } from "./product-variants.model";
import { z } from "zod";

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: serial("order_id")
      .references(() => orders.id)
      .notNull(),
    variantId: serial("variant_id")
      .references(() => productVariants.id)
      .notNull(),
    quantity: integer("quantity").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(), // Unit price
    totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(), // Quantity x Unit price
    metadata: jsonb("metadata").default("{}"), // Optional details (e.g., size, color)
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("order_items_order_id_idx").on(table.orderId), index("order_items_variant_id_idx").on(table.variantId)]
);

export const selectOrderItemSchema = createSelectSchema(orderItems);
export const insertOrderItemSchema = createInsertSchema(orderItems);
export const updateOrderItemSchema = createUpdateSchema(orderItems);

export type OrderItem = z.infer<typeof selectOrderItemSchema>;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type UpdateOrderItem = z.infer<typeof updateOrderItemSchema>;
