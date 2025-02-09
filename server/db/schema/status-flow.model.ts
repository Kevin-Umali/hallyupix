// seller-status-flows.model.ts
import { pgTable, serial, text, jsonb, timestamp, index } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import { z } from "zod";
import { DEFAULT_PAYMENT_VERIFICATION, PaymentVerificationSchema, type PaymentVerification } from "../../../shared/types/status-flow.types";

export const sellerStatusFlows = pgTable(
  "seller_status_flows",
  {
    id: serial("id").primaryKey(),
    sellerId: text("seller_id")
      .references(() => users.id)
      .notNull(),
    order: serial("order").notNull(),
    name: text("name").notNull(),
    color: text("color").notNull(),
    description: text("description"),
    allowedTransitions: jsonb("allowed_transitions").$type<Array<string>>().default([]),
    paymentVerification: jsonb("payment_verification").$type<PaymentVerification>().default(DEFAULT_PAYMENT_VERIFICATION),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("seller_status_flows_seller_id_idx").on(table.sellerId)]
);

export const selectSellerStatusFlowSchema = createSelectSchema(sellerStatusFlows, {
  allowedTransitions: z.array(z.string()),
  paymentVerification: PaymentVerificationSchema,
});
export const insertSellerStatusFlowSchema = createInsertSchema(sellerStatusFlows, {
  paymentVerification: PaymentVerificationSchema,
}).omit({
  allowedTransitions: true,
});
export const updateSellerStatusFlowSchema = createUpdateSchema(sellerStatusFlows, {
  paymentVerification: PaymentVerificationSchema,
}).omit({
  allowedTransitions: true,
});
