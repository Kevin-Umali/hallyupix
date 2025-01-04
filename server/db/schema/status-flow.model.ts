// seller-status-flows.model.ts
import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import { z } from "zod";

export const sellerStatusFlows = pgTable("seller_status_flows", {
  id: serial("id").primaryKey(),
  sellerId: text("seller_id")
    .references(() => users.id)
    .notNull(),
  statuses: jsonb("statuses")
    .notNull()
    .default(
      JSON.stringify([
        {
          name: "Pending",
          order: 1,
          allowedTransitions: ["For Review", "Processing"],
          requiresPaymentVerification: true,
        },
        {
          name: "For Review",
          order: 2,
          allowedTransitions: ["Processing", "Pending"],
        },
        {
          name: "Processing",
          order: 3,
          allowedTransitions: ["Shipped", "For Review"],
        },
        {
          name: "Shipped",
          order: 4,
          allowedTransitions: ["Completed"],
        },
        {
          name: "Completed",
          order: 5,
          allowedTransitions: [],
        },
      ])
    ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectSellerStatusFlowSchema = createSelectSchema(sellerStatusFlows);
export const insertSellerStatusFlowSchema = createInsertSchema(sellerStatusFlows);
export const updateSellerStatusFlowSchema = createUpdateSchema(sellerStatusFlows);

export type SellerStatusFlow = z.infer<typeof selectSellerStatusFlowSchema>;
export type InsertSellerStatusFlow = z.infer<typeof insertSellerStatusFlowSchema>;
export type UpdateSellerStatusFlow = z.infer<typeof updateSellerStatusFlowSchema>;
