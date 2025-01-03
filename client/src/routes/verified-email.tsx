import AuthCard from "@/components/custom/auth/auth-card";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/constant";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/verified-email")({
  component: EmailVerified,
});

function EmailVerified() {
  return (
    <AuthCard
      sideContent={{
        title: "Join Our Community",
        description: `Your account is now verified. Start exploring ${APP_NAME}!`,
      }}
    >
      <CardHeader className="px-0 space-y-2">
        <CardTitle className="text-3xl font-bold">Email Verified!</CardTitle>
        <CardDescription className="text-base">Thank you for verifying your email. Your account is now active and ready to use.</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-8">
        <Button size="lg" className="w-full" asChild>
          <Link
            to="/dashboard"
            state={{
              email: undefined,
            }}
          >
            Go to Shop
          </Link>
        </Button>
      </CardContent>
    </AuthCard>
  );
}
