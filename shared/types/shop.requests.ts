// types/shared/shop.requests.ts
import { z } from "zod";
import {
  SocialLinksSchema,
  PaymentPoliciesSchema,
  DeadlineSettingsSchema,
  PaymentMethodSchema,
  ShippingPoliciesSchema,
  DomesticShippingSchema,
  InternationalShippingSchema,
  ProcessingTimesSchema,
  CustomPoliciesSchema,
} from "./shop.types";

// Profile Requests
export const SaveShopProfileRequestSchema = z.object({
  shopName: z.string(),
  description: z.string().optional(),
  socialLinks: SocialLinksSchema,
});

export const UpdateProfileImageRequestSchema = z.object({
  url: z.string().nullable().optional(),
  isBanner: z.boolean().optional().default(false),
});

// Payment Requests
export const SavePaymentInstructionsRequestSchema = z.object({
  paymentInstructions: z.string().min(1, "Payment instructions are required"),
});

export const SaveDeadlineSettingsRequestSchema = DeadlineSettingsSchema.extend({
  preOrderPayment: z.number().min(1, "Pre-order payment deadline is required"),
  regularOrderPayment: z.number().min(1, "Regular order payment deadline is required"),
  paymentReminderInterval: z.number().min(1, "Payment reminder interval is required"),
});

export const SavePaymentPoliciesRequestSchema = PaymentPoliciesSchema.extend({
  refundPolicy: z.string().min(1, "Refund policy is required"),
  cancellationPolicy: z.string().min(1, "Cancellation policy is required"),
  partialPaymentAllowed: z.boolean(),
  minimumPartialPayment: z.number().min(1, "Minimum partial payment is required"),
  customPolicies: z.array(z.string()).default([]),
});

export const SavePaymentMethodsRequestSchema = z.object({
  paymentMethods: z.array(PaymentMethodSchema),
});

// Shipping Requests
export const SaveDomesticShippingRequestSchema = DomesticShippingSchema.extend({
  description: z.string().min(1, "Shipping policy description is required"),
  processingTime: z.string().min(1, "Processing time is required"),
  estimatedDelivery: z.string().min(1, "Estimated delivery is required"),
  cost: z.number().optional(),
  restrictions: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export const SaveInternationalShippingRequestSchema = InternationalShippingSchema.extend({
  description: z.string().min(1, "Shipping policy description is required"),
  processingTime: z.string().min(1, "Processing time is required"),
  estimatedDelivery: z.string().min(1, "Estimated delivery is required"),
  cost: z.number().optional(),
  restrictions: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export const SaveProcessingTimesRequestSchema = ProcessingTimesSchema.extend({
  preOrder: z.string().min(1, "Pre-order processing time is required"),
  regular: z.string().min(1, "Regular processing time is required"),
  express: z.string().optional(),
  customRules: z
    .array(
      z.object({
        condition: z.string(),
        time: z.string(),
      })
    )
    .optional(),
});

export const SaveShippingPoliciesRequestSchema = z.record(
  z.string(),
  ShippingPoliciesSchema.extend({
    description: z.string().min(1, "Policy description is required"),
    processingTime: z.string().min(1, "Processing time is required"),
    estimatedDelivery: z.string().min(1, "Estimated delivery is required"),
    cost: z.number().optional(),
    restrictions: z.array(z.string()).optional(),
    notes: z.string().optional(),
  })
);

export const SaveCustomPoliciesRequestSchema = z.array(
  CustomPoliciesSchema.extend({
    name: z.string().min(1, "Policy name is required"),
    description: z.string().min(1, "Policy description is required"),
    conditions: z.array(z.string()),
    cost: z.number().optional(),
    isActive: z.boolean().default(true),
  })
);

// Type exports
export type SaveShopProfileRequest = z.infer<typeof SaveShopProfileRequestSchema>;
export type UpdateProfileImageRequest = z.infer<typeof UpdateProfileImageRequestSchema>;
export type SavePaymentInstructionsRequest = z.infer<typeof SavePaymentInstructionsRequestSchema>;
export type SaveDeadlineSettingsRequest = z.infer<typeof SaveDeadlineSettingsRequestSchema>;
export type SavePaymentPoliciesRequest = z.infer<typeof SavePaymentPoliciesRequestSchema>;
export type SavePaymentMethodsRequest = z.infer<typeof SavePaymentMethodsRequestSchema>;
export type SaveDomesticShippingRequest = z.infer<typeof SaveDomesticShippingRequestSchema>;
export type SaveInternationalShippingRequest = z.infer<typeof SaveInternationalShippingRequestSchema>;
export type SaveProcessingTimesRequest = z.infer<typeof SaveProcessingTimesRequestSchema>;
export type SaveShippingPoliciesRequest = z.infer<typeof SaveShippingPoliciesRequestSchema>;
export type SaveCustomPoliciesRequest = z.infer<typeof SaveCustomPoliciesRequestSchema>;
