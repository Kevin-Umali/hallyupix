import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().default("3000"),
  POSTGRES_HOST: z.string().default("localhost"),
  POSTGRES_PORT: z.string().default("5432"),
  POSTGRES_USER: z.string().default("postgres"),
  POSTGRES_PASSWORD: z.string().default("user"),
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().default("secret"),
  BETTER_AUTH_URL: z.string().default("http://localhost:3000"),
  RESEND_API_KEY: z.string().default("re_XozCfTSX_EktrFiBo47kb2dC4Xkeysm7z"),
});

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
};

const parsedEnvResults = envSchema.safeParse(env);

if (!parsedEnvResults.success) {
  console.error(parsedEnvResults.error.issues);
  throw new Error("Invalid environment variables");
}

export const parsedEnv = parsedEnvResults.data;

export type EnvironmentSchemaType = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentSchemaType {}
  }
}
