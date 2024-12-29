import { serveStatic } from "hono/bun";
import { createApp } from "./lib/create-app";

import { registerRoutes } from "./routes/index.routes";
import { BASE_PATH } from "./constants";

const app = registerRoutes(createApp().basePath(BASE_PATH));

app.get("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
