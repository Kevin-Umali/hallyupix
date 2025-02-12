// shared/types/status-flow.requests.ts
import { z } from "zod";
import { StatusFlowSchema, StatusFlowStatusSchema, VerificationRequirementSchema } from "./status-flow.types";

export const SaveStatusFlowsRequestSchema = StatusFlowSchema.omit({
  updatedAt: true,
  createdAt: true,
}).extend({
  id: z.number().optional(),
  name: z.string().min(1, "Status name is required"),
  description: z.string().optional(),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  statuses: z
    .array(
      StatusFlowStatusSchema.extend({
        id: z.string().min(1, "Status id is required"),
        name: z.string().min(1, "Status name is required"),
        // name: VerificationRequirementSchema,
        color: z.string().min(1, "Status color is required"),
        description: z.string().optional(),
        order: z.number(),
        verifications: z
          .array(
            VerificationRequirementSchema.extend({
              type: z.string().min(1, "Verification type is required"),
              required: z.boolean().default(false),
            })
          )
          .default([]),
        allowedTransitions: z.array(z.string()).default([]),
        isTerminal: z.boolean().default(false),
        // notifyRoles: z.array(z.enum(["Buyer", "Seller", "Admin"])).default([]),
      })
    )
    .min(2, "Status list is required"),
  initialStatus: z.string().min(1, "Initial status is required"),
});

export type SaveStatusFlowsRequest = z.infer<typeof SaveStatusFlowsRequestSchema>;
