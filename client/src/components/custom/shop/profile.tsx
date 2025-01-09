import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import ImageUploadSection from "@/components/custom/shop/image-upload";
import ShopInformation from "@/components/custom/shop/shop-information";
import SocialLinksSection from "@/components/custom/shop/social-links";
import { useSaveProfileMutation } from "@/lib/mutation/shop.mutation";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
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

export const imageDataSchema = z
  .object({
    url: z.string().url("Must be a valid URL"),
    publicId: z.string(),
  })
  .nullable();

export const shopProfileSchema = z.object({
  shopName: z.string().min(1, "Shop name is required").max(50, "Shop name must be less than 50 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  bannerImage: imageDataSchema.optional(),
  profileImage: imageDataSchema.optional(),
  socialLinks: z.object({
    facebook: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    instagram: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    discord: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  }),
});

export type ShopProfileFormType = z.infer<typeof shopProfileSchema>;

const ShopProfileSettings: React.FC<ShopProfileSettingsProps> = ({ initialData }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: saveProfile, isPending: isSaving } = useSaveProfileMutation();

  const form = useForm({
    defaultValues: {
      shopName: initialData.shopName ?? "",
      description: initialData.description,
      bannerImage: initialData.bannerImage,
      profileImage: initialData.profileImage,
      socialLinks: initialData.socialLinks ?? {},
    },
    onSubmit: async ({ value }) => {
      await saveProfile(
        {
          ...value,
          profileImage: value.profileImage?.url,
          bannerImage: value.bannerImage?.url,
        },
        {
          onSuccess: () => {
            toast.success("Shop profile updated successfully!");
            queryClient.setQueryData<ShopProfileResponse>(["shop-profile"], (oldData) => {
              if (!oldData) return undefined;

              return {
                ...oldData,
                shopName: value.shopName ?? oldData.shopName,
                description: value.description ?? oldData.description,
                bannerImage: value.bannerImage?.url ?? oldData.bannerImage,
                profileImage: value.profileImage?.url ?? oldData.profileImage,
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
            toast.error(error.code || "Error", { description: error.message || "Something went wrong" });
          },
        }
      );
    },
    validators: {
      onChange: shopProfileSchema,
    },
  });

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Shop Profile</h2>
          <p className="text-muted-foreground">Manage your shop's profile and online presence</p>
        </div>
        <Badge variant={initialData.isVerified ? "default" : "secondary"} className="h-6">
          {initialData.isVerified ? "Verified Shop" : "Unverified Shop"}
        </Badge>
      </div>

      <Separator />

      {!initialData.isVerified && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Your shop is not verified. Complete your profile to request verification.</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Shop Images</CardTitle>
            <CardDescription>Upload your shop's banner and profile images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <ImageUploadSection type="banner" form={form} />
            <ImageUploadSection type="profile" form={form} />
          </CardContent>
        </Card>

        <ShopInformation form={form} />
        <SocialLinksSection form={form} />

        <div className="flex justify-end">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}
            children={([canSubmit, isSubmitting, isValidating]) => (
              <Button type="submit" className="w-[200px]" disabled={!canSubmit || isSubmitting || isValidating || isSaving}>
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
          />
        </div>
      </form>
    </div>
  );
};

export default ShopProfileSettings;
