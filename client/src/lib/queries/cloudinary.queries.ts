import { queryOptions, useQuery } from "@tanstack/react-query";
import { ApiError, api } from "../api";

export const getSignedUrlQueryOptions = () => {
  return queryOptions<
    {
      timestamp: number;
      signature: string;
      folder: string;
      url: string;
    },
    ApiError
  >({
    queryKey: ["signed-url"],
    queryFn: async () => {
      const response = await api.cloudinary["signed-url"].$get();
      if (!response.ok) {
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
  });
};

export const useGetSignedUrlQuery = () => {
  return useQuery(getSignedUrlQueryOptions());
};
