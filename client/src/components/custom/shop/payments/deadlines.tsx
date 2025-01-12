// src/components/settings/payment/DeadlinesForm.tsx
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import FieldInfo from "@/components/custom/field-info";
import { z } from "zod";

const deadlineSettingsSchema = z.object({
  preOrderPayment: z.number().min(1, "Pre-order payment deadline is required"),
  regularOrderPayment: z.number().min(1, "Regular order payment deadline is required"),
  paymentReminderInterval: z.number().optional(),
});

export type DeadlineSettings = z.infer<typeof deadlineSettingsSchema>;

export const DeadlinesForm = () => {
  const form = useForm<DeadlineSettings>({
    defaultValues: {
      preOrderPayment: 24,
      regularOrderPayment: 48,
      paymentReminderInterval: 12,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
        // Make API call to save deadline settings
        toast.success("Deadline settings updated successfully!");
      } catch (error) {
        toast.error("Failed to update deadline settings");
      }
    },
    validators: {
      onChange: deadlineSettingsSchema,
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
            <form.Field
              name="preOrderPayment"
              children={(field) => (
                <div className="space-y-2">
                  <Label>Pre-order Payment (hours)</Label>
                  <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(parseInt(e.target.value))} />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="regularOrderPayment"
              children={(field) => (
                <div className="space-y-2">
                  <Label>Regular Order Payment (hours)</Label>
                  <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(parseInt(e.target.value))} />
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>

          <form.Field
            name="paymentReminderInterval"
            children={(field) => (
              <div className="space-y-2">
                <Label>Reminder Interval (hours)</Label>
                <Input type="number" value={field.state.value?.toString() || ""} onChange={(e) => field.handleChange(parseInt(e.target.value))} />
                <FieldInfo field={field} />
              </div>
            )}
          />

          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  Save Deadlines
                </Button>
              )}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DeadlinesForm;
