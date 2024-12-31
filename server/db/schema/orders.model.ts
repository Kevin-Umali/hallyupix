import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import { sellerStatusFlows } from "./status-flow.model";
import { platformEnum, paymentStatusEnum, isfPaymentEnum, sfPaymentEnum } from "./enums";
import { z } from "zod";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  buyerId: text("buyer_id").references(() => users.id),
  sellerStatusFlowId: serial("status_flow_id").references(() => sellerStatusFlows.id),
  platform: platformEnum("platform").notNull(),
  buyerName: text("buyer_name").notNull(),
  status: text("status").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").notNull(),
  fees: text("fees"),
  feesPaymentStatus: sfPaymentEnum("fees_payment_status"),
  isf: text("isf"),
  isfPaymentStatus: isfPaymentEnum("isf_payment_status"),
  orderDate: text("order_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectOrderSchema = createSelectSchema(orders);
export const insertOrderSchema = createInsertSchema(orders);
export const updateOrderSchema = createUpdateSchema(orders);

export type Order = z.infer<typeof selectOrderSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
