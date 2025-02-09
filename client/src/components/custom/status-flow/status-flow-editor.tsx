import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import type { DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import { StatusFlowItem } from "@/components/custom/status-flow/status-flow-item";
import { STATUS_FLOW } from "@/constant";
import { DragDropProvider } from "@/components/custom/dnd/drag-drop-provider";
import { DragItem } from "@/components/custom/dnd/drag-item";
import { DropZone } from "@/components/custom/dnd/drop-zone";
import { SaveStatusFlowRequest } from "@/lib/mutation/status-flow.mutation";
import { useForm } from "@tanstack/react-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "@tanstack/react-router";
import CustomLoader from "@/components/custom/custom-loader";

interface StatusFlowEditorProps {
  form: ReturnType<typeof useForm<SaveStatusFlowRequest>>;
  isSaving?: boolean;
  isLoading?: boolean;
}

export const StatusFlowEditor: React.FC<StatusFlowEditorProps> = ({ form, isSaving = false, isLoading = true }) => {
  const [openFlowIndex, setOpenFlowIndex] = useState<number | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const flowsField = form.getFieldValue("flows");
    const items = Array.from(flowsField);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order values
    const updatedFlows = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    form.setFieldValue("flows", updatedFlows);
  };

  return (
    <Card>
      <CardContent className="space-y-6 mt-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-[200px]">
            <CustomLoader text="Loading status flows..." />
          </div>
        ) : (
          <>
            <DragDropProvider onDragEnd={handleDragEnd}>
              <DropZone droppableId="status-flows" className="space-y-4">
                {({ provided: dropProvided }) => (
                  <>
                    <form.Field name="flows" mode="array">
                      {(field) => (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="space-y-0.5">
                              <h3 className="font-medium">Status Flow Editor</h3>
                              <p className="text-sm text-muted-foreground">Configure your order status workflow and payment verification requirements</p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                field.pushValue({
                                  id: undefined,
                                  name: "New Status",
                                  order: field.state.value.length + 1,
                                  description: "",
                                  paymentVerification: { ...STATUS_FLOW.DEFAULT_PAYMENT_VERIFICATION },
                                  color: STATUS_FLOW.COLORS[field.state.value.length % STATUS_FLOW.COLORS.length].value,
                                })
                              }
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add New Status
                            </Button>
                          </div>

                          {Array.isArray(field.state.value) && field.state.value.length > 0 ? (
                            field.state.value.map((_, index) => (
                              <DragItem key={`flows[${index}]`} draggableId={index.toString()} index={index}>
                                {({ provided: dragProvided, snapshot: dragSnapshot }) => (
                                  <StatusFlowItem
                                    form={form}
                                    index={index}
                                    isOpen={openFlowIndex === index}
                                    onOpenChange={(isOpen) => setOpenFlowIndex(isOpen ? index : null)}
                                    dragHandleProps={{
                                      ...dragProvided.dragHandleProps,
                                      style: {
                                        cursor: dragSnapshot.isDragging ? "grabbing" : "grab",
                                        opacity: dragSnapshot.isDragging ? 0.8 : 1,
                                        transition: "transform 200ms ease",
                                      },
                                    }}
                                  />
                                )}
                              </DragItem>
                            ))
                          ) : (
                            <Alert>
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>No status flows added yet.</AlertDescription>
                            </Alert>
                          )}
                        </div>
                      )}
                    </form.Field>

                    {dropProvided.placeholder}
                  </>
                )}
              </DropZone>
            </DragDropProvider>

            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You can figure allowed transitions in the{" "}
                    <Link to="/status-flows/transitions" className="underline">
                      Status Flow Transitions
                    </Link>{" "}
                    page.
                  </AlertDescription>
                </Alert>
              </div>
              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}>
                {([canSubmit, isSubmitting, isValidating]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting || isValidating || isSaving}>
                    {isSubmitting || isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
