import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import { z } from "zod";

export const sellerStatusFlows = pgTable("seller_status_flows", {
  id: serial("id").primaryKey(),
  sellerId: text("seller_id")
    .references(() => users.id)
    .notNull(),
  statuses: jsonb("statuses").default(JSON.stringify(["Pending", "For Review", "Completed"])),
  createdDate: timestamp("created_date"),
  updatedDate: timestamp("updated_date"),
});

export const selectSellerStatusFlowSchema = createSelectSchema(sellerStatusFlows);
export const insertSellerStatusFlowSchema = createInsertSchema(sellerStatusFlows);
export const updateSellerStatusFlowSchema = createUpdateSchema(sellerStatusFlows);

export type SellerStatusFlow = z.infer<typeof selectSellerStatusFlowSchema>;
export type InsertSellerStatusFlow = z.infer<typeof insertSellerStatusFlowSchema>;
export type UpdateSellerStatusFlow = z.infer<typeof updateSellerStatusFlowSchema>;
