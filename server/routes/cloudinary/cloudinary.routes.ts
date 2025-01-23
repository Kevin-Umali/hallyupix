import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { DEFAULT_RESPONSES } from "../../../shared/types/api.types";

export const cloudinarySignedURL = createRoute({
  method: "get",
  path: "/signed/url",
  summary: "Generate cloudinary signed url for uploading image",
  description: "Generate cloudinary signed url for uploading image",
  request: {},
  responses: {
    ...DEFAULT_RESPONSES,
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
  },
});

export const deleteUserCloudinaryAssets = createRoute({
  method: "delete",
  path: "/assets",
  summary: "Delete all cloudinary assets for a user",
  description: "Delete all cloudinary assets for a user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            publicId: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    ...DEFAULT_RESPONSES,
  },
});

export type CloudinarySignedURL = typeof cloudinarySignedURL;
export type DeleteUserCloudinaryAssets = typeof deleteUserCloudinaryAssets;
