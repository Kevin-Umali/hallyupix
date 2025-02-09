// components/custom/dnd/drag-item.tsx
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

export interface DragItemProps {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

interface DragItemContainerProps {
  draggableId: string;
  index: number;
  isDragDisabled?: boolean;
  children: (props: DragItemProps) => React.ReactNode;
  className?: string;
}

export const DragItem: React.FC<DragItemContainerProps> = ({ draggableId, index, isDragDisabled = false, children, className }) => {
  return (
    <Draggable draggableId={draggableId} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          // Merging any inline style from DnD (if not automatically included)
          style={provided.draggableProps.style}
          className={cn("transition-shadow duration-200", snapshot.isDragging && "shadow-lg", className)}
        >
          {children({ provided, snapshot })}
        </div>
      )}
    </Draggable>
  );
};
