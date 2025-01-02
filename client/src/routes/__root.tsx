import type { Session } from "@/lib/api";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: { isAuthenticated: boolean; user: Session["user"] | null } | undefined;
}>()({
  component: () => <Outlet />,
});
