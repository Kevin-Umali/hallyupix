import { betterAuth } from "better-auth";
import { oAuthProxy, openAPI, username } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";
import { schema } from "../db/schema/better-auth.model";
import resend from "./resend";
import { populateTemplate } from "./email-templates";

const emailConfig = {
  verification: {
    subject: "Welcome to H A L L Y U P I X - Verify Your Email",
    template: {
      emailTitle: "Welcome to H A L L Y U P I X!",
      mainHeading: "Verify Your Email Address",
      message: "Thanks for signing up! To complete your registration and start selling or buying K-pop merchandise, please verify your email address.",
      buttonText: "Verify Email Address",
    },
  },
  passwordReset: {
    subject: "Reset Your H A L L Y U P I X Password",
    template: {
      emailTitle: "Password Reset Request",
      mainHeading: "Reset Your Password",
      message: "We received a request to reset your password. Click the button below to choose a new password for your account.",
      buttonText: "Reset Password",
    },
  },
};

export const auth = betterAuth({
  basePath: "/api/v1/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.users,
    },
    usePlural: true,
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // TODO: Change this to the actual email address
        to: user.email,
        subject: emailConfig.passwordReset.subject,
        html: populateTemplate("forgotPasswordEmailTemplate", {
          ...emailConfig.passwordReset.template,
          resetUrl: url,
          currentYear: new Date().getFullYear(),
          supportUrl: `/support`,
        }),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/v1/auth/verify-email?token=${token}&callbackURL=${process.env.BETTER_AUTH_URL}/verified-email`;

      await resend.emails.send({
        from: `H A L L Y U P I X <onboarding@resend.dev>`, // TODO: Change this to the actual email address
        to: user.email,
        subject: emailConfig.verification.subject,
        html: populateTemplate("verificationEmailTemplate", {
          ...emailConfig.verification.template,
          actionUrl: verificationUrl.toString(),
          currentYear: new Date().getFullYear(),
          supportUrl: `/support`,
        }),
      });
    },
  },
  trustedOrigins: ["http://localhost:3000", "http://localhost:5173"],
  plugins: [username(), openAPI(), oAuthProxy()],
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
    cookiePrefix: "hallyupix",
  },
});
