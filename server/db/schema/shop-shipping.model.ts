// shop-shipping.model.ts
import { pgTable, text, timestamp, jsonb, serial } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import {
  CustomPoliciesSchema,
  DEFAULT_PROCESSING_TIMES,
  DEFAULT_SHIPPING_METHOD,
  DEFAULT_SHIPPING_POLICIES,
  ProcessingTimesSchema,
  ShippingPoliciesSchema,
  type CustomPolicies,
  type ShippingMethod,
  type ProcessingTimes,
  type ShippingPolicies,
  ShippingMethodSchema,
} from "../../../shared/types/shop.types";
import { z } from "zod";

export const shopShipping = pgTable("shop_shipping", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  shippingMethods: jsonb("domestic_shipping").$type<ShippingMethod>().default({
    domestic: DEFAULT_SHIPPING_METHOD,
    international: DEFAULT_SHIPPING_METHOD,
  }),
  processingTimes: jsonb("processing_times").$type<ProcessingTimes>().default(DEFAULT_PROCESSING_TIMES),
  shippingPolicies: jsonb("shipping_policies").$type<ShippingPolicies>().default(DEFAULT_SHIPPING_POLICIES),
  customPolicies: jsonb("custom_policies").$type<Array<CustomPolicies>>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectShopShippingSchema = createSelectSchema(shopShipping, {
  shippingMethods: ShippingMethodSchema,
  processingTimes: ProcessingTimesSchema,
  shippingPolicies: ShippingPoliciesSchema,
  customPolicies: z.array(CustomPoliciesSchema),
});
export const insertShopShippingSchema = createInsertSchema(shopShipping, {
  shippingMethods: ShippingMethodSchema,
  processingTimes: ProcessingTimesSchema,
  shippingPolicies: ShippingPoliciesSchema,
  customPolicies: z.array(CustomPoliciesSchema),
});
export const insertShopShippingMethodSchema = insertShopShippingSchema.pick({
  userId: true,
  shippingMethods: true,
});
export const insertShopShippingProcessingTimesSchema = insertShopShippingSchema.pick({
  userId: true,
  processingTimes: true,
});
export const insertShopShippingPoliciesSchema = insertShopShippingSchema.pick({
  userId: true,
  shippingPolicies: true,
});
export const insertShopShippingCustomPoliciesSchema = insertShopShippingSchema.pick({
  userId: true,
  customPolicies: true,
});

export const updateShopShippingSchema = createUpdateSchema(shopShipping, {
  shippingMethods: ShippingMethodSchema,
  processingTimes: ProcessingTimesSchema,
  shippingPolicies: ShippingPoliciesSchema,
  customPolicies: CustomPoliciesSchema,
});
