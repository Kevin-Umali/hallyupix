// orders.model.ts
import { index, jsonb, numeric, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import { sellerStatusFlows } from "./status-flow.model";
import { platformEnum, paymentStatusEnum, isfPaymentEnum, sfPaymentEnum, pfPaymentEnum } from "./enums";
import { z } from "zod";

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    orderNumber: varchar("order_number", { length: 50 }).notNull().unique(),
    sellerId: text("seller_id")
      .references(() => users.id)
      .notNull(),
    sellerStatusFlowId: serial("seller_status_flow_id")
      .references(() => sellerStatusFlows.id)
      .notNull(),
    currentStatus: varchar("current_status", { length: 50 }).notNull(),
    statusHistory: jsonb("status_history").notNull().default("[]"), // Array of {status, timestamp, note}
    buyerEmail: varchar("buyer_email", { length: 255 }).notNull(),
    buyerName: varchar("buyer_name", { length: 255 }).notNull(),
    platform: platformEnum("platform").notNull(),
    paymentStatus: paymentStatusEnum("payment_status").notNull().default("Pending"),
    trackingNumber: varchar("tracking_number", { length: 100 }),
    trackingLink: varchar("tracking_link", { length: 1000 }),
    additionalLinks: jsonb("additional_links").default("[]"),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    isf: numeric("isf", { precision: 10, scale: 2 }).default("0.00"), // International shipping fee
    lsf: numeric("lsf", { precision: 10, scale: 2 }).default("0.00"), // Local shipping fee
    pf: numeric("pf", { precision: 10, scale: 2 }).default("0.00"), // Packaging fee
    isfPaymentStatus: isfPaymentEnum("isf_payment_status"),
    lsfPaymentStatus: sfPaymentEnum("lsf_payment_status"),
    pfPaymentStatus: pfPaymentEnum("pf_payment_status"),
    notes: varchar("notes", { length: 1000 }),
    orderDate: timestamp("order_date").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("orders_order_number_idx").on(table.orderNumber),
    index("orders_seller_id_idx").on(table.sellerId),
    index("orders_status_idx").on(table.currentStatus),
    index("orders_payment_status_idx").on(table.paymentStatus),
    index("orders_date_idx").on(table.orderDate),
  ]
);

export const selectOrderSchema = createSelectSchema(orders);
export const insertOrderSchema = createInsertSchema(orders);
export const updateOrderSchema = createUpdateSchema(orders);

export type Order = z.infer<typeof selectOrderSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
