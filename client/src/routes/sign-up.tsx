import { createFileRoute } from "@tanstack/react-router";
import AuthCard from "@/components/custom/auth/auth-card";
import SignUpForm from "@/components/custom/auth/sign-up";

export const Route = createFileRoute("/sign-up")({
  component: SignUp,
});

function SignUp() {
  return (
    <AuthCard
      sideContent={{
        title: "Welcome to H A L L Y U P I X",
        description: "Your trusted marketplace for authentic K-pop merchandise. Connect with sellers worldwide and build your collection.",
      }}
    >
      <SignUpForm />
    </AuthCard>
  );
}
