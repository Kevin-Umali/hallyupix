import { queryOptions } from "@tanstack/react-query";
import { api, APIInferResponseType } from "@/lib/api";
import { createQueryFn } from "@/lib/api-utils";

const createShopQuery = <TResponse>(key: string[], queryFn: () => Promise<TResponse | null>) =>
  queryOptions({
    queryKey: key,
    queryFn,
    staleTime: Infinity,
  });

// Query options
export type ShopProfileResponse = APIInferResponseType<typeof api.shop.profile.$get, 200>["data"] | null;
export const getShopProfileQueryOptions = () => createShopQuery(["shop-profile"], createQueryFn<ShopProfileResponse>(api.shop.profile.$get));

export type ShopPaymentResponse = APIInferResponseType<typeof api.shop.payment.$get, 200>["data"] | null;
export const getShopPaymentQueryOptions = () => createShopQuery(["shop-payment"], createQueryFn<ShopPaymentResponse>(api.shop.payment.$get));
