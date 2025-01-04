import { Button } from "@/components/ui/button";
import { createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import AuthCard from "@/components/custom/auth/auth-card";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/constant";
import { useSendVerificationEmailMutation } from "@/lib/mutation";
import { Loader2 } from "lucide-react";
import { maskEmail } from "@/lib/utils";
import { toast } from "sonner";

// Check Email Component
export const Route = createFileRoute("/verify-email")({
  component: CheckEmail,
});

function CheckEmail() {
  const navigate = useNavigate();
  const email = useRouterState({
    select: (state) => state.location.state.email,
  });

  if (!email) {
    throw navigate({
      to: "/sign-up",
      state: { email: undefined },
    });
  }

  const { mutate: sendVerificationEmailMutation, isPending } = useSendVerificationEmailMutation();

  const maskedEmail = maskEmail(email ?? "", {
    minVisible: 0.4,
    maskChar: "*",
    preserveDots: true,
  });

  const resendEmail = () => {
    toast.dismiss();
    sendVerificationEmailMutation(email ?? "", {
      onSuccess: () => {
        toast.success("Verification email sent", {
          description: "Please check your inbox and follow the link to verify your account.",
        });
      },
      onError: (error) => {
        toast.error(error.code || "Error", {
          description: error.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <AuthCard
      sideContent={{
        title: `Welcome to ${APP_NAME}`,
        description: "We're excited to have you join our community. Just one more step to get started!",
      }}
    >
      <CardHeader className="px-0 space-y-4">
        <CardTitle className="text-3xl font-bold">Verify Your Email</CardTitle>
        <CardDescription className="text-base leading-relaxed">
          A verification link has been sent to <span className="font-semibold">{maskedEmail}</span>. Please check your inbox and follow the link to verify your
          account. If you don’t see the email, check your spam or junk folder.
          <br />
          <br />
          Verifying your email ensures your account is secure and unlocks all the features of {APP_NAME}.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-8">
        <div className="space-y-4">
          <Button size="lg" className="w-full" onClick={resendEmail} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Resending...
              </>
            ) : (
              "Resend Verification Email"
            )}
          </Button>
          <div className="text-center">
            <Button variant="link" asChild disabled={isPending}>
              <Link to="/sign-in">Back to Sign In</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </AuthCard>
  );
}
