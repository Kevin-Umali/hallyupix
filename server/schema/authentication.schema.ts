import { z } from "zod";

export const loginBodyRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginBodyRequest = z.infer<typeof loginBodyRequestSchema>;
