import { createRoute } from "@hono/zod-openapi";
import { DEFAULT_RESPONSES, ApiResponseSchema } from "../../../../shared/types/api.types";
import {
  SavePaymentInstructionsRequestSchema,
  SaveDeadlineSettingsRequestSchema,
  SavePaymentPoliciesRequestSchema,
  SavePaymentMethodsRequestSchema,
} from "../../../../shared/types/shop.requests";
import { ShopPaymentSchema } from "../../../../shared/types/shop.types";

export const getShopPayment = createRoute({
  method: "get",
  path: "/",
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
  path: "/instructions",
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
  path: "/deadlines",
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
  path: "/policies",
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
  path: "/methods",
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
