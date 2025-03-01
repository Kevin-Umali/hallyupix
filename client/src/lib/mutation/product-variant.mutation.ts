import { useMutation } from "@tanstack/react-query";
import { APIInferRequestType, APIInferResponseType, api } from "@/lib/api";
import { createMutation } from "@/lib/api-utils";

export type CreateProductWithVariantsRequest = APIInferRequestType<typeof api.product.variant.$post>["json"];
export type CreateProductWithVariantsResponse = APIInferResponseType<typeof api.product.variant.$post, 200>["data"] | null;
export const useCreateProductWithVariantsMutation = () =>
  useMutation(
    createMutation<CreateProductWithVariantsRequest, CreateProductWithVariantsResponse>(api.product.variant.$post, "Product variant created successfully")()
  );

export type UpdateProductWithVariantsRequest = APIInferRequestType<typeof api.product.variant.$patch>["json"];
export type UpdateProductWithVariantsResponse = APIInferResponseType<typeof api.product.variant.$patch, 200>["data"] | null;
export const useUpdateProductWithVariantsMutation = () =>
  useMutation(
    createMutation<UpdateProductWithVariantsRequest, UpdateProductWithVariantsResponse>(api.product.variant.$patch, "Product variant updated successfully")()
  );
