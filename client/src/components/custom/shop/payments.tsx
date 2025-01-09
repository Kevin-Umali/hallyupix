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
import { Loader2, Plus, Trash2, Upload, AlertCircle, QrCode, CreditCard, Settings2, Clock, FileText } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      toast.success("QR code uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload QR code");
    }
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Payment Settings</h1>
        <p className="text-muted-foreground">Manage your payment methods and policies</p>
        <Separator className="my-4" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <Tabs defaultValue="methods" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="methods" className="space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Methods</span>
            </TabsTrigger>
            <TabsTrigger value="instructions" className="space-x-2">
              <FileText className="h-4 w-4" />
              <span>Instructions</span>
            </TabsTrigger>
            <TabsTrigger value="deadlines" className="space-x-2">
              <Clock className="h-4 w-4" />
              <span>Deadlines</span>
            </TabsTrigger>
            <TabsTrigger value="policies" className="space-x-2">
              <Settings2 className="h-4 w-4" />
              <span>Policies</span>
            </TabsTrigger>
          </TabsList>
          {/* Payment Methods Tab */}
          <TabsContent value="methods">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Add and manage your accepted payment methods</CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.getFieldValue("paymentMethods").pushValue({
                      id: crypto.randomUUID(),
                      name: "",
                      type: "BANK",
                      accountName: "",
                      accountNumber: "",
                      isActive: true,
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Method
                </Button>
              </CardHeader>
              <CardContent>
                <form.Field
                  name="paymentMethods"
                  children={(field) => (
                    <div className="space-y-6">
                      {!field.state.value.length ? (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>No payment methods added yet. Add a payment method to start accepting payments.</AlertDescription>
                        </Alert>
                      ) : (
                        field.state.value.map((method, index) => (
                          <div key={method.id} className="space-y-4">
                            {index > 0 && <Separator />}
                            <div className="flex justify-between items-center">
                              <h4 className="text-sm font-medium">Payment Method {index + 1}</h4>
                              <div className="flex items-center space-x-2">
                                <form.Field
                                  name={`paymentMethods.${index}.isActive`}
                                  children={(activeField) => (
                                    <div className="flex items-center space-x-2">
                                      <Switch checked={activeField.state.value} onCheckedChange={activeField.handleChange} />
                                      <Label className="text-sm">Active</Label>
                                    </div>
                                  )}
                                />
                                <Button type="button" variant="ghost" size="sm" onClick={() => field.removeValue(index)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                              <form.Field
                                name={`paymentMethods.${index}.name`}
                                children={(nameField) => (
                                  <div className="space-y-2">
                                    <Label>Method Name</Label>
                                    <Input
                                      placeholder="e.g., Bank Transfer"
                                      value={nameField.state.value}
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
                                    <Label>Type</Label>
                                    <Select
                                      value={typeField.state.value}
                                      onValueChange={(value) => typeField.handleChange(value as "BANK" | "EWALLET" | "CRYPTO")}
                                    >
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

                              <form.Field
                                name={`paymentMethods.${index}.accountName`}
                                children={(accountField) => (
                                  <div className="space-y-2">
                                    <Label>Account Name</Label>
                                    <Input
                                      placeholder="Enter account name"
                                      value={accountField.state.value}
                                      onChange={(e) => accountField.handleChange(e.target.value)}
                                    />
                                    <FieldInfo field={accountField} />
                                  </div>
                                )}
                              />

                              <form.Field
                                name={`paymentMethods.${index}.accountNumber`}
                                children={(numberField) => (
                                  <div className="space-y-2">
                                    <Label>Account Number</Label>
                                    <Input
                                      placeholder="Enter account number"
                                      value={numberField.state.value}
                                      onChange={(e) => numberField.handleChange(e.target.value)}
                                    />
                                    <FieldInfo field={numberField} />
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
                                          onClick={() => handleQRUpload(method.id)}
                                        >
                                          <Upload className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button type="button" variant="outline" onClick={() => handleQRUpload(method.id)}>
                                        <QrCode className="h-4 w-4 mr-2" />
                                        Upload QR Code
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Instructions Tab */}
          <TabsContent value="instructions">
            <Card>
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
                        placeholder="Enter payment instructions..."
                        className="min-h-[200px]"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deadlines Tab */}
          <TabsContent value="deadlines">
            <Card>
              <CardHeader>
                <CardTitle>Payment Deadlines</CardTitle>
                <CardDescription>Set payment deadlines for different order types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <form.Field
                    name="deadlineSettings.preOrderPayment"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label>Pre-order Payment (hours)</Label>
                        <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(parseInt(e.target.value))} />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  />

                  <form.Field
                    name="deadlineSettings.regularOrderPayment"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label>Regular Order Payment (hours)</Label>
                        <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(parseInt(e.target.value))} />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  />
                </div>

                <form.Field
                  name="deadlineSettings.paymentReminderInterval"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label>Reminder Interval (hours)</Label>
                      <Input type="number" value={field.state.value?.toString() || ""} onChange={(e) => field.handleChange(parseInt(e.target.value))} />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          {/* Policies Tab */}
          <TabsContent value="policies">
            <Card>
              <CardHeader>
                <CardTitle>Payment Policies</CardTitle>
                <CardDescription>Configure your payment and refund policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form.Field
                  name="paymentPolicies.refundPolicy"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label>Refund Policy</Label>
                      <Textarea
                        placeholder="Enter your refund policy..."
                        className="min-h-[100px]"
                        value={field.state.value}
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
                      <Label>Cancellation Policy</Label>
                      <Textarea
                        placeholder="Enter your cancellation policy..."
                        className="min-h-[100px]"
                        value={field.state.value}
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
                        <Label>Minimum Partial Payment (%)</Label>
                        <Input
                          type="number"
                          placeholder="e.g., 50"
                          min={1}
                          max={100}
                          value={field.state.value?.toString() || ""}
                          onChange={(e) => field.handleChange(parseInt(e.target.value))}
                          disabled={!form.getFieldValue("paymentPolicies.partialPaymentAllowed")}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  />
                </div>

                <form.Field
                  name="customPolicies"
                  children={(field) => (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <h3 className="font-medium">Custom Policies</h3>
                          <p className="text-sm text-muted-foreground">Add additional payment policies specific to your shop</p>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={() => field.pushValue("")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Policy
                        </Button>
                      </div>

                      {!field.state.value.length ? (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>No custom policies added yet. Add policies specific to your shop's needs.</AlertDescription>
                        </Alert>
                      ) : (
                        field.state.value.map((_, index) => (
                          <div key={index} className="flex gap-2">
                            <Textarea
                              placeholder="Enter policy details..."
                              value={field.state.value[index]}
                              onChange={(e) => {
                                const newPolicies = [...field.state.value];
                                newPolicies[index] = e.target.value;
                                field.handleChange(newPolicies);
                              }}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => field.removeValue(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline">Cancel</Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
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
        </div>
      </form>
    </div>
  );
};

export default ShopPaymentSettings;
