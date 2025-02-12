// seller-status-flow.model.ts
import { pgTable, serial, text, jsonb, timestamp, index, boolean } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";

import { StatusFlowStatusSchema, type StatusFlowStatus } from "../../../shared/types/status-flow.types";

export const sellerStatusFlows = pgTable(
  "seller_status_flows",
  {
    id: serial("id").primaryKey(),
    sellerId: text("seller_id")
      .references(() => users.id)
      .notNull(),
    name: text("name").notNull(),
    description: text("description"),
    isDefault: boolean("is_default").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    statuses: jsonb("allowed_transitions").$type<StatusFlowStatus[]>().default([]),
    initialStatus: text("initial_status").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("seller_status_flows_seller_id_idx").on(table.sellerId),
    index("seller_status_flows_is_default_idx").on(table.isDefault),
    index("seller_status_flows_is_active_idx").on(table.isActive),
  ]
);

export const selectSellerStatusFlowSchema = createSelectSchema(sellerStatusFlows, {
  statuses: StatusFlowStatusSchema.array(),
});
export const insertSellerStatusFlowSchema = createInsertSchema(sellerStatusFlows, {
  statuses: StatusFlowStatusSchema.array(),
});
export const updateSellerStatusFlowSchema = createUpdateSchema(sellerStatusFlows, {
  statuses: StatusFlowStatusSchema.array(),
});
