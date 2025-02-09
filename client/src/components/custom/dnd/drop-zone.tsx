// components/custom/dnd/drop-zone.tsx
import React from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

export interface DropZoneProps {
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
}

interface DropZoneContainerProps {
  droppableId: string;
  children: (props: DropZoneProps) => React.ReactNode;
  className?: string;
  /** Optional minimum height to maintain even when empty */
  minHeight?: string;
  /** Direction of the droppable - vertical or horizontal */
  direction?: "vertical" | "horizontal";
}

export const DropZone: React.FC<DropZoneContainerProps> = ({ droppableId, children, className, minHeight = "100px", direction = "vertical" }) => {
  return (
    <Droppable droppableId={droppableId} direction={direction}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={cn("transition-colors duration-200", snapshot.isDraggingOver && "bg-muted/50", className)}
          style={{
            minHeight,
          }}
        >
          {children({ provided, snapshot })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
