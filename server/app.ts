import { serveStatic } from "hono/bun";
import { createApp } from "./lib/create-app";
import { registerRoutes } from "./routes/index.routes";

const app = registerRoutes(createApp());

app.get("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
