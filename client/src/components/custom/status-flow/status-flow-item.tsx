import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Settings, Trash2, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { StatusFlowItemSettings } from "@/components/custom/status-flow/status-flow-item-settings";
import { forwardRef } from "react";
import { SaveStatusFlowRequest, useDeleteStatusFlowMutation } from "@/lib/mutation/status-flow.mutation";
import { useField, useForm } from "@tanstack/react-form";
import FieldInfo from "@/components/custom/field-info";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { StatusFlowResponse } from "@/lib/queries/status-flow.queries";

interface StatusFlowItemProps {
  form: ReturnType<typeof useForm<SaveStatusFlowRequest>>;
  index: number;
  isOpen: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  onOpenChange: (isOpen: boolean) => void;
}

export const StatusFlowItem = forwardRef<HTMLDivElement, StatusFlowItemProps>(({ index, form, isOpen, dragHandleProps, onOpenChange }, ref) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: deleteStatusFlows, isPending: isDeleting } = useDeleteStatusFlowMutation();

  const idField = useField({
    form,
    name: `flows[${index}].id`,
  });

  const colorField = useField({
    form,
    name: `flows[${index}].color`,
  });

  const nameField = useField({
    form,
    name: `flows[${index}].name`,
  });

  const onDeleteFlow = async () => {
    if (!idField.state.value) {
      form.removeFieldValue("flows", index);
      return;
    }

    deleteStatusFlows(
      {
        id: idField.state.value,
      },
      {
        onSuccess: async () => {
          // form.removeFieldValue("flows", index);

          await queryClient.setQueryData<StatusFlowResponse>(["status-flow"], (oldData) => {
            if (!oldData) return undefined;
            console.log(oldData.flows, idField.state.value);
            console.log(oldData.flows.filter((flow) => flow.id !== idField.state.value));
            return {
              flows: oldData.flows.filter((flow) => flow.id !== idField.state.value),
            };
          });

          await router.invalidate({
            filter: (route) => route.routeId === "/_authenticated/status-flows/",
          });
        },
      }
    );
  };

  return (
    <Card ref={ref} className="relative">
      <Collapsible open={isOpen} onOpenChange={onOpenChange}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div {...dragHandleProps}>
              <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
            </div>
            <form.Field name={`flows[${index}].name`}>
              {(field) => (
                <div className="flex items-center space-x-2">
                  <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} className="max-w-[200px]" placeholder="Status Name" />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end sm:ml-auto">
            <Badge className={cn("text-sm", colorField.state.value)}>{nameField.state.value}</Badge>

            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
                {isOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
              </Button>
            </CollapsibleTrigger>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={isDeleting}
              onClick={onDeleteFlow}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <CollapsibleContent>
          <div className="px-4 pb-4">
            <StatusFlowItemSettings form={form} index={index} />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm hidden touch-none md:hidden" />
    </Card>
  );
});

StatusFlowItem.displayName = "StatusFlowItem";
