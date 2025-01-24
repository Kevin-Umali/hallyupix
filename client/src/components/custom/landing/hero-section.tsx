import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/constant";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Package,
  MessageSquare,
  Clock,
  ShoppingBag,
  Bell,
  ArrowRight,
  Check,
  X,
  type LucideIcon,
  BadgeCheck,
  BarChart,
  FileText,
  ListChecks,
  Medal,
  ThumbsUp,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background pb-20 pt-10 px-4">
      <div className="absolute inset-0 bg-gradient-primary/10" />
      <div className="container relative mx-auto">
        <motion.div initial="initial" animate="animate" variants={staggerChildren} className="relative z-10 text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 bg-gradient-primary hover:opacity-90">Exclusive Platform for K-pop Shop Sellers</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Ultimate K-pop Shop
              <span className="bg-gradient-text bg-clip-text text-transparent block mt-2">Management Solution</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto">
              Handle pre-orders, manage inventory, and streamline your order process with our specialized platform built for K-pop merchandise sellers.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Traditional Methods",
                features: ["Manual spreadsheets", "DM conversations", "Scattered information", "No payment tracking", "Manual status updates"],
                recommended: false,
                icon: X,
              },
              {
                title: APP_NAME,
                features: [
                  "Custom status flows",
                  "Payment verification",
                  "Inventory tracking",
                  "Pre-order system",
                  "Buyer tracking portal",
                  "Multi-platform support",
                ],
                recommended: true,
                icon: Check,
              },
              {
                title: "Regular Platforms",
                features: ["Limited customization", "No K-pop focus", "Complex setup", "High fees", "Limited features"],
                recommended: false,
                icon: X,
              },
            ].map((plan, index) => (
              <PlanCard key={plan.title} {...plan} index={index} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" variants={staggerChildren} initial="initial" animate="animate">
          <FeatureCard
            title="Order Management"
            description="Everything you need to manage your shop"
            features={[
              { icon: ListChecks, title: "Custom Status Flows", description: "Create your own order status workflow" },
              { icon: Package, title: "Inventory System", description: "Track pre-orders and on-hand items" },
              { icon: FileText, title: "Payment Proofs", description: "Easy payment verification system" },
              { icon: MessageSquare, title: "Status Links", description: "Share tracking links with buyers" },
              { icon: BarChart, title: "Order Analytics", description: "Track your shop's performance" },
              { icon: BadgeCheck, title: "Multi-Platform", description: "Manage orders from different platforms" },
            ]}
          />

          <FeatureCard
            title="Customer Management"
            description="Streamline buyer interactions"
            features={[
              { icon: Clock, title: "Status Updates", description: "Share real-time order progress" },
              { icon: Bell, title: "Custom Statuses", description: "Create your own status workflow" },
              { icon: ShoppingBag, title: "Order Tracking", description: "Easy-to-share tracking links" },
              { icon: FileText, title: "Payment System", description: "Verify payment proofs easily" },
              { icon: ThumbsUp, title: "Easy Sharing", description: "Share order updates via link" },
              { icon: Medal, title: "Platform Support", description: "Handle orders from any platform" },
            ]}
          />
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity group" asChild>
            <Link to="/sign-up" className="flex items-center gap-2">
              Start Managing Your Shop
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary hover:bg-primary/5">
            View Features
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

HeroSection.displayName = "HeroSection";

const PlanCard = ({
  title,
  features,
  recommended,
  icon: Icon,
  index,
}: {
  title: string;
  features: string[];
  recommended: boolean;
  icon: LucideIcon;
  index: number;
}) => {
  return (
    <motion.div variants={fadeInUp} transition={{ delay: index * 0.1 }}>
      <Card className={cn("relative transition-all duration-300 backdrop-blur-sm", recommended && " border-secondary shadow-lg")}>
        {recommended && <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-primary">Recommended</Badge>}
        <CardHeader>
          <CardTitle className={cn("text-xl", recommended && "text-primary")}>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-center gap-2 text-sm"
              >
                <Icon className={cn("w-4 h-4", recommended ? "text-primary" : "text-muted-foreground")} />
                {feature}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

PlanCard.displayName = "PlanCard";

const FeatureCard = ({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;
}) => {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-gradient-primary">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={fadeInUp} transition={{ delay: index * 0.1 }}>
              <FeatureItem {...feature} />
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

FeatureCard.displayName = "FeatureCard";

const FeatureItem = ({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) => {
  return (
    <div className="flex items-start gap-3 group">
      <div className="p-2 rounded-md bg-gradient-primary/10 transition-colors group-hover:bg-gradient-primary/20">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

FeatureItem.displayName = "FeatureItem";
