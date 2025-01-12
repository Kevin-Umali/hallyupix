// src/components/settings/payment/InstructionsForm.tsx
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import FieldInfo from "@/components/custom/field-info";

const instructionsSchema = z.object({
  paymentInstructions: z.string().min(1, "Payment instructions are required"),
});

type InstructionsFormType = z.infer<typeof instructionsSchema>;

export const InstructionsForm = () => {
  const form = useForm<InstructionsFormType>({
    defaultValues: {
      paymentInstructions: "",
    },
    onSubmit: async ({ value }) => {
      try {
        // Make API call to save instructions
        toast.success("Payment instructions updated successfully!");
      } catch (error) {
        toast.error("Failed to update payment instructions");
      }
    },
    validators: {
      onChange: instructionsSchema,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Instructions</CardTitle>
        <CardDescription>Provide clear instructions for your customers</CardDescription>
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
            name="paymentInstructions"
            children={(field) => (
              <div className="space-y-2">
                <Textarea
                  placeholder="Enter payment instructions for your customers..."
                  className="min-h-[300px]"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
                <p className="text-sm text-muted-foreground">
                  Provide detailed step-by-step instructions on how customers should make payments. Include any important notes or reminders.
                </p>
              </div>
            )}
          />

          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  Save Instructions
                </Button>
              )}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InstructionsForm;
