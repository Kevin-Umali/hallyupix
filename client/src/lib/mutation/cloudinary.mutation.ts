import { useMutation } from "@tanstack/react-query";
import { api, CommonApiResponse, APIInferRequestType, APIInferResponseType } from "@/lib/api";
import { createMutation } from "@/lib/api-utils";

export type GetSignedUrlResponse = APIInferResponseType<typeof api.cloudinary.signed.url.$get, 200>["data"];
export const useGetSignedUrlMutation = () =>
  useMutation(createMutation<void, GetSignedUrlResponse>(api.cloudinary.signed.url.$get, "Signed URL generated successfully")());

export type DeleteImageRequest = APIInferRequestType<typeof api.cloudinary.assets.$delete>["json"];
export const useDeleteImageMutation = () =>
  useMutation(createMutation<DeleteImageRequest, CommonApiResponse>(api.cloudinary.assets.$delete, "Image deleted successfully")());
