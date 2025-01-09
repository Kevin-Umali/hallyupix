import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import ImageUploadSection from "./image-upload";
import ShopInformation from "./shop-information";
import SocialLinksSection from "./social-links";
import { useSaveProfileMutation } from "@/lib/mutation/shop.mutation";
import { ShopProfileResponse } from "@/lib/queries/shop.queries";

export interface ImageData {
  url: string;
  publicId: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  discord?: string;
  website?: string;
}

export interface ShopProfile {
  shopName: string;
  description?: string;
  bannerImage?: ImageData;
  profileImage?: ImageData;
  socialLinks: SocialLinks;
  isVerified: boolean;
}

export interface ShopProfileSettingsProps {
  initialData: Partial<ShopProfile>;
}

export const shopProfileSchema = z.object({
  shopName: z.string().min(1, "Shop name is required").max(50, "Shop name must be less than 50 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  socialLinks: z.object({
    facebook: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    instagram: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    discord: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  }),
});

export type ShopProfileFormType = z.infer<typeof shopProfileSchema>;

const ShopProfileSettings = ({ initialData }: ShopProfileSettingsProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: saveProfile, isPending: isSaving } = useSaveProfileMutation();

  const form = useForm<ShopProfileFormType>({
    defaultValues: {
      shopName: initialData.shopName ?? "",
      description: initialData.description,
      socialLinks: initialData.socialLinks ?? {},
    },
    onSubmit: async ({ value }) => {
      await saveProfile(value, {
        onSuccess: () => {
          toast.success("Shop profile updated successfully!");
          queryClient.setQueryData<ShopProfileResponse>(["shop-profile"], (oldData) => {
            if (!oldData) return undefined;

            return {
              ...oldData,
              shopName: value.shopName ?? oldData.shopName,
              description: value.description ?? oldData.description,
              socialLinks: {
                ...oldData.socialLinks,
                ...value.socialLinks,
              },
            };
          });
          router.invalidate({
            filter: (route) => {
              return route.routeId === "/_authenticated/shop/profile";
            },
          });
        },
        onError: (error) => {
          toast.error(error.code || "Error", {
            description: error.message || "Something went wrong",
          });
        },
      });
    },
    validators: {
      onChange: shopProfileSchema,
    },
  });

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Shop Profile Settings</h1>
        <p className="text-muted-foreground">Manage your shop's profile and online presence</p>
        <Separator className="my-4" />
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-4">
          {/* Overview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Your shop's account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Verification Status</span>
                  <Badge variant={initialData.isVerified ? "default" : "destructive"}>{initialData.isVerified ? "Verified" : "Unverified"}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Member Since</span>
                  <span className="text-sm">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banner Image */}
          <ImageUploadSection type="banner" currentImage={initialData.bannerImage} />

          {/* Profile Image */}
          <ImageUploadSection type="profile" currentImage={initialData.profileImage} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8">
          {!initialData.isVerified && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Your shop is not verified. Complete your profile to request verification.</span>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Shop Information Section */}
            <ShopInformation form={form} />

            {/* Social Links Section */}
            <SocialLinksSection form={form} />

            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting || isSaving}>
                    {isSubmitting || isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopProfileSettings;
