import { createRoute, z } from "@hono/zod-openapi";
import { BASE_PATH } from "../constants";
import { auth } from "../lib/auth";
import { createRouter } from "../lib/create-app";
import type { HonoOpenAPI } from "../lib/types";

export const registerRoutes = (app: HonoOpenAPI) => {
  return app
    .route(
      "/test",
      createRouter().openapi(
        createRoute({
          method: "get",
          path: "/",
          request: {},
          responses: {
            200: {
              content: {
                "application/json": {
                  schema: z
                    .object({
                      data: z.record(z.any()),
                    })
                    .openapi({
                      example: {
                        data: {
                          user: {
                            name: "Quinn",
                            email: "Luther15@hotmail.com",
                            address: {
                              street: "240 Mante Gateway",
                              city: "Kamrenshire",
                              country: "Canada",
                            },
                          },
                        },
                      },
                    }),
                },
              },
              description: "Mock JSON data.",
            },
          },
        }),
        (c) =>
          c.json({
            data: { user: { name: "Quinn", email: "Luther15@hotmail.com", address: { street: "240 Mante Gateway", city: "Kamrenshire", country: "Canada" } } },
          })
      )
    )
    .on(["POST", "GET"], "/auth/**", (c) => {
      return auth.handler(c.req.raw);
    });
};

export const router = registerRoutes(createRouter().basePath(BASE_PATH));

export type HonoAppType = typeof router;
