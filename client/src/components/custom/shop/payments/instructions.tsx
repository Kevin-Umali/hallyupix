// src/components/settings/payment/InstructionsForm.tsx
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import FieldInfo from "@/components/custom/field-info";
import RichEditor from "../../editor/rich-editor";
import { useSaveShopPaymentInstructionsMutation } from "@/lib/mutation/shop.mutation";
import { Loader2 } from "lucide-react";

interface InstructionsFormProps {
  paymentInstructions?: string;
}

const instructionsSchema = z.object({
  paymentInstructions: z.string().min(1, "Payment instructions are required"),
});

type InstructionsFormType = z.infer<typeof instructionsSchema>;

export const InstructionsForm: React.FC<InstructionsFormProps> = ({ paymentInstructions }) => {
  const { mutateAsync: savePaymentInstructions, isPending: isSaving } = useSaveShopPaymentInstructionsMutation();

  const form = useForm<InstructionsFormType>({
    defaultValues: {
      paymentInstructions: paymentInstructions ?? "",
    },
    onSubmit: async ({ value }) => {
      await savePaymentInstructions(value, {
        onSuccess: () => {
          toast.success("Payment instructions updated successfully!");
        },
        onError: (error) => {
          toast.error(error.code || "Failed to update payment instructions");
        },
      });
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
                <RichEditor key={field.name} name={field.name} initialContent={field.state.value} onChange={(html) => field.handleChange(html)} />
                <FieldInfo field={field} />
                <p className="text-sm text-muted-foreground">
                  Provide detailed step-by-step instructions on how customers should make payments. Include any important notes or reminders.
                </p>
              </div>
            )}
          />

          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting || isSaving]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting || isSaving}>
                  {isSubmitting || isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Instructions"
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

export default InstructionsForm;
