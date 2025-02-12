// shared/types/shop.requests.ts
import { z } from "zod";
import {
  SocialLinksSchema,
  PaymentPoliciesSchema,
  DeadlineSettingsSchema,
  PaymentMethodSchema,
  ShippingPoliciesSchema,
  ProcessingTimesSchema,
  CustomPoliciesSchema,
  ShippingMethodSchema,
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
  minimumPartialPayment: z.number().optional(),
  customPolicies: z.array(z.string()).default([]),
}).refine((data) => !data.partialPaymentAllowed || (data.minimumPartialPayment && data.minimumPartialPayment >= 1), {
  message: "Minimum partial payment is required and must be at least 1 when partial payment is allowed.",
  path: ["minimumPartialPayment"],
});

export const SavePaymentMethodsRequestSchema = z.object({
  paymentMethods: z.array(PaymentMethodSchema),
});

// Shipping Requests
export const SaveShippingMethodRequestSchema = ShippingMethodSchema.extend({
  domestic: z.object({
    name: z.string().min(1, "Shipping policy name is required"),
    description: z.string().min(1, "Shipping policy description is required"),
    processingTime: z.string().min(1, "Processing time is required"),
    estimatedDelivery: z.string().min(1, "Estimated delivery is required"),
    baseRate: z.number().min(1, "Base rate is required"),
    isActive: z.boolean().default(true),
    areas: z
      .array(z.object({ name: z.string(), additionalFee: z.number().min(1, "Additional fee is required"), additionalTime: z.string().optional() }))
      .default([]),
    conditions: z.array(z.string()).optional(),
    notes: z.string().optional(),
  }),
  international: z.object({
    name: z.string().min(1, "Shipping policy name is required"),
    description: z.string().min(1, "Shipping policy description is required"),
    processingTime: z.string().min(1, "Processing time is required"),
    estimatedDelivery: z.string().min(1, "Estimated delivery is required"),
    baseRate: z.number().min(1, "Base rate is required"),
    isActive: z.boolean().default(true),
    areas: z
      .array(z.object({ name: z.string(), additionalFee: z.number().min(1, "Additional fee is required"), additionalTime: z.string().optional() }))
      .default([]),
    conditions: z.array(z.string()).optional(),
    notes: z.string().optional(),
  }),
});

export const SaveShippingProcessingTimesRequestSchema = ProcessingTimesSchema.extend({
  preOrder: z.string().min(1, "Pre-order processing time is required"),
  regular: z.string().min(1, "Regular processing time is required"),
  express: z.string().optional(),
  customRules: z
    .array(
      z.object({
        name: z.string(),
        time: z.string(),
        description: z.string(),
      })
    )
    .optional(),
});

export const SaveShippingPoliciesRequestSchema = ShippingPoliciesSchema.extend({
  general: z.string().min(1, "General policy is required"),
  domestic: z.object({
    deliveryGuarantees: z.array(z.string()).optional(),
    restrictions: z.array(z.string()).optional(),
    returnPolicy: z.string().min(1, "Return policy is required"),
    isActive: z.boolean(),
  }),
  international: z.object({
    customsClearance: z.array(z.string()).optional(),
    restrictions: z.array(z.string()).optional(),
    returnPolicy: z.string().min(1, "Return policy is required"),
    isActive: z.boolean(),
  }),
});

export const SaveShippingCustomPoliciesRequestSchema = z.object({
  customPolicies: z.array(
    CustomPoliciesSchema.extend({
      name: z.string().min(1, "Policy name is required"),
      description: z.string().min(1, "Policy description is required"),
      conditions: z.array(z.string()),
      fee: z.number().optional(),
      additionalTime: z.string().optional(),
      isActive: z.boolean().default(true),
    })
  ),
});

// Type exports
export type SaveShopProfileRequest = z.infer<typeof SaveShopProfileRequestSchema>;
export type UpdateProfileImageRequest = z.infer<typeof UpdateProfileImageRequestSchema>;
export type SavePaymentInstructionsRequest = z.infer<typeof SavePaymentInstructionsRequestSchema>;
export type SaveDeadlineSettingsRequest = z.infer<typeof SaveDeadlineSettingsRequestSchema>;
export type SavePaymentPoliciesRequest = z.infer<typeof SavePaymentPoliciesRequestSchema>;
export type SavePaymentMethodsRequest = z.infer<typeof SavePaymentMethodsRequestSchema>;
export type SaveShippingMethodRequest = z.infer<typeof SaveShippingMethodRequestSchema>;
export type SaveShippingProcessingTimesRequest = z.infer<typeof SaveShippingProcessingTimesRequestSchema>;
export type SaveShippingPoliciesRequest = z.infer<typeof SaveShippingPoliciesRequestSchema>;
export type SaveShippingCustomPoliciesRequest = z.infer<typeof SaveShippingCustomPoliciesRequestSchema>;
