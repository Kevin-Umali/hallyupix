import SecuritySettings from "@/components/custom/settings/security";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings/security")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SecuritySettings />;
}
