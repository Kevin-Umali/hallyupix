import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import ForgotPasswordDialog from "@/components/custom/auth/forgot-password-dialog";
import SocialButtons from "@/components/custom/auth/social-buttons";
import { Label } from "@/components/ui/label";

const SignInForm = () => {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  return (
    <>
      <CardHeader className="px-0 space-y-2">
        <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
        <CardDescription className="text-base">Sign in to your account to continue</CardDescription>
      </CardHeader>

      <CardContent className="px-0 space-y-8">
        <form className="space-y-6">
          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email Address
              </Label>
              <Input type="email" id="email" placeholder="Enter your email" className="h-11" />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-base">
                  Password
                </Label>
                <ForgotPasswordDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen} />
              </div>
              <Input type="password" id="password" placeholder="Enter your password" className="h-11" />
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-muted-foreground leading-none">
                Remember me for 30 days
              </Label>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Sign In
          </Button>

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
