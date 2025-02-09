// components/status-flow/status-flow-item.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Settings, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { StatusFlow } from "@/shared/types/status-flow.types";
import { StatusFlowItemSettings } from "@/components/custom/status-flow/status-flow-item-settings";
import { forwardRef } from "react";

interface StatusFlowItemProps {
  flowKey: string;
  flow: StatusFlow;
  allFlows: StatusFlow[];
  isOpen: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  onOpenChange: (isOpen: boolean) => void;
  onUpdate: (flowKey: string, updates: Partial<StatusFlow>) => void;
  onDelete: (flowKey: string) => void;
}

export const StatusFlowItem = forwardRef<HTMLDivElement, StatusFlowItemProps>(
  ({ flowKey, flow, allFlows, isOpen, dragHandleProps, onOpenChange, onUpdate, onDelete }, ref) => {
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate(flowKey, { name: e.target.value });
    };

    return (
      <Card ref={ref} className="relative">
        <Collapsible open={isOpen} onOpenChange={onOpenChange}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4">
            {/* Drag Handle and Name Input */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div {...dragHandleProps}>
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
              </div>
              <Input value={flow.name} onChange={handleNameChange} className="max-w-[200px]" placeholder="Status Name" />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end sm:ml-auto">
              <Badge className={cn("text-sm", flow.color)}>{flow.name}</Badge>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                </Button>
              </CollapsibleTrigger>

              <Button variant="ghost" size="icon" onClick={() => onDelete(flowKey)} className="hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          <CollapsibleContent>
            <div className="px-4 pb-4">
              <StatusFlowItemSettings flowKey={flowKey} flow={flow} allFlows={allFlows} onUpdate={onUpdate} />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Mobile Overlay when dragging */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm hidden touch-none md:hidden" />
      </Card>
    );
  }
);

StatusFlowItem.displayName = "StatusFlowItem";
