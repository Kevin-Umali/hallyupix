import { BarChart2, Calendar, Clock, FileText, ListChecks, MessageCircle, MessageSquare, Package, Receipt, ShoppingBag, Store } from "lucide-react";

export const ACRONYM_APP_NAME = "HP";
export const APP_NAME = "H A L L Y U P I X";
export const CONTACT_EMAIL = "support@hallyupix.com";
export const EFFECTIVE_DATE = "February 21, 2024";

export const TERMS_CONTENT = {
  title: "Terms and Conditions",
  description: `Welcome to ${APP_NAME}! These Terms and Conditions outline the rules for using our seller management platform. ${APP_NAME} is designed to help K-pop shop sellers manage their orders and inventory. By using ${APP_NAME}, you agree to these terms, which are governed by Philippine law.`,
  lastUpdated: EFFECTIVE_DATE,
  sections: [
    {
      title: "1. About the Platform",
      content: [
        `${APP_NAME} is a management platform designed for K-pop shop sellers to track orders, manage inventory, and handle order statuses. It serves as a tool to help sellers organize their business operations.`,
        "As the platform operator, I provide the tools and features but do not participate in or verify any transactions between sellers and their customers.",
      ],
      important: true,
    },
    {
      title: "2. Access to the Platform",
      content: [
        "This platform operates on an invite-only basis for sellers to ensure a trusted community.",
        "I reserve the right to approve or deny seller access at my sole discretion.",
      ],
      items: ["Sellers must be at least 18 years old.", "Only one seller account is allowed per shop.", "Seller accounts cannot be transferred or sold."],
    },
    {
      title: "3. Seller Responsibilities",
      content: "By using the platform, you agree to:",
      items: [
        "Provide accurate information when creating your seller account",
        "Maintain the security of your account credentials",
        "Use the platform tools responsibly and ethically",
        "Keep your order and inventory records up to date",
        "Handle your customer data responsibly",
      ],
    },
    {
      title: "4. Platform Usage",
      content: `${APP_NAME} provides tools for order management and tracking.`,
      subsections: [
        {
          title: "Platform Scope",
          content: [
            "The platform provides order management and tracking tools",
            "We do not process payments or handle merchandise",
            "All transactions occur outside the platform",
          ],
        },
        {
          title: "Your Responsibilities",
          items: [
            "Maintain accurate order records",
            "Keep your status flows and inventory updated",
            "Protect your customers' information",
            "Use the tracking links responsibly",
          ],
        },
      ],
    },
    {
      title: "5. Prohibited Activities",
      content: "The following actions are not allowed:",
      items: [
        "Sharing account access with unauthorized users",
        "Using the platform for illegal activities",
        "Misusing customer information",
        "Creating multiple accounts for the same shop",
        "Manipulating order statuses inappropriately",
      ],
    },
    {
      title: "6. Platform Limitations",
      content: [
        `${APP_NAME} is provided as-is, and I cannot guarantee uninterrupted access.`,
        "I am not responsible for any disputes between sellers and their customers.",
      ],
      important: true,
    },
    {
      title: "7. Changes to Terms",
      content: ["These Terms may be updated periodically. Changes will be communicated via email.", "Continued use indicates acceptance of updated Terms."],
    },
    {
      title: "8. Contact Information",
      content: "For questions or support:",
      items: [`Email: ${CONTACT_EMAIL}`],
    },
  ],
};

export const PRIVACY_CONTENT = {
  title: "Privacy Policy",
  description: `${APP_NAME} values your privacy and the privacy of your customers. This Policy explains how we handle seller and customer data in accordance with the Philippine Data Privacy Act of 2012 (RA 10173).`,
  lastUpdated: EFFECTIVE_DATE,
  sections: [
    {
      title: "1. Data We Collect",
      content: "We collect the following data:",
      subsections: [
        {
          title: "Seller Information",
          items: ["Shop name and contact details", "Login credentials and account information", "Custom status flows and settings"],
        },
        {
          title: "Order Data",
          items: ["Order details and status information", "Customer contact information for orders", "Payment verification uploads", "Tracking information"],
        },
        {
          title: "Technical Data",
          items: ["Device and browser information", "IP address and usage statistics", "Platform interaction data"],
        },
      ],
    },
    {
      title: "2. Data Usage",
      content: "We use data to:",
      items: [
        "Manage your seller account",
        "Process and track orders",
        "Generate status tracking links",
        "Improve platform functionality",
        "Send important updates",
      ],
    },
    {
      title: "3. Customer Data Protection",
      content: "As a seller, you are responsible for:",
      items: [
        "Protecting customer information you input",
        "Using tracking links appropriately",
        "Managing payment proof data securely",
        "Handling customer data according to law",
      ],
    },
    {
      title: "4. Your Rights",
      content: "Under Philippine law, you have the right to:",
      subsections: [
        {
          title: "Data Control",
          items: ["Access your shop's data", "Correct inaccurate information", "Request data deletion"],
        },
        {
          title: "Rights Exercise",
          content: `Contact ${CONTACT_EMAIL} for data-related requests.`,
        },
      ],
    },
    {
      title: "5. Security Measures",
      content: "We protect your data through:",
      items: ["Encrypted data storage", "Secure access controls", "Regular security updates", "Protected payment proof storage"],
    },
    {
      title: "6. Platform Tracking",
      content: "We use cookies for:",
      items: ["Session management", "Platform analytics", "Feature optimization"],
    },
    {
      title: "7. Policy Updates",
      content: ["This Policy may be updated periodically", "Changes will be communicated via email", "Continued use means acceptance"],
      important: true,
    },
    {
      title: "8. Contact Us",
      content: "Questions about privacy:",
      items: [`Email: ${CONTACT_EMAIL}`],
    },
  ],
};

