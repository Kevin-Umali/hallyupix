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
          schema: ApiResponseSchema(
            z.object({
              flows: z.array(StatusFlowSchema),
            })
          ),
        },
      },
      description: "Status flows",
    },
  },
});

export const deleteStatusFlow = createRoute({
  method: "delete",
  path: "/",
  summary: "Delete status flow",
  description: "Delete status flow.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.number(),
          }),
        },
      },
    },
  },
  responses: DEFAULT_RESPONSES,
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
              flows: z.array(StatusFlowSchema),
            })
          ),
        },
      },
      description: "Status flows",
    },
  },
});

// export const saveStatusFlowAllowedTransitions = createRoute({
//   method: "patch",
//   path: "/transitions",
//   summary: "Save status flow allowed transitions",
//   description: "Save status flow allowed transitions.",
//   request: {
//     body: {
//       content: {
//         "application/json": {
//           schema: SaveStatusFlowAllowedTransitionsRequestSchema,
//         },
//       },
//     },
//   },
//   responses: DEFAULT_RESPONSES,
// });

export type GetStatusFlows = typeof getStatusFlows;
export type DeleteStatusFlow = typeof deleteStatusFlow;
export type SaveStatusFlows = typeof saveStatusFlows;
