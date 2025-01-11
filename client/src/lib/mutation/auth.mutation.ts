import { useMutation } from "@tanstack/react-query";
import { ApiError, CommonApiResponse, resetPassword, revokeOtherSessions, revokeSession, sendVerificationEmail } from "../api";

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

export const useRevokeSessionMutation = () => {
  return useMutation<CommonApiResponse, ApiError, string>({
    mutationFn: async (token: string) => {
      const { data, error } = await revokeSession({
        token,
      });

      if (error) {
        throw error;
      }

      return data;
    },
  });
};

export const useRevokeOtherSessionsMutation = () => {
  return useMutation<CommonApiResponse, ApiError>({
    mutationFn: async () => {
      const { data, error } = await revokeOtherSessions();

      if (error) {
        throw error;
      }

      return data;
    },
  });
};
