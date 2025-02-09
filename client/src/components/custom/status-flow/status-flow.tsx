import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { StatusFlowEditor } from "@/components/custom/status-flow/status-flow-editor";

import { Separator } from "@/components/ui/separator";
import { useSaveStatusFlowMutation, SaveStatusFlowRequest } from "@/lib/mutation/status-flow.mutation";

import { STATUS_FLOW } from "@/constant";
import { SaveStatusFlowsRequestSchema } from "@/shared/types/status-flow.requests";
import { StatusFlowResponse } from "@/lib/queries/status-flow.queries";
import { useRouter } from "@tanstack/react-router";
import { StatusFlow } from "@/shared/types/status-flow.types";

interface StatusFlowFormProps {
  initialData?: Array<StatusFlow>;
  isLoading?: boolean;
}

export const StatusFlowForm: React.FC<StatusFlowFormProps> = ({ initialData, isLoading }) => {
  console.log("statusFlowForm", {
    initialData,
    isLoading,
  });
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: saveStatusFlows, isPending: isSaving } = useSaveStatusFlowMutation();

  // Initialize the form with default flows.
  const form = useForm<SaveStatusFlowRequest>({
    defaultValues: {
      flows: (initialData && initialData.length > 0 ? initialData : STATUS_FLOW.DEFAULT_STATUS_FLOWS).map((flow, index) => ({
        ...flow,
        order: flow.order ?? index,
        description: flow.description ?? "",
        paymentVerification: flow.paymentVerification ?? {
          requireLSF: false,
          requireISF: false,
          requirePF: false,
          requirePaymentProof: false,
        },
      })),
    },
    onSubmit: async ({ value }) => {
      await saveStatusFlows(value, {
        onSuccess: (response) => {
          queryClient.setQueryData<StatusFlowResponse>(["status-flow"], {
            flows: response?.flows ?? [],
          });
          router.invalidate({
            filter: (route) => route.routeId === "/_authenticated/status-flows/",
          });
        },
      });
    },
    validators: {
      onChange: SaveStatusFlowsRequestSchema,
    },
  });

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Status Flow Management</h1>
        <p className="text-muted-foreground">Configure your order status workflows and payment verification requirements</p>
        <Separator className="my-4" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-6"
      >
        <StatusFlowEditor form={form} isSaving={isSaving} isLoading={isLoading} />
      </form>
    </div>
  );
};

export default StatusFlowForm;
