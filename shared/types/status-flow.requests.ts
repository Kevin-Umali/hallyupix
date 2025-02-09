// types/shared/status-flow.requests.ts
import { z } from "zod";
import { PaymentVerificationSchema, StatusFlowSchema } from "./status-flow.types";

export const SaveStatusFlowsRequestSchema = z.object({
  flows: z.array(
    StatusFlowSchema.omit({
      updatedAt: true,
      createdAt: true,
    }).extend({
      id: z.number().optional(),
      order: z.number(),
      name: z.string().min(1, "Status name is required"),
      color: z.string().min(1, "Status color is required"),
      description: z.string().optional(),
      allowedTransitions: z.array(z.string()).default([]),
      paymentVerification: PaymentVerificationSchema.extend({
        requireLSF: z.boolean().default(false),
        requireISF: z.boolean().default(false),
        requirePF: z.boolean().default(false),
        requirePaymentProof: z.boolean().default(false),
      }),
    })
  ),
});

export type SaveStatusFlowsRequest = z.infer<typeof SaveStatusFlowsRequestSchema>;
