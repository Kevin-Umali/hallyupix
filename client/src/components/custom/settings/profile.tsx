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
import { Loader2, Mail, Shield, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CloudinaryImageUploader from "../cloudinary-image-uploader";
import { Separator } from "@/components/ui/separator";
import { Session, updateUser } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$/, "Username can only contain letters, numbers, dots, underscores, and hyphens"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

type ProfileFormType = z.infer<typeof profileSchema>;

interface ProfileSettingsProps {
  initialData: {
    id: string;
    name: string;
    username?: string;
    email: string;
    bio?: string;
    role: string;
    emailVerified: boolean;
    createdAt: string;
    image?: {
      url: string;
      publicId: string;
    };
  };
}

const ProfileSettings = ({ initialData }: ProfileSettingsProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<ProfileFormType>({
    defaultValues: {
      name: initialData.name,
      username: initialData.username ?? "",
      bio: initialData.bio ?? "",
    },
    onSubmit: async ({ value }) => {
      const { data, error } = await updateUser(value);

      if (error) {
        toast.error(error.code || "Update profile failed", {
          description: error.message || "Please check your details and try again",
        });
        return;
      }

      if (data) {
        queryClient.setQueryData<{
          data: Session;
        }>(["session"], (oldData) => {
          if (!oldData?.data?.user) return undefined;

          return {
            ...oldData,
            data: {
              user: {
                ...oldData?.data?.user,
                name: value.name,
                username: value.username,
                bio: value.bio,
              },
              session: {
                ...oldData?.data?.session,
              },
            },
          };
        });
        router.invalidate();
        toast.success("Profile updated successfully!");
      }
    },
    validators: {
      onChange: profileSchema,
    },
  });

  const handleResendVerification = async () => {
    try {
      toast.success("Verification email sent!");
    } catch (error) {
      toast.error("Failed to send verification email");
    }
  };

  const handleImageUpload = async (urls: { url: string; publicId: string }[]) => {
    if (urls.length > 0) {
      const { data, error } = await updateUser({
        image: urls[0].url,
      });

      if (error) {
        toast.error(error.code || "Error", { description: error.message || "Something went wrong" });
        return;
      }

      if (data) {
        toast.success("Profile image updated successfully");

        queryClient.setQueryData<{
          data: Session;
        }>(["session"], (oldData) => {
          if (!oldData?.data?.user) return undefined;

          return {
            ...oldData,
            data: {
              user: {
                ...oldData?.data?.user,
                image: urls[0].url,
              },
              session: {
                ...oldData?.data?.session,
              },
            },
          };
        });
        router.invalidate();
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and profile information</p>
        <Separator className="my-4" />
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Account Overview and Profile Picture - Left Column */}
        <div className="space-y-8 lg:col-span-4">
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
                  <span className="text-sm">Role</span>
                </div>
                <Badge variant="secondary">{initialData.role}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member since</span>
                </div>
                <span className="text-sm">{new Date(initialData.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Profile Picture Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={initialData.image?.url} alt={initialData.name} />
                <AvatarFallback className="text-2xl">{initialData.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="w-full space-y-2">
                <CloudinaryImageUploader
                  multiple={false}
                  showPreview={false}
                  placeholder="Change Avatar"
                  maxSize={2 * 1024 * 1024}
                  onUploadComplete={handleImageUpload}
                  existingPublicId={initialData.image?.publicId}
                />
                <p className="text-xs text-center text-muted-foreground">Supported formats: JPG, PNG or GIF. Maximum file size: 2MB</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Information - Right Column */}
        <div className="lg:col-span-8">
          {!initialData.emailVerified && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-semibold text-sm">Email Verification Required</p>
                    <p className="text-sm">
                      Your email is not verified. Please verify your email to access your account. <br />
                      This step is currently mandatory. We are working on alternatives to support this process.
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleResendVerification} disabled className="ml-4">
                  Resend Verification
                </Button>
              </AlertDescription>
            </Alert>
          )}

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
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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

                <form.Field
                  name="username"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Username</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="Choose a username"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex space-x-2">
                    <Input id="email" name="email" type="email" placeholder="Enter your email" value={initialData.email || ""} disabled />
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
                  <p className="text-sm text-muted-foreground">
                    Currently, changing your email is not supported. We are working on enabling this feature in the near future.
                  </p>
                </div>

                <form.Field
                  name="bio"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Bio</Label>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        placeholder="Tell us about yourself"
                        className="min-h-[120px] resize-none"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <span className="text-sm text-muted-foreground">{field.state.value?.length ?? 0}/500</span>
                      </div>
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline">Cancel</Button>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting}>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
