import { Link, useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import ForgotPasswordDialog from "@/components/custom/auth/forgot-password-dialog";
import SocialButtons from "@/components/custom/auth/social-buttons";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { signIn } from "@/lib/api";
import FieldInfo from "@/components/custom/field-info";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { APP_NAME } from "@/constant";

const signInSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, "This field is required")
    .superRefine((value, ctx) => {
      const usernamePattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$/;
      const usernameLength = value.length >= 3 && value.length <= 20;

      const emailPattern =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      const isEmail = value.includes("@");

      if (isEmail) {
        if (!emailPattern.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please enter a valid email address",
          });
        }
      } else {
        if (!usernameLength) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Username must be between 3 and 20 characters",
          });
        }

        if (!usernamePattern.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Username can only contain letters, numbers, dots, underscores, and hyphens. It must start and end with a letter or number",
          });
        }
      }
    }),
  password: z.string(),
  rememberMe: z.boolean().optional(),
});

type SignInFormType = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const search = useSearch({ strict: false });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<SignInFormType>({
    defaultValues: {
      emailOrUsername: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      const isEmail = value.emailOrUsername.includes("@");
      const { data, error } = isEmail
        ? await signIn.email({
            email: value.emailOrUsername,
            password: value.password,
            rememberMe: value.rememberMe,
          })
        : await signIn.username({
            username: value.emailOrUsername,
            password: value.password,
            rememberMe: value.rememberMe,
          });

      if (error) {
        toast.error(error.code || "Sign in failed", {
          description: error.message || "Please check your credentials and try again",
        });
        return;
      }

      if (data) {
        toast.success("Signed in successfully!", {
          description: `Welcome back to the ${APP_NAME} platform!`,
        });
        await queryClient.invalidateQueries({ queryKey: ["session"] });
        await router.invalidate();
        await navigate({ to: search.redirect ?? "/dashboard" });
      }
    },
    validators: {
      onChange: signInSchema,
    },
  });

  return (
    <>
      <CardHeader className="px-0 space-y-2">
        <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
        <CardDescription className="text-base">Sign in to your account to continue</CardDescription>
      </CardHeader>

      <CardContent className="px-0 space-y-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Email or Username */}
            <form.Field name="emailOrUsername">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-base">
                    Email Address or Username
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Enter your email or username"
                    className="h-11"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
            {/* Password */}
            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={field.name} className="text-base">
                      Password
                    </Label>
                    <ForgotPasswordDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen} />
                  </div>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    placeholder="Enter your password"
                    className="h-11"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
            {/* Remember Me */}
            <form.Field name="rememberMe">
              {(field) => (
                <div className="flex items-center space-x-2">
                  <Checkbox id={field.name} name={field.name} checked={field.state.value} onCheckedChange={(checked) => field.handleChange(checked === true)} />
                  <Label htmlFor={field.name} className="text-sm text-muted-foreground leading-none">
                    Remember me for 30 days
                  </Label>
                </div>
              )}
            </form.Field>
          </div>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}>
            {([canSubmit, isSubmitting, isValidating]) => (
              <Button type="submit" size="lg" className="w-full" disabled={!canSubmit || isSubmitting || isValidating}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            )}
          </form.Subscribe>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?
            <Link to="/sign-up" className="text-primary hover:underline font-medium">
              {" "}
              Sign up
            </Link>
          </div>

          <SocialButtons />
        </form>
      </CardContent>
    </>
  );
};

SignInForm.displayName = "SignInForm";

export default SignInForm;
