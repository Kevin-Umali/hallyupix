import RichEditor from "@/components/custom/editor/rich-editor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <RichEditor />
    </div>
  );
}
