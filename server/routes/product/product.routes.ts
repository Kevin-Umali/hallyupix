import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { ApiResponseSchema, DEFAULT_RESPONSES } from "../../../shared/types/api.types";
import { ProductSchema } from "../../../shared/types/product.types";
import { SaveProductRequestSchema, UpdateProductRequestSchema } from "../../../shared/types/product.request";

export const saveProduct = createRoute({
  method: "post",
  path: "/",
  summary: "Save product",
  description: "Save product.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SaveProductRequestSchema,
        },
      },
    },
  },
  responses: {
    ...DEFAULT_RESPONSES,
    200: {
      content: {
        "application/json": {
          schema: ApiResponseSchema(
            z.object({
              status: z.boolean(),
              product: ProductSchema,
            })
          ),
        },
      },
      description: "Product",
    },
  },
});

export const updateProduct = createRoute({
  method: "patch",
  path: "/",
  summary: "Update product",
  description: "Update product.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateProductRequestSchema,
        },
      },
    },
  },
  responses: {
    ...DEFAULT_RESPONSES,
  },
});

export type SaveProduct = typeof saveProduct;
export type UpdateProduct = typeof updateProduct;
