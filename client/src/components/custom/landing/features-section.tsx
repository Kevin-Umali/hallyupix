// components/landing/features-section.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag,
  Package,
  Bell,
  BarChart2,
  MessageSquare,
  FileText,
  ListChecks,
  Receipt,
  Wallet,
  Calendar,
  LucideIcon,
  Medal,
  ThumbsUp,
  MessageCircle,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sellerFeatures = [
  {
    icon: ListChecks,
    title: "Order Management",
    description: "Track orders, manage status updates, and organize customer information in one place",
    color: "text-blue-500",
  },
  {
    icon: Package,
    title: "Inventory System",
    description: "Manage your pre-orders, track stock levels, and get low stock alerts",
    color: "text-pink-500",
  },
  {
    icon: BarChart2,
    title: "Shop Analytics",
    description: "View sales trends, popular items, and customer insights",
    color: "text-purple-500",
  },
  {
    icon: MessageSquare,
    title: "Customer Updates",
    description: "Send automated updates about order status and shipping information",
    color: "text-green-500",
  },
  {
    icon: Receipt,
    title: "Payment Tracking",
    description: "Track payments, generate invoices, and manage payment statuses",
    color: "text-orange-500",
  },
  {
    icon: Calendar,
    title: "Pre-order Management",
    description: "Organize pre-order schedules and manage customer reservations",
    color: "text-yellow-500",
  },
  {
    icon: Star,
    title: "Shop Reviews",
    description: "Build trust with verified buyer reviews and showcase your shop's reputation",
    color: "text-amber-500",
  },
  {
    icon: MessageCircle,
    title: "Buyer Feedback",
    description: "Manage and respond to buyer reviews to improve your service",
    color: "text-indigo-500",
  },
] as const;

const buyerFeatures = [
  {
    icon: ShoppingBag,
    title: "Order Tracking",
    description: "Track all your orders from different shops in one dashboard",
    color: "text-indigo-500",
  },
  {
    icon: Bell,
    title: "Status Notifications",
    description: "Get real-time updates about your order status and shipping",
    color: "text-teal-500",
  },
  {
    icon: FileText,
    title: "Order History",
    description: "Access your complete purchase history and digital receipts",
    color: "text-cyan-500",
  },
  {
    icon: Wallet,
    title: "Payment Records",
    description: "Keep track of your payments and pending balances",
    color: "text-red-500",
  },
  {
    icon: ThumbsUp,
    title: "Product Reviews",
    description: "Share your experience and help other buyers make informed decisions",
    color: "text-emerald-500",
  },
  {
    icon: Medal,
    title: "Seller Ratings",
    description: "View verified seller ratings and shop reviews before purchasing",
    color: "text-purple-500",
  },
] as const;

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <FeatureGroup
          title="Powerful Tools for Sellers"
          description="Everything you need to manage your K-pop shop efficiently"
          features={sellerFeatures}
          columns="lg:grid-cols-4"
        />

        <div className="my-20 border-t" />

        <FeatureGroup
          title="Easy Tracking for Buyers"
          description="Keep track of all your K-pop purchases in one place"
          features={buyerFeatures}
          columns="lg:grid-cols-3"
        />
      </div>
    </section>
  );
};

const FeatureGroup = ({
  title,
  description,
  features,
  columns,
}: {
  title: string;
  description: string;
  features: ReadonlyArray<{
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
  }>;
  columns: string;
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </motion.div>

      <div className={`grid md:grid-cols-2 ${columns} gap-6`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full group hover:shadow-lg transition-all duration-300 border-secondary/50">
        <CardContent className="p-6">
          <div className="mb-4 relative">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
              <Icon className={cn(color, "w-12 h-12 transition-transform duration-300 group-hover:scale-110")} />
            </motion.div>
            <div className={`absolute -inset-2 bg-${color}-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </div>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
