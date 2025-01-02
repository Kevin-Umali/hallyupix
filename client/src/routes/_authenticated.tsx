import { getSessionQueryOptions } from "@/lib/queries";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context;

    const session = await queryClient.ensureQueryData(getSessionQueryOptions());

    const isAuthenticated = !!session.data?.user;

    if (!isAuthenticated) {
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: location.href,
        },
      });
    }

    return {
      auth: {
        isAuthenticated,
        user: session.data?.user,
      },
    };
  },
});
