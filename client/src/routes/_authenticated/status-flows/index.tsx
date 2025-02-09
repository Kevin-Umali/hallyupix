import { StatusFlowEditor } from "@/components/custom/status-flow/status-flow-editor";
import { Separator } from "@/components/ui/separator";
import { STATUS_FLOW } from "@/constant";
import { useDeleteStatusFlowMutation, useSaveStatusFlowMutation } from "@/lib/mutation/status-flow.mutation";
import { StatusFlow } from "@/shared/types/status-flow.types";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/status-flows/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync: saveStatusFlows, isPending: isSaving } = useSaveStatusFlowMutation();
  const { mutateAsync: deleteStatusFlow, isPending: isDeleting } = useDeleteStatusFlowMutation();

  const [flows, setFlows] = useState<StatusFlow[]>(STATUS_FLOW.DEFAULT_STATUS_FLOWS);

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Status Flow Management</h1>
        <p className="text-muted-foreground">Configure your order status workflows and payment verification requirements</p>
        <Separator className="my-4" />
      </div>
      <div>
        <StatusFlowEditor flows={flows} onSave={() => {}} onChange={(flows) => setFlows(flows)} />
      </div>
    </div>
  );
}
