// components/settings/shipping/processing.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSaveShopShippingProcessingTimesMutation, SaveShopShippingProcessingTimesRequest } from "@/lib/mutation/shop.mutation";
import { SaveShippingProcessingTimesRequestSchema } from "@/shared/types/shop.requests";
import { ProcessingTimes } from "@/shared/types/shop.types";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import FieldInfo from "@/components/custom/field-info";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Plus, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RichEditor from "@/components/custom/editor/rich-editor";
import { ShopShippingResponse } from "@/lib/queries/shop.queries";
import { useRouter } from "@tanstack/react-router";

interface ProcessingFormProps {
  processingTimes?: Partial<ProcessingTimes>;
}

export const ProcessingForm: React.FC<ProcessingFormProps> = ({ processingTimes }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: saveProcessingTimes, isPending: isSaving } = useSaveShopShippingProcessingTimesMutation();

  const form = useForm<SaveShopShippingProcessingTimesRequest>({
    defaultValues: {
      preOrder: processingTimes?.preOrder ?? "",
      regular: processingTimes?.regular ?? "",
      express: processingTimes?.express ?? "",
      customRules: processingTimes?.customRules ?? [],
    },
    onSubmit: async ({ value }) => {
      saveProcessingTimes(value, {
        onSuccess: () => {
          queryClient.setQueryData<ShopShippingResponse>(["shop-shipping"], (oldData) => {
            if (!oldData) return undefined;

            return {
              ...oldData,
              processingTimes: value,
            };
          });
          router.invalidate({
            filter: (route) => route.routeId === "/_authenticated/shop/shipping",
          });
        },
      });
    },
    validators: {
      onChange: SaveShippingProcessingTimesRequestSchema,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Processing Times</CardTitle>
        <CardDescription>Set shipping processing times for different order types</CardDescription>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field name="preOrder">
              {(field) => (
                <div className="space-y-2">
                  <Label>Pre-order Processing Time</Label>
                  <Input placeholder="e.g., 2-3 weeks" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field name="regular">
              {(field) => (
                <div className="space-y-2">
                  <Label>Regular Processing Time</Label>
                  <Input placeholder="e.g., 1-2 business days" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="express">
            {(field) => (
              <div className="space-y-2">
                <Label>Express Processing Time</Label>
                <Input placeholder="e.g., Same day processing" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="customRules" mode="array">
            {(field) => (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Custom Rules</h3>
                    <p className="text-sm text-muted-foreground">Add additional processing rules specific to your shop</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      field.pushValue({
                        name: "",
                        time: "",
                        description: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </div>

                {Array.isArray(field.state.value) && field.state.value.length > 0 ? (
                  <div className="space-y-6">
                    {field.state.value.map((_, index) => (
                      <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                        <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => field.removeValue(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <form.Field name={`customRules[${index}].name`}>
                          {(nameField) => (
                            <div className="space-y-2">
                              <Label>Rule Name</Label>
                              <Input
                                placeholder="e.g., Express Processing"
                                value={nameField.state.value}
                                onChange={(e) => nameField.handleChange(e.target.value)}
                              />
                            </div>
                          )}
                        </form.Field>
                        <form.Field name={`customRules[${index}].time`}>
                          {(timeField) => (
                            <div className="space-y-2">
                              <Label>Processing Time</Label>
                              <Input
                                placeholder="e.g., 2-3 business days"
                                value={timeField.state.value}
                                onChange={(e) => timeField.handleChange(e.target.value)}
                              />
                            </div>
                          )}
                        </form.Field>

                        <form.Field name={`customRules[${index}].description`}>
                          {(descField) => (
                            <div className="space-y-2">
                              <Label>Description</Label>
                              <RichEditor
                                placeholder="Describe the conditions for this rule..."
                                key={descField.name}
                                name={descField.name}
                                initialContent={descField.state.value ?? ""}
                                onChange={(html) => descField.handleChange(html)}
                              />
                            </div>
                          )}
                        </form.Field>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No custom rules added yet.</AlertDescription>
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
                    "Save Processing Times"
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

export default ProcessingForm;
