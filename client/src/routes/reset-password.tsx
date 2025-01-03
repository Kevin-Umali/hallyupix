import { createFileRoute, Link, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import FieldInfo from "@/components/custom/field-info";
import { Loader2 } from "lucide-react";
import { resetPassword } from "@/lib/api";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetFormType = z.infer<typeof resetPasswordSchema>;

export const Route = createFileRoute("/reset-password")({
  validateSearch: z.object({
    token: z.string().catch(""),
  }),
  beforeLoad: ({ search }) => {
    if (!search.token) {
      throw redirect({
        to: "/sign-in",
        state: { email: undefined },
      });
    }
  },
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const router = useRouter();
  const search = Route.useSearch();

  const form = useForm<ResetFormType>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const { data } = await resetPassword({ newPassword: value.password, token: search.token });

      if (data?.status) {
        router.invalidate();
        navigate({
          to: "/sign-in",
          state: { email: undefined },
        });
      }
    },
    validators: {
      onChange: resetPasswordSchema,
    },
  });

  return (
    <div className="container max-w-lg mx-auto px-4 py-8">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void form.handleSubmit();
              }}
              className="space-y-6"
            >
              {/* Password */}
              <form.Field
                name="password"
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="text-base">
                      Password
                    </Label>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      placeholder="Create a password"
                      className="h-11"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              {/* Confirm Password */}
              <form.Field
                name="confirmPassword"
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="text-base">
                      Confirm Password
                    </Label>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      placeholder="Confirm your password"
                      className="h-11"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <div className="space-y-4">
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}
                  children={([canSubmit, isSubmitting, isValidating]) => (
                    <Button type="submit" size="lg" className="w-full" disabled={!canSubmit || isSubmitting || isValidating}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Resetting...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  )}
                />
                <div className="text-center">
                  <Button variant="link" asChild>
                    <Link to="/sign-in">Back to Sign In</Link>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
