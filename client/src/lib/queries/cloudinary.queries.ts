import { QueryFunctionContext, queryOptions, useQuery } from "@tanstack/react-query";
import { api, APIInferResponseType } from "@/lib/api";
import { createQueryFn } from "@/lib/api-utils";

const createSignedUrlQuery = <TResponse, TKey extends [string, ...unknown[]]>(
  key: TKey,
  queryFn: (context: QueryFunctionContext<TKey>) => Promise<TResponse | null>
) =>
  queryOptions({
    queryKey: key,
    queryFn,
    staleTime: 1000 * 60 * 5,
  });

export type GetSignedUrlResponse = APIInferResponseType<typeof api.cloudinary.signed.url.$get, 200>["data"] | null;
export const getSignedUrlQueryOptions = () => createSignedUrlQuery(["signed-url"], createQueryFn<GetSignedUrlResponse>(api.cloudinary.signed.url.$get));

export const useGetSignedUrlQuery = () => {
  return useQuery(getSignedUrlQueryOptions());
};
