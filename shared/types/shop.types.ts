// /shared/types/shop.types.ts
import { z } from "zod";

// Common schemas
export const SocialLinksSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  website: z.string().optional(),
});

// Shop Profile schemas
export const ShopProfileSchema = z.object({
  shopName: z.string(),
  description: z.string().nullable().optional(),
  bannerImage: z.string().nullable().optional(),
  profileImage: z.string().nullable().optional(),
  socialLinks: SocialLinksSchema,
  isVerified: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Shop Payment schemas
export const PaymentMethodTypeEnum = z.enum(["BANK", "EWALLET", "CRYPTO"]);

export const PaymentMethodSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: PaymentMethodTypeEnum,
  accountName: z.string(),
  accountNumber: z.string(),
  qrCodeImage: z.string().optional(),
  isActive: z.boolean(),
});

export const DeadlineSettingsSchema = z.object({
  preOrderPayment: z.number(),
  regularOrderPayment: z.number(),
  paymentReminderInterval: z.number().optional(),
});

export const PaymentPoliciesSchema = z.object({
  refundPolicy: z.string(),
  cancellationPolicy: z.string(),
  partialPaymentAllowed: z.boolean(),
  minimumPartialPayment: z.number().optional(),
});

export const ShopPaymentSchema = z.object({
  paymentMethods: z.array(PaymentMethodSchema).default([]),
  paymentInstructions: z.string().nullable(),
  deadlineSettings: DeadlineSettingsSchema,
  paymentPolicies: PaymentPoliciesSchema,
  customPolicies: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Shop Shipping schemas
export const BaseShippingMethodSchema = z.object({
  name: z.string(),
  description: z.string(),
  processingTime: z.string(),
  estimatedDelivery: z.string(),
  baseRate: z.number(),
  isActive: z.boolean().default(true),
  // For different regions/provinces
  areas: z
    .array(
      z.object({
        name: z.string(),
        additionalFee: z.number(),
        additionalTime: z.string().optional(),
      })
    )
    .optional(),
  conditions: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export const ShippingMethodSchema = z.object({
  domestic: BaseShippingMethodSchema,
  international: BaseShippingMethodSchema,
});

export const ProcessingTimesSchema = z.object({
  preOrder: z.string(),
  regular: z.string(),
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

export const ShippingPoliciesSchema = z.object({
  general: z.string(),
  domestic: z.object({
    deliveryGuarantees: z.array(z.string()),
    restrictions: z.array(z.string()),
    returnPolicy: z.string(),
    isActive: z.boolean(),
  }),
  international: z.object({
    customsClearance: z.array(z.string()),
    restrictions: z.array(z.string()),
    returnPolicy: z.string(),
    isActive: z.boolean(),
  }),
});

export const CustomPoliciesSchema = z.object({
  name: z.string(),
  description: z.string(),
  conditions: z.array(z.string()),
  fee: z.number().optional(),
  additionalTime: z.string().optional(),
  isActive: z.boolean(),
});

export const ShopShippingSchema = z.object({
  shippingMethods: ShippingMethodSchema,
  processingTimes: ProcessingTimesSchema,
  shippingPolicies: ShippingPoliciesSchema,
  customPolicies: z.array(CustomPoliciesSchema).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Default values
export const DEFAULT_SOCIAL_LINKS = {};
export const DEFAULT_DEADLINE_SETTINGS = {
  preOrderPayment: 0,
  regularOrderPayment: 0,
  paymentReminderInterval: 0,
};
export const DEFAULT_PAYMENT_POLICIES = {
  refundPolicy: "",
  cancellationPolicy: "",
  partialPaymentAllowed: false,
};

export const DEFAULT_SHIPPING_METHOD = {
  name: "",
  description: "",
  processingTime: "",
  estimatedDelivery: "",
  baseRate: 0,
  isActive: true,
  areas: [],
  conditions: [],
  notes: "",
};
export const DEFAULT_PROCESSING_TIMES = {
  preOrder: "",
  regular: "",
  express: "",
  customRules: [],
};
export const DEFAULT_SHIPPING_POLICIES = {
  general: "",
  domestic: {
    deliveryGuarantees: [],
    restrictions: [],
    returnPolicy: "",
    isActive: true,
  },
  international: {
    customsClearance: [],
    restrictions: [],
    returnPolicy: "",
    isActive: true,
  },
};

// Type exports
export type SocialLinks = z.infer<typeof SocialLinksSchema>;
export type ShopProfile = z.infer<typeof ShopProfileSchema>;
export type PaymentMethodType = z.infer<typeof PaymentMethodTypeEnum>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type DeadlineSettings = z.infer<typeof DeadlineSettingsSchema>;
export type PaymentPolicies = z.infer<typeof PaymentPoliciesSchema>;
export type ShopPayment = z.infer<typeof ShopPaymentSchema>;
export type BaseShippingMethod = z.infer<typeof BaseShippingMethodSchema>;
export type ShippingMethod = z.infer<typeof ShippingMethodSchema>;
export type ProcessingTimes = z.infer<typeof ProcessingTimesSchema>;
export type ShippingPolicies = z.infer<typeof ShippingPoliciesSchema>;
export type CustomPolicies = z.infer<typeof CustomPoliciesSchema>;
export type ShopShipping = z.infer<typeof ShopShippingSchema>;
