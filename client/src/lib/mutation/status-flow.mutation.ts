import { useMutation } from "@tanstack/react-query";
import { APIInferRequestType, APIInferResponseType, CommonApiResponse, api } from "@/lib/api";
import { createMutation } from "@/lib/api-utils";

export type SaveStatusFlowRequest = APIInferRequestType<typeof api.status.flows.$patch>["json"];
export type SaveStatusFlowResponse = APIInferResponseType<typeof api.status.flows.$patch, 200>["data"] | null;
export const useSaveStatusFlowMutation = () =>
  useMutation(createMutation<SaveStatusFlowRequest, SaveStatusFlowResponse>(api.status.flows.$patch, "Status flow saved successfully")());

export type DeleteStatusFlowRequest = APIInferRequestType<typeof api.status.flows.$delete>["json"];
export const useDeleteStatusFlowMutation = () =>
  useMutation(createMutation<DeleteStatusFlowRequest, CommonApiResponse>(api.status.flows.$delete, "Status flow deleted successfully")());
