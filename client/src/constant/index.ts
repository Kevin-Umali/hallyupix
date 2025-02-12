import { VerificationTypeEnum } from "@/shared/types/status-flow.types";
import {
  BadgeCheck,
  BarChart2,
  Boxes,
  Calendar,
  ClipboardList,
  Clock,
  CreditCard,
  FileStack,
  FileText,
  Gauge,
  ImageIcon,
  LayoutDashboard,
  LayoutTemplate,
  ListChecks,
  ListTodo,
  MessageCircle,
  MessageSquare,
  Package,
  Receipt,
  ScrollText,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Store,
  Tag,
  TrendingUp,
  Truck,
  UserCircle,
  Wallet,
} from "lucide-react";

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
  {
    icon: Truck,
    title: "Shipping Management",
    description: "Streamline order fulfillment and tracking",
    color: "text-red-500",
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

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview of your shop performance",
    subItems: [],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    description: "Track and manage customer orders",
    subItems: [
      { title: "All Orders", to: "/orders", icon: ListTodo },
      { title: "Pre-orders", to: "/orders/pre-orders", icon: Clock },
      { title: "Payment Verifications", to: "/orders/payments", icon: CreditCard },
      { title: "Order Status", to: "/orders/status", icon: ClipboardList },
      { title: "Shipping Management", to: "/orders/shipping", icon: Truck },
    ],
  },
  {
    title: "Products",
    icon: Package,
    description: "Manage your product inventory",
    subItems: [
      { title: "Inventory", to: "/products/inventory", icon: Boxes },
      { title: "Pre-order Items", to: "/products/pre-orders", icon: Clock },
      { title: "Categories", to: "/products/categories", icon: Tag },
      { title: "Price Management", to: "/products/pricing", icon: Wallet },
      { title: "Media Library", to: "/products/media", icon: ImageIcon },
    ],
  },
  {
    title: "Status Flows",
    icon: LayoutTemplate,
    description: "Customize order status workflows",
    subItems: [
      { title: "Status Flows", to: "/status-flows", icon: ScrollText },
      { title: "Flow Allowed Transitions", to: "/status-flows/transitions", icon: FileStack },
      { title: "Tracking Setup", to: "/status-flows/tracking", icon: TrendingUp },
    ],
  },
  // {
  //   title: "Analytics", // NOT PRIORITY
  //   icon: Receipt,
  //   description: "View shop performance metrics",
  //   subItems: [
  //     { title: "Sales Overview", to: "/analytics/sales", icon: TrendingUp },
  //     { title: "Inventory Analysis", to: "/analytics/inventory", icon: BoxesIcon },
  //     { title: "Customer Stats", to: "/analytics/customers", icon: Users },
  //   ],
  // },
  {
    title: "Shop",
    icon: Store,
    description: "Manage your shop profile",
    subItems: [
      { title: "Shop Profile", to: "/shop/profile", icon: FileText },
      { title: "Shop Payments", to: "/shop/payments", icon: CreditCard },
      { title: "Shop Shipping", to: "/shop/shipping", icon: Truck },
      { title: "Verification", to: "/shop/verification", icon: BadgeCheck },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    description: "Configure account settings",
    subItems: [
      { title: "General", to: "/settings/general", icon: Gauge },
      { title: "Profile", to: "/settings/profile", icon: UserCircle },
      { title: "Security", to: "/settings/security", icon: ShieldCheck },
    ],
  },
];

