import { Button } from "@/components/ui/button";
import { createFileRoute, Link, useRouteContext } from "@tanstack/react-router";
import AuthCard from "@/components/custom/auth/auth-card";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/constant";

// Check Email Component
export const Route = createFileRoute("/_authenticated/verify-email")({
  component: CheckEmail,
});

function CheckEmail() {
  const context = useRouteContext({
    strict: false,
  });

  const email = context.auth?.user?.email;
  const maskedEmail = email
    ? (() => {
        const [localPart, domain] = email.split("@");
        const first = localPart[0]; // First character
        const last = localPart.slice(-1); // Last character
        const middleLength = localPart.length - 2; // Number of characters to mask
        const maskedMiddle = Array(middleLength).fill("*").join(""); // Mask middle characters
        return `${first}${maskedMiddle}${last}@${domain}`;
      })()
    : "your email address";

  const resendEmail = () => {
    console.log("Resend email");
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
          <Button size="lg" className="w-full" onClick={resendEmail}>
            Resend Verification Email
          </Button>
          <div className="text-center">
            <Button variant="link" asChild>
              <Link to="/sign-in">Back to Sign In</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </AuthCard>
  );
}
