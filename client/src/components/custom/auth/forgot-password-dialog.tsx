import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { forgetPassword } from "@/lib/api";
import FieldInfo from "@/components/custom/field-info";
import { Loader2, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { maskEmail } from "@/lib/utils";

const COOLDOWN_PERIOD = 300;
const DAILY_LIMIT = 3;

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

type ResetAttempts = {
  count: number;
  lastAttempt: number;
  date: string;
};

const formatTimeLeft = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const ForgotPasswordDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { get: getAttempts, set: setAttempts } = useLocalStorage<ResetAttempts>("reset-attempts", {
    defaults: {
      count: 0,
      lastAttempt: 0,
      date: new Date().toDateString(),
    },
  });

  const [state, setState] = useState({
    emailSent: false,
    maskedEmail: "",
    timeLeft: 0,
    error: "",
    remainingAttempts: DAILY_LIMIT,
  });

  const shouldShowSuccessView = state.timeLeft > 0 || state.remainingAttempts === 0 || (state.emailSent && state.timeLeft > 0);

  // Update time and attempts counter
  useEffect(() => {
    const updateStatus = () => {
      const attempts = getAttempts();
      const now = Math.floor(Date.now() / 1000);
      const today = new Date().toDateString();

      // Reset for new day
      if (attempts.date !== today) {
        setAttempts({
          count: 0,
          lastAttempt: 0,
          date: today,
        });
        setState((prev) => ({
          ...prev,
          emailSent: false, // Reset email sent state
          timeLeft: 0,
          remainingAttempts: DAILY_LIMIT,
          error: "",
        }));
        return;
      }

      // Update cooldown timer
      const timeSinceLastAttempt = now - attempts.lastAttempt;
      const timeLeft = timeSinceLastAttempt < COOLDOWN_PERIOD ? COOLDOWN_PERIOD - timeSinceLastAttempt : 0;

      setState((prev) => ({
        ...prev,
        timeLeft,
        // Only reset emailSent if timer is done and we still have attempts
        emailSent: timeLeft > 0 ? prev.emailSent : false,
        remainingAttempts: DAILY_LIMIT - attempts.count,
      }));
    };

    const timer = setInterval(updateStatus, 1000);
    updateStatus(); // Initial update
    return () => clearInterval(timer);
  }, [DAILY_LIMIT]);

  const form = useForm<ForgotPasswordFormType>({
    defaultValues: { email: "" },
    validators: { onChange: forgotPasswordSchema },
    onSubmit: async ({ value }) => {
      const attempts = getAttempts();
      const today = new Date().toDateString();
      const now = Math.floor(Date.now() / 1000);

      if (attempts.count >= DAILY_LIMIT) {
        setState((prev) => ({
          ...prev,
          error: `Maximum daily reset attempts (${DAILY_LIMIT}) reached. Please try again tomorrow.`,
        }));
        return;
      }

      if (now - attempts.lastAttempt < COOLDOWN_PERIOD) {
        setState((prev) => ({
          ...prev,
          error: `Please wait ${formatTimeLeft(COOLDOWN_PERIOD - (now - attempts.lastAttempt))} before requesting another reset.`,
        }));
        return;
      }

      try {
        await forgetPassword({ email: value.email, redirectTo: "/reset-password" });

        setAttempts({
          count: attempts.count + 1,
          lastAttempt: now,
          date: today,
        });

        setState((prev) => ({
          ...prev,
          emailSent: true,
          maskedEmail: maskEmail(value.email),
          timeLeft: COOLDOWN_PERIOD,
          remainingAttempts: DAILY_LIMIT - (attempts.count + 1),
          error: "",
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "Failed to send reset email. Please try again later.",
        }));
      }
    },
  });

  const SuccessView = () => {
    // Different messages based on state
    const getMessage = () => {
      if (state.remainingAttempts === 0) {
        return (
          <span>
            You have reached the maximum number of password reset attempts allowed for today. Please try again tomorrow.
            <br />
            <br />
            This limit helps protect your account from potential brute force attacks and conserves resources on our email service.
          </span>
        );
      }
      if (state.emailSent) {
        return "We've sent a password reset link to your email. The link will expire in 1 hour.";
      }
      return "Please wait before requesting another password reset.";
    };

    return (
      <div className="space-y-6 py-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{getMessage()}</p>
            <div className="text-sm space-y-1">
              {state.timeLeft > 0 && <p className="font-medium">Next reset available in: {formatTimeLeft(state.timeLeft)}</p>}
              <p className="text-muted-foreground">
                Remaining attempts today: {state.remainingAttempts} of {DAILY_LIMIT}
              </p>
            </div>
          </div>
        </div>

        {state.emailSent && (
          <div className="space-y-4">
            <Button className="w-full" variant="secondary" onClick={() => (window.location.href = `mailto:${state.maskedEmail}`)}>
              <Mail className="mr-2 h-4 w-4" />
              Open Email App
            </Button>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Can't find the email?
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                <li>Check your spam or junk folder</li>
                <li>Add no-reply@hallyupix.com to your contacts</li>
                <li>Check all email folders</li>
                <li>Wait a few minutes and refresh your inbox</li>
                <li>If you don't still receive any email that means you don't have an email address associated with your account</li>
                <li>Please contact us at support@hallyupix.com to resolve this issue</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="link" className="px-0 font-normal text-sm">
          Forgot password?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>
            {!shouldShowSuccessView
              ? `Enter your email address below. You have ${state.remainingAttempts} reset attempts remaining today.`
              : state.maskedEmail
                ? `We've sent a password reset link to ${state.maskedEmail}`
                : "Password reset status"}
          </DialogDescription>
        </DialogHeader>

        {shouldShowSuccessView ? (
          <SuccessView />
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
          >
            {state.error && (
              <div className="text-sm text-red-600 flex items-center gap-2 bg-red-50 p-3 rounded">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p>{state.error}</p>
              </div>
            )}

            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Email Address</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Enter your email"
                    className="h-11"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}>
                {([canSubmit, isSubmitting, isValidating]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting || isValidating}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
