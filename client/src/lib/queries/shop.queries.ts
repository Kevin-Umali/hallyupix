import { queryOptions } from "@tanstack/react-query";
import { api, ApiError, APIInferResponseType } from "@/lib/api";

export type ShopProfileResponse = APIInferResponseType<typeof api.shop.profile.$get, 200>["data"] | null;
export const getShopProfileQueryOptions = () => {
  return queryOptions<ShopProfileResponse, ApiError>({
    queryKey: ["shop-profile"],
    queryFn: async () => {
      const response = await api.shop.profile.$get();

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }

        const responseError = await response.json();
        const error = {
          code: responseError.code,
          message: responseError.message,
          status: response.status,
          statusText: response.statusText,
        };
        throw error;
      }

      const { data } = await response.json();

      return data;
    },
    staleTime: Infinity,
  });
};

export type ShopPaymentResponse = APIInferResponseType<typeof api.shop.payment.$get, 200>["data"] | null;
export const getShopPaymentQueryOptions = () => {
  return queryOptions<ShopPaymentResponse, ApiError>({
    queryKey: ["shop-payment"],
    queryFn: async () => {
      const response = await api.shop.payment.$get();
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }

        const responseError = await response.json();
        const error = {
          code: responseError.code,
          message: responseError.message,
          status: response.status,
          statusText: response.statusText,
        };
        throw error;
      }

      const { data } = await response.json();

      return data;
    },
    staleTime: Infinity,
  });
};
