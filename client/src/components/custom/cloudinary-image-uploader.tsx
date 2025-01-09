import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, X, Loader2, Upload } from "lucide-react";
import { useGetSignedUrlMutation, useDeleteImageMutation } from "@/lib/mutation/cloudinary.mutation";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

interface ImageFile extends File {
  preview?: string;
  uploadedUrl?: string;
  publicId?: string;
  uploading?: boolean;
  uploadProgress?: number;
}

interface CloudinaryImageUploaderProps {
  multiple?: boolean;
  disabled?: boolean;
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  className?: string;
  previewClassName?: string;
  placeholder?: string;
  showPreview?: boolean;
  onUploadComplete?: (urls: { url: string; publicId: string }[]) => void;
  onUploadError?: (error: string) => void;
  apiKey?: string;
  existingPublicId?: string;
  onExistingFileDelete?: () => void;
}

const CloudinaryImageUploader: React.FC<CloudinaryImageUploaderProps> = ({
  multiple = false,
  disabled = false,
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".webp"],
  },
  maxSize = 5 * 1024 * 1024,
  maxFiles = 10,
  className,
  previewClassName,
  placeholder = "Click or drag images here",
  showPreview = true,
  onUploadComplete,
  apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY,
  existingPublicId,
  onExistingFileDelete,
}) => {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync: getSignedUrl, isPending: isGettingSignedUrl, error: getSignedUrlError } = useGetSignedUrlMutation();
  const { mutateAsync: deleteImage, isPending: isDeleting } = useDeleteImageMutation();
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteExistingFile = useCallback(async () => {
    if (existingPublicId) {
      setDeletingId(existingPublicId);
      try {
        await deleteImage({
          publicId: existingPublicId,
        });
        onExistingFileDelete?.();
        return true;
      } catch (error) {
        toast.error("CLOUDINARY_DELETE_FAILED", {
          description: error instanceof Error ? error.message : "Unknown error occurred",
        });
        return false;
      } finally {
        setDeletingId(null);
      }
    }
    return true;
  }, [existingPublicId, deleteImage, onExistingFileDelete]);

  const uploadToCloudinary = useCallback(
    async (file: File) => {
      const signedUrlData = await getSignedUrl();

      if (getSignedUrlError) {
        toast.error(getSignedUrlError?.code, {
          description: getSignedUrlError?.message ?? "Unknown error",
        });
        return null;
      }

      const { signature, timestamp, folder, url } = signedUrlData;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", folder);
      formData.append("api_key", apiKey);

      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);

        const uploadPromise = new Promise<CloudinaryUploadResponse | null>((resolve, reject) => {
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          };

          xhr.onerror = () => reject(new Error("Network error during upload"));
        });

        xhr.send(formData);
        const data = await uploadPromise;

        if (!data) {
          throw new Error("Upload failed");
        }

        return {
          url: data.secure_url,
          publicId: data.public_id,
        };
      } catch (error) {
        toast.error(`CLOUDINARY_UPLOAD_FAILED`, {
          description: error instanceof Error ? error.message : "Unknown error",
        });
        return null;
      }
    },
    [getSignedUrl, apiKey]
  );

  const handleFilePreview = useCallback((file: File): ImageFile => {
    return Object.assign(file, {
      preview: URL.createObjectURL(file),
      uploading: false,
    });
  }, []);

  const handleUpload = useCallback(
    async (file: ImageFile) => {
      file.uploading = true;

      if (existingPublicId) {
        const deleteSuccess = await deleteExistingFile();
        if (!deleteSuccess) {
          file.uploading = false;
          return null;
        }
      }

      const result = await uploadToCloudinary(file);
      file.uploading = false;
      return result;
    },
    [uploadToCloudinary, existingPublicId, deleteExistingFile]
  );

  const updateFileList = useCallback(
    (newFiles: ImageFile[]) => {
      const updatedList = multiple ? [...files, ...newFiles] : [newFiles[0]];
      setFiles(updatedList);
      onUploadComplete?.(
        updatedList.map((file) => ({
          url: file.uploadedUrl!,
          publicId: file.publicId!,
        }))
      );
    },
    [files, multiple, onUploadComplete]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!multiple && files.length + acceptedFiles.length > 1) {
        acceptedFiles = [acceptedFiles[0]];
      }

      if (files.length + acceptedFiles.length > maxFiles) {
        toast.error(`Maximum ${maxFiles} files can be selected`);
        return;
      }

      setIsUploading(true);
      const validFiles: ImageFile[] = [];

      for (const file of acceptedFiles) {
        const imageFile = handleFilePreview(file);
        const result = await handleUpload(imageFile);

        if (result) {
          imageFile.uploadedUrl = result.url;
          imageFile.publicId = result.publicId;
          validFiles.push(imageFile);
        }
      }

      if (validFiles.length > 0) {
        updateFileList(validFiles);
        toast.success(`Successfully uploaded ${validFiles.length} file${validFiles.length > 1 ? "s" : ""}`);
      }
      setIsUploading(false);
    },
    [files, maxFiles, multiple, handleFilePreview, handleUpload, updateFileList]
  );

  const removeFile = useCallback(
    async (fileToRemove: ImageFile) => {
      if (fileToRemove.publicId) {
        setDeletingId(fileToRemove.publicId);

        await deleteImage(
          {
            publicId: fileToRemove.publicId,
          },
          {
            onSuccess: () => {
              toast.success("File deleted successfully");
            },
            onError: (error) => {
              toast.error(error.code, {
                description: error.message ?? "Unknown error",
              });
            },
            onSettled: () => {
              setDeletingId(null);
            },
          }
        );
      }

      setFiles((prevFiles) => prevFiles.filter((f) => f !== fileToRemove));
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[fileToRemove.name];
        return newProgress;
      });
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
    },
    [deleteImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize,
    disabled: disabled || isGettingSignedUrl || isUploading || isDeleting,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        const errorMessages = rejection.errors.map((error) => {
          if (error.code === "file-too-large") {
            return `${rejection.file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB`;
          }
          if (error.code === "file-invalid-type") {
            return `${rejection.file.name} is not a valid file type`;
          }
          return `${rejection.file.name}: ${error.message}`;
        });

        toast.error("Invalid file", {
          description: errorMessages.join("\n"),
        });
      });
    },
  });

  const renderUploadStatus = () => {
    if (isGettingSignedUrl) {
      return (
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground mt-2">Preparing upload...</span>
        </div>
      );
    }

    if (isUploading) {
      return (
        <div className="flex flex-col items-center w-full max-w-[200px]">
          <Upload className="h-10 w-10 text-primary animate-bounce" />
          <span className="text-sm text-muted-foreground mt-2 text-center">Uploading files...</span>
          {Object.keys(uploadProgress).length > 0 && (
            <div className="w-full mt-4 space-y-2">
              <Progress
                value={Object.values(uploadProgress).reduce((acc, curr) => acc + curr, 0) / Object.keys(uploadProgress).length}
                className="h-3 bg-secondary"
              />
              <span className="text-xs text-muted-foreground text-center block">
                Overall Progress: {Math.round(Object.values(uploadProgress).reduce((acc, curr) => acc + curr, 0) / Object.keys(uploadProgress).length)}%
              </span>
            </div>
          )}
        </div>
      );
    }

    if (isDeleting) {
      return (
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-destructive" />
          <span className="text-sm text-muted-foreground mt-2">Deleting file...</span>
        </div>
      );
    }

    return (
      <>
        <ImagePlus className="h-10 w-10 text-primary" />
        <span className="text-sm text-muted-foreground text-center">
          {placeholder}
          {!multiple && files.length > 0 && " (will replace existing)"}
        </span>
      </>
    );
  };

  React.useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  const isDisabled = disabled || isGettingSignedUrl || isUploading || isDeleting;

  return (
    <div className={cn("w-full space-y-4", className)}>
      <Card
        className={cn(
          "border-2 border-dashed transition-colors duration-200",
          isDragActive && "border-primary bg-primary/5",
          isDisabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <CardContent className="p-4">
          <div {...getRootProps()} className="flex flex-col items-center justify-center gap-4 p-4">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-2 w-full">{renderUploadStatus()}</div>
          </div>
        </CardContent>
      </Card>

      {showPreview && files.length > 0 && (
        <div className={cn("grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4", previewClassName)}>
          {files.map((file, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-2">
                {file.uploading ? (
                  <div className="flex flex-col items-center justify-center h-32 w-full">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    {uploadProgress[file.name] !== undefined && (
                      <div className="mt-4 w-full space-y-2 px-2">
                        <Progress value={uploadProgress[file.name]} className="h-3 bg-secondary" />
                        <span className="text-xs text-muted-foreground text-center block font-medium">{uploadProgress[file.name]}% Complete</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <img src={file.uploadedUrl ?? file.preview} alt={file.name} className="w-full h-32 object-cover rounded-md" />
                      {deletingId === file.publicId && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                          <Loader2 className="h-8 w-8 animate-spin text-white" />
                        </div>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(file)}
                      disabled={!!deletingId}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <p className="text-xs text-muted-foreground mt-2 truncate">{file.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CloudinaryImageUploader;
