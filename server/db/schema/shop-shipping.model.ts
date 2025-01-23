// shop-shipping.model.ts
import { pgTable, text, timestamp, jsonb, serial } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import {
  CustomPoliciesSchema,
  DEFAULT_PROCESSING_TIMES,
  DEFAULT_SHIPPING,
  DomesticShippingSchema,
  InternationalShippingSchema,
  ProcessingTimesSchema,
  ShippingPoliciesSchema,
  type CustomPolicies,
  type DomesticShipping,
  type InternationalShipping,
  type ProcessingTimes,
  type ShippingPolicies,
} from "../../../shared/types/shop.types";
import { z } from "zod";

export const shopShipping = pgTable("shop_shipping", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  domesticShipping: jsonb("domestic_shipping").$type<DomesticShipping>().default(DEFAULT_SHIPPING),
  internationalShipping: jsonb("international_shipping").$type<InternationalShipping>().default(DEFAULT_SHIPPING),
  processingTimes: jsonb("processing_times").$type<ProcessingTimes>().default(DEFAULT_PROCESSING_TIMES),
  shippingPolicies: jsonb("shipping_policies").$type<Record<string, ShippingPolicies>>().default({}),
  customPolicies: jsonb("custom_policies").$type<CustomPolicies[]>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectShopShippingSchema = createSelectSchema(shopShipping, {
  domesticShipping: DomesticShippingSchema,
  internationalShipping: InternationalShippingSchema,
  processingTimes: ProcessingTimesSchema,
  shippingPolicies: z.record(z.string(), ShippingPoliciesSchema),
  customPolicies: z.array(CustomPoliciesSchema),
});
export const insertShopShippingSchema = createInsertSchema(shopShipping);
export const updateShopShippingSchema = createUpdateSchema(shopShipping);
