// lib/utils/api.ts
import { ApiError, ApiFunction } from "@/lib/api";
import { toast } from "sonner";

export const handleApiResponse = async <T>(response: Response): Promise<T> => {
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
};

export const createQueryFn =
  <TResponse>(queryFn: () => Promise<Response>) =>
  async () => {
    const response = await queryFn();
    if (response.status === 404) {
      return null;
    }
    return handleApiResponse<TResponse>(response);
  };

export type MutationConfig<TData = unknown> = {
  onSuccess?: (data: TData) => void | Promise<void>;
  onError?: (error: ApiError) => void | Promise<void>;
  skipToast?: boolean;
};

export const createMutation =
  <TRequest, TResponse>(mutationFn: ApiFunction<TRequest>, successMessage: string) =>
  (config?: MutationConfig<TResponse>) => ({
    mutationFn: async (data: TRequest) => {
      const response = await mutationFn({ json: data });
      return handleApiResponse<TResponse>(response);
    },
    onSuccess: async (data: TResponse) => {
      if (!config?.skipToast) {
        toast.success(successMessage);
      }
      await config?.onSuccess?.(data);
    },
    onError: async (error: ApiError) => {
      if (!config?.skipToast) {
        toast.error(error.code, {
          description: error.message,
        });
      }
      await config?.onError?.(error);
    },
  });
