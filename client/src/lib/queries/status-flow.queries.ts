import { QueryFunctionContext, queryOptions } from "@tanstack/react-query";
import { api, APIInferResponseType } from "@/lib/api";
import { createQueryFn } from "@/lib/api-utils";

const createStatusFlowQuery = <TResponse, TKey extends [string, ...unknown[]]>(
  key: TKey,
  queryFn: (context: QueryFunctionContext<TKey>) => Promise<TResponse | null>
) =>
  queryOptions({
    queryKey: key,
    queryFn,
    staleTime: 1000 * 60 * 5,
  });

export type StatusFlowResponse = APIInferResponseType<typeof api.status.flows.$get, 200>["data"] | null;
export const getStatusFlowQueryOptions = () => createStatusFlowQuery(["status-flow"], createQueryFn<StatusFlowResponse>(api.status.flows.$get));
