import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { ShoppingBag, Store } from "lucide-react";
import RoleSelector, { RoleOption } from "./role-selector";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@tanstack/react-router";

const SignUpForm = () => {
  const roles: RoleOption[] = [
    {
      value: "buyer",
      label: "K-pop Fan & Collector",
      description: "Browse and purchase authentic K-pop merchandise and collectibles",
      icon: ShoppingBag,
    },
    {
      value: "seller",
      label: "K-pop Store Owner",
      description: "List and sell K-pop merchandise to fans worldwide",
      icon: Store,
    },
  ];

  return (
    <>
      <CardHeader className="px-0 space-y-2">
        <CardTitle className="text-3xl font-bold">Create your account</CardTitle>
        <CardDescription className="text-base">Join our community of K-pop enthusiasts and start your journey</CardDescription>
      </CardHeader>

      <CardContent className="px-0 space-y-8">
        <div className="space-y-3">
          <Label className="text-base font-semibold">Choose your role</Label>
          <RoleSelector roles={roles} selectedRole="buyer" onRoleChange={() => {}} className="mt-2" />
        </div>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base">
                Username
              </Label>
              <Input id="username" placeholder="Choose a username" className="h-11" />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">
                Full Name
              </Label>
              <Input id="name" placeholder="Enter your full name" className="h-11" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">
              Email Address
            </Label>
            <Input type="email" id="email" placeholder="Enter your email" className="h-11" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
              <Input type="password" id="password" placeholder="Create a password" className="h-11" />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-base">
                Confirm Password
              </Label>
              <Input type="password" id="confirmPassword" placeholder="Confirm your password" className="h-11" />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I agree to the{" "}
              <a href="#terms" className="text-primary hover:underline">
                Terms of Service
              </a>
              and{" "}
              <a href="#privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center space-y-4">
            <Button type="submit" size="lg" className="w-full">
              Create Account
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?
              <Link to="/sign-in" className="text-primary hover:underline font-medium">
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
