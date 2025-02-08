import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Store, Trash2, Loader2 } from "lucide-react";
import CloudinaryImageUploader from "@/components/custom/cloudinary-image-uploader";
import { Button } from "@/components/ui/button";
import { useDeleteImageMutation } from "@/lib/mutation/cloudinary.mutation";
import { useUpdateProfileImageMutation } from "@/lib/mutation/shop.mutation";
import { ShopProfileResponse } from "@/lib/queries/shop.queries";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export interface ImageUploadSectionProps {
  type: "banner" | "profile";
  currentImage?: {
    url: string;
    publicId: string;
  } | null;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ type, currentImage }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const isBanner = type === "banner";

  const { mutateAsync: deleteImage, isPending: isDeleting } = useDeleteImageMutation();
  const { mutateAsync: updateProfileImage } = useUpdateProfileImageMutation();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (publicId: string) => {
    setDeletingId(publicId);
    await deleteImage(
      { publicId },
      {
        onSuccess: async () => {
          await updateProfileImage(
            { url: null, isBanner },
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
                  filter: (route) => route.routeId === "/_authenticated/shop/profile",
                });
              },
            }
          );
        },
        onSettled: () => {
          setDeletingId(null);
        },
      }
    );
  };

  const handleUpload = async (urls: { url: string; publicId: string }[]) => {
    if (urls.length > 0) {
      await updateProfileImage(
        {
          url: urls[0].url,
          isBanner,
        },
        {
          onSuccess: () => {
            queryClient.setQueryData<ShopProfileResponse>(["shop-profile"], (oldData) => {
              if (!oldData) return undefined;

              return {
                ...oldData,
                [isBanner ? "bannerImage" : "profileImage"]: urls[0].url,
              };
            });

            router.invalidate({
              filter: (route) => {
                return route.routeId === "/_authenticated/shop/profile";
              },
            });
          },
          onSettled: () => {
            setDeletingId(null);
          },
        }
      );
    }
  };

  const renderImagePreview = () => {
    if (!currentImage?.url) {
      if (!isBanner) {
        return (
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <Store className="h-8 w-8 text-muted-foreground" />
          </div>
        );
      }
      return (
        <div className="w-full h-40 rounded-lg bg-muted flex items-center justify-center">
          <Store className="h-12 w-12 text-muted-foreground" />
        </div>
      );
    }

    const isCurrentlyDeleting = deletingId === currentImage.publicId;

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
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-sm">Deleting...</span>
              </div>
            )}
          </div>
          <img src={currentImage.url} alt={`Shop ${type}`} className="object-cover rounded-lg w-full h-full" />
          <Button
            variant="destructive"
            size="icon"
            className={cn("absolute top-2 right-2 transition-opacity duration-200", isCurrentlyDeleting ? "opacity-0" : "opacity-0 group-hover:opacity-100")}
            onClick={() => handleDelete(currentImage.publicId)}
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
            "absolute inset-0 bg-black/50 flex items-center justify-center rounded-full transition-opacity duration-200",
            isCurrentlyDeleting ? "opacity-100" : "opacity-0"
          )}
        >
          {isCurrentlyDeleting && (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-xs">Deleting...</span>
            </div>
          )}
        </div>
        <img src={currentImage.url} alt="Shop Profile" className="h-24 w-24 rounded-full object-cover" />
        <Button
          variant="destructive"
          size="icon"
          className={cn(
            "absolute -top-2 -right-2 h-6 w-6 transition-opacity duration-200",
            isCurrentlyDeleting ? "opacity-0" : "opacity-0 group-hover:opacity-100"
          )}
          onClick={() => handleDelete(currentImage.publicId)}
          disabled={isDeleting || isCurrentlyDeleting}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Label>{type === "banner" ? "Banner Image" : "Profile Image"}</Label>
      <div className="border rounded-lg p-4 bg-card">
        <div className={isBanner ? "w-full" : "flex items-center space-x-4 justify-center"}>
          {renderImagePreview()}
          <CloudinaryImageUploader
            multiple={false}
            showPreview={false}
            className={isBanner ? "w-full" : "flex-1"}
            placeholder={isBanner ? "Upload Shop Banner" : "Upload Profile Picture"}
            maxSize={5 * 1024 * 1024}
            onUploadComplete={handleUpload}
            existingPublicId={currentImage?.publicId}
            onExistingFileDelete={() => handleDelete(currentImage?.publicId ?? "")}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {isBanner ? "Recommended size: 1200x400 pixels. Ideal for a clear shop header." : "Recommended size: 400x400 pixels. Ideal for profile visibility."}
        </p>
      </div>
    </div>
  );
};

export default ImageUploadSection;
