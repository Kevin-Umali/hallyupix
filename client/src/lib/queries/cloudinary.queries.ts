import { queryOptions, useQuery } from "@tanstack/react-query";
import { api, APIInferResponseType } from "@/lib/api";
import { createQueryFn } from "@/lib/api-utils";

const createSignedUrlQuery = <TResponse>(key: string[], queryFn: () => Promise<TResponse | null>) =>
  queryOptions({
    queryKey: key,
    queryFn,
  });

export type GetSignedUrlResponse = APIInferResponseType<typeof api.cloudinary.signed.url.$get, 200>["data"] | null;
export const getSignedUrlQueryOptions = () => createSignedUrlQuery(["signed-url"], createQueryFn<GetSignedUrlResponse>(api.cloudinary.signed.url.$get));

export const useGetSignedUrlQuery = () => {
  return useQuery(getSignedUrlQueryOptions());
};
