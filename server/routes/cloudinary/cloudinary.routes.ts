import { createRoute, z } from "@hono/zod-openapi";

export const cloudinarySignedURL = createRoute({
  method: "get",
  path: "/signed-url",
  summary: "Generate cloudinary signed url for uploading image",
  description: "Generate cloudinary signed url for uploading image",
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z
            .object({
              data: z.object({
                timestamp: z.number(),
                folder: z.string(),
                signature: z.string(),
                url: z.string(),
              }),
            })
            .openapi({
              example: {
                data: {
                  timestamp: 1679528400,
                  folder: "hallyupix/123456",
                  signature: "1234567890",
                  url: "https://api.cloudinary.com/v1_1/hallyupix/image/upload",
                },
              },
            }),
        },
      },
      description: "Cloudinary signed url",
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

export const deleteUserCloudinaryAssets = createRoute({
  method: "delete",
  path: "/delete-user-cloudinary-assets",
  summary: "Delete all cloudinary assets for a user",
  description: "Delete all cloudinary assets for a user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            publicId: z.string(),
            isBanner: z.boolean().optional().default(false),
            shouldUpdateProfile: z.boolean().optional().default(false),
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

export type CloudinarySignedURL = typeof cloudinarySignedURL;
export type DeleteUserCloudinaryAssets = typeof deleteUserCloudinaryAssets;
