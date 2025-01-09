// shop-shipping.model.ts
import { pgTable, text, timestamp, jsonb, serial } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "./users.model";
import { z } from "zod";

export const shopShipping = pgTable("shop_shipping", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  domesticShipping: jsonb("domestic_shipping")
    .$type<{
      description: string;
      processingTime: string;
      estimatedDelivery: string;
      cost?: number;
      restrictions?: string[];
      notes?: string;
    }>()
    .default({
      description: "",
      processingTime: "",
      estimatedDelivery: "",
      cost: 0,
      restrictions: [],
      notes: "",
    }),
  internationalShipping: jsonb("international_shipping")
    .$type<{
      description: string;
      processingTime: string;
      estimatedDelivery: string;
      cost?: number;
      restrictions?: string[];
      notes?: string;
    }>()
    .default({
      description: "",
      processingTime: "",
      estimatedDelivery: "",
      cost: 0,
      restrictions: [],
      notes: "",
    }),
  processingTimes: jsonb("processing_times")
    .$type<{
      preOrder: string;
      regular: string;
      express?: string;
      customRules?: Array<{
        condition: string;
        time: string;
      }>;
    }>()
    .default({
      preOrder: "",
      regular: "",
      express: "",
      customRules: [],
    }),
  shippingPolicies: jsonb("shipping_policies")
    .$type<
      Record<
        string,
        {
          description: string;
          processingTime: string;
          estimatedDelivery: string;
          cost?: number;
          restrictions?: string[];
          notes?: string;
        }
      >
    >()
    .default({}),
  customPolicies: jsonb("custom_policies")
    .$type<
      Array<{
        name: string;
        description: string;
        conditions: string[];
        cost?: number;
        isActive: boolean;
      }>
    >()
    .default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectShopShippingSchema = createSelectSchema(shopShipping);
export const insertShopShippingSchema = createInsertSchema(shopShipping);
export const updateShopShippingSchema = createUpdateSchema(shopShipping);

export type ShopShipping = z.infer<typeof selectShopShippingSchema>;
export type InsertShopShipping = z.infer<typeof insertShopShippingSchema>;
export type UpdateShopShipping = z.infer<typeof updateShopShippingSchema>;
