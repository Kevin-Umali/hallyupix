import { createRoute, z } from "@hono/zod-openapi";
import { BASE_PATH } from "../constants";
import { auth } from "../lib/auth";
import { createRouter } from "../lib/create-app";
import type { HonoOpenAPI } from "../lib/types";

export const registerRoutes = (app: HonoOpenAPI) => {
  return app
    .on(["POST", "GET"], "/auth/**", (c) => {
      return auth.handler(c.req.raw);
    })
    .route(
      "/auth/use-session",
      createRouter().openapi(
        createRoute({
          method: "get",
          path: "/",
          request: {},
          responses: {
            200: {
              description: "Successful response with session data",
              content: {
                "application/json": {
                  schema: z.object({
                    data: z.any(),
                  }),
                },
              },
            },
          },
        }),
        async (c) => {
          const session = await auth.api.getSession({
            // Type 'Headers' is missing the following properties from type 'Headers': toJSON, count, getAll - https://github.com/oven-sh/bun/issues/9412
            headers: c.req.raw.headers as unknown as Headers,
          });

          return c.json({ data: session });
        }
      )
    );
};

export const router = registerRoutes(createRouter().basePath(BASE_PATH));

export type HonoAppType = typeof router;
