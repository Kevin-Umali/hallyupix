// components/custom/dnd/drag-drop-provider.tsx
import { BeforeCapture, DragDropContext, DragStart, DragUpdate, DropResult } from "@hello-pangea/dnd";

export interface DragDropProviderCallbacks {
  onDragEnd: (result: DropResult) => void;
  onDragStart?: (start: DragStart) => void;
  onDragUpdate?: (update: DragUpdate) => void;
  onBeforeDragStart?: (start: DragStart) => void;
  onBeforeCapture?: (before: BeforeCapture) => void;
}

interface DragDropProviderProps extends DragDropProviderCallbacks {
  children: React.ReactNode;
  className?: string;
}

export const DragDropProvider: React.FC<DragDropProviderProps> = ({
  children,
  onDragEnd,
  onDragStart,
  onDragUpdate,
  onBeforeDragStart,
  onBeforeCapture,
  className,
}) => {
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onBeforeDragStart={onBeforeDragStart}
      onBeforeCapture={onBeforeCapture}
    >
      <div className={className}>{children}</div>
    </DragDropContext>
  );
};

DragDropProvider.displayName = "DragDropProvider";

export default DragDropProvider;
