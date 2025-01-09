import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import FieldInfo from "@/components/custom/field-info";
import { Loader2, Plus, Trash2, Upload, AlertCircle, QrCode } from "lucide-react";
import { toast } from "sonner";

const paymentMethodSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  type: z.enum(["BANK", "EWALLET", "CRYPTO"]),
  accountName: z.string().min(1, "Account name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  qrCodeImage: z.string().optional(),
  isActive: z.boolean().default(true),
});

const deadlineSettingsSchema = z.object({
  preOrderPayment: z.number().min(1, "Pre-order payment deadline is required"),
  regularOrderPayment: z.number().min(1, "Regular order payment deadline is required"),
  paymentReminderInterval: z.number().optional(),
});

const shopPaymentSchema = z.object({
  paymentMethods: z.array(paymentMethodSchema),
  paymentInstructions: z.string().min(1, "Payment instructions are required"),
  deadlineSettings: deadlineSettingsSchema,
  paymentPolicies: z.object({
    refundPolicy: z.string().min(1, "Refund policy is required"),
    cancellationPolicy: z.string().min(1, "Cancellation policy is required"),
    partialPaymentAllowed: z.boolean(),
    minimumPartialPayment: z.number().optional(),
  }),
  customPolicies: z.array(z.string()),
});

type ShopPaymentFormType = z.infer<typeof shopPaymentSchema>;

