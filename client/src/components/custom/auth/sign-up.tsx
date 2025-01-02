import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import RoleSelector from "@/components/custom/auth/role-selector";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import FieldInfo from "@/components/custom/field-info";
import { PrivacyDialog, TermsDialog } from "@/components/custom/legal-dialog";
import { ROLES } from "@/constant";
import { signUp } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

const signUpSchema = z
  .object({
    username: z.string().min(5, "Username must be at least 5 characters").max(20, "Username must be less than 20 characters"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    role: z.enum(["Buyer", "Seller"]),
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
  const queryClient = useQueryClient();

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
      console.log(value);
      // simulate async call

      await signUp.email({
        email: value.email,
        password: value.password,
        username: value.username,
        name: value.name,
        role: value.role,
      });

      await queryClient.invalidateQueries({ queryKey: ["session"] });
      await queryClient.refetchQueries({ queryKey: ["session"] });
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
      navigate({ to: "/verify-email" });
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
            // e.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Role */}
          <form.Field
            name="role"
            children={(field) => (
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
          />
          <div className="grid md:grid-cols-2 gap-6">
            {/* Username */}
            <form.Field
              name="username"
              children={(field) => (
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
            />

            {/*  Name */}
            <form.Field
              name="name"
              children={(field) => (
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
            />
          </div>

          {/* Email */}
          <form.Field
            name="email"
            children={(field) => (
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
          />

          <div className="grid md:grid-cols-2 gap-6">
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
          </div>

          {/* Terms & Conditions */}
          <form.Field
            name="terms"
            children={(field) => (
              <div className="flex items-center space-x-2">
                <Checkbox id={field.name} name={field.name} checked={field.state.value} onCheckedChange={(checked) => field.handleChange(checked === true)} />
                <Label htmlFor={field.name} className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the <TermsDialog /> and <PrivacyDialog />
                </Label>
              </div>
            )}
          />

          {/* Submit Button */}
          <div className="flex flex-col items-center space-y-4">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}
              children={([canSubmit, isSubmitting, isValidating]) => (
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
            />

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
