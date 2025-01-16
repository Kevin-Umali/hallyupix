// src/components/settings/payment/PoliciesForm.tsx
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import FieldInfo from "@/components/custom/field-info";
import { z } from "zod";
import RichEditor from "../../editor/rich-editor";
import React from "react";
import { useSaveShopPaymentPoliciesMutation } from "@/lib/mutation/shop.mutation";

interface PaymentFormProps {
  refundPolicy?: string;
  cancellationPolicy?: string;
  partialPaymentAllowed?: boolean;
  minimumPartialPayment?: number;
  customPolicies?: string[];
}

const paymentPoliciesSchema = z.object({
  refundPolicy: z.string().min(1, "Refund policy is required"),
  cancellationPolicy: z.string().min(1, "Cancellation policy is required"),
  partialPaymentAllowed: z.boolean(),
  minimumPartialPayment: z.number().optional(),
  customPolicies: z.array(z.string()),
});

type PaymentPolicies = z.infer<typeof paymentPoliciesSchema>;

export const PoliciesForm: React.FC<PaymentFormProps> = ({
  refundPolicy,
  cancellationPolicy,
  partialPaymentAllowed,
  minimumPartialPayment,
  customPolicies,
}) => {
  const { mutateAsync: savePaymentPolicies, isPending: isSaving } = useSaveShopPaymentPoliciesMutation();
  const form = useForm<PaymentPolicies>({
    defaultValues: {
      refundPolicy: refundPolicy ?? "",
      cancellationPolicy: cancellationPolicy ?? "",
      partialPaymentAllowed: partialPaymentAllowed ?? false,
      minimumPartialPayment: minimumPartialPayment ?? undefined,
      customPolicies: customPolicies ?? [],
    },
    onSubmit: async ({ value }) => {
      savePaymentPolicies(
        {
          refundPolicy: value.refundPolicy,
          cancellationPolicy: value.cancellationPolicy,
          partialPaymentAllowed: value.partialPaymentAllowed,
          minimumPartialPayment: value.minimumPartialPayment ?? 0,
          customPolicies: value.customPolicies,
        },
        {
          onSuccess: () => {
            toast.success("Policies updated successfully!");
          },
          onError: (error) => {
            toast.error(error.code || "Failed to update policies", {
              description: error.message || "Something went wrong",
            });
          },
        }
      );
    },
    validators: {
      onChange: paymentPoliciesSchema,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Policies</CardTitle>
        <CardDescription>Configure your payment and refund policies</CardDescription>
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
            name="refundPolicy"
            children={(field) => (
              <div className="space-y-2">
                <Label>Refund Policy</Label>
                <RichEditor key={field.name} name={field.name} initialContent={field.state.value} onChange={(html) => field.handleChange(html)} />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="cancellationPolicy"
            children={(field) => (
              <div className="space-y-2">
                <Label>Cancellation Policy</Label>
                <RichEditor key={field.name} name={field.name} initialContent={field.state.value} onChange={(html) => field.handleChange(html)} />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="partialPaymentAllowed"
            children={(field) => (
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Partial Payments</Label>
                  <p className="text-sm text-muted-foreground">Enable customers to make partial payments</p>
                </div>
                <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
              </div>
            )}
          />

          <form.Field
            name="minimumPartialPayment"
            children={(field) => (
              <div className="space-y-2">
                <Label>Minimum Partial Payment (%)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 50"
                  min={1}
                  max={100}
                  value={field.state.value?.toString() ?? ""}
                  onChange={(e) => field.handleChange(parseInt(e.target.value))}
                  disabled={!form.getFieldValue("partialPaymentAllowed")}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <form.Field
            name="customPolicies"
            children={(field) => (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Custom Policies</h3>
                    <p className="text-sm text-muted-foreground">Add additional policies specific to your shop</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => field.pushValue("")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Policy
                  </Button>
                </div>

                {!field.state.value.length ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No custom policies added yet.</AlertDescription>
                  </Alert>
                ) : (
                  field.state.value.map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <RichEditor
                        key={field.name}
                        name={field.name}
                        initialContent={field.state.value[index]}
                        onChange={(html) => {
                          const newPolicies = [...field.state.value];
                          newPolicies[index] = html;
                          field.handleChange(newPolicies);
                        }}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => field.removeValue(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            )}
          />

          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}
              children={([canSubmit, isSubmitting, isValidating]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting || isValidating || isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Policies"
                  )}
                </Button>
              )}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PoliciesForm;
