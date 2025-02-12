import { createRoute, z } from "@hono/zod-openapi";
import { BASE_PATH } from "../constants";
import { auth } from "../lib/auth";
import { createRouter } from "../lib/create-app";
import type { HonoOpenAPI } from "../lib/types";

import cloudinaryRoutes from "./cloudinary/cloudinary.index";
import shopRoutes from "./shop/shop.index";
import statusFlowRoutes from "./status-flow/status-flow.index";
import productRoutes from "./product/product.index";
import variantRoutes from "./product/variant/variant.index";

export const registerRoutes = (app: HonoOpenAPI) => {
  return app
    .route(
      `${BASE_PATH}/health`,
      createRouter().openapi(
        createRoute({
          method: "get",
          path: "/",
          request: {},
          responses: {
            200: {
              description: "Successful response",
              content: {
                "text/html": {
                  schema: z.string(),
                },
              },
            },
          },
        }),
        (c) => c.text("OK")
      )
    )
    .on(["POST", "GET"], `${BASE_PATH}/auth/**`, (c) => {
      return auth.handler(c.req.raw);
    })
    .route(`${BASE_PATH}/cloudinary`, cloudinaryRoutes)
    .route(`${BASE_PATH}/shop`, shopRoutes)
    .route(`${BASE_PATH}/status/flows`, statusFlowRoutes)
    .route(`${BASE_PATH}/product`, productRoutes)
    .route(`${BASE_PATH}/product/variant`, variantRoutes);
};

export const router = registerRoutes(createRouter());

export type HonoAppType = typeof router;
