import React from "react";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import FieldInfo from "@/components/custom/field-info";
import { useSaveShopShippingCustomPoliciesMutation, SaveShopShippingCustomPoliciesRequest } from "@/lib/mutation/shop.mutation";
import { ShopShippingResponse } from "@/lib/queries/shop.queries";
import { SaveShippingCustomPoliciesRequestSchema } from "@/shared/types/shop.requests";
import { CustomPolicies } from "@/shared/types/shop.types";
import { useRouter } from "@tanstack/react-router";

interface ShippingCustomPoliciesProps {
  customPolicies?: Array<Partial<CustomPolicies>>;
}

export const ShippingCustomPolicies: React.FC<ShippingCustomPoliciesProps> = ({ customPolicies }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: saveShippingCustomPolicies, isPending: isSaving } = useSaveShopShippingCustomPoliciesMutation();

  const form = useForm<SaveShopShippingCustomPoliciesRequest>({
    defaultValues: {
      customPolicies: (customPolicies ?? []).map((policy) => ({
        name: policy.name ?? "",
        description: policy.description ?? "",
        conditions: policy.conditions ?? [],
        fee: policy.fee ?? 0,
        additionalTime: policy.additionalTime ?? "",
        isActive: policy.isActive ?? false,
      })),
    },
    onSubmit: async ({ value }) => {
      const policies = value.customPolicies.map((policy) => ({
        ...policy,
        isActive: policy.isActive ?? false,
      }));

      await saveShippingCustomPolicies(
        { customPolicies: policies },
        {
          onSuccess: () => {
            queryClient.setQueryData<ShopShippingResponse>(["shop-shipping"], (oldData) => {
              if (!oldData) return undefined;
              return {
                ...oldData,
                customPolicies: policies,
              };
            });
            router.invalidate({
              filter: (route) => route.routeId === "/_authenticated/shop/shipping",
            });
          },
        }
      );
    },
    validators: {
      onChange: SaveShippingCustomPoliciesRequestSchema,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Policies</CardTitle>
        <CardDescription>Configure your custom shipping policies</CardDescription>
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
          <form.Field name="customPolicies" mode="array">
            {(policiesField) => (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Custom Policies</h3>
                    <p className="text-sm text-muted-foreground">Add custom shipping policies</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      policiesField.pushValue({
                        name: "",
                        description: "",
                        conditions: [],
                        fee: 0,
                        additionalTime: "",
                        isActive: true,
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Policy
                  </Button>
                </div>

                {policiesField.state.value.length > 0 ? (
                  <div className="space-y-4">
                    {policiesField.state.value.map((_, index) => (
                      <div key={index} className="space-y-4 p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">Policy {index + 1}</div>
                          <div className="flex items-center gap-4">
                            <form.Field name={`customPolicies[${index}].isActive`}>
                              {(field) => (
                                <div className="flex items-center gap-2">
                                  <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
                                  <Label className="whitespace-nowrap">{field.state.value ? "Active" : "Inactive"}</Label>
                                </div>
                              )}
                            </form.Field>

                            <Button type="button" variant="ghost" size="icon" onClick={() => policiesField.removeValue(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex-1">
                          <form.Field name={`customPolicies[${index}].name`}>
                            {(field) => (
                              <div className="space-y-2">
                                <Label htmlFor={`policy-name-${index}`}>Policy Name</Label>
                                <Input
                                  id={`policy-name-${index}`}
                                  placeholder="e.g., Fragile Items Policy"
                                  value={field.state.value}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <FieldInfo field={field} />
                              </div>
                            )}
                          </form.Field>
                        </div>

                        <Separator className="my-4" />

                        <form.Field name={`customPolicies[${index}].description`}>
                          {(field) => (
                            <div className="space-y-2">
                              <Label htmlFor={`policy-desc-${index}`}>Description</Label>
                              <Input
                                id={`policy-desc-${index}`}
                                className="w-full"
                                placeholder="Policy Description"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                              />
                              <FieldInfo field={field} />
                            </div>
                          )}
                        </form.Field>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <form.Field name={`customPolicies[${index}].fee`}>
                            {(field) => (
                              <div className="space-y-2">
                                <Label htmlFor={`policy-fee-${index}`}>Fee</Label>
                                <Input
                                  id={`policy-fee-${index}`}
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  placeholder="Fee (optional)"
                                  value={field.state.value}
                                  onChange={(e) => field.handleChange(Number(e.target.value))}
                                />
                                <FieldInfo field={field} />
                              </div>
                            )}
                          </form.Field>

                          <form.Field name={`customPolicies[${index}].additionalTime`}>
                            {(field) => (
                              <div className="space-y-2">
                                <Label htmlFor={`policy-time-${index}`}>Additional Time</Label>
                                <Input
                                  id={`policy-time-${index}`}
                                  placeholder="Additional Time (optional)"
                                  value={field.state.value}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <FieldInfo field={field} />
                              </div>
                            )}
                          </form.Field>
                        </div>

                        <div className="mt-4 space-y-2">
                          <Label>Conditions</Label>
                          <form.Field name={`customPolicies[${index}].conditions`} mode="array">
                            {(conditionsField) => (
                              <div className="space-y-2">
                                {conditionsField.state.value.length > 0 ? (
                                  conditionsField.state.value.map((_, condIndex) => (
                                    <div key={condIndex} className="flex items-center gap-2">
                                      <form.Field name={`customPolicies[${index}].conditions[${condIndex}]`}>
                                        {(field) => (
                                          <Input
                                            className="flex-1"
                                            placeholder="Add condition"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                          />
                                        )}
                                      </form.Field>
                                      <Button type="button" variant="ghost" size="icon" onClick={() => conditionsField.removeValue(condIndex)}>
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))
                                ) : (
                                  <Alert>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>No conditions added yet.</AlertDescription>
                                  </Alert>
                                )}
                                <Button type="button" variant="outline" size="sm" onClick={() => conditionsField.pushValue("")}>
                                  Add Condition
                                </Button>
                              </div>
                            )}
                          </form.Field>
                        </div>
                      </div>
                    ))}
                  </div>
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
                <Button type="submit" disabled={!canSubmit || isSubmitting || isValidating || isSaving} className="bg-violet-500 hover:bg-violet-600">
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

export default ShippingCustomPolicies;
