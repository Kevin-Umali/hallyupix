import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FieldInfo from "@/components/custom/field-info";
import { Loader2, Palette, CreditCard, BellRing, Package2 } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const generalSettingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  defaultOrderPlatform: z.enum(["Facebook", "Twitter", "Discord", "Website", "Others"]),
  notifications: z.object({
    emailNotifications: z.boolean(),
    orderUpdates: z.boolean(),
    paymentReminders: z.boolean(),
    stockAlerts: z.boolean(),
  }),
  orderSettings: z.object({
    autoPaymentVerification: z.boolean(),
    autoUpdateStatus: z.boolean(),
    requirePaymentProof: z.boolean(),
    showLowStockWarning: z.boolean(),
  }),
});

type GeneralSettingsFormType = z.infer<typeof generalSettingsSchema>;

const GeneralSettings = () => {
  const form = useForm<GeneralSettingsFormType>({
    defaultValues: {
      theme: "system",
      defaultOrderPlatform: "Facebook",
      notifications: {
        emailNotifications: true,
        orderUpdates: true,
        paymentReminders: true,
        stockAlerts: true,
      },
      orderSettings: {
        autoPaymentVerification: false,
        autoUpdateStatus: true,
        requirePaymentProof: true,
        showLowStockWarning: true,
      },
    },
    onSubmit: async ({ value }) => {
      try {
        toast.success("Settings updated successfully!");
      } catch (error) {
        toast.error("Failed to update settings");
      }
    },
    validators: {
      onChange: generalSettingsSchema,
    },
  });

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">General Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences and defaults</p>
        <Separator className="my-4" />
      </div>

      {/* Settings Content */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <Tabs defaultValue="appearance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appearance" className="space-x-2">
              <Palette className="h-4 w-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="defaults" className="space-x-2">
              <Package2 className="h-4 w-4" />
              <span>Defaults</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="space-x-2">
              <BellRing className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Orders</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how HallyuPix looks on your device</CardDescription>
              </CardHeader>
              <CardContent>
                <form.Field
                  name="theme"
                  children={(field) => (
                    <div className="space-y-2 max-w-md">
                      <Label htmlFor={field.name}>Theme</Label>
                      <Select value={field.state.value} onValueChange={(value) => field.handleChange(value as "light" | "dark" | "system")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="defaults">
            <Card>
              <CardHeader>
                <CardTitle>Default Settings</CardTitle>
                <CardDescription>Configure your default preferences for orders and platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <form.Field
                  name="defaultOrderPlatform"
                  children={(field) => (
                    <div className="space-y-2 max-w-md">
                      <Label htmlFor={field.name}>Default Order Platform</Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value as "Facebook" | "Twitter" | "Discord" | "Website" | "Others")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="Twitter">Twitter</SelectItem>
                          <SelectItem value="Discord">Discord</SelectItem>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <form.Field
                    name="notifications.emailNotifications"
                    children={(field) => (
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor={field.name} className="font-medium">
                          Email Notifications
                        </Label>
                        <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                      </div>
                    )}
                  />
                  <Separator />
                  <form.Field
                    name="notifications.orderUpdates"
                    children={(field) => (
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor={field.name} className="font-medium">
                          Order Updates
                        </Label>
                        <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                      </div>
                    )}
                  />
                  <Separator />
                  <form.Field
                    name="notifications.paymentReminders"
                    children={(field) => (
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor={field.name} className="font-medium">
                          Payment Reminders
                        </Label>
                        <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                      </div>
                    )}
                  />
                  <Separator />
                  <form.Field
                    name="notifications.stockAlerts"
                    children={(field) => (
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor={field.name} className="font-medium">
                          Stock Alerts
                        </Label>
                        <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                      </div>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Preferences</CardTitle>
                <CardDescription>Configure how orders are handled</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form.Field
                  name="orderSettings.autoPaymentVerification"
                  children={(field) => (
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor={field.name} className="font-medium">
                          Automatic Payment Verification
                        </Label>
                        <p className="text-sm text-muted-foreground">Automatically verify payments when proof is submitted</p>
                      </div>
                      <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                    </div>
                  )}
                />
                <Separator />
                <form.Field
                  name="orderSettings.autoUpdateStatus"
                  children={(field) => (
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor={field.name} className="font-medium">
                          Automatic Status Updates
                        </Label>
                        <p className="text-sm text-muted-foreground">Automatically update order status based on actions</p>
                      </div>
                      <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                    </div>
                  )}
                />
                <Separator />
                <form.Field
                  name="orderSettings.requirePaymentProof"
                  children={(field) => (
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor={field.name} className="font-medium">
                          Require Payment Proof
                        </Label>
                        <p className="text-sm text-muted-foreground">Require customers to submit payment proof</p>
                      </div>
                      <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                    </div>
                  )}
                />
                <Separator />
                <form.Field
                  name="orderSettings.showLowStockWarning"
                  children={(field) => (
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor={field.name} className="font-medium">
                          Low Stock Warnings
                        </Label>
                        <p className="text-sm text-muted-foreground">Show warnings when product stock is low</p>
                      </div>
                      <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
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

export default GeneralSettings;
