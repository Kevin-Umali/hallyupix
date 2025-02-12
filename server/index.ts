import app from "./app";
import "../env";

export default {
  port: process.env.PORT ?? 3000,
  fetch: app.fetch,
};
