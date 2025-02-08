import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import PaymentMethodItem from "./payment-method-item";
import { PaymentMethod } from "@/shared/types/shop.types";
import { useSaveShopPaymentMethodsMutation, SaveShopPaymentMethodsRequest } from "@/lib/mutation/shop.mutation";
import { useGetSignedUrlMutation } from "@/lib/mutation/cloudinary.mutation";
import { SavePaymentMethodsRequestSchema } from "@/shared/types/shop.requests";
import { ShopPaymentResponse } from "@/lib/queries/shop.queries";
import { useRouter } from "@tanstack/react-router";

interface PaymentMethodFormProps {
  paymentMethodsData?: Partial<PaymentMethod>[];
}

export const PaymentMethodsForm: React.FC<PaymentMethodFormProps> = ({ paymentMethodsData }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: savePaymentMethods, isPending: isSaving } = useSaveShopPaymentMethodsMutation();
  const { mutateAsync: getSignedUrl, isPending: isGettingSignedUrl } = useGetSignedUrlMutation();

  const form = useForm<SaveShopPaymentMethodsRequest>({
    defaultValues: {
      paymentMethods: (paymentMethodsData ?? []).map((method) => ({
        id: method.id || crypto.randomUUID(),
        name: method.name || "",
        type: method.type || "BANK",
        accountName: method.accountName || "",
        accountNumber: method.accountNumber || "",
        isActive: method.isActive ?? true,
        qrCodeImage: method.qrCodeImage || "",
      })),
    },
    onSubmit: async ({ value }) => {
      try {
        // Get all methods that have new files to upload
        const methodsWithPendingUploads = value.paymentMethods.filter((method) => method.qrCodeImage?.startsWith("blob:"));

        // Upload all pending files to Cloudinary
        const uploads = await Promise.all(
          methodsWithPendingUploads.map(async (method) => {
            const signedUrlData = await getSignedUrl();
            const { signature, timestamp, folder, url } = signedUrlData;

            const formData = new FormData();
            formData.append("timestamp", timestamp.toString());
            formData.append("signature", signature);
            formData.append("folder", folder);
            formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

            // Since we stored the blob URL, we need to fetch the file
            const response = await fetch(method.qrCodeImage!);
            const blob = await response.blob();
            formData.append("file", blob);

            const uploadResponse = await fetch(url, {
              method: "POST",
              body: formData,
            });

            if (!uploadResponse.ok) {
              throw new Error(`Upload failed for ${method.name}`);
            }

            const data = await uploadResponse.json();
            return {
              methodId: method.id,
              cloudinaryUrl: data.secure_url,
            };
          })
        );

        // Update the payment methods with the new Cloudinary URLs
        const updatedMethods = value.paymentMethods.map((method) => {
          const upload = uploads.find((u) => u.methodId === method.id);
          return {
            ...method,
            qrCodeImage: upload ? upload.cloudinaryUrl : method.qrCodeImage,
          };
        });

        // Save the payment methods
        await savePaymentMethods(
          { paymentMethods: updatedMethods },
          {
            onSuccess: () => {
              queryClient.setQueryData<ShopPaymentResponse>(["shop-payment"], (oldData) => {
                if (!oldData) return undefined;

                return {
                  ...oldData,
                  paymentMethods: updatedMethods,
                };
              });
              router.invalidate({
                filter: (route) => route.routeId === "/_authenticated/shop/payments",
              });
            },
          }
        );
      } catch (error) {
        toast.error("Failed to update payment methods", {
          description: error instanceof Error ? error.message : "Something went wrong",
        });
      }
    },
    validators: {
      onChange: SavePaymentMethodsRequestSchema,
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Add and manage your accepted payment methods</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field name="paymentMethods">
            {(field) => (
              <div className="space-y-6">
                {!field.state.value.length ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No payment methods added yet.</AlertDescription>
                  </Alert>
                ) : (
                  field.state.value.map((method, index) => (
                    <PaymentMethodItem key={method.id} form={form} index={index} onRemove={(index) => field.removeValue(index)} />
                  ))
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    field.pushValue({
                      id: crypto.randomUUID(),
                      name: "",
                      type: "BANK",
                      accountName: "",
                      accountNumber: "",
                      qrCodeImage: "",
                      isActive: true,
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Method
                </Button>
              </div>
            )}
          </form.Field>
          <div className="flex justify-end">
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}>
              {([canSubmit, isSubmitting, isValidating]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting || isValidating || isSaving || isGettingSignedUrl}>
                  {isSaving || isGettingSignedUrl ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Payment Methods"
                  )}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsForm;