const COLORS = [
  {
    id: "red",
    value: "bg-red-100 text-red-700 border-red-200",
    label: "Red",
  },
  {
    id: "yellow",
    value: "bg-yellow-100 text-yellow-700 border-yellow-200",
    label: "Yellow",
  },
  {
    id: "green",
    value: "bg-green-100 text-green-700 border-green-200",
    label: "Green",
  },
  {
    id: "blue",
    value: "bg-blue-100 text-blue-700 border-blue-200",
    label: "Blue",
  },
  {
    id: "purple",
    value: "bg-purple-100 text-purple-700 border-purple-200",
    label: "Purple",
  },
  {
    id: "pink",
    value: "bg-pink-100 text-pink-700 border-pink-200",
    label: "Pink",
  },
  {
    id: "orange",
    value: "bg-orange-100 text-orange-700 border-orange-200",
    label: "Orange",
  },
  {
    id: "gray",
    value: "bg-gray-100 text-gray-700 border-gray-200",
    label: "Gray",
  },
  {
    id: "indigo",
    value: "bg-indigo-100 text-indigo-700 border-indigo-200",
    label: "Indigo",
  },
  {
    id: "teal",
    value: "bg-teal-100 text-teal-700 border-teal-200",
    label: "Teal",
  },
  {
    id: "cyan",
    value: "bg-cyan-100 text-cyan-700 border-cyan-200",
    label: "Cyan",
  },
  {
    id: "lime",
    value: "bg-lime-100 text-lime-700 border-lime-200",
    label: "Lime",
  },
  {
    id: "amber",
    value: "bg-amber-100 text-amber-700 border-amber-200",
    label: "Amber",
  },
  {
    id: "emerald",
    value: "bg-emerald-100 text-emerald-700 border-emerald-200",
    label: "Emerald",
  },
  {
    id: "sky",
    value: "bg-sky-100 text-sky-700 border-sky-200",
    label: "Sky",
  },
];

const VERIFICATION_GROUPS = {
  PAYMENT: {
    label: "Payment Verifications",
    types: [
      {
        value: VerificationTypeEnum.enum.PAYMENT_PROOF,
        description: "Payment screenshot/photo from customer",
      },
      {
        value: VerificationTypeEnum.enum.PAYMENT_CONFIRMATION,
        description: "Seller confirms payment received",
      },
      {
        value: VerificationTypeEnum.enum.PAYMENT_AMOUNT_MATCH,
        description: "Verify payment matches invoice amount",
      },
      {
        value: VerificationTypeEnum.enum.REMAINING_BALANCE,
        description: "Balance payment verification",
      },
      {
        value: VerificationTypeEnum.enum.SHIPPING_FEE_PAYMENT,
        description: "Payment for shipping fees",
      },
      {
        value: VerificationTypeEnum.enum.ADDITIONAL_FEE_PAYMENT,
        description: "Additional fees payment verification",
      },
    ],
  },
  SHIPPING: {
    label: "Shipping & Tracking",
    types: [
      {
        value: VerificationTypeEnum.enum.KR_TRACKING_NUMBER,
        description: "Korean tracking number",
      },
      {
        value: VerificationTypeEnum.enum.JP_TRACKING_NUMBER,
        description: "Japan tracking number",
      },
      {
        value: VerificationTypeEnum.enum.CN_TRACKING_NUMBER,
        description: "China tracking number",
      },
      {
        value: VerificationTypeEnum.enum.PH_TRACKING_NUMBER,
        description: "Philippines tracking number",
      },
      {
        value: VerificationTypeEnum.enum.SHIPPING_SCREENSHOT,
        description: "Screenshot of shipping status",
      },
      {
        value: VerificationTypeEnum.enum.SHIPPING_LABEL,
        description: "Shipping label verification",
      },
    ],
  },
  ITEM_STATUS: {
    label: "Item Status",
    types: [
      {
        value: VerificationTypeEnum.enum.STOCK_CONFIRMATION,
        description: "Verify item stock status",
      },
      {
        value: VerificationTypeEnum.enum.PO_CONFIRMATION,
        description: "Pre-order confirmation",
      },
      {
        value: VerificationTypeEnum.enum.ARRIVAL_PROOF,
        description: "Item arrival verification",
      },
      {
        value: VerificationTypeEnum.enum.ITEM_INSPECTION,
        description: "Item condition check",
      },
      {
        value: VerificationTypeEnum.enum.PACKAGE_PROOF,
        description: "Package preparation proof",
      },
    ],
  },
  DELIVERY: {
    label: "Delivery Verifications",
    types: [
      {
        value: VerificationTypeEnum.enum.PICKUP_CONFIRMATION,
        description: "Pickup arrangement confirmation",
      },
      {
        value: VerificationTypeEnum.enum.DELIVERY_CONFIRMATION,
        description: "Successful delivery verification",
      },
      {
        value: VerificationTypeEnum.enum.HANDCARRY_DETAILS,
        description: "Hand-carry arrangement details",
      },
    ],
  },
  CUSTOMER: {
    label: "Customer Communications",
    types: [
      {
        value: VerificationTypeEnum.enum.CUSTOMER_CONFIRMATION,
        description: "Customer confirmation on details",
      },
      {
        value: VerificationTypeEnum.enum.SHIPPING_PREFERENCES,
        description: "Customer shipping preferences",
      },
      {
        value: VerificationTypeEnum.enum.CANCELLATION_REQUEST,
        description: "Order cancellation request",
      },
    ],
  },
  ADMIN: {
    label: "Administrative",
    types: [
      {
        value: VerificationTypeEnum.enum.REFUND_PROOF,
        description: "Proof of refund processed",
      },
      {
        value: VerificationTypeEnum.enum.BATCH_CONFIRMATION,
        description: "Batch shipping confirmation",
      },
      {
        value: VerificationTypeEnum.enum.MANUAL_OVERRIDE,
        description: "Administrative override",
      },
    ],
  },
};

