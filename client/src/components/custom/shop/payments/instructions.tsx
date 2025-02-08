// src/components/settings/payment/InstructionsForm.tsx
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FieldInfo from "@/components/custom/field-info";
import RichEditor from "@/components/custom/editor/rich-editor";
import { useSaveShopPaymentInstructionsMutation, SaveShopPaymentInstructionsRequest } from "@/lib/mutation/shop.mutation";
import { Loader2 } from "lucide-react";
import { SavePaymentInstructionsRequestSchema } from "@/shared/types/shop.requests";
import { useQueryClient } from "@tanstack/react-query";
import { ShopPaymentResponse } from "@/lib/queries/shop.queries";
import { useRouter } from "@tanstack/react-router";

interface InstructionsFormProps {
  paymentInstructions?: string | null;
}

export const InstructionsForm: React.FC<InstructionsFormProps> = ({ paymentInstructions }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: savePaymentInstructions, isPending: isSaving } = useSaveShopPaymentInstructionsMutation();

  const form = useForm<SaveShopPaymentInstructionsRequest>({
    defaultValues: {
      paymentInstructions: paymentInstructions ?? "",
    },
    onSubmit: async ({ value }) => {
      await savePaymentInstructions(value, {
        onSuccess: () => {
          queryClient.setQueryData<ShopPaymentResponse>(["shop-payment"], (oldData) => {
            if (!oldData) return undefined;

            return {
              ...oldData,
              paymentInstructions: value.paymentInstructions,
            };
          });
          router.invalidate({
            filter: (route) => route.routeId === "/_authenticated/shop/payments",
          });
        },
      });
    },
    validators: {
      onChange: SavePaymentInstructionsRequestSchema,
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
          <form.Field name="paymentInstructions">
            {(field) => (
              <div className="space-y-2">
                <RichEditor key={field.name} name={field.name} initialContent={field.state.value} onChange={(html) => field.handleChange(html)} />
                <FieldInfo field={field} />
                <p className="text-sm text-muted-foreground">
                  Provide detailed step-by-step instructions on how customers should make payments. Include any important notes or reminders.
                </p>
              </div>
            )}
          </form.Field>

          <div className="flex justify-end">
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting || isSaving]}>
              {([canSubmit, isSubmitting]) => (
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
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InstructionsForm;
