import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Store, Trash2, Loader2 } from "lucide-react";
import CloudinaryImageUploader from "@/components/custom/cloudinary-image-uploader";
import { FieldApi, useForm } from "@tanstack/react-form";
import { ShopProfileFormType } from "@/components/custom/shop/profile";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDeleteImageMutation } from "@/lib/mutation/cloudinary.mutation";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { ShopProfileResponse } from "@/lib/queries/shop.queries";

export interface ImageUploadSectionProps {
  type: "banner" | "profile";
  form: ReturnType<typeof useForm<ShopProfileFormType>>;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ type, form }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const isBanner = type === "banner";
  const fieldName = isBanner ? "bannerImage" : "profileImage";
  const { mutateAsync: deleteImage, isPending: isDeleting } = useDeleteImageMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [shouldUpdateProfile, setShouldUpdateProfile] = useState(true);

  const handleDelete = async (
    publicId: string,
    field: FieldApi<ShopProfileFormType, typeof fieldName, undefined, undefined, ShopProfileFormType[typeof fieldName]>
  ) => {
    setDeletingId(publicId);
    await deleteImage(
      {
        publicId,
        isBanner,
        shouldUpdateProfile,
      },
      {
        onSuccess: () => {
          queryClient.setQueryData<ShopProfileResponse>(["shop-profile"], (oldData) => {
            if (!oldData) return undefined;

            return {
              ...oldData,
              bannerImage: isBanner ? null : oldData.bannerImage,
              profileImage: isBanner ? oldData.profileImage : null,
            };
          });

          router.invalidate({
            filter: (route) => {
              return route.routeId === "/_authenticated/shop/profile";
            },
          });
          field.setValue(null);
          toast.success("Image deleted successfully");
        },
        onError: (error) => {
          toast.error(error.code, {
            description: error.message ?? "Unknown error occurred",
          });
        },
        onSettled: () => {
          setDeletingId(null);
        },
      }
    );
  };

  const renderImagePreview = (
    field: FieldApi<ShopProfileFormType, typeof fieldName, undefined, undefined, ShopProfileFormType[typeof fieldName]>,
    hasImage: boolean
  ) => {
    if (!hasImage) {
      if (!isBanner) {
        return (
          <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center">
            <Store className="h-8 w-8 text-muted-foreground" />
          </div>
        );
      }
      return null;
    }

    const imageUrl = field.state.value?.url ?? "";
    const publicId = field.state.value?.publicId ?? "";
    const isCurrentlyDeleting = deletingId === publicId;

    if (isBanner) {
      return (
        <div className="relative aspect-video mb-4 group">
          <div
            className={cn(
              "absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg transition-opacity duration-200",
              isCurrentlyDeleting ? "opacity-100" : "opacity-0"
            )}
          >
            {isCurrentlyDeleting && (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
                <span className="text-sm text-white">Deleting...</span>
              </div>
            )}
          </div>
          <img src={imageUrl} alt={`Shop ${type}`} className="object-cover rounded-lg w-full h-full" />
          <Button
            variant="destructive"
            size="icon"
            className={cn("absolute top-2 right-2 transition-opacity duration-200", isCurrentlyDeleting ? "opacity-0" : "opacity-0 group-hover:opacity-100")}
            onClick={() => handleDelete(publicId, field)}
            disabled={isDeleting || isCurrentlyDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <div className="relative group">
        <div
          className={cn(
            "absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg transition-opacity duration-200",
            isCurrentlyDeleting ? "opacity-100" : "opacity-0"
          )}
        >
          {isCurrentlyDeleting && (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
              <span className="text-xs text-white">Deleting...</span>
            </div>
          )}
        </div>
        <img src={imageUrl} alt="Shop Profile" className="h-24 w-24 rounded-lg object-cover" />
        <Button
          variant="destructive"
          size="icon"
          className={cn(
            "absolute -top-2 -right-2 h-6 w-6 transition-opacity duration-200",
            isCurrentlyDeleting ? "opacity-0" : "opacity-0 group-hover:opacity-100"
          )}
          onClick={() => handleDelete(publicId, field)}
          disabled={isDeleting || isCurrentlyDeleting}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Label>{type.charAt(0).toUpperCase() + type.slice(1)} Image</Label>
      <div className="border rounded-lg p-4 bg-card">
        <form.Field
          name={fieldName}
          children={(field) => {
            const hasImage = !!field.state.value?.url;
            return (
              <div className={isBanner ? "w-full" : "flex items-center space-x-4"}>
                {renderImagePreview(field, hasImage)}
                <CloudinaryImageUploader
                  multiple={false}
                  showPreview={false}
                  className={isBanner ? "w-full" : "flex-1"}
                  placeholder={`Upload ${type} image`}
                  maxSize={5 * 1024 * 1024}
                  onUploadComplete={(urls) => {
                    if (urls.length > 0) {
                      field.handleChange({
                        url: urls[0].url,
                        publicId: urls[0].publicId,
                      });
                      setShouldUpdateProfile(false);
                    }
                  }}
                />
              </div>
            );
          }}
        />
        <p className="text-sm text-muted-foreground mt-2">Recommended size: {isBanner ? "1200x400" : "400x400"} pixels</p>
      </div>
    </div>
  );
};

export default ImageUploadSection;
