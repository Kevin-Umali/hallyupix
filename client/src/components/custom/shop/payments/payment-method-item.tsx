import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm } from "@tanstack/react-form";
import CloudinaryImageUploader from "@/components/custom/cloudinary-image-uploader";
import { Trash2, QrCode } from "lucide-react";
import FieldInfo from "@/components/custom/field-info";
import { SaveShopPaymentMethodsRequest } from "@/lib/mutation/shop.mutation";
import { useState } from "react";
import { createImageData } from "@/lib/utils";
import { useDeleteImageMutation } from "@/lib/mutation/cloudinary.mutation";

interface PaymentMethodItemProps {
  form: ReturnType<typeof useForm<SaveShopPaymentMethodsRequest>>;
  index: number;
  onRemove: (index: number) => void;
}

const PaymentMethodItem = ({ form, index, onRemove }: PaymentMethodItemProps) => {
  // Track pending upload for this method
  const [pendingUpload, setPendingUpload] = useState<File | null>(null);
  const { mutateAsync: deleteImage } = useDeleteImageMutation();

  const handleDelete = async (publicId: string | undefined) => {
    if (publicId) {
      try {
        await deleteImage({ publicId });
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Payment Method {index + 1}</h4>
        <div className="flex items-center space-x-2">
          <form.Field name={`paymentMethods[${index}].isActive`}>
            {(field) => (
              <div className="flex items-center space-x-2">
                <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
                <Label className="text-sm">Active</Label>
              </div>
            )}
          </form.Field>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              // Delete existing image if there is one
              const existingPublicId = createImageData(form.getFieldValue("paymentMethods")[index].qrCodeImage)?.publicId;
              if (existingPublicId) {
                void handleDelete(existingPublicId);
              }
              // Clear any pending upload
              if (pendingUpload) {
                setPendingUpload(null);
              }
              onRemove(index);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Other fields remain the same */}
      <div className="grid gap-4 md:grid-cols-2">
        <form.Field name={`paymentMethods[${index}].name`}>
          {(field) => (
            <div className="space-y-2">
              <Label>Method Name</Label>
              <Input placeholder="e.g., Bank Transfer" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name={`paymentMethods[${index}].type`}>
          {(field) => (
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={field.state.value} onValueChange={(value) => field.handleChange(value as "BANK" | "EWALLET" | "CRYPTO")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BANK">Bank</SelectItem>
                  <SelectItem value="EWALLET">E-Wallet</SelectItem>
                  <SelectItem value="CRYPTO">Cryptocurrency</SelectItem>
                </SelectContent>
              </Select>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name={`paymentMethods[${index}].accountName`}>
          {(field) => (
            <div className="space-y-2">
              <Label>Account Name</Label>
              <Input placeholder="Enter account name" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name={`paymentMethods[${index}].accountNumber`}>
          {(field) => (
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input placeholder="Enter account number" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name={`paymentMethods[${index}].qrCodeImage`}>
        {(field) => (
          <div className="space-y-2">
            <Label>QR Code</Label>
            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-center space-x-4 justify-center">
                {field.state.value ? (
                  <img src={field.state.value} alt="Payment QR Code" className="h-32 w-32 object-cover rounded-lg" />
                ) : (
                  <div className="h-32 w-32 rounded-lg bg-muted flex items-center justify-center">
                    <QrCode className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <CloudinaryImageUploader
                    uploadMode="deferred"
                    multiple={false}
                    showPreview={false}
                    placeholder="Upload QR Code"
                    maxSize={5 * 1024 * 1024}
                    buttonText="Upload QR Code"
                    variant="button"
                    existingPublicId={createImageData(field.state.value)?.publicId}
                    onFileSelect={async (file) => {
                      // Delete existing image if there is one
                      const imageData = createImageData(field.state.value);
                      if (imageData?.publicId) {
                        await handleDelete(imageData.publicId);
                      }

                      setPendingUpload(file);
                      // Create temporary preview URL
                      const previewUrl = URL.createObjectURL(file);
                      field.handleChange(previewUrl);
                    }}
                    onExistingFileDelete={async () => {
                      const imageData = createImageData(field.state.value);
                      if (imageData?.publicId) {
                        await handleDelete(imageData.publicId);
                      }
                      setPendingUpload(null);
                      field.handleChange(undefined);
                    }}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Recommended size: 400x400 pixels. Upload a clear QR code image for easy scanning.</p>
            </div>
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
    </div>
  );
};

export default PaymentMethodItem;
