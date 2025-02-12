import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { auth } from "./auth";

export type HonoOpenAPIConfig = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
    isAuthenticated: boolean;
    requestId: string;
  };
};

export type HonoOpenAPI = OpenAPIHono<HonoOpenAPIConfig, {}>;

export type HonoRouteHandler<R extends RouteConfig> = RouteHandler<R, HonoOpenAPIConfig>;
