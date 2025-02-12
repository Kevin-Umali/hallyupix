import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { DragDropProvider } from "@/components/custom/dnd/drag-drop-provider";

import type { DropResult } from "@hello-pangea/dnd";
import { SaveStatusFlowRequest } from "@/lib/mutation/status-flow.mutation";

import StatusFlowList from "@/components/custom/status-flow/status-flow-list";
import StatusFlowBasicItem from "@/components/custom/status-flow/status-flow-basic-item";
import { SaveStatusFlowsRequestSchema } from "@/shared/types/status-flow.requests";
import { StatusFlow } from "@/shared/types/status-flow.types";
import { Separator } from "@/components/ui/separator";
import { STATUS_FLOW } from "@/constant";

interface StatusFlowFormProps {
  initialData?: Partial<StatusFlow>;
  isLoading?: boolean;
}

export const StatusFlowForm: React.FC<StatusFlowFormProps> = ({ initialData }) => {
  const form = useForm<SaveStatusFlowRequest>({
    defaultValues: initialData?.id
      ? {
          ...initialData,
          name: initialData?.name ?? "",
          initialStatus: initialData?.initialStatus ?? "",
          id: initialData?.id,
          description: initialData?.description ?? "",
          isDefault: initialData?.isDefault ?? true,
          isActive: initialData?.isActive ?? true,
          statuses: initialData?.statuses ?? [],
        }
      : STATUS_FLOW.DEFAULT_STATUS_FLOW,
    onSubmit: async ({ value }) => {
      console.log(value);
    },
    validators: {
      onChange: SaveStatusFlowsRequestSchema,
    },
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const oldStatuses = form.getFieldValue("statuses");
    const allowedMapping = oldStatuses.reduce(
      (acc, status) => {
        if (status.id) {
          acc[status.id] = Array.isArray(status.allowedTransitions) ? [...status.allowedTransitions] : [];
        }
        return acc;
      },
      {} as Record<string, string[]>
    );

    const statuses = [...oldStatuses];
    const [movedStatus] = statuses.splice(result.source.index, 1);
    statuses.splice(result.destination.index, 0, movedStatus);

    const updatedStatuses = statuses.map((status, index) => {
      const isTerminal = index === statuses.length - 1;
      const oldAllowed = allowedMapping[status.id] || [];
      let newAllowed = [...oldAllowed];

      if (!isTerminal && statuses[index + 1]?.id) {
        const requiredTransition = statuses[index + 1].id;
        if (!newAllowed.includes(requiredTransition)) {
          newAllowed.push(requiredTransition);
        }
      }

      newAllowed = Array.from(new Set(newAllowed));

      return {
        ...status,
        order: index + 1,
        isTerminal,
        allowedTransitions: newAllowed,
      };
    });

    form.setFieldValue("statuses", updatedStatuses);
    if (updatedStatuses.length > 0) {
      form.setFieldValue("initialStatus", updatedStatuses[0].id);
    }
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Shipping Settings</h1>
        <p className="text-muted-foreground">Manage your shipping policies and processing times</p>
        <Separator className="my-4" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Status Flow Editor</CardTitle>
          <CardDescription>Configure your order status workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
            className="space-y-8"
          >
            {/* Basic Settings */}
            <StatusFlowBasicItem form={form} />

            {/* Status List with DND */}
            <DragDropProvider onDragEnd={handleDragEnd}>
              <StatusFlowList form={form} />
            </DragDropProvider>

            {/* Submit Button */}
            <div className="flex justify-end">
              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}>
                {([canSubmit, isSubmitting, isValidating]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting || isValidating}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusFlowForm;
