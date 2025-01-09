import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FieldInfo from "@/components/custom/field-info";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

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
        // TODO: Implement your update settings API call here
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
    <div className="container max-w-4xl space-y-6 p-8">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">General Settings</h2>
        <p className="text-muted-foreground">Manage your application preferences and defaults</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how HallyuPix looks on your device</CardDescription>
          </CardHeader>
          <CardContent>
            <form.Field
              name="theme"
              children={(field) => (
                <div className="space-y-2">
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

        {/* Default Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Default Settings</CardTitle>
            <CardDescription>Configure your default preferences for orders and platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form.Field
              name="defaultOrderPlatform"
              children={(field) => (
                <div className="space-y-2">
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

        {/* Notifications Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose what notifications you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form.Field
              name="notifications.emailNotifications"
              children={(field) => (
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor={field.name}>Email Notifications</Label>
                  <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                </div>
              )}
            />
            <Separator />
            <form.Field
              name="notifications.orderUpdates"
              children={(field) => (
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor={field.name}>Order Updates</Label>
                  <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                </div>
              )}
            />
            <Separator />
            <form.Field
              name="notifications.paymentReminders"
              children={(field) => (
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor={field.name}>Payment Reminders</Label>
                  <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                </div>
              )}
            />
            <Separator />
            <form.Field
              name="notifications.stockAlerts"
              children={(field) => (
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor={field.name}>Stock Alerts</Label>
                  <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                </div>
              )}
            />
          </CardContent>
        </Card>

        {/* Order Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Order Settings</CardTitle>
            <CardDescription>Configure how orders are handled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form.Field
              name="orderSettings.autoPaymentVerification"
              children={(field) => (
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor={field.name}>Automatic Payment Verification</Label>
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
                    <Label htmlFor={field.name}>Automatic Status Updates</Label>
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
                    <Label htmlFor={field.name}>Require Payment Proof</Label>
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
                    <Label htmlFor={field.name}>Low Stock Warnings</Label>
                    <p className="text-sm text-muted-foreground">Show warnings when product stock is low</p>
                  </div>
                  <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                </div>
              )}
            />
          </CardContent>
        </Card>

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

export default GeneralSettings;
