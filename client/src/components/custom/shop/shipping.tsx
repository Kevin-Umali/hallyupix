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
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Based on our schema definitions
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
        // TODO: Implement your update shipping settings API call here
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
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Configure your {title.toLowerCase()} policy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form.Field
          name={`${name}.description`}
          children={(field) => (
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
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name={`${name}.processingTime`}
            children={(field) => (
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
          />

          <form.Field
            name={`${name}.estimatedDelivery`}
            children={(field) => (
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
          />
        </div>

        <form.Field
          name={`${name}.cost`}
          children={(field) => (
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
        />

        <form.Field
          name={`${name}.notes`}
          children={(field) => (
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
        />
      </CardContent>
    </Card>
  );

  return (
    <div className="container max-w-4xl space-y-6 p-8">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Shipping Settings</h2>
        <p className="text-muted-foreground">Manage your shipping policies and processing times</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        {/* Processing Times */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Processing Times</CardTitle>
            <CardDescription>Set default processing times for different order types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="processingTimes.preOrder"
                children={(field) => (
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
              />

              <form.Field
                name="processingTimes.regular"
                children={(field) => (
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
              />
            </div>

            <form.Field
              name="processingTimes.express"
              children={(field) => (
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
            />
          </CardContent>
        </Card>

        {/* Domestic Shipping */}
        <ShippingPolicyFields name="domesticShipping" title="Domestic Shipping" />

        {/* International Shipping */}
        <ShippingPolicyFields name="internationalShipping" title="International Shipping" />

        {/* Custom Policies */}
        <form.Field
          name="customPolicies"
          children={(field) => (
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
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

                      <form.Field
                        name={`customPolicies.${index}.name`}
                        children={(nameField) => (
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
                      />

                      <form.Field
                        name={`customPolicies.${index}.description`}
                        children={(descField) => (
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
                      />

                      <form.Field
                        name={`customPolicies.${index}.cost`}
                        children={(costField) => (
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
                      />
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}
        />

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}
          children={([canSubmit, isSubmitting, isValidating]) => (
            <Button type="submit" className="mt-6" disabled={!canSubmit || isSubmitting || isValidating}>
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
        />
      </form>
    </div>
  );
};

export default ShopShippingSettings;
