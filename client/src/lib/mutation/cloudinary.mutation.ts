import { useMutation } from "@tanstack/react-query";
import { api, ApiError, CommonApiResponse } from "@/lib/api";

export const useGetSignedUrlMutation = () => {
  return useMutation<
    {
      timestamp: number;
      signature: string;
      folder: string;
      url: string;
    },
    ApiError
  >({
    mutationFn: async () => {
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

      return (await response.json()).data;
    },
  });
};

export const useDeleteImageMutation = () => {
  return useMutation<
    CommonApiResponse,
    ApiError,
    {
      publicId: string;
      isBanner?: boolean;
      shouldUpdateProfile?: boolean;
    }
  >({
    mutationFn: async ({ publicId, isBanner = false, shouldUpdateProfile = false }) => {
      const response = await api.cloudinary["delete-user-cloudinary-assets"].$delete({
        json: {
          publicId,
          isBanner,
          shouldUpdateProfile,
        },
      });

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

      return (await response.json()).data;
    },
  });
};
