import ProfileSettings from "@/components/custom/settings/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProfileSettings />;
}
