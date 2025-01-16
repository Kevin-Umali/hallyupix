import { useMutation } from "@tanstack/react-query";
import { CommonApiResponse, ApiError, APIInferRequestType, api } from "../api";

export type SaveProfileRequest = APIInferRequestType<typeof api.shop.profile.$post>["json"];
export const useSaveProfileMutation = () => {
  return useMutation<CommonApiResponse, ApiError, SaveProfileRequest>({
    mutationFn: async (data: SaveProfileRequest) => {
      const response = await api.shop.profile.$post({
        json: data,
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

export type UpdateShopProfileImageRequest = APIInferRequestType<typeof api.shop.profile.image.$patch>["json"];
export const useUpdateProfileImageMutation = () => {
  return useMutation<CommonApiResponse, ApiError, UpdateShopProfileImageRequest>({
    mutationFn: async (data: UpdateShopProfileImageRequest) => {
      const response = await api.shop.profile.image.$patch({
        json: data,
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

export type SaveShopPaymentInstructionsRequest = APIInferRequestType<typeof api.shop.payment.instructions.$patch>["json"];
export const useSaveShopPaymentInstructionsMutation = () => {
  return useMutation<CommonApiResponse, ApiError, SaveShopPaymentInstructionsRequest>({
    mutationFn: async (data: SaveShopPaymentInstructionsRequest) => {
      const response = await api.shop.payment.instructions.$patch({
        json: data,
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

export type SaveShopPaymentDeadlineSettingsRequest = APIInferRequestType<typeof api.shop.payment.deadlines.$patch>["json"];
export const useSaveShopPaymentDeadlineSettingsMutation = () => {
  return useMutation<CommonApiResponse, ApiError, SaveShopPaymentDeadlineSettingsRequest>({
    mutationFn: async (data: SaveShopPaymentDeadlineSettingsRequest) => {
      const response = await api.shop.payment.deadlines.$patch({
        json: data,
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

export type SaveShopPaymentPoliciesRequest = APIInferRequestType<typeof api.shop.payment.policies.$patch>["json"];
export const useSaveShopPaymentPoliciesMutation = () => {
  return useMutation<CommonApiResponse, ApiError, SaveShopPaymentPoliciesRequest>({
    mutationFn: async (data: SaveShopPaymentPoliciesRequest) => {
      const response = await api.shop.payment.policies.$patch({
        json: data,
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
