import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import RoleSelector from "@/components/custom/auth/role-selector";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import FieldInfo from "@/components/custom/field-info";
import { PrivacyDialog, TermsDialog } from "@/components/custom/auth/legal-dialog";
import { ROLES } from "@/constant";
import { signUp } from "@/lib/api";
import { toast } from "sonner";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(5, "Username must be at least 5 characters")
      .max(20, "Username must be less than 20 characters")
      .superRefine((value, ctx) => {
        const usernamePattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$/;

        if (!usernamePattern.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Username can only contain letters, numbers, dots, underscores, and hyphens. It must start and end with a letter or number",
          });
        }
      }),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .refine((value) => /^[a-zA-Z\s'-]+$/.test(value), "Name can only contain letters, spaces, hyphens, and apostrophes"),
    email: z
      .string()
      .email("Invalid email address")
      .toLowerCase()
      .refine((value) => value.length <= 255, "Email must be less than 255 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be less than 64 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};:'",.<>?/`~\\])[A-Za-z\d!@#$%^&*()_\-[\]{};:'",.<>?/`~\\]{8,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: z.string(),
    role: z.enum(["Buyer", "Seller"], {
      errorMap: () => ({ message: "Please select a valid role" }),
    }),
    terms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormType = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<SignUpFormType>({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Seller",
      terms: false,
    },
    onSubmit: async ({ value }) => {
      const { data, error } = await signUp.email({
        email: value.email,
        password: value.password,
        username: value.username,
        name: value.name,
        role: value.role,
        bio: null,
      });

      if (error) {
        toast.error(error.code || "Sign up failed", {
          description: error.message || "Please check your credentials and try again",
        });
        return;
      }

      if (data) {
        toast.success("Signed up successfully!");
        router.invalidate();
        form.reset({
          username: "",
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "Seller",
          terms: false,
        });
        navigate({ to: "/verify-email", state: { email: value.email } });
      }
    },
    validators: {
      onChange: signUpSchema,
    },
  });

  return (
    <>
      <CardHeader className="px-0 space-y-2">
        <CardTitle className="text-3xl font-bold">Create your account</CardTitle>
        <CardDescription className="text-base">Join our community of K-pop enthusiasts and start your journey</CardDescription>
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
          {/* Role */}
          <form.Field name="role">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="text-base font-semibold">
                  Choose your role
                </Label>
                <RoleSelector
                  roles={ROLES}
                  selectedRole={field.state.value}
                  onRoleChange={(role) => field.handleChange(role as "Buyer" | "Seller")}
                  className="mt-2"
                />
              </div>
            )}
          </form.Field>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Username */}
            <form.Field name="username">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-base">
                    Username
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Choose a username"
                    className="h-11"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/*  Name */}
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-base">
                    Name
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Enter your name"
                    className="h-11"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>

          {/* Email */}
          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="text-base">
                  Email Address
                </Label>
                <Input
                  type="email"
                  id={field.name}
                  name={field.name}
                  placeholder="Enter your email"
                  className="h-11"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Password */}
            <form.Field name="password">
              {(field) => (
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
            </form.Field>

            {/* Confirm Password */}
            <form.Field name="confirmPassword">
              {(field) => (
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
            </form.Field>
          </div>

          {/* Terms & Conditions */}
          <form.Field name="terms">
            {(field) => (
              <div className="flex items-center space-x-2">
                <Checkbox id={field.name} name={field.name} checked={field.state.value} onCheckedChange={(checked) => field.handleChange(checked === true)} />
                <Label htmlFor={field.name} className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the <TermsDialog /> and <PrivacyDialog />
                </Label>
              </div>
            )}
          </form.Field>

          {/* Submit Button */}
          <div className="flex flex-col items-center space-y-4">
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}>
              {([canSubmit, isSubmitting, isValidating]) => (
                <Button type="submit" size="lg" className="w-full" disabled={!canSubmit || isSubmitting || isValidating}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              )}
            </form.Subscribe>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?
              <Link to="/sign-in" className="text-primary hover:underline font-medium">
                {" "}
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </>
  );
};

SignUpForm.displayName = "SignUpForm";

export default SignUpForm;
