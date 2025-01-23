// models/shop-payment.model.ts
import { pgTable, text, timestamp, jsonb, serial } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import { z } from "zod";
import {
  PaymentMethodSchema,
  DeadlineSettingsSchema,
  PaymentPoliciesSchema,
  DEFAULT_DEADLINE_SETTINGS,
  DEFAULT_PAYMENT_POLICIES,
  type PaymentMethod,
  type DeadlineSettings,
  type PaymentPolicies,
} from "../../../shared/types/shop.types";

// Table definition
export const shopPayment = pgTable("shop_payment", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  paymentMethods: jsonb("payment_methods").$type<PaymentMethod[]>().default([]),
  paymentInstructions: text("payment_instructions"),
  deadlineSettings: jsonb("deadline_settings").$type<DeadlineSettings>().default(DEFAULT_DEADLINE_SETTINGS),
  paymentPolicies: jsonb("payment_policies").$type<PaymentPolicies>().default(DEFAULT_PAYMENT_POLICIES),
  customPolicies: jsonb("custom_policies").$type<string[]>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Base schemas
const baseSchema = {
  paymentMethods: z.array(PaymentMethodSchema).default([]),
  deadlineSettings: DeadlineSettingsSchema,
  paymentPolicies: PaymentPoliciesSchema,
  customPolicies: z.array(z.string()).default([]),
};

// Main schemas
export const selectShopPaymentSchema = createSelectSchema(shopPayment, baseSchema);
export const insertShopPaymentSchema = createInsertSchema(shopPayment, baseSchema);
export const updateShopPaymentSchema = createUpdateSchema(shopPayment, baseSchema);

// Partial schemas for specific operations
export const insertShopPaymentInstructionsSchema = insertShopPaymentSchema.pick({
  userId: true,
  paymentInstructions: true,
});

export const insertDeadlineSettingsSchema = insertShopPaymentSchema.pick({
  userId: true,
  deadlineSettings: true,
});

export const insertPaymentPoliciesSchema = insertShopPaymentSchema.pick({
  userId: true,
  paymentPolicies: true,
  customPolicies: true,
});

export const insertPaymentMethodsSchema = insertShopPaymentSchema.pick({
  userId: true,
  paymentMethods: true,
});
