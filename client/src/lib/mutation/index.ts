import { useMutation } from "@tanstack/react-query";
import { sendVerificationEmail } from "@/lib/api";

export const useSendVerificationEmailMutation = () => {
  return useMutation({
    mutationFn: (email: string) => sendVerificationEmail({ email }),
  });
};
