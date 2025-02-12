// components/settings/shipping/method.tsx
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useSaveShopShippingMethodMutation, SaveShopShippingMethodRequest } from "@/lib/mutation/shop.mutation";
import { ShopShippingResponse } from "@/lib/queries/shop.queries";
import { SaveShippingMethodRequestSchema } from "@/shared/types/shop.requests";
import { ShippingMethod } from "@/shared/types/shop.types";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, AlertCircle, Loader2 } from "lucide-react";
import FieldInfo from "@/components/custom/field-info";
import { Separator } from "@/components/ui/separator";
import RichEditor from "@/components/custom/editor/rich-editor";
import { useRouter } from "@tanstack/react-router";

interface ShippingMethodFormProps {
  shippingMethod?: Partial<ShippingMethod>;
}

export const ShippingMethodForm: React.FC<ShippingMethodFormProps> = ({ shippingMethod }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: saveShippingMethod, isPending: isSaving } = useSaveShopShippingMethodMutation();

  const form = useForm<SaveShopShippingMethodRequest>({
    defaultValues: {
      domestic: shippingMethod?.domestic ?? {
        name: "",
        description: "",
        processingTime: "",
        estimatedDelivery: "",
        baseRate: 0,
      },
      international: shippingMethod?.international ?? {
        name: "",
        description: "",
        processingTime: "",
        estimatedDelivery: "",
        baseRate: 0,
      },
    },
    onSubmit: async ({ value }) => {
      await saveShippingMethod(value, {
        onSuccess: () => {
          queryClient.setQueryData<ShopShippingResponse>(["shop-shipping"], (oldData) => {
            if (!oldData) return undefined;

            return {
              ...oldData,
              shippingMethods: {
                ...oldData.shippingMethods,
                domestic: {
                  ...oldData.shippingMethods.domestic,
                  ...value.domestic,
                  areas: value.domestic.areas ?? [],
                },
                international: {
                  ...oldData.shippingMethods.international,
                  ...value.international,
                  areas: value.international.areas ?? [],
                },
              },
            };
          });
          router.invalidate({
            filter: (route) => route.routeId === "/_authenticated/shop/shipping",
          });
        },
      });
    },
    validators: {
      onChange: SaveShippingMethodRequestSchema,
    },
  });

  const renderShippingMethodFields = (type: "domestic" | "international") => {
    const titleCase = type.charAt(0).toUpperCase() + type.slice(1);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">{titleCase} Shipping</Label>
            <p className="text-sm text-muted-foreground">Configure your {titleCase.toLowerCase()} shipping method</p>
          </div>
          <form.Field name={`${type}.isActive`}>
            {(field) => (
              <div className="flex items-center space-x-2">
                <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
                <Label htmlFor={field.name}>{field.state.value ? "Active" : "Inactive"}</Label>
              </div>
            )}
          </form.Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name={`${type}.name`}>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Method Name</Label>
                <Input placeholder="e.g., Standard Shipping" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name={`${type}.baseRate`}>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Base Rate</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name={`${type}.processingTime`}>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Processing Time</Label>
                <Input placeholder="e.g., 1-2 business days" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name={`${type}.estimatedDelivery`}>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Estimated Delivery</Label>
                <Input placeholder="e.g., 3-5 business days" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name={`${type}.description`}>
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Description</Label>
              <RichEditor
                placeholder="Describe your shipping method..."
                key={field.name}
                name={field.name}
                initialContent={field.state.value ?? ""}
                onChange={(html) => field.handleChange(html)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name={`${type}.areas`} mode="array">
          {(field) => (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Service Areas</h3>
                  <p className="text-sm text-muted-foreground">Add areas with specific rates and delivery times</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    field.pushValue({
                      name: "",
                      additionalFee: 0,
                      additionalTime: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Area
                </Button>
              </div>

              {Array.isArray(field.state.value) && field.state.value.length > 0 ? (
                <div className="space-y-4">
                  {field.state.value.map((_, index) => (
                    <div key={index} className="p-4 border rounded-lg relative">
                      <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => field.removeValue(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <form.Field name={`${type}.areas[${index}].name`}>
                          {(nameField) => (
                            <div className="space-y-2">
                              <Label htmlFor={nameField.name}>Area Name</Label>
                              <Input placeholder="e.g., Remote Region" value={nameField.state.value} onChange={(e) => nameField.handleChange(e.target.value)} />
                            </div>
                          )}
                        </form.Field>

                        <form.Field name={`${type}.areas[${index}].additionalFee`}>
                          {(feeField) => (
                            <div className="space-y-2">
                              <Label htmlFor={feeField.name}>Additional Fee</Label>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={feeField.state.value}
                                onChange={(e) => feeField.handleChange(Number(e.target.value))}
                              />
                            </div>
                          )}
                        </form.Field>

                        <form.Field name={`${type}.areas[${index}].additionalTime`}>
                          {(timeField) => (
                            <div className="space-y-2">
                              <Label htmlFor={timeField.name}>Additional Time</Label>
                              <Input placeholder="e.g., +2-3 days" value={timeField.state.value} onChange={(e) => timeField.handleChange(e.target.value)} />
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
                  <AlertDescription>No service areas added yet.</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name={`${type}.notes`}>
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Additional Notes</Label>
              <RichEditor
                placeholder="Any additional information about this shipping method..."
                key={field.name}
                name={field.name}
                initialContent={field.state.value ?? ""}
                onChange={(html) => field.handleChange(html)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Method</CardTitle>
        <CardDescription>Configure your shipping method</CardDescription>
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
          {renderShippingMethodFields("domestic")}
          <Separator className="my-4" />
          {renderShippingMethodFields("international")}

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
                    "Save Shipping Methods"
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

export default ShippingMethodForm;
