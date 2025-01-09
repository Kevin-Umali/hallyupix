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
          schema: z
            .object({
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
            })
            .openapi({
              example: {
                data: {
                  shopName: "Hallyupix",
                  description: "Hallyupix is a unique online store that offers a wide range of products for all ages.",
                  bannerImage: "https://res.cloudinary.com/hallyupix/image/upload/v1679528400/hallyupix/123456.jpg",
                  profileImage: "https://res.cloudinary.com/hallyupix/image/upload/v1679528400/hallyupix/123456.jpg",
                  socialLinks: {
                    facebook: "https://www.facebook.com/hallyupix",
                    instagram: "https://www.instagram.com/hallyupix",
                    twitter: "https://twitter.com/hallyupix",
                    discord: "https://discord.gg/hallyupix",
                    website: "https://hallyupix.com",
                  },
                  isVerified: true,
                  createdAt: "2023-01-01T00:00:00.000Z",
                  updatedAt: "2023-01-01T00:00:00.000Z",
                },
              },
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
