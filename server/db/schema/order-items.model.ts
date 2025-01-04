// order-items.model.ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { orders } from "./orders.model";
import { productVariants } from "./product-variants.model";
import { z } from "zod";

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: serial("order_id")
    .references(() => orders.id)
    .notNull(),
  variantId: serial("variant_id")
    .references(() => productVariants.id)
    .notNull(),
  quantity: text("quantity").notNull(),
  price: text("price").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectOrderItemSchema = createSelectSchema(orderItems);
export const insertOrderItemSchema = createInsertSchema(orderItems);
export const updateOrderItemSchema = createUpdateSchema(orderItems);

export type OrderItem = z.infer<typeof selectOrderItemSchema>;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type UpdateOrderItem = z.infer<typeof updateOrderItemSchema>;
