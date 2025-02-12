import StatusFlowForm from "@/components/custom/status-flow/status-flow";
import { getStatusFlowQueryOptions } from "@/lib/queries/status-flow.queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/status-flows/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getStatusFlowQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: statusFlows, isLoading, dataUpdatedAt } = useSuspenseQuery(getStatusFlowQueryOptions());
  return <StatusFlowForm key={`status-flows-${dataUpdatedAt}`} initialData={statusFlows ?? {}} isLoading={isLoading} />;
}
