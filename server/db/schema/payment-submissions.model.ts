// payment-submissions.model.ts
import { serial, timestamp, pgTable, varchar, numeric } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { orders } from "./orders.model";
import { z } from "zod";

export const paymentSubmissions = pgTable("payment_submissions", {
  id: serial("id").primaryKey(),
  orderId: serial("order_id")
    .references(() => orders.id)
    .notNull(),
  submissionUrl: varchar("submission_url", { length: 1000 }).notNull(),
  proofImageUrl: varchar("proof_image_url", { length: 1000 }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  notes: varchar("notes", { length: 1000 }),
  submittedAt: timestamp("submitted_at"),
  verifiedAt: timestamp("verified_at"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectPaymentSubmissionSchema = createSelectSchema(paymentSubmissions);
export const insertPaymentSubmissionSchema = createInsertSchema(paymentSubmissions);
export const updatePaymentSubmissionSchema = createUpdateSchema(paymentSubmissions);
