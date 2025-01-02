import { ShoppingBag, Store } from "lucide-react";

export const ACRONYM_APP_NAME = "HP";
export const APP_NAME = "H A L L Y U P I X";
export const CONTACT_EMAIL = "support@hallyupix.com";
export const EFFECTIVE_DATE = "February 21, 2024";

export const TERMS_CONTENT = {
  title: "Terms and Conditions",
  description: `Welcome to ${APP_NAME}! These Terms and Conditions explain the rules for using the platform. Since this is an individually operated platform, I do not participate in transactions or verify the items listed. By using ${APP_NAME}, you agree to these terms, which are governed by Philippine law.`,
  lastUpdated: EFFECTIVE_DATE,
  sections: [
    {
      title: "1. About the Platform",
      content: [
        `${APP_NAME} is a platform that connects buyers and sellers of K-pop merchandise. It serves as a marketplace for users to interact and transact independently.`,
        "As the platform operator, I do not guarantee the authenticity, quality, or legality of items listed or the success of any transaction.",
      ],
      important: true,
    },
    {
      title: "2. Access to the Platform",
      content: [
        "This platform operates on an invite-only basis to ensure a safe and trusted community.",
        "I reserve the right to approve or deny access at my sole discretion.",
      ],
      items: ["Users must be at least 18 years old or have parental consent.", "Only one account is allowed per user."],
    },
    {
      title: "3. User Responsibilities",
      content: "By using the platform, you agree to the following:",
      items: [
        "Provide accurate information when creating your account.",
        "Maintain the security of your account and notify me if there is unauthorized access.",
        "Ensure that your listings comply with all applicable laws.",
        "Communicate honestly and respectfully with other users.",
      ],
    },
    {
      title: "4. Transactions and Payments",
      content: `${APP_NAME} is only a platform for users to list and discover items.`,
      subsections: [
        {
          title: "Transaction Disclaimer",
          content: [
            "I do not handle payments, shipping, or delivery.",
            "All transactions are made directly between buyers and sellers.",
            "I am not responsible for any disputes, scams, or financial losses.",
          ],
        },
        {
          title: "Your Responsibilities",
          items: [
            "Verify the identity of the other party before transacting.",
            "Use secure payment methods and keep proof of transactions.",
            "Resolve any disputes directly with the other party.",
          ],
        },
      ],
    },
    {
      title: "5. Prohibited Activities",
      content: "The following actions are not allowed on the platform:",
      items: [
        "Selling counterfeit or illegal merchandise.",
        "Posting offensive or misleading content.",
        "Harassing or threatening other users.",
        "Engaging in fraudulent transactions or scams.",
        "Using multiple accounts to manipulate listings or interactions.",
      ],
    },
    {
      title: "6. Platform Limitations",
      content: [
        `${APP_NAME} is provided as-is, and I cannot guarantee uninterrupted access or the resolution of all issues.`,
        "As the operator, I am not liable for any losses, damages, or disputes arising from your use of the platform.",
      ],
      important: true,
    },
    {
      title: "7. Changes to Terms",
      content: [
        "These Terms may be updated from time to time. Significant changes will be communicated via email or platform notifications.",
        "Your continued use of the platform means you accept the updated Terms.",
      ],
    },
    {
      title: "8. Contact Information",
      content: "For questions or concerns, you can reach me at:",
      items: [`Email: ${CONTACT_EMAIL}`],
    },
  ],
};

export const PRIVACY_CONTENT = {
  title: "Privacy Policy",
  description: `${APP_NAME} values your privacy. This Privacy Policy explains how your data is collected, used, and protected. As an individual operator, I make every effort to safeguard your information in accordance with the Philippine Data Privacy Act of 2012 (RA 10173).`,
  lastUpdated: EFFECTIVE_DATE,
  sections: [
    {
      title: "1. Data We Collect",
      content: "We collect the following types of data:",
      subsections: [
        {
          title: "Personal Information",
          items: ["Name, email address, and username.", "Optional contact details, such as phone number."],
        },
        {
          title: "Platform Data",
          items: ["Listings, reviews, and messages sent through the platform.", "Images and content uploaded by users."],
        },
        {
          title: "Technical Data",
          items: ["Device information (e.g., browser and operating system).", "IP address and usage statistics."],
        },
      ],
    },
    {
      title: "2. How We Use Your Data",
      content: "We use your data to:",
      items: [
        "Create and manage your account.",
        "Facilitate communication between users.",
        "Improve platform functionality and user experience.",
        "Send important updates and notifications.",
      ],
    },
    {
      title: "3. Data Sharing and Disclosure",
      content: "We do not sell or rent your personal data. However, we may:",
      items: ["Share public profile data (e.g., username, profile picture).", "Disclose information if required by law or to protect our rights."],
    },
    {
      title: "4. Your Privacy Rights",
      content: "Under Philippine law, you have the following rights:",
      subsections: [
        {
          title: "Access and Control",
          items: [
            "Request access to your personal data.",
            "Request corrections to inaccurate information.",
            "Request deletion of your data, subject to legal requirements.",
          ],
        },
        {
          title: "Exercising Your Rights",
          content: `You may contact us at ${CONTACT_EMAIL} to exercise these rights. We will respond within 15 working days.`,
        },
      ],
    },
    {
      title: "5. Data Security",
      content: "We implement the following measures to protect your data:",
      items: ["Encryption of sensitive data.", "Regular security updates and audits.", "Access controls to prevent unauthorized access."],
    },
    {
      title: "6. Cookies and Tracking",
      content: "We use cookies to improve your experience:",
      items: ["Session cookies to maintain your login status.", "Analytics cookies to track platform usage."],
    },
    {
      title: "7. Changes to This Policy",
      content: [
        "We may update this Privacy Policy periodically.",
        "Significant changes will be communicated via email or platform notifications.",
        "Continued use of the platform constitutes acceptance of the updated policy.",
      ],
      important: true,
    },
    {
      title: "8. Contact Information",
      content: "For questions about this policy or your data, contact us at:",
      items: [`Email: ${CONTACT_EMAIL}`],
    },
  ],
};

export const ROLES = [
  {
    value: "Buyer",
    label: "K-pop Fan & Collector",
    description: "Browse and purchase authentic K-pop merchandise and collectibles",
    icon: ShoppingBag,
  },
  {
    value: "Seller",
    label: "K-pop Store Owner",
    description: "List and sell K-pop merchandise to fans worldwide",
    icon: Store,
  },
];
