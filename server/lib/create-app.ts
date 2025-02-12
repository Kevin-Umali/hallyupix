import { OpenAPIHono } from "@hono/zod-openapi";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { timeout } from "hono/timeout";
import { HTTPException } from "hono/http-exception";
import { rateLimiter } from "hono-rate-limiter";
import { extractClientIp } from "./ip-address";
import { prettyJSON } from "hono/pretty-json";
import { enhancedLogger } from "../middlewares/custom-logger";
import { auth } from "./auth";
import type { HonoOpenAPIConfig } from "./types";
import { ZodError } from "zod";
import { BASE_PATH } from "../constants";
import { protect } from "../middlewares/auth-guard";
import { CustomHTTPException } from "./custom-error";

const createRouter = () => {
  return new OpenAPIHono<HonoOpenAPIConfig>({
    strict: false,
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          {
            success: false,
            errors: result.error.errors.map((e) => ({
              path: e.path.join("."),
              message: e.message,
            })),
          },
          422
        );
      }
    },
  });
};

const createApp = () => {
  const app = createRouter();

  app
    .use("*", async (c, next) => {
      if (c.req.path.startsWith(BASE_PATH)) {
        return next();
      }

      return c.json(
        {
          message: "Not Found",
          requestUrl: c.req.raw.url,
        },
        404
      );
    })
    .basePath(BASE_PATH);

  app.use(secureHeaders());
  app.use(enhancedLogger({ level: "debug", excludePaths: ["/health"], mode: "pretty" }));
  app.use(
    cors({
      origin: "*",
      allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests", "Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
      maxAge: 600,
      credentials: true,
    })
  );
  app.use(
    timeout(
      60000,
      () =>
        new HTTPException(408, {
          message: "Request Timeout after waiting 60 seconds. Please try again later.",
        })
    )
  );
  app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: true,
      keyGenerator: (c) => extractClientIp(c),
    })
  );
  app.use(prettyJSON());

  app.use("*", async (c, next) => {
    const session = await auth.api.getSession({
      // Type 'Headers' is missing the following properties from type 'Headers': toJSON, count, getAll - https://github.com/oven-sh/bun/issues/9412
      headers: c.req.raw.headers as unknown as Headers,
    });

    if (!session) {
      c.set("user", null);
      c.set("session", null);
      c.set("isAuthenticated", false);
      return next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    c.set("isAuthenticated", true);
    return next();
  });

  app.use(protect({ protectedPaths: ["/api/v1/auth/use-session"] }));

  app.notFound((c) => {
    return c.json(
      {
        message: "Not Found",
      },
      404
    );
  });
  app.onError((err, c) => {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }

    if (err instanceof ZodError) {
      return c.json({ sucess: false, error: err.flatten() }, 422);
    }

    if (err instanceof CustomHTTPException) {
      return err.getResponse();
    }

    if (err instanceof HTTPException) {
      return err.getResponse();
    }

    return c.json({ sucess: false, error: err.message }, 500);
  });

  return app;
};

export { createApp, createRouter };
