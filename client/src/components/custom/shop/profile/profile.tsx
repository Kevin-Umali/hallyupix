import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import ImageUploadSection from "@/components/custom/shop/profile/image-upload";
import ShopInformation from "@/components/custom/shop/profile/shop-information";
import SocialLinksSection from "@/components/custom/shop/profile/social-links";
import { useSaveProfileMutation, SaveShopProfileRequest } from "@/lib/mutation/shop.mutation";
import { ShopProfileResponse } from "@/lib/queries/shop.queries";
import { ShopProfile } from "@/shared/types/shop.types";
import { SaveShopProfileRequestSchema } from "@/shared/types/shop.requests";
import { createImageData } from "@/lib/utils";
import CustomLoader from "@/components/custom/custom-loader";

export interface ShopProfileSettingsProps {
  initialData: Partial<ShopProfile>;
  isLoading: boolean;
}

const ShopProfileSettings: React.FC<ShopProfileSettingsProps> = ({ initialData, isLoading }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: saveProfile, isPending: isSaving } = useSaveProfileMutation();

  const form = useForm<SaveShopProfileRequest>({
    defaultValues: {
      shopName: initialData.shopName ?? "",
      description: initialData.description ?? "",
      socialLinks: initialData.socialLinks ?? {},
    },
    onSubmit: async ({ value }) => {
      await saveProfile(value, {
        onSuccess: () => {
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
      });
    },
    validators: {
      onChange: SaveShopProfileRequestSchema,
    },
  });

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Shop Profile Settings</h1>
        <p className="text-muted-foreground">Manage your shop&apos;s profile and online presence</p>
        <Separator className="my-4" />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[200px]">
          <CustomLoader text="Loading profile settings..." />
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-4">
            {/* Overview Section */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Your shop&apos;s account details</CardDescription>
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
            <ImageUploadSection type="banner" currentImage={createImageData(initialData.bannerImage)} />

            {/* Profile Image */}
            <ImageUploadSection type="profile" currentImage={createImageData(initialData.profileImage)} />
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
                <Button variant="outline" type="button" onClick={() => form.reset()} disabled={isSaving}>
                  Cancel
                </Button>
                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}>
                  {([canSubmit, isSubmitting, isValidating]) => (
                    <Button type="submit" disabled={!canSubmit || isSubmitting || isValidating || isSaving}>
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
      )}
    </div>
  );
};

export default ShopProfileSettings;
