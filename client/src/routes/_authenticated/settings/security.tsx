import SecuritySettings from "@/components/custom/settings/security/security";
import { getSessionListQueryOptions } from "@/lib/queries/auth.queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings/security")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getSessionListQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { auth } = useRouteContext({
    strict: false,
  });
  const { data: sessionList, isPending: isLoadingSessions } = useSuspenseQuery(getSessionListQueryOptions());

  const currentSession = auth?.currentSession ?? null;

  return <SecuritySettings currentSession={currentSession} sessionList={sessionList?.data ?? []} isLoadingSessions={isLoadingSessions} />;
}
