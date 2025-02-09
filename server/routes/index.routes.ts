import { createRoute, z } from "@hono/zod-openapi";
import { BASE_PATH } from "../constants";
import { auth } from "../lib/auth";
import { createRouter } from "../lib/create-app";
import type { HonoOpenAPI } from "../lib/types";

import cloudinaryRoutes from "./cloudinary/cloudinary.index";
import shopRoutes from "./shop/shop.index";
import statusFlowRoutes from "./status-flow/status-flow.index";

export const registerRoutes = (app: HonoOpenAPI) => {
  return app
    .route(
      "/health",
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
    .on(["POST", "GET"], "/auth/**", (c) => {
      return auth.handler(c.req.raw);
    })
    .route("/cloudinary", cloudinaryRoutes)
    .route("/shop", shopRoutes)
    .route("/status/flows", statusFlowRoutes);
};

export const router = registerRoutes(createRouter().basePath(BASE_PATH));

export type HonoAppType = typeof router;
