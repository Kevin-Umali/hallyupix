// shop-payment.model.ts
import { pgTable, text, timestamp, jsonb, serial } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import { z } from "zod";

export const shopPayment = pgTable("shop_payment", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  paymentMethods: jsonb("payment_methods")
    .$type<
      {
        id: string;
        name: string;
        type: "BANK" | "EWALLET" | "CRYPTO";
        accountName: string;
        accountNumber: string;
        qrCodeImage?: string;
        isActive: boolean;
      }[]
    >()
    .default([]),
  paymentInstructions: text("payment_instructions"),
  deadlineSettings: jsonb("deadline_settings")
    .$type<{
      preOrderPayment: number;
      regularOrderPayment: number;
      paymentReminderInterval?: number;
    }>()
    .default({
      preOrderPayment: 0,
      regularOrderPayment: 0,
      paymentReminderInterval: 0,
    }),
  paymentPolicies: jsonb("payment_policies")
    .$type<{
      refundPolicy: string;
      cancellationPolicy: string;
      partialPaymentAllowed: boolean;
      minimumPartialPayment?: number;
    }>()
    .default({
      refundPolicy: "",
      cancellationPolicy: "",
      partialPaymentAllowed: false,
    }),
  customPolicies: jsonb("custom_policies").$type<string[]>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectShopPaymentSchema = createSelectSchema(shopPayment);
export const insertShopPaymentSchema = createInsertSchema(shopPayment);
export const updateShopPaymentSchema = createUpdateSchema(shopPayment);

export type ShopPayment = z.infer<typeof selectShopPaymentSchema>;
export type InsertShopPayment = z.infer<typeof insertShopPaymentSchema>;
export type UpdateShopPayment = z.infer<typeof updateShopPaymentSchema>;
