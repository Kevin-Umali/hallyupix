// components/settings/shipping/policies.tsx
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSaveShopShippingPoliciesMutation, SaveShopShippingPoliciesRequest } from "@/lib/mutation/shop.mutation";
import { ShopShippingResponse } from "@/lib/queries/shop.queries";
import { SaveShippingPoliciesRequestSchema } from "@/shared/types/shop.requests";
import { ShippingPolicies } from "@/shared/types/shop.types";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, AlertCircle, Loader2 } from "lucide-react";
import RichEditor from "@/components/custom/editor/rich-editor";
import FieldInfo from "@/components/custom/field-info";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@tanstack/react-router";

interface ShippingPoliciesFormProps {
  policies?: Partial<ShippingPolicies>;
}

export const ShippingPoliciesForm: React.FC<ShippingPoliciesFormProps> = ({ policies }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: saveShippingPolicies, isPending: isSaving } = useSaveShopShippingPoliciesMutation();

  const form = useForm<SaveShopShippingPoliciesRequest>({
    defaultValues: {
      general: policies?.general ?? "",
      domestic: {
        deliveryGuarantees: policies?.domestic?.deliveryGuarantees ?? [],
        restrictions: policies?.domestic?.restrictions ?? [],
        returnPolicy: policies?.domestic?.returnPolicy ?? "",
        isActive: policies?.domestic?.isActive ?? true,
      },
      international: {
        customsClearance: policies?.international?.customsClearance ?? [],
        restrictions: policies?.international?.restrictions ?? [],
        returnPolicy: policies?.international?.returnPolicy ?? "",
        isActive: policies?.international?.isActive ?? true,
      },
    },
    onSubmit: async ({ value }) => {
      await saveShippingPolicies(value, {
        onSuccess: () => {
          queryClient.setQueryData<ShopShippingResponse>(["shop-shipping"], (oldData) => {
            if (!oldData) return undefined;

            return {
              ...oldData,
              shippingPolicies: {
                ...value,
                domestic: {
                  ...value.domestic,
                  deliveryGuarantees: value.domestic.deliveryGuarantees ?? [],
                  restrictions: value.domestic.restrictions ?? [],
                },
                international: {
                  ...value.international,
                  customsClearance: value.international.customsClearance ?? [],
                  restrictions: value.international.restrictions ?? [],
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
      onChange: SaveShippingPoliciesRequestSchema,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Policies</CardTitle>
        <CardDescription>Configure your shipping policies and restrictions</CardDescription>
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
          <form.Field name="general">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>General Policy</Label>
                <RichEditor key={field.name} name={field.name} initialContent={field.state.value} onChange={(html) => field.handleChange(html)} />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Domestic Policy</Label>
              <p className="text-sm text-muted-foreground">Configure your domestic shipping policy</p>
            </div>
            <form.Field name={`domestic.isActive`}>
              {(activeField) => (
                <div className="flex items-center space-x-2">
                  <Switch checked={activeField.state.value} onCheckedChange={activeField.handleChange} />
                  <Label htmlFor={activeField.name}>{activeField.state.value ? "Active" : "Inactive"}</Label>
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="domestic.returnPolicy">
            {(policyField) => (
              <div className="space-y-2">
                <Label htmlFor={policyField.name}>Return Policy</Label>
                <RichEditor
                  key={policyField.name}
                  name={policyField.name}
                  initialContent={policyField.state.value}
                  onChange={(html) => policyField.handleChange(html)}
                />
                <FieldInfo field={policyField} />
              </div>
            )}
          </form.Field>

          <form.Field name="domestic.deliveryGuarantees" mode="array">
            {(deliveryGuaranteesField) => (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Delivery Guarantees</h3>
                    <p className="text-sm text-muted-foreground">Add delivery guarantees for domestic shipping</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => deliveryGuaranteesField.pushValue("")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Guarantee
                  </Button>
                </div>

                {Array.isArray(deliveryGuaranteesField.state.value) && deliveryGuaranteesField.state.value.length > 0 ? (
                  deliveryGuaranteesField.state.value.map((_, index) => (
                    <div key={index} className="flex items-center gap-2 w-full">
                      <form.Field name={`domestic.deliveryGuarantees[${index}]`}>
                        {(nameField) => (
                          <div className="flex items-center space-x-2 w-full">
                            <Input
                              className="flex-1"
                              placeholder="e.g., Express Guarantee"
                              value={nameField.state.value}
                              onChange={(e) => nameField.handleChange(e.target.value)}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => deliveryGuaranteesField.removeValue(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </form.Field>
                    </div>
                  ))
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No delivery guarantees added yet.</AlertDescription>
                  </Alert>
                )}
                <p className="text-sm text-muted-foreground">
                  Delivery guarantees are additional terms or conditions that must be agreed upon before a shipment is shipped. They can include things like
                  express delivery, same-day delivery, or any other terms that are important to your business.
                </p>
              </div>
            )}
          </form.Field>

          <form.Field name="domestic.restrictions" mode="array">
            {(restrictionsField) => (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Shipping Restrictions</h3>
                    <p className="text-sm text-muted-foreground">Add restrictions for domestic shipping</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => restrictionsField.pushValue("")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Restriction
                  </Button>
                </div>

                {Array.isArray(restrictionsField.state.value) && restrictionsField.state.value.length > 0 ? (
                  restrictionsField.state.value.map((_, index) => (
                    <div key={index} className="flex items-center gap-2 w-full">
                      <form.Field name={`domestic.restrictions[${index}]`}>
                        {(nameField) => (
                          <div className="flex items-center space-x-2 w-full">
                            <Input
                              className="flex-1"
                              placeholder="e.g., Local Restriction"
                              value={nameField.state.value}
                              onChange={(e) => nameField.handleChange(e.target.value)}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => restrictionsField.removeValue(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </form.Field>
                    </div>
                  ))
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No restrictions added yet.</AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </form.Field>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">International Policy</Label>
              <p className="text-sm text-muted-foreground">Configure your international shipping policy</p>
            </div>
            <form.Field name={`international.isActive`}>
              {(activeField) => (
                <div className="flex items-center space-x-2">
                  <Switch checked={activeField.state.value} onCheckedChange={activeField.handleChange} />
                  <Label htmlFor={activeField.name}>{activeField.state.value ? "Active" : "Inactive"}</Label>
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="international.returnPolicy">
            {(policyField) => (
              <div className="space-y-2">
                <Label htmlFor={policyField.name}>Return Policy</Label>
                <RichEditor
                  key={policyField.name}
                  name={policyField.name}
                  initialContent={policyField.state.value}
                  onChange={(html) => policyField.handleChange(html)}
                />
                <FieldInfo field={policyField} />
              </div>
            )}
          </form.Field>

          <form.Field name="international.customsClearance" mode="array">
            {(customsClearanceField) => (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Customs Clearance</h3>
                    <p className="text-sm text-muted-foreground">Add customs clearances for international shipping</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => customsClearanceField.pushValue("")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Clearance
                  </Button>
                </div>

                {Array.isArray(customsClearanceField.state.value) && customsClearanceField.state.value.length > 0 ? (
                  customsClearanceField.state.value.map((_, index) => (
                    <div key={index} className="flex items-center gap-2 w-full">
                      <form.Field name={`international.customsClearance[${index}]`}>
                        {(nameField) => (
                          <div className="flex items-center space-x-2 w-full">
                            <Input
                              className="flex-1"
                              placeholder="e.g., Customs Clearance"
                              value={nameField.state.value}
                              onChange={(e) => nameField.handleChange(e.target.value)}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => customsClearanceField.removeValue(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </form.Field>
                    </div>
                  ))
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No customs clearances added yet.</AlertDescription>
                  </Alert>
                )}
                <p className="text-sm text-muted-foreground">
                  Customs clearances are additional terms or conditions that must be agreed upon before a shipment is shipped. They can include things like
                  customs declarations, duties, or any other terms that are important to your business.
                </p>
              </div>
            )}
          </form.Field>

          <form.Field name="international.restrictions" mode="array">
            {(restrictionsField) => (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Shipping Restrictions</h3>
                    <p className="text-sm text-muted-foreground">Add restrictions for international shipping</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => restrictionsField.pushValue("")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Restriction
                  </Button>
                </div>

                {Array.isArray(restrictionsField.state.value) && restrictionsField.state.value.length > 0 ? (
                  restrictionsField.state.value.map((_, index) => (
                    <div key={index} className="flex items-center gap-2 w-full">
                      <form.Field name={`international.restrictions[${index}]`}>
                        {(nameField) => (
                          <div className="flex items-center space-x-2 w-full">
                            <Input
                              className="flex-1"
                              placeholder="e.g., Local Restriction"
                              value={nameField.state.value}
                              onChange={(e) => nameField.handleChange(e.target.value)}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => restrictionsField.removeValue(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </form.Field>
                    </div>
                  ))
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No restrictions added yet.</AlertDescription>
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

export default ShippingPoliciesForm;
