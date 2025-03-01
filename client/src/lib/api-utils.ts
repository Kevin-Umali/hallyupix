// lib/utils/api.ts
import { ApiError, ApiFunction } from "@/lib/api";
import { QueryFunctionContext } from "@tanstack/react-query";
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

export function createQueryFn<TResponse>(queryFn: () => Promise<Response>): (context: QueryFunctionContext<[string]>) => Promise<TResponse | null>;

// Overload for endpoints that DO require parameters:
export function createQueryFn<TResponse, TParams>(
  queryFn: (params: TParams) => Promise<Response>
): (context: QueryFunctionContext<[string, TParams]>) => Promise<TResponse | null>;

// Implementation that adapts based on whether a parameter is provided in the query key:
export function createQueryFn<TResponse, TParams>(queryFn: ((params: TParams) => Promise<Response>) | (() => Promise<Response>)) {
  return async (context: QueryFunctionContext<[string, TParams?]>) => {
    let response: Response;
    if (context.queryKey.length > 1) {
      // If a parameter is present, extract and pass it to the API call.
      const params = context.queryKey[1] as TParams;
      response = await (queryFn as (params: TParams) => Promise<Response>)(params);
    } else {
      // Otherwise, call the API function with no parameters.
      response = await (queryFn as () => Promise<Response>)();
    }

    if (response.status === 404) {
      return null;
    }
    return handleApiResponse<TResponse>(response);
  };
}

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
