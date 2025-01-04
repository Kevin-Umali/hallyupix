// payment-submissions.model.ts
import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { orders } from "./orders.model";
import { z } from "zod";

export const paymentSubmissions = pgTable("payment_submissions", {
  id: serial("id").primaryKey(),
  orderId: serial("order_id")
    .references(() => orders.id)
    .notNull(),
  submissionUrl: text("submission_url").notNull(),
  proofImageUrl: text("proof_image_url"),
  amount: text("amount").notNull(),
  notes: text("notes"),
  submittedAt: timestamp("submitted_at"),
  verifiedAt: timestamp("verified_at"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectPaymentSubmissionSchema = createSelectSchema(paymentSubmissions);
export const insertPaymentSubmissionSchema = createInsertSchema(paymentSubmissions);
export const updatePaymentSubmissionSchema = createUpdateSchema(paymentSubmissions);

export type PaymentSubmission = z.infer<typeof selectPaymentSubmissionSchema>;
export type InsertPaymentSubmission = z.infer<typeof insertPaymentSubmissionSchema>;
export type UpdatePaymentSubmission = z.infer<typeof updatePaymentSubmissionSchema>;
