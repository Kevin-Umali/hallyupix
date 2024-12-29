import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { auth } from "./auth";
import type { BASE_PATH } from "../constants";

export type HonoOpenAPIConfig = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export type HonoOpenAPI = OpenAPIHono<HonoOpenAPIConfig, {}, typeof BASE_PATH>;

export type HonoRouteHandler<R extends RouteConfig> = RouteHandler<R, HonoOpenAPIConfig>;
