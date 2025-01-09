import { useMutation } from "@tanstack/react-query";
import { ApiError, CommonApiResponse, resetPassword, sendVerificationEmail } from "../api";

export const useSendVerificationEmailMutation = () => {
  return useMutation<CommonApiResponse, ApiError, string>({
    mutationFn: async (email: string) => {
      const { data, error } = await sendVerificationEmail({ email });

      if (error) {
        throw error;
      }

      return data;
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation<
    CommonApiResponse,
    ApiError,
    {
      password: string;
      token: string;
    }
  >({
    mutationFn: async ({ password, token }: { password: string; token: string }) => {
      const { data, error } = await resetPassword({ newPassword: password, token });

      if (error) {
        throw error;
      }

      return data;
    },
  });
};
