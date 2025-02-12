import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, AlertCircle, ArrowDown } from "lucide-react";
import { useForm } from "@tanstack/react-form";

import { DropZone } from "@/components/custom/dnd/drop-zone";
import { DragItem } from "@/components/custom/dnd/drag-item";
import { useState } from "react";

import { STATUS_FLOW } from "@/constant";
import { SaveStatusFlowRequest } from "@/lib/mutation/status-flow.mutation";
import { StatusFlowItem } from "@/components/custom/status-flow/status-flow-item";

interface StatusFlowListProps {
  form: ReturnType<typeof useForm<SaveStatusFlowRequest>>;
}

export const StatusFlowList: React.FC<StatusFlowListProps> = ({ form }) => {
  const [openStatusIndex, setOpenStatusIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <DropZone droppableId="statuses" className="space-y-4">
        {({ provided: dropProvided }) => (
          <>
            <form.Field name="statuses" mode="array">
              {(field) => (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">Status Flow</h3>
                      <p className="text-sm text-muted-foreground">Define and arrange the steps in your workflow</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const statuses = form.getFieldValue("statuses");
                        const newStatusId = window.crypto.randomUUID();
                        const newStatusName = "New Status - " + (statuses.length + 1);

                        if (statuses.length > 0) {
                          const updatedStatuses = statuses.map((status, idx) => {
                            if (idx === statuses.length - 1) {
                              const allowedTransitions = status.allowedTransitions || [];
                              return {
                                ...status,
                                isTerminal: false,
                                allowedTransitions: allowedTransitions.includes(newStatusId) ? allowedTransitions : [...allowedTransitions, newStatusId],
                              };
                            }
                            return status;
                          });
                          form.setFieldValue("statuses", updatedStatuses);
                        }

                        field.pushValue({
                          id: newStatusId,
                          name: newStatusName,
                          color: STATUS_FLOW.COLORS[statuses.length % STATUS_FLOW.COLORS.length].value,
                          description: "",
                          order: statuses.length + 1,
                          verifications: [],
                          allowedTransitions: [],
                          isTerminal: true,
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Status
                    </Button>
                  </div>

                  {Array.isArray(field.state.value) && field.state.value.length > 0 ? (
                    <div className="relative space-y-1">
                      {/* Flow connection line */}
                      <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-gray-200 -z-10" />

                      {field.state.value.map((_, index) => (
                        <div key={index}>
                          <DragItem draggableId={index.toString()} index={index}>
                            {({ provided: dragProvided, snapshot: dragSnapshot }) => (
                              <div>
                                <StatusFlowItem
                                  form={form}
                                  index={index}
                                  isOpen={openStatusIndex === index}
                                  onOpenChange={(isOpen) => setOpenStatusIndex(isOpen ? index : null)}
                                  onRemove={() => field.removeValue(index)}
                                  dragHandleProps={{
                                    ...dragProvided.dragHandleProps,
                                    style: {
                                      cursor: dragSnapshot.isDragging ? "grabbing" : "grab",
                                    },
                                  }}
                                  isDragging={dragSnapshot.isDragging}
                                />
                                {index < field.state.value.length - 1 && (
                                  <div className="flex justify-center my-1">
                                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                            )}
                          </DragItem>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>Start by adding your first status</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </form.Field>
            {dropProvided.placeholder}
          </>
        )}
      </DropZone>
    </div>
  );
};

export default StatusFlowList;
