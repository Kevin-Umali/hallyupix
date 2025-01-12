// src/components/settings/payment/PaymentMethodsForm.tsx
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import PaymentMethodItem from "./payment-method-item";

export const paymentMethodSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  type: z.enum(["BANK", "EWALLET", "CRYPTO"]),
  accountName: z.string().min(1, "Account name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  qrCodeImage: z.string().optional(),
  isActive: z.boolean(),
});

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

export const PaymentMethodsForm = () => {
  const form = useForm<{ paymentMethods: PaymentMethod[] }>({
    defaultValues: {
      paymentMethods: [],
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
        // Make API call to save payment methods
        toast.success("Payment methods updated successfully!");
      } catch (error) {
        toast.error("Failed to update payment methods");
      }
    },
    validators: {
      onChange: z.object({
        paymentMethods: z.array(paymentMethodSchema),
      }),
    },
  });

  const handleQRUpload = async (methodId: string) => {
    try {
      toast.success("QR code uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload QR code");
    }
  };

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
          <form.Field
            name="paymentMethods"
            children={(field) => (
              <div className="space-y-6">
                {!field.state.value.length ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No payment methods added yet.</AlertDescription>
                  </Alert>
                ) : (
                  field.state.value.map((method, index) => (
                    <PaymentMethodItem
                      key={method.id}
                      form={form}
                      index={index}
                      onQRUpload={() => handleQRUpload(method.id)}
                      onRemove={() => field.removeValue(index)}
                    />
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
                      isActive: true,
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Method
                </Button>
              </div>
            )}
          />
          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  Save Payment Methods
                </Button>
              )}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsForm;
