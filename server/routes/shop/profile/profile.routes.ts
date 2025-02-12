import { createRoute } from "@hono/zod-openapi";
import { ApiResponseSchema, DEFAULT_RESPONSES } from "../../../../shared/types/api.types";
import { SaveShopProfileRequestSchema, UpdateProfileImageRequestSchema } from "../../../../shared/types/shop.requests";
import { ShopProfileSchema } from "../../../../shared/types/shop.types";

export const saveShopProfile = createRoute({
  method: "post",
  path: "/",
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
  path: "/",
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
  path: "/image",
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
