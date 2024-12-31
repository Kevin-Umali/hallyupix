import { getSession, useSession } from "@/lib/api";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: () => {
    const {
      data: session,
      isPending, //loading state
      error, //error object
    } = useSession();

    console.log(session, isPending, error);
  },
  component: () => <Outlet />,
});
