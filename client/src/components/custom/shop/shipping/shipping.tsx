import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FieldInfo from "@/components/custom/field-info";
import { Loader2, Plus, Trash2, Ship, Timer, Globe2, ScrollText } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const shippingPolicySchema = z.object({
  description: z.string().min(1, "Description is required"),
  processingTime: z.string().min(1, "Processing time is required"),
  estimatedDelivery: z.string().min(1, "Estimated delivery is required"),
  cost: z.number().optional(),
  restrictions: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

const processingTimesSchema = z.object({
  preOrder: z.string().min(1, "Pre-order processing time is required"),
  regular: z.string().min(1, "Regular processing time is required"),
  express: z.string().optional(),
  customRules: z
    .array(
      z.object({
        condition: z.string(),
        time: z.string(),
      })
    )
    .optional(),
});

const shopShippingSchema = z.object({
  domesticShipping: shippingPolicySchema,
  internationalShipping: shippingPolicySchema,
  processingTimes: processingTimesSchema,
  customPolicies: z.array(
    z.object({
      name: z.string().min(1, "Policy name is required"),
      description: z.string().min(1, "Policy description is required"),
      conditions: z.array(z.string()),
      cost: z.number().optional(),
      isActive: z.boolean().default(true),
    })
  ),
});

type ShopShippingFormType = z.infer<typeof shopShippingSchema>;

const ShopShippingSettings = () => {
  const form = useForm<ShopShippingFormType>({
    defaultValues: {
      domesticShipping: {
        description: "",
        processingTime: "",
        estimatedDelivery: "",
        cost: undefined,
        restrictions: [],
        notes: "",
      },
      internationalShipping: {
        description: "",
        processingTime: "",
        estimatedDelivery: "",
        cost: undefined,
        restrictions: [],
        notes: "",
      },
      processingTimes: {
        preOrder: "",
        regular: "",
        express: "",
        customRules: [],
      },
      customPolicies: [],
    },
    onSubmit: async ({ value }) => {
      try {
        toast.success("Shipping settings updated successfully!");
      } catch (error) {
        toast.error("Failed to update shipping settings");
      }
    },
    validators: {
      onChange: shopShippingSchema,
    },
  });

  const ShippingPolicyFields = ({ name, title }: { name: "domesticShipping" | "internationalShipping"; title: string }) => (
    <div className="space-y-6">
      <form.Field name={`${name}.description`}>
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Description</Label>
            <Textarea
              id={field.name}
              placeholder="Enter shipping policy description"
              className="min-h-[100px]"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field name={`${name}.processingTime`}>
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Processing Time</Label>
              <Input
                id={field.name}
                placeholder="e.g., 2-3 business days"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name={`${name}.estimatedDelivery`}>
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Estimated Delivery</Label>
              <Input
                id={field.name}
                placeholder="e.g., 5-7 business days"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name={`${name}.cost`}>
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Base Shipping Cost</Label>
            <Input
              id={field.name}
              type="number"
              placeholder="Enter amount"
              value={field.state.value?.toString() || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(parseFloat(e.target.value))}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      <form.Field name={`${name}.notes`}>
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Additional Notes</Label>
            <Textarea
              id={field.name}
              placeholder="Any additional information"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Shipping Settings</h1>
        <p className="text-muted-foreground">Manage your shipping policies and processing times</p>
        <Separator className="my-4" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <Tabs defaultValue="processing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="processing" className="space-x-2">
              <Timer className="h-4 w-4" />
              <span>Processing</span>
            </TabsTrigger>
            <TabsTrigger value="domestic" className="space-x-2">
              <Ship className="h-4 w-4" />
              <span>Domestic</span>
            </TabsTrigger>
            <TabsTrigger value="international" className="space-x-2">
              <Globe2 className="h-4 w-4" />
              <span>International</span>
            </TabsTrigger>
            <TabsTrigger value="custom" className="space-x-2">
              <ScrollText className="h-4 w-4" />
              <span>Custom</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="processing">
            <Card>
              <CardHeader>
                <CardTitle>Processing Times</CardTitle>
                <CardDescription>Set default processing times for different order types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <form.Field name="processingTimes.preOrder">
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Pre-order Processing</Label>
                        <Input
                          id={field.name}
                          placeholder="e.g., 2-3 weeks"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="processingTimes.regular">
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Regular Processing</Label>
                        <Input
                          id={field.name}
                          placeholder="e.g., 1-2 business days"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  </form.Field>
                </div>

                <form.Field name="processingTimes.express">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Express Processing (Optional)</Label>
                      <Input
                        id={field.name}
                        placeholder="e.g., Same day processing"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                </form.Field>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domestic">
            <Card>
              <CardHeader>
                <CardTitle>Domestic Shipping</CardTitle>
                <CardDescription>Configure your domestic shipping policy</CardDescription>
              </CardHeader>
              <CardContent>
                <ShippingPolicyFields name="domesticShipping" title="Domestic Shipping" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="international">
            <Card>
              <CardHeader>
                <CardTitle>International Shipping</CardTitle>
                <CardDescription>Configure your international shipping policy</CardDescription>
              </CardHeader>
              <CardContent>
                <ShippingPolicyFields name="internationalShipping" title="International Shipping" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom">
            <form.Field name="customPolicies">
              {(field) => (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Custom Shipping Policies</CardTitle>
                      <CardDescription>Add special shipping rules or conditions</CardDescription>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newPolicy = {
                          name: "",
                          description: "",
                          conditions: [],
                          isActive: true,
                        };
                        field.pushValue(newPolicy);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Policy
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!field.state.value.length ? (
                      <Alert>
                        <AlertDescription>No custom policies added yet. Add a policy to define special shipping rules.</AlertDescription>
                      </Alert>
                    ) : (
                      field.state.value.map((_, index) => (
                        <div key={index} className="space-y-4">
                          {index > 0 && <Separator />}
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Policy {index + 1}</h4>
                            <Button type="button" variant="ghost" size="sm" onClick={() => field.removeValue(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid gap-4">
                            <form.Field name={`customPolicies.${index}.name`}>
                              {(nameField) => (
                                <div className="space-y-2">
                                  <Label htmlFor={nameField.name}>Policy Name</Label>
                                  <Input
                                    id={nameField.name}
                                    placeholder="e.g., Bulk Order Shipping"
                                    value={nameField.state.value}
                                    onBlur={nameField.handleBlur}
                                    onChange={(e) => nameField.handleChange(e.target.value)}
                                  />
                                  <FieldInfo field={nameField} />
                                </div>
                              )}
                            </form.Field>

                            <form.Field name={`customPolicies.${index}.description`}>
                              {(descField) => (
                                <div className="space-y-2">
                                  <Label htmlFor={descField.name}>Description</Label>
                                  <Textarea
                                    id={descField.name}
                                    placeholder="Describe the policy..."
                                    value={descField.state.value}
                                    onBlur={descField.handleBlur}
                                    onChange={(e) => descField.handleChange(e.target.value)}
                                  />
                                  <FieldInfo field={descField} />
                                </div>
                              )}
                            </form.Field>

                            <form.Field name={`customPolicies.${index}.cost`}>
                              {(costField) => (
                                <div className="space-y-2">
                                  <Label htmlFor={costField.name}>Cost (Optional)</Label>
                                  <Input
                                    id={costField.name}
                                    type="number"
                                    placeholder="Enter amount"
                                    value={costField.state.value?.toString() || ""}
                                    onBlur={costField.handleBlur}
                                    onChange={(e) => costField.handleChange(parseFloat(e.target.value))}
                                  />
                                  <FieldInfo field={costField} />
                                </div>
                              )}
                            </form.Field>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              )}
            </form.Field>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline">Cancel</Button>
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}>
            {([canSubmit, isSubmitting, isValidating]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting || isValidating}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
};

export default ShopShippingSettings;
