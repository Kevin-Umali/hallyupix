import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FieldInfo from "@/components/custom/field-info";
import { Loader2, Shield, Smartphone, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Session } from "@/lib/api";
import ActiveSessionsTable from "@/components/custom/settings/security/active-sessions-table";
import { useChangePasswordMutation, useRevokeOtherSessionsMutation, useRevokeSessionMutation } from "@/lib/mutation/auth.mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Checkbox } from "@/components/ui/checkbox";

interface SecuritySettingsProps {
  currentSession: Session["session"] | null;
  sessionList: Array<Session["session"]>;
  isLoadingSessions: boolean;
}

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
    revokeOtherSessions: z.boolean().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormType = z.infer<typeof passwordSchema>;

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ currentSession, sessionList, isLoadingSessions }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync: revokeSession, isPending: isRevokingSession } = useRevokeSessionMutation();
  const { mutateAsync: revokeOtherSessions, isPending: isRevokingOtherSessions } = useRevokeOtherSessionsMutation();
  const { mutateAsync: changePassword, isPending: isChangingPassword } = useChangePasswordMutation();

  const form = useForm<PasswordFormType>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      revokeOtherSessions: false,
    },
    onSubmit: async ({ value }) => {
      await changePassword(value, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["session-list"] });
          router.invalidate({
            filter: (route) => route.routeId === "/_authenticated/settings/security",
          });
          form.reset({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            revokeOtherSessions: false,
          });
        },
      });
    },
    validators: {
      onChange: passwordSchema,
    },
  });

  const handleRevokeSession = async (token: string) => {
    await revokeSession(token, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["session-list"] });
        router.invalidate({
          filter: (route) => route.routeId === "/_authenticated/settings/security",
        });
      },
    });
  };

  const handleRevokeAllSessions = async () => {
    await revokeOtherSessions(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["session-list"] });
      },
    });
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
                  <p className="text-sm text-muted-foreground">Not Enabled (Will support soon)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Active Sessions</p>
                  <p className="text-sm text-muted-foreground">{sessionList.length} Devices</p>
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
                  <form.Field name="currentPassword">
                    {(field) => (
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
                  </form.Field>
                  <form.Field name="newPassword">
                    {(field) => (
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
                  </form.Field>
                  <form.Field name="confirmPassword">
                    {(field) => (
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
                  </form.Field>
                  <form.Field name="revokeOtherSessions">
                    {(field) => (
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) => field.handleChange(checked === true)}
                        />
                        <div className="flex flex-col space-y-1">
                          <Label htmlFor={field.name} className="text-sm font-medium">
                            Revoke Other Sessions
                          </Label>
                          <p id={`${field.name}-description`} className="text-sm text-muted-foreground">
                            Enable this option to revoke all other active sessions except this device.
                          </p>
                        </div>
                      </div>
                    )}
                  </form.Field>

                  <div className="pt-2">
                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}>
                      {([canSubmit, isSubmitting, isValidating]) => (
                        <Button type="submit" disabled={!canSubmit || isSubmitting || isValidating || isChangingPassword}>
                          {isSubmitting || isChangingPassword ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Changing Password...
                            </>
                          ) : (
                            "Change Password"
                          )}
                        </Button>
                      )}
                    </form.Subscribe>
                  </div>
                </CardContent>
              </Card>
            </form>

            {/* 2FA Card */}
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Coming soon: Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Not Available Yet</p>
                      <p className="text-sm text-muted-foreground">
                        This feature is currently under development and will be available soon to enhance your account security.
                      </p>
                    </div>
                    <Button variant="outline" disabled>
                      Enable 2FA (Coming Soon)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Active Sessions */}
          <ActiveSessionsTable
            currentSession={currentSession}
            sessionList={sessionList}
            onRevokeSession={handleRevokeSession}
            onRevokeAllSessions={handleRevokeAllSessions}
            isRevokingSession={isRevokingSession}
            isRevokingOtherSessions={isRevokingOtherSessions}
            isLoadingSessions={isLoadingSessions}
          />
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
