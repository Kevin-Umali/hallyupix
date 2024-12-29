import { apiReference } from "@scalar/hono-api-reference";

import type { HonoOpenAPI } from "./types";

import packageJSON from "../../package.json";
import { BASE_PATH } from "../constants";

export default function configureOpenAPI(app: HonoOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Tasks API",
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: {
        url: `${BASE_PATH}/doc`,
      },
    })
  );
}
