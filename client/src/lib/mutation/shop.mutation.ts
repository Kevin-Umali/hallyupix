import { useMutation } from "@tanstack/react-query";
import { APIInferRequestType, CommonApiResponse, api } from "@/lib/api";
import { createMutation } from "@/lib/api-utils";

export type SaveShopProfileRequest = APIInferRequestType<typeof api.shop.profile.$post>["json"];
export const useSaveProfileMutation = () =>
  useMutation(createMutation<SaveShopProfileRequest, CommonApiResponse>(api.shop.profile.$post, "Profile saved successfully")());

export type UpdateShopProfileImageRequest = APIInferRequestType<typeof api.shop.profile.image.$patch>["json"];
export const useUpdateProfileImageMutation = () =>
  useMutation(createMutation<UpdateShopProfileImageRequest, CommonApiResponse>(api.shop.profile.image.$patch, "Profile image updated successfully")());

export type SaveShopPaymentInstructionsRequest = APIInferRequestType<typeof api.shop.payment.instructions.$patch>["json"];
export const useSaveShopPaymentInstructionsMutation = () =>
  useMutation(
    createMutation<SaveShopPaymentInstructionsRequest, CommonApiResponse>(api.shop.payment.instructions.$patch, "Payment instructions saved successfully")()
  );

export type SaveShopPaymentDeadlineSettingsRequest = APIInferRequestType<typeof api.shop.payment.deadlines.$patch>["json"];
export const useSaveShopPaymentDeadlineSettingsMutation = () =>
  useMutation(
    createMutation<SaveShopPaymentDeadlineSettingsRequest, CommonApiResponse>(api.shop.payment.deadlines.$patch, "Deadline settings saved successfully")()
  );

export type SaveShopPaymentPoliciesRequest = APIInferRequestType<typeof api.shop.payment.policies.$patch>["json"];
export const useSaveShopPaymentPoliciesMutation = () =>
  useMutation(createMutation<SaveShopPaymentPoliciesRequest, CommonApiResponse>(api.shop.payment.policies.$patch, "Payment policies saved successfully")());

export type SaveShopPaymentMethodsRequest = APIInferRequestType<typeof api.shop.payment.methods.$patch>["json"];
export const useSaveShopPaymentMethodsMutation = () =>
  useMutation(createMutation<SaveShopPaymentMethodsRequest, CommonApiResponse>(api.shop.payment.methods.$patch, "Payment methods saved successfully")());
