import { createFileRoute, useMatches } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const matches = useMatches();
  const currentPath = matches[matches.length - 1]?.pathname;
  return (
    <div>
      Hello "/_authenticated/_seller/dashboard"!
      {currentPath}
    </div>
  );
}
