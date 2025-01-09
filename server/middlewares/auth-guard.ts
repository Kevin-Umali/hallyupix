import { createMiddleware } from "hono/factory";

import type { HonoOpenAPIConfig } from "../lib/types";

function isPathProtected(protectedPaths: string[], requestPath: string): boolean {
  return protectedPaths.some((path) => {
    if (path.endsWith("/**")) {
      const basePath = path.slice(0, -3); // Remove `/**`
      return requestPath === basePath || requestPath.startsWith(basePath + "/");
    }
    return path === requestPath;
  });
}

export function protect({
  protectedPaths,
  ignoreRedirectProtectedPaths = ["/health", "/metrics", "/favicon.ico", "/api/v1/auth/use-session"],
  onFailRedirectTo = "/401",
}: {
  protectedPaths: string[];
  ignoreRedirectProtectedPaths?: string[];
  onFailRedirectTo?: string;
}) {
  return createMiddleware<HonoOpenAPIConfig>(async (ctx, next) => {
    const requestPath = ctx.req.path;

    const requiresAuth = isPathProtected(protectedPaths, requestPath);

    if (!requiresAuth) {
      return next();
    }

    const isAuthenticated = ctx.get("isAuthenticated");
    if (!isAuthenticated) {
      return ignoreRedirectProtectedPaths.includes(requestPath)
        ? ctx.json({ status: "UNAUTHORIZED", message: "Unauthorized, you must be logged in to access this resource" }, 401)
        : ctx.redirect(onFailRedirectTo, 302);
    }

    return next();
  });
}
