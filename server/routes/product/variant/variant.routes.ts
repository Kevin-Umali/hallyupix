import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { DEFAULT_RESPONSES, ApiResponseSchema } from "../../../../shared/types/api.types";
import { ProductVariantSchema } from "../../../../shared/types/product-variant.types";
import { ProductSchema } from "../../../../shared/types/product.types";
import { CreateProductWithVariantsRequestSchema, UpdateProductWithVariantsRequestSchema } from "../../../../shared/types/product-variant.request";

export const getProductWithVariants = createRoute({
  method: "get",
  path: "/",
  summary: "Get product with variants",
  description: "Get product with variants.",
  request: {
    query: z.object({
      id: z.string(),
    }),
  },
  responses: {
    ...DEFAULT_RESPONSES,
    200: {
      content: {
        "application/json": {
          schema: ApiResponseSchema(
            z.object({
              product: ProductSchema.extend({
                variants: z.array(ProductVariantSchema),
              }),
            })
          ),
        },
      },
      description: "Product",
    },
  },
});

export const getProductsWithVariants = createRoute({
  method: "get",
  path: "/",
  summary: "Get all products with pagination, sorting, filtering, search and variants",
  description: "Get all products with pagination, sorting, filtering, search and variants",
  request: {
    query: z.object({
      page: z.string().optional().default("1"),
      limit: z.string().optional().default("10"),
      sort: z.string().optional().default("createdAt"),
      order: z.string().optional().default("desc"),
      search: z.string().optional(),
    }),
  },
  responses: {
    ...DEFAULT_RESPONSES,
    200: {
      content: {
        "application/json": {
          schema: ApiResponseSchema(
            z.object({
              products: z.array(
                ProductSchema.extend({
                  variants: z.array(ProductVariantSchema),
                })
              ),
              meta: z.object({
                total: z.number(),
                page: z.number(),
                limit: z.number(),
                pages: z.number(),
              }),
            })
          ),
        },
      },
      description: "Products",
    },
  },
});

export const createProductWithVariants = createRoute({
  method: "post",
  path: "/",
  summary: "Create product with variants",
  description: "Create product with variants.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateProductWithVariantsRequestSchema,
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

export const updateProductWithVariants = createRoute({
  method: "patch",
  path: "/",
  summary: "Update product with variants",
  description: "Update product with variants.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateProductWithVariantsRequestSchema,
        },
      },
    },
  },
  responses: {
    ...DEFAULT_RESPONSES,
  },
});

export type GetProductWithVariants = typeof getProductWithVariants;
export type GetProductsWithVariants = typeof getProductsWithVariants;
export type CreateProductWithVariants = typeof createProductWithVariants;
export type UpdateProductWithVariants = typeof updateProductWithVariants;
