// shared/types/api.types.ts
import { z } from "zod";

// Common API response schemas
export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});

export const ApiSuccessSchema = z.object({
  status: z.boolean(),
});

export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: dataSchema,
  });

// Common response patterns for routes
export const DEFAULT_RESPONSES = {
  200: {
    content: {
      "application/json": {
        schema: ApiResponseSchema(ApiSuccessSchema),
      },
    },
    description: "Success Response",
  },
  400: {
    content: {
      "application/json": {
        schema: ApiErrorSchema,
      },
    },
    description: "Bad Request",
  },
  404: {
    content: {
      "application/json": {
        schema: ApiErrorSchema,
      },
    },
    description: "Not Found",
  },
  500: {
    content: {
      "application/json": { schema: ApiErrorSchema },
    },
    description: "Generic error response",
  },
};
