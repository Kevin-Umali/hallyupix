import { createRoute } from "@hono/zod-openapi";
import { DEFAULT_RESPONSES, ApiResponseSchema } from "../../../../shared/types/api.types";
import {
  SaveShippingMethodRequestSchema,
  SaveShippingProcessingTimesRequestSchema,
  SaveShippingPoliciesRequestSchema,
  SaveShippingCustomPoliciesRequestSchema,
} from "../../../../shared/types/shop.requests";
import { ShopShippingSchema } from "../../../../shared/types/shop.types";

export const getShopShipping = createRoute({
  method: "get",
  path: "/",
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
  path: "/method",
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
  path: "/processing",
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
  path: "/policies",
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
  path: "/policies/custom",
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
