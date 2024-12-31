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
  Truck,
  Receipt,
  Users,
  Wallet,
  Calendar,
  LucideIcon,
  Medal,
  ThumbsUp,
  MessageCircle,
  Star,
} from "lucide-react";

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
];

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
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        {/* Seller Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Powerful Tools for Sellers</h2>
          <p className="text-muted-foreground">Everything you need to manage your K-pop shop efficiently</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {sellerFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Buyer Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Easy Tracking for Buyers</h2>
          <p className="text-muted-foreground">Keep track of all your K-pop purchases in one place</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {buyerFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: LucideIcon; title: string; description: string; color: string }) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <Icon className={`w-12 h-12 ${color} mb-4`} />
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
