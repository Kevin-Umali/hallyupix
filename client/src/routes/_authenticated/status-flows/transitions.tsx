import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/status-flows/transitions")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/status-flows/transtions"!</div>;
}