const ShopPaymentSettings = () => {
  const form = useForm<ShopPaymentFormType>({
    defaultValues: {
      paymentMethods: [],
      paymentInstructions: "",
      deadlineSettings: {
        preOrderPayment: 24,
        regularOrderPayment: 48,
        paymentReminderInterval: 12,
      },
      paymentPolicies: {
        refundPolicy: "",
        cancellationPolicy: "",
        partialPaymentAllowed: false,
        minimumPartialPayment: undefined,
      },
      customPolicies: [],
    },
    onSubmit: async ({ value }) => {
      try {
        // TODO: Implement your update payment settings API call here
        toast.success("Payment settings updated successfully!");
      } catch (error) {
        toast.error("Failed to update payment settings");
      }
    },
    validators: {
      onChange: shopPaymentSchema,
    },
  });

  const handleQRUpload = async (methodId: string) => {
    try {
      // TODO: Implement QR code image upload
      toast.success("QR code uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload QR code");
    }
  };

  return (
    <div className="container max-w-4xl space-y-6 p-8">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Payment Settings</h2>
        <p className="text-muted-foreground">Manage your payment methods and policies</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        {/* Payment Methods */}
        <form.Field
          name="paymentMethods"
          children={(field) => (
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Add and manage your accepted payment methods</CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newMethod = {
                      id: crypto.randomUUID(),
                      name: "",
                      type: "BANK" as const,
                      accountName: "",
                      accountNumber: "",
                      isActive: true,
                    };
                    field.pushValue(newMethod);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Method
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {!field.state.value.length ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No payment methods added yet. Add a payment method to start accepting payments.</AlertDescription>
                  </Alert>
                ) : (
                  field.state.value.map((_, index) => (
                    <div key={field.state.value[index].id} className="space-y-4">
                      {index > 0 && <Separator />}
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Payment Method {index + 1}</h4>
                        <div className="flex items-center space-x-2">
                          <form.Field
                            name={`paymentMethods.${index}.isActive`}
                            children={(activeField) => (
                              <div className="flex items-center space-x-2">
                                <Switch checked={activeField.state.value} onCheckedChange={activeField.handleChange} />
                                <Label htmlFor={activeField.name} className="text-sm">
                                  Active
                                </Label>
                              </div>
                            )}
                          />
                          <Button type="button" variant="ghost" size="sm" onClick={() => field.removeValue(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <form.Field
                          name={`paymentMethods.${index}.name`}
                          children={(nameField) => (
                            <div className="space-y-2">
                              <Label htmlFor={nameField.name}>Method Name</Label>
                              <Input
                                id={nameField.name}
                                placeholder="e.g., Bank Transfer"
                                value={nameField.state.value}
                                onBlur={nameField.handleBlur}
                                onChange={(e) => nameField.handleChange(e.target.value)}
                              />
                              <FieldInfo field={nameField} />
                            </div>
                          )}
                        />

                        <form.Field
                          name={`paymentMethods.${index}.type`}
                          children={(typeField) => (
                            <div className="space-y-2">
                              <Label htmlFor={typeField.name}>Type</Label>
                              <Select value={typeField.state.value} onValueChange={(value) => typeField.handleChange(value as "BANK" | "EWALLET" | "CRYPTO")}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="BANK">Bank</SelectItem>
                                  <SelectItem value="EWALLET">E-Wallet</SelectItem>
                                  <SelectItem value="CRYPTO">Cryptocurrency</SelectItem>
                                </SelectContent>
                              </Select>
                              <FieldInfo field={typeField} />
                            </div>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <form.Field
                          name={`paymentMethods.${index}.accountName`}
                          children={(nameField) => (
                            <div className="space-y-2">
                              <Label htmlFor={nameField.name}>Account Name</Label>
                              <Input
                                id={nameField.name}
                                placeholder="Enter account name"
                                value={nameField.state.value}
                                onBlur={nameField.handleBlur}
                                onChange={(e) => nameField.handleChange(e.target.value)}
                              />
                              <FieldInfo field={nameField} />
                            </div>
                          )}
                        />

                        <form.Field
                          name={`paymentMethods.${index}.accountNumber`}
                          children={(numField) => (
                            <div className="space-y-2">
                              <Label htmlFor={numField.name}>Account Number</Label>
                              <Input
                                id={numField.name}
                                placeholder="Enter account number"
                                value={numField.state.value}
                                onBlur={numField.handleBlur}
                                onChange={(e) => numField.handleChange(e.target.value)}
                              />
                              <FieldInfo field={numField} />
                            </div>
                          )}
                        />
                      </div>

                      <form.Field
                        name={`paymentMethods.${index}.qrCodeImage`}
                        children={(qrField) => (
                          <div className="space-y-2">
                            <Label>QR Code</Label>
                            <div className="flex items-center space-x-4">
                              {qrField.state.value ? (
                                <div className="relative w-32 h-32">
                                  <img src={qrField.state.value} alt="Payment QR Code" className="rounded-lg object-cover" />
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    className="absolute bottom-2 right-2"
                                    onClick={() => handleQRUpload(field.state.value[index].id)}
                                  >
                                    <Upload className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <Button type="button" variant="outline" onClick={() => handleQRUpload(field.state.value[index].id)}>
                                  <QrCode className="h-4 w-4 mr-2" />
                                  Upload QR Code
                                </Button>
                              )}
                            </div>
                            <FieldInfo field={qrField} />
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

        {/* Payment Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Instructions</CardTitle>
            <CardDescription>Provide clear instructions for your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <form.Field
              name="paymentInstructions"
              children={(field) => (
                <div className="space-y-2">
                  <Textarea
                    id={field.name}
                    placeholder="Enter payment instructions..."
                    className="min-h-[150px]"
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

        {/* Deadline Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Deadlines</CardTitle>
            <CardDescription>Set payment deadlines for different order types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="deadlineSettings.preOrderPayment"
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Pre-order Payment (hours)</Label>
                    <Input
                      id={field.name}
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(parseInt(e.target.value))}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              <form.Field
                name="deadlineSettings.regularOrderPayment"
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Regular Order Payment (hours)</Label>
                    <Input
                      id={field.name}
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(parseInt(e.target.value))}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
            </div>

            <form.Field
              name="deadlineSettings.paymentReminderInterval"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Reminder Interval (hours)</Label>
                  <Input
                    id={field.name}
                    type="number"
                    value={field.state.value?.toString() || ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </CardContent>
        </Card>

        {/* Payment Policies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Policies</CardTitle>
            <CardDescription>Configure your payment and refund policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form.Field
              name="paymentPolicies.refundPolicy"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Refund Policy</Label>
                  <Textarea
                    id={field.name}
                    placeholder="Enter your refund policy..."
                    className="min-h-[100px]"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="paymentPolicies.cancellationPolicy"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Cancellation Policy</Label>
                  <Textarea
                    id={field.name}
                    placeholder="Enter your cancellation policy..."
                    className="min-h-[100px]"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <div className="space-y-4">
              <form.Field
                name="paymentPolicies.partialPaymentAllowed"
                children={(field) => (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Partial Payments</Label>
                      <p className="text-sm text-muted-foreground">Enable customers to make partial payments for their orders</p>
                    </div>
                    <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
                  </div>
                )}
              />

              <form.Field
                name="paymentPolicies.minimumPartialPayment"
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Minimum Partial Payment (%)</Label>
                    <Input
                      id={field.name}
                      type="number"
                      placeholder="e.g., 50"
                      min={1}
                      max={100}
                      value={field.state.value?.toString() || ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(parseInt(e.target.value))}
                      disabled={!form.getFieldValue("paymentPolicies.partialPaymentAllowed")}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Custom Policies */}
        <form.Field
          name="customPolicies"
          children={(field) => (
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Custom Policies</CardTitle>
                  <CardDescription>Add additional payment policies specific to your shop</CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => field.pushValue("")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Policy
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {!field.state.value.length ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No custom policies added yet. Add policies specific to your shop's needs.</AlertDescription>
                  </Alert>
                ) : (
                  field.state.value.map((_, index) => (
                    <div key={index} className="space-y-4">
                      {index > 0 && <Separator />}
                      <div className="flex items-start justify-between">
                        <div className="flex-grow space-y-2">
                          <Textarea
                            placeholder="Enter policy details..."
                            value={field.state.value[index]}
                            onChange={(e) => {
                              const newPolicies = [...field.state.value];
                              newPolicies[index] = e.target.value;
                              field.handleChange(newPolicies);
                            }}
                          />
                        </div>
                        <Button type="button" variant="ghost" size="sm" className="ml-2" onClick={() => field.removeValue(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default ShopPaymentSettings;
