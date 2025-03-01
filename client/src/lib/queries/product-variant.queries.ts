import { QueryFunctionContext, queryOptions } from "@tanstack/react-query";
import { api, APIInferRequestType, APIInferResponseType } from "@/lib/api";
import { createQueryFn } from "@/lib/api-utils";

const createProductQuery = <TResponse, TKey extends [string, ...unknown[]]>(
  key: TKey,
  queryFn: (context: QueryFunctionContext<TKey>) => Promise<TResponse | null>
) =>
  queryOptions({
    queryKey: key,
    queryFn,
    staleTime: 1000 * 60 * 5,
  });

export type ProductWithVariantsResponse = APIInferResponseType<typeof api.product.variant.$get, 200>["data"] | null;
export type ProductWithVariantsQuery = APIInferRequestType<typeof api.product.variant.$get>["query"];
export const getProductWithVariantsQueryOptions = (params: ProductWithVariantsQuery) =>
  createProductQuery(
    ["product-with-variants", { query: params }],
    createQueryFn<
      ProductWithVariantsResponse,
      {
        query: ProductWithVariantsQuery;
      }
    >(api.product.variant.$get)
  );
