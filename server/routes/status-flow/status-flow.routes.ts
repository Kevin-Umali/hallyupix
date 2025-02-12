import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { ApiResponseSchema, DEFAULT_RESPONSES } from "../../../shared/types/api.types";
import { StatusFlowSchema } from "../../../shared/types/status-flow.types";
import { SaveStatusFlowsRequestSchema } from "../../../shared/types/status-flow.requests";

export const getStatusFlows = createRoute({
  method: "get",
  path: "/",
  summary: "Get all status flows",
  description: "Returns all status flows.",
  request: {},
  responses: {
    ...DEFAULT_RESPONSES,
    200: {
      content: {
        "application/json": {
          schema: ApiResponseSchema(StatusFlowSchema),
        },
      },
      description: "Status flows",
    },
  },
});

export const saveStatusFlows = createRoute({
  method: "patch",
  path: "/",
  summary: "Save status flows",
  description: "Save status flows.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SaveStatusFlowsRequestSchema,
        },
      },
    },
  },
  responses: {
    ...DEFAULT_RESPONSES,
    200: {
      content: {
        "application/json": {
          schema: ApiResponseSchema(
            z.object({
              status: z.boolean(),
              flow: StatusFlowSchema,
            })
          ),
        },
      },
      description: "Status flows",
    },
  },
});

export type GetStatusFlows = typeof getStatusFlows;
export type SaveStatusFlows = typeof saveStatusFlows;
