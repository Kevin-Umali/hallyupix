import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import FieldInfo from "@/components/custom/field-info";
import { Loader2, Mail, Shield, Upload } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$/, "Username can only contain letters, numbers, dots, underscores, and hyphens"),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  image: z.string().optional(),
});

type ProfileFormType = z.infer<typeof profileSchema>;

const ProfileSettings = () => {
  // This would come from your user context/API
  const initialData = {
    name: "",
    username: "",
    email: "",
    bio: "",
    image: "",
    role: "Seller",
    emailVerified: false,
    createdAt: new Date(),
  };

  const form = useForm<ProfileFormType>({
    defaultValues: {
      name: initialData.name,
      username: initialData.username,
      email: initialData.email,
      bio: initialData.bio || "",
      image: initialData.image,
    },
    onSubmit: async ({ value }) => {
      try {
        // TODO: Implement your update profile API call here
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast.error("Failed to update profile");
      }
    },
    validators: {
      onChange: profileSchema,
    },
  });

  const handleResendVerification = async () => {
    try {
      // TODO: Implement resend verification email
      toast.success("Verification email sent!");
    } catch (error) {
      toast.error("Failed to send verification email");
    }
  };

  return (
    <div className="container max-w-4xl space-y-6 p-8">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and profile information</p>
      </div>

      {/* Account Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
          <CardDescription>Your account status and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Role:</span>
              <Badge variant="secondary">{initialData.role}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">Member since {new Date(initialData.createdAt).toLocaleDateString()}</div>
          </div>

          {!initialData.emailVerified && (
            <Alert variant="destructive">
              <AlertDescription className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Your email is not verified</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleResendVerification}>
                  Resend Verification
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile information and avatar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={initialData.image || ""} alt={initialData.name} />
                <AvatarFallback>{initialData.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" type="button" className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Change Avatar
                </Button>
                <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size of 2MB.</p>
              </div>
            </div>

            <div className="grid gap-6">
              {/* Name */}
              <form.Field
                name="name"
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Enter your name"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              {/* Username */}
              <form.Field
                name="username"
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Username</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Enter your username"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              {/* Email */}
              <form.Field
                name="email"
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Email</Label>
                    <div className="flex space-x-2">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="Enter your email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {initialData.emailVerified ? (
                        <Badge variant="default" className="self-center">
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="self-center">
                          Unverified
                        </Badge>
                      )}
                    </div>
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              {/* Bio */}
              <form.Field
                name="bio"
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Bio</Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Tell us about yourself"
                      className="min-h-[100px]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">{field.state.value?.length || 0}/500 characters</p>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}
          children={([canSubmit, isSubmitting, isValidating]) => (
            <Button type="submit" className="mt-6" disabled={!canSubmit || isSubmitting || isValidating}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          )}
        />
      </form>
    </div>
  );
};

export default ProfileSettings;
