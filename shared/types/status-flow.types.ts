// shared/types/status-flow.types.ts
import { z } from "zod";

export const VerificationTypeEnum = z.enum([
  // Order & Payment
  "PAYMENT_PROOF", // Screenshot/photo of payment
  "PAYMENT_CONFIRMATION", // Seller confirms payment received
  "PAYMENT_AMOUNT_MATCH", // Payment amount matches invoice
  "REMAINING_BALANCE", // Balance payment for partial payments
  "SHIPPING_FEE_PAYMENT", // Payment for shipping fees (LSF/ISF)
  "ADDITIONAL_FEE_PAYMENT", // Any additional fees (packaging, etc.)

  // Shipping & Tracking
  "KR_TRACKING_NUMBER", // Korean tracking number
  "JP_TRACKING_NUMBER", // Japan tracking number
  "CN_TRACKING_NUMBER", // China tracking number
  "PH_TRACKING_NUMBER", // Philippines tracking number
  "SHIPPING_SCREENSHOT", // Screenshot of shipping status
  "SHIPPING_LABEL", // Shipping label for packages

  // Item Status
  "STOCK_CONFIRMATION", // Confirmation of item stock
  "PO_CONFIRMATION", // Pre-order confirmation from supplier
  "ARRIVAL_PROOF", // Proof item arrived at KR/JP/CN address
  "ITEM_INSPECTION", // Photos/proof of item condition
  "PACKAGE_PROOF", // Photos of packaged item

  // Delivery
  "PICKUP_CONFIRMATION", // Confirmation for pickup option
  "DELIVERY_CONFIRMATION", // Confirmation of successful delivery
  "HANDCARRY_DETAILS", // Details for hand-carry items

  // Communication
  "CUSTOMER_CONFIRMATION", // Customer confirms details/changes
  "SHIPPING_PREFERENCES", // Customer's shipping preferences
  "CANCELLATION_REQUEST", // Customer requests cancellation

  // Admin
  "REFUND_PROOF", // Proof of refund processed
  "BATCH_CONFIRMATION", // Confirmation for batch shipping
  "MANUAL_OVERRIDE", // Admin override for special cases
]);

export const VerificationRequirementSchema = z.object({
  type: VerificationTypeEnum,
  required: z.boolean().default(false),
});

export const StatusFlowStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  description: z.string().optional(),
  order: z.number(),
  verifications: z.array(VerificationRequirementSchema).default([]),
  allowedTransitions: z.array(z.string()).default([]),
  isTerminal: z.boolean().default(false),
  // notifyRoles: z.array(z.enum(["Buyer", "Seller", "Admin"])).default([]),
});

export const StatusFlowSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  statuses: z.array(StatusFlowStatusSchema).default([]),
  initialStatus: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type VerificationType = z.infer<typeof VerificationTypeEnum>;
export type VerificationRequirement = z.infer<typeof VerificationRequirementSchema>;
export type StatusFlowStatus = z.infer<typeof StatusFlowStatusSchema>;
export type StatusFlow = z.infer<typeof StatusFlowSchema>;
