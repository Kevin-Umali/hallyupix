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
import { useQueryClient } from "@tanstack/react-query";
import FieldInfo from "@/components/custom/field-info";
import { Loader2 } from "lucide-react";

const signInSchema = z.object({
  emailOrUsername: z
    .string()
    .nonempty("This field is required")
    .refine(
      (value) =>
        /^[a-zA-Z0-9]{3,20}$/.test(value) || // Username: 3-20 alphanumeric characters
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Email: basic email pattern
      {
        message: "Must be a valid email address or username (3-20 alphanumeric characters)",
      }
    ),
  password: z.string(),
  rememberMe: z.boolean().optional(),
});

type SignInFormType = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<SignInFormType>({
    defaultValues: {
      emailOrUsername: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      const isEmail = value.emailOrUsername.includes("@");
      isEmail
        ? await signIn.email({ email: value.emailOrUsername, password: value.password, rememberMe: value.rememberMe })
        : await signIn.username({
            username: value.emailOrUsername,
            password: value.password,
            rememberMe: value.rememberMe,
          });

      await queryClient.invalidateQueries({ queryKey: ["session"] });
      await queryClient.refetchQueries({ queryKey: ["session"] });
      router.invalidate();
      form.reset({
        emailOrUsername: "",
        password: "",
        rememberMe: false,
      });
      navigate({ to: search.redirect ?? "/dashboard" });
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
            <form.Field
              name="emailOrUsername"
              children={(field) => (
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
            />

            {/* Password */}
            <form.Field
              name="password"
              children={(field) => (
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
            />

            {/* Remember Me */}
            <form.Field
              name="rememberMe"
              children={(field) => (
                <div className="flex items-center space-x-2">
                  <Checkbox id={field.name} name={field.name} checked={field.state.value} onCheckedChange={(checked) => field.handleChange(checked === true)} />
                  <Label htmlFor={field.name} className="text-sm text-muted-foreground leading-none">
                    Remember me for 30 days
                  </Label>
                </div>
              )}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}
            children={([canSubmit, isSubmitting, isValidating]) => (
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
          />

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?
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
