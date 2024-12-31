type TemplateKey = "verificationEmailTemplate" | "forgotPasswordEmailTemplate";

interface BaseEmailData {
  emailTitle: string;
  mainHeading: string;
  message: string;
  buttonText: string;
  currentYear: number;
  supportUrl: string;
}

interface VerificationEmailData extends BaseEmailData {
  actionUrl: string;
}

interface ForgotPasswordEmailData extends BaseEmailData {
  resetUrl: string;
}

type TemplateData = {
  verificationEmailTemplate: VerificationEmailData;
  forgotPasswordEmailTemplate: ForgotPasswordEmailData;
};

const baseStyles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #374151;
    -webkit-font-smoothing: antialiased;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .header {
    padding: 24px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }
  .content {
    padding: 40px;
    text-align: center;
  }
  .content h1 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 24px;
    line-height: 1.3;
  }
  .content p {
    margin: 20px 0;
    line-height: 1.8;
    font-size: 16px;
    color: #4b5563;
  }
  .button {
    display: inline-block;
    margin: 24px 0;
    padding: 14px 32px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    border-radius: 6px;
    text-decoration: none;
    letter-spacing: 0.5px;
    transition: all 0.2s ease;
  }
  .button:hover {
    transform: translateY(-1px);
  }
  .footer {
    text-align: center;
    padding: 24px;
    font-size: 14px;
    color: #6b7280;
    background: #f9fafb;
    border-top: 1px solid #f3f4f6;
  }
  .footer p {
    margin: 8px 0;
  }
  .footer a {
    text-decoration: none;
  }
  .icon {
    margin: 0 auto 32px;
    width: 180px;
    height: auto;
  }
  .raw-url {
    margin-top: 20px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 6px;
    font-size: 14px;
    color: #6b7280;
  }
  .raw-url a {
    word-break: break-all;
  }
  @media (max-width: 600px) {
    .container {
      margin: 20px;
      border-radius: 8px;
    }
    .content {
      padding: 24px;
    }
  }
`;

const templates: Record<TemplateKey, string> = {
  verificationEmailTemplate: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{emailTitle}}</title>
        <style>${baseStyles}
          .header { background-color: #38bdf8; color: white; }
          .button { background-color: #38bdf8; }
          .button:hover { background-color: #0ea5e9; }
          .footer a { color: #38bdf8; }
          .raw-url a { color: #38bdf8; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">{{emailTitle}}</div>
            <div class="content">
                <div class="icon">[Verification Icon SVG]</div>
                <h1>{{mainHeading}}</h1>
                <p>{{message}}</p>
                <a href="{{actionUrl}}" class="button">{{buttonText}}</a>
                <div class="raw-url">
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <a href="{{actionUrl}}">{{actionUrl}}</a>
                </div>
                <p style="margin-top: 32px; font-size: 14px; color: #6b7280;">
                  This verification link will expire in 24 hours.<br>
                  If you didn't request this email, you can safely ignore it.
                </p>
            </div>
            <div class="footer">
                <p>© {{currentYear}} H A L L Y U P I X. All rights reserved.</p>
                <p><a href="{{supportUrl}}">Help & Support</a></p>
            </div>
        </div>
    </body>
    </html>
  `,
  forgotPasswordEmailTemplate: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{emailTitle}}</title>
        <style>${baseStyles}
          .header { background-color: #f97316; color: white; }
          .button { background-color: #f97316; }
          .button:hover { background-color: #ea580c; }
          .footer a { color: #f97316; }
          .raw-url a { color: #f97316; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">{{emailTitle}}</div>
            <div class="content">
                <div class="icon">[Password Reset Icon SVG]</div>
                <h1>{{mainHeading}}</h1>
                <p>{{message}}</p>
                <a href="{{resetUrl}}" class="button">{{buttonText}}</a>
                <div class="raw-url">
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <a href="{{resetUrl}}">{{resetUrl}}</a>
                </div>
                <p style="margin-top: 32px; font-size: 14px; color: #6b7280;">
                  This password reset link will expire in 1 hour for security.<br>
                  If you didn't request this email, you can safely ignore it.
                </p>
            </div>
            <div class="footer">
                <p>© {{currentYear}} H A L L Y U P I X. All rights reserved.</p>
                <p><a href="{{supportUrl}}">Help & Support</a></p>
            </div>
        </div>
    </body>
    </html>
  `,
};

export const populateTemplate = <K extends TemplateKey>(templateKey: K, data: TemplateData[K]): string => {
  const template = templates[templateKey];
  return template.replace(/{{(\w+)}}/g, (_, key: string): string => {
    if (key in data) {
      return String(data[key as keyof TemplateData[K]]);
    }
    throw new Error(`Missing required template key: ${key}`);
  });
};
