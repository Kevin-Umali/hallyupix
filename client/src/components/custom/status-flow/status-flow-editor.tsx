// components/status-flow/status-flow-editor.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import type { DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import { StatusFlowItem } from "./status-flow-item";
import { STATUS_FLOW } from "@/constant";
import type { StatusFlow } from "@/shared/types/status-flow.types";

// Updated DnD imports:
import { DragDropProvider } from "@/components/custom/dnd/drag-drop-provider";
import { DragItem } from "@/components/custom/dnd/drag-item";
import { DropZone } from "@/components/custom/dnd/drop-zone";

interface StatusFlowEditorProps {
  flows: StatusFlow[];
  onChange: (flows: StatusFlow[]) => void;
  onSave?: () => void;
  isLoading?: boolean;
}

export const StatusFlowEditor: React.FC<StatusFlowEditorProps> = ({ flows, onChange, onSave, isLoading = false }) => {
  // Track which flow is open using its computed key.
  const [openFlowKey, setOpenFlowKey] = useState<string | null>(null);

  // Compute a unique key for each flow.
  // If flow.id exists (whether string or number), convert it to a string.
  // Otherwise, use a temporary key based on the index.
  const getFlowKey = (flow: StatusFlow & { tempId?: string }, index: number): string => {
    if (flow.id != null) {
      return flow.id.toString();
    }
    if (flow.tempId != null) {
      return flow.tempId;
    }
    return `temp-${index}`;
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(flows);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedFlows = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    onChange(updatedFlows);
  };

  const addNewFlow = () => {
    // Create a new flow without an id so that the backend can assign one later.
    const tempId = `temp-${flows.length + 1}`;

    const newFlow: StatusFlow & { tempId?: string } = {
      tempId,
      id: undefined,
      name: "New Status",
      order: flows.length + 1,
      allowedTransitions: [],
      paymentVerification: { ...STATUS_FLOW.DEFAULT_PAYMENT_VERIFICATION },
      color: STATUS_FLOW.COLORS[flows.length % STATUS_FLOW.COLORS.length].value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: "",
    };
    onChange([...flows, newFlow]);
    setOpenFlowKey(tempId);
  };

  // Update a flow by matching its computed key.
  const updateFlow = (flowKey: string, updates: Partial<StatusFlow>) => {
    const updatedFlows = flows.map((flow, index) => {
      const currentKey = getFlowKey(flow, index);
      if (currentKey === flowKey) {
        return { ...flow, ...updates, updatedAt: new Date().toISOString() };
      }
      return flow;
    });
    onChange(updatedFlows);
  };

  // Delete a flow by matching its computed key.
  const deleteFlow = (flowKey: string) => {
    let found = false;
    const updatedFlows = flows
      .filter((flow, index) => {
        const currentKey = getFlowKey(flow, index);
        if (!found && currentKey === flowKey) {
          found = true;
          return false;
        }
        return true;
      })
      .map((flow, index) => ({
        ...flow,
        order: index + 1,
      }));
    onChange(updatedFlows);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Flow Editor</CardTitle>
        <CardDescription>Configure your order status workflow and payment verification requirements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <DragDropProvider onDragEnd={handleDragEnd}>
          <DropZone droppableId="status-flows" className="space-y-4">
            {({ provided: dropProvided }) => (
              <>
                {flows.map((flow, index) => {
                  const flowKey = getFlowKey(flow as StatusFlow & { tempId?: string }, index);
                  return (
                    <DragItem key={flowKey} draggableId={flowKey} index={index}>
                      {({ provided: dragProvided, snapshot: dragSnapshot }) => (
                        <StatusFlowItem
                          flowKey={flowKey}
                          flow={flow}
                          allFlows={flows}
                          dragHandleProps={{
                            ...dragProvided.dragHandleProps,
                            style: {
                              cursor: dragSnapshot.isDragging ? "grabbing" : "grab",
                              opacity: dragSnapshot.isDragging ? 0.8 : 1,
                              transition: "transform 200ms ease",
                            },
                          }}
                          isOpen={openFlowKey === flowKey}
                          onOpenChange={(isOpen) => setOpenFlowKey(isOpen ? flowKey : null)}
                          onUpdate={updateFlow}
                          onDelete={deleteFlow}
                        />
                      )}
                    </DragItem>
                  );
                })}
                {dropProvided.placeholder}
              </>
            )}
          </DropZone>
        </DragDropProvider>

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button variant="outline" onClick={addNewFlow} disabled={isLoading}>
            <Plus className="h-4 w-4 mr-2" />
            Add Status
          </Button>
          {onSave && (
            <Button onClick={onSave} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
