// types/shared/status-flow.types.ts
import { z } from "zod";

export const PaymentVerificationSchema = z.object({
  requireLSF: z.boolean(),
  requireISF: z.boolean(),
  requirePF: z.boolean(),
  requirePaymentProof: z.boolean(),
});

export const StatusFlowSchema = z.object({
  id: z.number().optional(),
  order: z.number().optional(),
  name: z.string(),
  color: z.string(),
  description: z.string().nullable().optional(),
  allowedTransitions: z.array(z.string()).optional(),
  paymentVerification: PaymentVerificationSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const DEFAULT_PAYMENT_VERIFICATION = {
  requireLSF: false,
  requireISF: false,
  requirePF: false,
  requirePaymentProof: false,
};

export type PaymentVerification = z.infer<typeof PaymentVerificationSchema>;
export type StatusFlow = z.infer<typeof StatusFlowSchema>;