const DEFAULT_STATUS_FLOW = {
  name: "K-pop Shop Status Flow",
  description: "Standard order processing flow for K-pop merchandise",
  isDefault: true,
  isActive: true,
  statuses: [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "New Order",
      color: "red",
      description: "New order received, awaiting payment details",
      order: 1,
      verifications: [
        { type: "STOCK_CONFIRMATION", required: true },
        { type: "CUSTOMER_CONFIRMATION", required: true },
      ],
      allowedTransitions: ["661f9511-8b77-45f4-9c52-73dd31112222", "cc7f1239-4567-4ff4-4i91-34ghi9012345"],
      isTerminal: false,
    },
    {
      id: "661f9511-8b77-45f4-9c52-73dd31112222",
      name: "Payment Details Sent",
      color: "amber",
      description: "Payment details sent to customer",
      order: 2,
      verifications: [
        { type: "PAYMENT_AMOUNT_MATCH", required: true },
        { type: "SHIPPING_PREFERENCES", required: true },
      ],
      allowedTransitions: ["8a97a6b1-b3d5-4c5d-9127-0e3a88888888", "cc7f1239-4567-4ff4-4i91-34ghi9012345"],
      isTerminal: false,
    },
    {
      id: "8a97a6b1-b3d5-4c5d-9127-0e3a88888888",
      name: "Pending Payment",
      color: "blue",
      description: "Awaiting payment confirmation",
      order: 3,
      verifications: [
        { type: "PAYMENT_PROOF", required: true },
        { type: "PAYMENT_CONFIRMATION", required: true },
      ],
      allowedTransitions: ["30f40382-9f55-4687-b8c5-2b6d1c444444", "cc7f1239-4567-4ff4-4i91-34ghi9012345"],
      isTerminal: false,
    },
    {
      id: "30f40382-9f55-4687-b8c5-2b6d1c444444",
      name: "Processing",
      color: "cyan",
      description: "Order processing with supplier",
      order: 4,
      verifications: [
        { type: "PO_CONFIRMATION", required: true },
        { type: "BATCH_CONFIRMATION", required: false },
      ],
      allowedTransitions: [
        "772a5684-1234-4aa9-9d56-89abc1234567",
        "883b6795-5678-4bb0-0e67-90bcd5678901",
        "994c7806-9012-4cc1-1f78-01cde6789012",
        "cc7f1239-4567-4ff4-4i91-34ghi9012345",
      ],
      isTerminal: false,
    },
    {
      id: "772a5684-1234-4aa9-9d56-89abc1234567",
      name: "Arrived at KR Address",
      color: "purple",
      description: "Item received at Korean address",
      order: 5,
      verifications: [
        { type: "KR_TRACKING_NUMBER", required: true },
        { type: "ARRIVAL_PROOF", required: true },
        { type: "ITEM_INSPECTION", required: true },
      ],
      allowedTransitions: ["aa5d8917-3456-4dd2-2g89-12def7890123", "cc7f1239-4567-4ff4-4i91-34ghi9012345"],
      isTerminal: false,
    },
    {
      id: "883b6795-5678-4bb0-0e67-90bcd5678901",
      name: "Arrived at JP Address",
      color: "purple",
      description: "Item received at Japan address",
      order: 5,
      verifications: [
        { type: "JP_TRACKING_NUMBER", required: true },
        { type: "ARRIVAL_PROOF", required: true },
        { type: "ITEM_INSPECTION", required: true },
      ],
      allowedTransitions: ["aa5d8917-3456-4dd2-2g89-12def7890123", "cc7f1239-4567-4ff4-4i91-34ghi9012345"],
      isTerminal: false,
    },
    {
      id: "994c7806-9012-4cc1-1f78-01cde6789012",
      name: "Arrived at CN Address",
      color: "purple",
      description: "Item received at China address",
      order: 5,
      verifications: [
        { type: "CN_TRACKING_NUMBER", required: true },
        { type: "ARRIVAL_PROOF", required: true },
        { type: "ITEM_INSPECTION", required: true },
      ],
      allowedTransitions: ["aa5d8917-3456-4dd2-2g89-12def7890123", "cc7f1239-4567-4ff4-4i91-34ghi9012345"],
      isTerminal: false,
    },
    {
      id: "aa5d8917-3456-4dd2-2g89-12def7890123",
      name: "Pending Shipping Fees",
      color: "indigo",
      description: "Awaiting shipping fee payment",
      order: 6,
      verifications: [
        { type: "SHIPPING_FEE_PAYMENT", required: true },
        { type: "ADDITIONAL_FEE_PAYMENT", required: false },
        { type: "REMAINING_BALANCE", required: false },
      ],
      allowedTransitions: ["bb6e9028-7890-4ee3-3h90-23efg8901234", "cc7f1239-4567-4ff4-4i91-34ghi9012345"],
      isTerminal: false,
    },
    {
      id: "bb6e9028-7890-4ee3-3h90-23efg8901234",
      name: "Shipping to PH",
      color: "orange",
      description: "Package in transit to Philippines",
      order: 7,
      verifications: [
        { type: "SHIPPING_LABEL", required: true },
        { type: "PACKAGE_PROOF", required: true },
        { type: "SHIPPING_SCREENSHOT", required: true },
      ],
      allowedTransitions: ["dd8g3450-0123-4ff5-5j02-45hij0123456", "cc7f1239-4567-4ff4-4i91-34ghi9012345"],
      isTerminal: false,
    },
    {
      id: "dd8g3450-0123-4ff5-5j02-45hij0123456",
      name: "For Pickup/Delivery",
      color: "sky",
      description: "Ready for pickup or out for delivery",
      order: 8,
      verifications: [
        { type: "PH_TRACKING_NUMBER", required: true },
        { type: "PICKUP_CONFIRMATION", required: false },
        { type: "HANDCARRY_DETAILS", required: false },
      ],
      allowedTransitions: ["f5b1d4e8-89e7-4b96-9845-ff1237777777", "cc7f1239-4567-4ff4-4i91-34ghi9012345"],
      isTerminal: false,
    },
    {
      id: "f5b1d4e8-89e7-4b96-9845-ff1237777777",
      name: "Completed",
      color: "green",
      description: "Order successfully delivered",
      order: 9,
      verifications: [{ type: "DELIVERY_CONFIRMATION", required: true }],
      allowedTransitions: [],
      isTerminal: true,
    },
    {
      id: "cc7f1239-4567-4ff4-4i91-34ghi9012345",
      name: "Cancelled",
      color: "gray",
      description: "Order has been cancelled",
      order: 99,
      verifications: [
        { type: "CANCELLATION_REQUEST", required: true },
        { type: "REFUND_PROOF", required: false },
      ],
      allowedTransitions: [],
      isTerminal: true,
    },
  ],
  initialStatus: "550e8400-e29b-41d4-a716-446655440000",
};

// 5. Final Export: STATUS_FLOW
export const STATUS_FLOW = {
  COLORS,
  VERIFICATION_GROUPS,
  DEFAULT_STATUS_FLOW,
} as const;
