import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

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
            bannerImage: z.string().optional(),
            profileImage: z.string().optional(),
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
    200: {
      content: {
        "application/json": {
          schema: z
            .object({
              data: z.object({
                status: z.boolean(),
              }),
            })
            .openapi({
              example: {
                data: {
                  status: true,
                },
              },
            }),
        },
      },
      description: "Successful response",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            code: z.string(),
            message: z.string(),
          }),
        },
      },
      description: "Bad request",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            code: z.string(),
            message: z.string(),
          }),
        },
      },
      description: "Generic error response",
    },
  },
});

export const getShopProfile = createRoute({
  method: "get",
  path: "/profile",
  summary: "Get shop profile",
  description: "Get shop profile",
  request: {},
  responses: {
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
                  shopName: "Hally's Upix",
                  description: "Hally's Upix is a unique online store that offers a wide range of products for all ages.",
                  bannerImage: "https://res.cloudinary.com/hallyupix/image/upload/v1679528400/hallyupix/123456.jpg",
                  profileImage: "https://res.cloudinary.com/hallyupix/image/upload/v1679528400/hallyupix/123456.jpg",
                  socialLinks: {
                    facebook: "https://www.facebook.com/hallysupix",
                    instagram: "https://www.instagram.com/hallysupix",
                    twitter: "https://twitter.com/hallysupix",
                    discord: "https://discord.gg/hallysupix",
                    website: "https://hallysupix.com",
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
    500: {
      content: {
        "application/json": {
          schema: z.object({
            code: z.string(),
            message: z.string(),
          }),
        },
      },
      description: "Generic error response",
    },
  },
});

export type SaveShopProfile = typeof saveShopProfile;
export type GetShopProfile = typeof getShopProfile;
