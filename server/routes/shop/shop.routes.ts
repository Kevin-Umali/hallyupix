import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import DEFAULT_RESPONSE from "../../constants";

export const saveShopProfile = createRoute({
  method: "post",
  path: "/profile",
  summary: "Save shop profile",
  description: "Save shop profile",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            shopName: z.string(),
            description: z.string().optional(),
            socialLinks: z.object({
              facebook: z.string().optional(),
              instagram: z.string().optional(),
              twitter: z.string().optional(),
              discord: z.string().optional(),
              website: z.string().optional(),
            }),
          }),
        },
      },
    },
  },
  responses: {
    ...DEFAULT_RESPONSE,
  },
});

export const getShopProfile = createRoute({
  method: "get",
  path: "/profile",
  summary: "Get shop profile",
  description: "Get shop profile",
  request: {},
  responses: {
    ...DEFAULT_RESPONSE,
    200: {
      content: {
        "application/json": {
          schema: z.object({
            data: z.object({
              shopName: z.string(),
              description: z.string().nullable().optional(),
              bannerImage: z.string().nullable().optional(),
              profileImage: z.string().nullable().optional(),
              socialLinks: z.object({
                facebook: z.string().optional(),
                instagram: z.string().optional(),
                twitter: z.string().optional(),
                discord: z.string().optional(),
                website: z.string().optional(),
              }),
              isVerified: z.boolean(),
              createdAt: z.string(),
              updatedAt: z.string(),
            }),
          }),
        },
      },
      description: "Shop profile",
    },
    404: {
      content: {
        "application/json": {
          schema: z.object({
            code: z.string(),
            message: z.string(),
          }),
        },
      },
      description: "Shop profile not found",
    },
  },
});

export const updateShopProfileImage = createRoute({
  method: "patch",
  path: "/profile/image",
  summary: "Update profile image",
  description: "Update profile image",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            url: z.string().nullable().optional(),
            isBanner: z.boolean().optional().default(false),
          }),
        },
      },
    },
  },
  responses: {
    ...DEFAULT_RESPONSE,
  },
});

export type SaveShopProfile = typeof saveShopProfile;
export type GetShopProfile = typeof getShopProfile;
export type UpdateShopProfileImage = typeof updateShopProfileImage;

export const getShopPayment = createRoute({
  method: "get",
  path: "/payment",
  summary: "Get shop payment information",
  description: "Retrieve all shop payment information for the logged-in user.",
  request: {},
  responses: {
    ...DEFAULT_RESPONSE,
    200: {
      content: {
        "application/json": {
          schema: z.object({
            data: z.object({
              paymentMethods: z
                .array(
                  z.object({
                    id: z.string(),
                    name: z.string(),
                    type: z.enum(["BANK", "EWALLET", "CRYPTO"]),
                    accountName: z.string(),
                    accountNumber: z.string(),
                    qrCodeImage: z.string().optional(),
                    isActive: z.boolean(),
                  })
                )
                .default([]),
              paymentInstructions: z.string().nullable(),
              deadlineSettings: z.object({
                preOrderPayment: z.number(),
                regularOrderPayment: z.number(),
                paymentReminderInterval: z.number().optional(),
              }),
              paymentPolicies: z.object({
                refundPolicy: z.string(),
                cancellationPolicy: z.string(),
                partialPaymentAllowed: z.boolean(),
                minimumPartialPayment: z.number().optional(),
              }),
              customPolicies: z.array(z.string()).default([]),
              createdAt: z.string(),
              updatedAt: z.string(),
            }),
          }),
        },
      },
      description: "Shop payment information",
    },
    404: {
      content: {
        "application/json": {
          schema: z.object({
            code: z.string(),
            message: z.string(),
          }),
        },
      },
      description: "Shop payment not found",
    },
  },
});

export const saveShopPaymentInstructions = createRoute({
  method: "patch",
  path: "/payment/instructions",
  summary: "Save payment instructions",
  description: "Save payment instructions",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            paymentInstructions: z.string().min(1, "Payment instructions are required"),
          }),
        },
      },
    },
  },
  responses: {
    ...DEFAULT_RESPONSE,
  },
});

export const saveShopPaymentDeadlineSettings = createRoute({
  method: "patch",
  path: "/payment/deadlines",
  summary: "Save deadline settings",
  description: "Save deadline settings",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            preOrderPayment: z.number().min(1, "Pre-order payment deadline is required"),
            regularOrderPayment: z.number().min(1, "Regular order payment deadline is required"),
            paymentReminderInterval: z.number().min(1, "Payment reminder interval is required"),
          }),
        },
      },
    },
  },
  responses: {
    ...DEFAULT_RESPONSE,
  },
});

export const saveShopPaymentPolicies = createRoute({
  method: "patch",
  path: "/payment/policies",
  summary: "Save payment policies",
  description: "Save payment policies",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            refundPolicy: z.string().min(1, "Refund policy is required"),
            cancellationPolicy: z.string().min(1, "Cancellation policy is required"),
            partialPaymentAllowed: z.boolean(),
            minimumPartialPayment: z.number().min(1, "Minimum partial payment is required"),
            customPolicies: z.array(z.string()).default([]),
          }),
        },
      },
    },
  },
  responses: {
    ...DEFAULT_RESPONSE,
  },
});

export type GetShopPayment = typeof getShopPayment;
export type SaveShopPaymentInstructions = typeof saveShopPaymentInstructions;
export type SaveShopPaymentDeadlineSettings = typeof saveShopPaymentDeadlineSettings;
export type SaveShopPaymentPolicies = typeof saveShopPaymentPolicies;
