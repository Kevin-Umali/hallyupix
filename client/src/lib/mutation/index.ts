import { useMutation } from "@tanstack/react-query";
import { resetPassword, sendVerificationEmail } from "@/lib/api";

export const useSendVerificationEmailMutation = () => {
  return useMutation({
    mutationFn: (email: string) => sendVerificationEmail({ email }),
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: ({ password, token }: { password: string; token: string }) => resetPassword({ newPassword: password, token }),
  });
};
