import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FieldInfo from "@/components/custom/field-info";
import { Loader2, LogOut, Shield, Smartphone, Lock } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormType = z.infer<typeof passwordSchema>;

// Mock active sessions data
const mockSessions = [
  {
    id: "1",
    device: "Chrome on Windows",
    ipAddress: "192.168.1.1",
    lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    current: true,
  },
  {
    id: "2",
    device: "Safari on iPhone",
    ipAddress: "192.168.1.2",
    lastActive: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    current: false,
  },
];

const SecuritySettings = () => {
  const form = useForm<PasswordFormType>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        toast.success("Password changed successfully!");
        form.reset();
      } catch (error) {
        toast.error("Failed to change password");
      }
    },
    validators: {
      onChange: passwordSchema,
    },
  });

  const handleRevokeSession = async (sessionId: string) => {
    try {
      toast.success("Session revoked successfully");
    } catch (error) {
      toast.error("Failed to revoke session");
    }
  };

  const handleRevokeAllSessions = async () => {
    try {
      toast.success("All sessions revoked successfully");
    } catch (error) {
      toast.error("Failed to revoke sessions");
    }
  };

  const handleEnable2FA = async () => {
    try {
      toast.success("2FA setup initiated");
    } catch (error) {
      toast.error("Failed to setup 2FA");
    }
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-8 p-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account security and active sessions</p>
        <Separator className="my-4" />
      </div>

      <div className="grid gap-8">
        {/* Security Overview Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Password Status</p>
                  <p className="text-sm text-muted-foreground">Strong</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">2FA Status</p>
                  <p className="text-sm text-muted-foreground">Not Enabled</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Active Sessions</p>
                  <p className="text-sm text-muted-foreground">2 Devices</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Password Change Card */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void form.handleSubmit();
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form.Field
                    name="currentPassword"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Current Password</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  />

                  <form.Field
                    name="newPassword"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>New Password</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  />

                  <form.Field
                    name="confirmPassword"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Confirm New Password</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  />

                  <div className="pt-2">
                    <form.Subscribe
                      selector={(state) => [state.canSubmit, state.isSubmitting]}
                      children={([canSubmit, isSubmitting]) => (
                        <Button type="submit" disabled={!canSubmit || isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Changing Password...
                            </>
                          ) : (
                            "Change Password"
                          )}
                        </Button>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </form>

            {/* 2FA Card */}
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Not Enabled</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security by enabling 2FA for your account</p>
                    </div>
                    <Button variant="outline" onClick={handleEnable2FA}>
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Active Sessions */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Manage your active sessions</CardDescription>
                </div>
                <Button variant="outline" onClick={handleRevokeAllSessions}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Revoke All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">
                        {session.device}
                        {session.current && (
                          <Badge variant="outline" className="ml-2">
                            Current
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{session.ipAddress}</TableCell>
                      <TableCell>{session.lastActive.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleRevokeSession(session.id)} disabled={session.current}>
                          <LogOut className="h-4 w-4" />
                          <span className="sr-only">Revoke session</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
