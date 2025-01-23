// verifications.model.ts
import { text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectVerificationSchema = createSelectSchema(verifications);
export const insertVerificationSchema = createInsertSchema(verifications);
export const updateVerificationSchema = createUpdateSchema(verifications);
