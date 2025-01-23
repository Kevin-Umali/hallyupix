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
import RichEditor from "@/components/custom/editor/rich-editor";
import React from "react";
import { useSaveShopPaymentPoliciesMutation, SaveShopPaymentPoliciesRequest } from "@/lib/mutation/shop.mutation";
import { PaymentPolicies } from "@/shared/types/shop.types";
import { SavePaymentPoliciesRequestSchema } from "@/shared/types/shop.requests";
import { useQueryClient } from "@tanstack/react-query";
import { ShopPaymentResponse } from "@/lib/queries/shop.queries";

interface PoliciesFormProps {
  policies?: Partial<PaymentPolicies>;
  customPolicies?: string[];
}

export const PoliciesForm: React.FC<PoliciesFormProps> = ({ policies, customPolicies }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: savePaymentPolicies, isPending: isSaving } = useSaveShopPaymentPoliciesMutation();

  const form = useForm<SaveShopPaymentPoliciesRequest>({
    defaultValues: {
      refundPolicy: policies?.refundPolicy || "",
      cancellationPolicy: policies?.cancellationPolicy || "",
      partialPaymentAllowed: policies?.partialPaymentAllowed || false,
      minimumPartialPayment: policies?.minimumPartialPayment || 0,
      customPolicies: customPolicies || [],
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
            queryClient.setQueryData<ShopPaymentResponse>(["shop-payment"], (oldData) => {
              if (!oldData) return undefined;

              return {
                ...oldData,
                paymentPolicies: value,
              };
            });
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
      onChange: SavePaymentPoliciesRequestSchema,
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
          <form.Field name="refundPolicy">
            {(field) => (
              <div className="space-y-2">
                <Label>Refund Policy</Label>
                <RichEditor key={field.name} name={field.name} initialContent={field.state.value} onChange={(html) => field.handleChange(html)} />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="cancellationPolicy">
            {(field) => (
              <div className="space-y-2">
                <Label>Cancellation Policy</Label>
                <RichEditor key={field.name} name={field.name} initialContent={field.state.value} onChange={(html) => field.handleChange(html)} />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="partialPaymentAllowed">
            {(field) => (
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Partial Payments</Label>
                  <p className="text-sm text-muted-foreground">Enable customers to make partial payments</p>
                </div>
                <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
              </div>
            )}
          </form.Field>

          <form.Field name="minimumPartialPayment">
            {(field) => (
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
          </form.Field>

          <form.Field name="customPolicies">
            {(field) => (
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

                {Array.isArray(field.state.value) && field.state.value.length > 0 ? (
                  field.state.value.map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <RichEditor
                        key={`${field.name}-${index}`}
                        name={field.name}
                        initialContent={field.state.value?.[index]}
                        onChange={(html) => {
                          const newPolicies = [...(field.state.value || [])]; // Ensure a safe copy
                          newPolicies[index] = html;
                          field.handleChange(newPolicies);
                        }}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => field.removeValue(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No custom policies added yet.</AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </form.Field>

          <div className="flex justify-end">
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}>
              {([canSubmit, isSubmitting, isValidating]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting || isValidating || isSaving}>
                  {isSubmitting || isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Policies"
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

export default PoliciesForm;
