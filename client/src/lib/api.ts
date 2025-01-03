import { hc } from "hono/client";
import { type HonoAppType } from "@/server/routes/index.routes";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, usernameClient } from "better-auth/client/plugins";
import { auth } from "@/server/lib/auth";

export const client = hc<HonoAppType>("/", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
});
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000/api/v1/auth",
  plugins: [usernameClient(), inferAdditionalFields<typeof auth>()],
});

export type Session = typeof authClient.$Infer.Session;

export const api = client.api.v1;
export const authApi = authClient;
export const { signIn, signUp, signOut, sendVerificationEmail, getSession } = authClient;
