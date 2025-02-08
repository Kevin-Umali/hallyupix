import { createRoute } from "@hono/zod-openapi";
import { DEFAULT_RESPONSES, ApiResponseSchema } from "../../../shared/types/api.types";
import { ShopPaymentSchema, ShopProfileSchema, ShopShippingSchema } from "../../../shared/types/shop.types";
import {
  SaveShippingCustomPoliciesRequestSchema,
  SaveDeadlineSettingsRequestSchema,
  SaveShippingMethodRequestSchema,
  SavePaymentInstructionsRequestSchema,
  SavePaymentMethodsRequestSchema,
  SavePaymentPoliciesRequestSchema,
  SaveShippingProcessingTimesRequestSchema,
  SaveShippingPoliciesRequestSchema,
  SaveShopProfileRequestSchema,
  UpdateProfileImageRequestSchema,
} from "../../../shared/types/shop.requests";

export const saveShopProfile = createRoute({
  method: "post",
  path: "/profile",
  summary: "Save shop profile",
  description: "Save shop profile information",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SaveShopProfileRequestSchema,
        },
      },
    },
  },
  responses: DEFAULT_RESPONSES,
});

export const getShopProfile = createRoute({
  method: "get",
  path: "/profile",
  summary: "Get shop profile",
  description: "Get shop profile information",
  request: {},
  responses: {
    ...DEFAULT_RESPONSES,
    200: {
      content: {
        "application/json": {
          schema: ApiResponseSchema(ShopProfileSchema),
        },
      },
      description: "Shop profile",
    },
  },
});

export const updateShopProfileImage = createRoute({
  method: "patch",
  path: "/profile/image",
  summary: "Update profile image",
  description: "Update shop profile or banner image",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateProfileImageRequestSchema,
        },
      },
    },
  },
  responses: DEFAULT_RESPONSES,
});

export type SaveShopProfile = typeof saveShopProfile;
export type GetShopProfile = typeof getShopProfile;
export type UpdateShopProfileImage = typeof updateShopProfileImage;

export const getShopPayment = createRoute({
  method: "get",
  path: "/payment",
  summary: "Get shop payment information",
  description: "Retrieve all shop payment information for the logged-in user",
  request: {},
  responses: {
    ...DEFAULT_RESPONSES,
    200: {
      content: {
        "application/json": {
          schema: ApiResponseSchema(ShopPaymentSchema),
        },
      },
      description: "Shop payment information",
    },
  },
});

export const saveShopPaymentInstructions = createRoute({
  method: "patch",
  path: "/payment/instructions",
  summary: "Save payment instructions",
  description: "Save shop payment instructions",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SavePaymentInstructionsRequestSchema,
        },
      },
    },
  },
  responses: DEFAULT_RESPONSES,
});

export const saveShopPaymentDeadlineSettings = createRoute({
  method: "patch",
  path: "/payment/deadlines",
  summary: "Save deadline settings",
  description: "Save payment deadline settings",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SaveDeadlineSettingsRequestSchema,
        },
      },
    },
  },
  responses: DEFAULT_RESPONSES,
});

export const saveShopPaymentPolicies = createRoute({
  method: "patch",
  path: "/payment/policies",
  summary: "Save payment policies",
  description: "Save shop payment policies",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SavePaymentPoliciesRequestSchema,
        },
      },
    },
  },
  responses: DEFAULT_RESPONSES,
});

export const saveShopPaymentMethods = createRoute({
  method: "patch",
  path: "/payment/methods",
  summary: "Save payment methods",
  description: "Save shop payment methods",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SavePaymentMethodsRequestSchema,
        },
      },
    },
  },
  responses: DEFAULT_RESPONSES,
});

// Type exports
export type GetShopPayment = typeof getShopPayment;
export type SaveShopPaymentInstructions = typeof saveShopPaymentInstructions;
export type SaveShopPaymentDeadlineSettings = typeof saveShopPaymentDeadlineSettings;
export type SaveShopPaymentPolicies = typeof saveShopPaymentPolicies;
export type SaveShopPaymentMethods = typeof saveShopPaymentMethods;

export const getShopShipping = createRoute({
  method: "get",
  path: "/shipping",
  summary: "Get shop shipping information",
  description: "Retrieve all shop shipping information for the logged-in user",
  request: {},
  responses: {
    ...DEFAULT_RESPONSES,
    200: {
      content: {
        "application/json": {
          schema: ApiResponseSchema(ShopShippingSchema),
        },
      },
      description: "Shop shipping information",
    },
  },
});

export const saveShopShippingMethod = createRoute({
  method: "patch",
  path: "/shipping/method",
  summary: "Save shipping method",
  description: "Save shipping method",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SaveShippingMethodRequestSchema,
        },
      },
    },
  },
  responses: DEFAULT_RESPONSES,
});

export const saveShopShippingProcessingTimes = createRoute({
  method: "patch",
  path: "/shipping/processing",
  summary: "Save processing times",
  description: "Save processing times",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SaveShippingProcessingTimesRequestSchema,
        },
      },
    },
  },
  responses: DEFAULT_RESPONSES,
});

export const saveShopShippingPolicies = createRoute({
  method: "patch",
  path: "/shipping/policies",
  summary: "Save shipping policies",
  description: "Save shipping policies",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SaveShippingPoliciesRequestSchema,
        },
      },
    },
  },
  responses: DEFAULT_RESPONSES,
});

export const saveShopShippingCustomPolicies = createRoute({
  method: "patch",
  path: "/shipping/policies/custom",
  summary: "Save custom shipping policies",
  description: "Save custom shipping policies",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SaveShippingCustomPoliciesRequestSchema,
        },
      },
    },
  },
  responses: DEFAULT_RESPONSES,
});

export type GetShopShipping = typeof getShopShipping;
export type SaveShopShippingMethod = typeof saveShopShippingMethod;
export type SaveShopShippingProcessingTimes = typeof saveShopShippingProcessingTimes;
export type SaveShopShippingPolicies = typeof saveShopShippingPolicies;
export type SaveShopShippingCustomPolicies = typeof saveShopShippingCustomPolicies;
