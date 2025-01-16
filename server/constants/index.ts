import { z } from "zod";

export const BASE_PATH = "/api/v1";

export const ErrorResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
});

const SuccessResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: dataSchema,
  });

const DEFAULT_RESPONSE = {
  200: {
    content: {
      "application/json": {
        schema: z
          .object({
            data: z.object({
              status: z.boolean(),
            }),
          })
          .openapi({
            example: {
              data: {
                status: true,
              },
            },
          }),
      },
    },
    description: "Default successful response",
  },
  400: {
    content: {
      "application/json": { schema: ErrorResponseSchema },
    },
    description: "Bad request",
  },
  500: {
    content: {
      "application/json": { schema: ErrorResponseSchema },
    },
    description: "Generic error response",
  },
};

export default DEFAULT_RESPONSE;
