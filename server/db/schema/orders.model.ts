// orders.model.ts
import { jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import { sellerStatusFlows } from "./status-flow.model";
import { platformEnum, paymentStatusEnum, isfPaymentEnum, sfPaymentEnum } from "./enums";
import { z } from "zod";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  sellerId: text("seller_id")
    .references(() => users.id)
    .notNull(),
  sellerStatusFlowId: serial("seller_status_flow_id")
    .references(() => sellerStatusFlows.id)
    .notNull(),
  currentStatus: text("current_status").notNull(),
  statusHistory: jsonb("status_history").notNull().default(JSON.stringify([])), // Array of {status, timestamp, note}
  buyerEmail: text("buyer_email").notNull(),
  buyerName: text("buyer_name").notNull(),
  platform: platformEnum("platform").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").notNull(),
  paymentProof: text("payment_proof"),
  paymentProofSubmittedAt: timestamp("payment_proof_submitted_at"),
  trackingNumber: text("tracking_number"),
  trackingLink: text("tracking_link"),
  additionalLinks: jsonb("additional_links"),
  totalAmount: text("total_amount").notNull(),
  fees: text("fees"),
  feesPaymentStatus: sfPaymentEnum("fees_payment_status"),
  isf: text("isf"),
  isfPaymentStatus: isfPaymentEnum("isf_payment_status"),
  notes: text("notes"),
  orderDate: timestamp("order_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectOrderSchema = createSelectSchema(orders);
export const insertOrderSchema = createInsertSchema(orders);
export const updateOrderSchema = createUpdateSchema(orders);

export type Order = z.infer<typeof selectOrderSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