export const ROLES = [
  {
    value: "Buyer",
    label: "Buyer (Unavailable)",
    // description: "Browse and purchase authentic K-pop merchandise and collectibles (Coming Soon)",
    description: "(Coming Soon)",
    icon: ShoppingBag,
    disabled: true,
  },
  {
    value: "Seller",
    label: "K-pop Store Owner",
    // description: "List and sell K-pop merchandise to fans worldwide",
    description: "List, manage and track your orders, inventory, and payments",
    icon: Store,
    disabled: false,
  },
];

export const SELLER_FEATURES = [
  {
    icon: ListChecks,
    title: "Custom Status Flows",
    description: "Create and customize your own order status workflow to match your process",
    color: "text-blue-500",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Track pre-orders and in-stock items with automated stock alerts",
    color: "text-pink-500",
  },
  {
    icon: BarChart2,
    title: "Order Analytics",
    description: "Monitor sales performance and track order statistics",
    color: "text-purple-500",
  },
  {
    icon: MessageSquare,
    title: "Status Sharing",
    description: "Generate unique status tracking links to share with buyers",
    color: "text-green-500",
  },
  {
    icon: Receipt,
    title: "Payment Verification",
    description: "Easy system for buyers to submit payment proofs and sellers to verify",
    color: "text-orange-500",
  },
  {
    icon: Calendar,
    title: "Pre-order System",
    description: "Manage pre-order schedules, deadlines, and inventory allocation",
    color: "text-yellow-500",
  },
  {
    icon: FileText,
    title: "Multi-Platform Orders",
    description: "Manage orders from Facebook, Discord, and other platforms in one place",
    color: "text-amber-500",
  },
  {
    icon: MessageCircle,
    title: "Order Communications",
    description: "Keep all order-related communication organized and accessible",
    color: "text-indigo-500",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Maria Santos",
    role: "Shop Owner",
    avatar: "/avatars/maria.jpg",
    content: "Managing pre-orders and tracking inventory has never been easier. The custom status flows and payment verification system save me so much time!",
    business: "K-pop Corner PH",
    location: "Manila",
    platforms: "Facebook, Discord",
  },
  {
    name: "Ana Reyes",
    role: "Shop Owner",
    avatar: "/avatars/ana.jpg",
    content:
      "The ability to create custom status flows and share tracking links with buyers has streamlined my entire operation. My customers love the transparency!",
    business: "Seoul Store PH",
    location: "Davao",
    platforms: "Instagram, Shopee",
  },
  {
    name: "Jenny Kim",
    role: "Shop Owner",
    avatar: "/avatars/jenny.jpg",
    content: "Finally a system that understands K-pop shop needs! Managing pre-orders across different platforms is now hassle-free.",
    business: "KPopGoods MNL",
    location: "Quezon City",
    platforms: "Facebook, Xianyu",
  },
];

export const ORDER_DETAILS = [
  { label: "Order Date", value: "Feb 20, 2024" },
  { label: "Total Amount", value: "₱2,500.00" },
  { label: "Platform", value: "Facebook" },
  { label: "Buyer", value: "Maria Santos" },
];

export const ORDER_ITEMS = [
  {
    image: "/products/album.jpg",
    name: "TWICE Ready To Be Album",
    variant: "Version A",
    quantity: 1,
    price: "₱1,500.00",
    benefits: ["Pre-order Poster", "Random PC", "ID Card"],
  },
  {
    image: "/products/pc.jpg",
    name: "NewJeans OMG Photocard",
    variant: "Hanni Ver.",
    quantity: 2,
    price: "₱500.00",
    benefits: ["PC Sleeve", "Freebies"],
  },
];

export const TIMELINE_EVENTS = [
  {
    title: "Payment Proof Submitted",
    description: "Buyer uploaded GCash payment screenshot",
    date: "Feb 20, 2024 - 2:30 PM",
    status: "complete" as const,
    details: ["Payment Amount: ₱2,500.00", "Proof Status: Verified"],
  },
  {
    title: "Processing",
    description: "Order confirmed and processing",
    date: "Feb 21, 2024 - 10:15 AM",
    status: "current" as const,
    details: ["Stock reserved", "Ready for shipping"],
  },
  {
    title: "Ready for Shipping",
    description: "Package prepared for courier pickup",
    date: "Expected Feb 23, 2024",
    status: "pending" as const,
  },
  {
    title: "Completed",
    description: "Order completed and delivered",
    date: "Expected Feb 24-25, 2024",
    status: "pending" as const,
  },
];

export const WORKFLOW_STEPS = [
  {
    icon: ListChecks,
    title: "Create Your Workflow",
    step: "Step 1",
    description: "Set up your custom order status flow that matches your business process",
    steps: ["Define your status steps", "Set up verification requirements", "Customize status notifications"],
  },
  {
    icon: Package,
    title: "Manage Orders",
    step: "Step 2",
    description: "Add orders from any platform and track them in one place",
    steps: ["Add order details", "Generate status tracking link", "Share link with buyer"],
  },
  {
    icon: FileText,
    title: "Handle Payments",
    step: "Step 3",
    description: "Easy payment verification system for you and your buyers",
    steps: ["Buyer submits payment proof", "Verify payment details", "Automatically update status"],
  },
  {
    icon: Clock,
    title: "Track Progress",
    step: "Step 4",
    description: "Monitor orders and keep buyers updated automatically",
    steps: ["Update order status", "Buyer gets notified", "Share shipping details"],
  },
];
