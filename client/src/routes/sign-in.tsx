import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "@/components/custom/auth/auth-card";
import SignInForm from "@/components/custom/auth/sign-in";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
});

function SignIn() {
  return (
    <AuthCard
      sideContent={{
        title: "Welcome back to H A L L Y U P I X",
        description: "Your trusted marketplace for authentic K-pop merchandise. Sign in to continue your journey.",
      }}
    >
      <SignInForm />
    </AuthCard>
  );
}
