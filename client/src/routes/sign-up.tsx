import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthCard from "@/components/custom/auth/auth-card";
import SignUpForm from "@/components/custom/auth/sign-up";
import { z } from "zod";
import { APP_NAME } from "@/constant";

export const Route = createFileRoute("/sign-up")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    const { auth } = context;

    if (auth?.isAuthenticated) {
      if (!auth.user?.emailVerified) {
        throw redirect({
          to: "/verify-email",
        });
      }

      throw redirect({
        to: search.redirect ?? "/dashboard",
      });
    }
  },
  component: SignUp,
});

function SignUp() {
  return (
    <AuthCard
      sideContent={{
        title: `Welcome to ${APP_NAME}`,
        description: "Your trusted marketplace for authentic K-pop merchandise. Connect with sellers worldwide and build your collection.",
      }}
    >
      <SignUpForm />
    </AuthCard>
  );
}
