// src/components/settings/payment/DeadlinesForm.tsx
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import FieldInfo from "@/components/custom/field-info";

import { useSaveShopPaymentDeadlineSettingsMutation, SaveShopPaymentDeadlineSettingsRequest } from "@/lib/mutation/shop.mutation";
import { Loader2 } from "lucide-react";
import { DeadlineSettings } from "@/shared/types/shop.types";
import { SaveDeadlineSettingsRequestSchema } from "@/shared/types/shop.requests";
import { useQueryClient } from "@tanstack/react-query";
import { ShopPaymentResponse } from "@/lib/queries/shop.queries";

interface DeadlineFormProps {
  deadlineSettings?: Partial<DeadlineSettings>;
}

export const DeadlinesForm: React.FC<DeadlineFormProps> = ({ deadlineSettings }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: saveDeadlineSettings, isPending: isSaving } = useSaveShopPaymentDeadlineSettingsMutation();

  const form = useForm<SaveShopPaymentDeadlineSettingsRequest>({
    defaultValues: {
      preOrderPayment: deadlineSettings?.preOrderPayment ?? 24,
      regularOrderPayment: deadlineSettings?.regularOrderPayment ?? 48,
      paymentReminderInterval: deadlineSettings?.paymentReminderInterval ?? 12,
    },
    onSubmit: async ({ value }) => {
      saveDeadlineSettings(
        {
          preOrderPayment: value.preOrderPayment,
          regularOrderPayment: value.regularOrderPayment,
          paymentReminderInterval: value.paymentReminderInterval ?? 0,
        },
        {
          onSuccess: () => {
            queryClient.setQueryData<ShopPaymentResponse>(["shop-payment"], (oldData) => {
              if (!oldData) return undefined;

              return {
                ...oldData,
                deadlineSettings: value,
              };
            });
            toast.success("Deadline settings updated successfully!");
          },
          onError: (error) => {
            toast.error(error.code || "Failed to update deadline settings", {
              description: error.message || "Something went wrong",
            });
          },
        }
      );
    },
    validators: {
      onChange: SaveDeadlineSettingsRequestSchema,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Deadlines</CardTitle>
        <CardDescription>Set payment deadlines for different order types</CardDescription>
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
          <div className="grid gap-6 md:grid-cols-2">
            <form.Field name="preOrderPayment">
              {(field) => (
                <div className="space-y-2">
                  <Label>Pre-order Payment (hours)</Label>
                  <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(parseInt(e.target.value))} />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field name="regularOrderPayment">
              {(field) => (
                <div className="space-y-2">
                  <Label>Regular Order Payment (hours)</Label>
                  <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(parseInt(e.target.value))} />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="paymentReminderInterval">
            {(field) => (
              <div className="space-y-2">
                <Label>Reminder Interval (hours)</Label>
                <Input type="number" value={field.state.value?.toString() || ""} onChange={(e) => field.handleChange(parseInt(e.target.value))} />
                <FieldInfo field={field} />
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
                    "Save Deadlines"
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

export default DeadlinesForm;
