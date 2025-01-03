import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/constant";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ListChecks,
  Package,
  MessageSquare,
  BarChart,
  Clock,
  ShoppingBag,
  Bell,
  FileText,
  ArrowRight,
  Check,
  X,
  BadgeCheck,
  Medal,
  ThumbsUp,
  type LucideIcon,
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
    <section className="relative overflow-hidden bg-secondary/5 pb-20 pt-10 px-4">
      <div className="container mx-auto">
        <motion.div initial="initial" animate="animate" variants={staggerChildren} className="relative z-10 text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-4">
              Built for K-pop Shop Sellers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Streamline Your Shop Operations
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A better way to manage your K-pop shop orders, track inventory, and handle customer order statuses. Perfect for pre-order and on-hand items.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Excel Sheets",
                benefits: [
                  "Manual status updates",
                  "Hard to track inventory",
                  "No payment proof system",
                  "Difficult order tracking",
                  "Manual customer updates",
                  "Limited accessibility",
                ],
                recommended: false,
              },
              {
                title: "Social Media DMs",
                benefits: ["Mixed conversations", "Hard to track orders", "No organized system", "Manual status sharing", "No payment tracking"],
                recommended: false,
              },
              {
                title: APP_NAME,
                benefits: [
                  "Custom status flows",
                  "Inventory management",
                  "Payment proof system",
                  "Automated status links",
                  "Easy tracking sharing",
                  "Multi-platform orders",
                ],
                recommended: true,
              },
            ].map((card, index) => (
              <ComparisonCard key={card.title} {...card} index={index} />
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
          <Button size="lg" className="group" asChild>
            <Link to="/sign-up" className="flex items-center gap-2">
              Start Managing Your Shop
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="group">
            View Features
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

HeroSection.displayName = "HeroSection";

const ComparisonCard = ({ title, benefits, recommended, index }: { title: string; benefits: string[]; recommended: boolean; index: number }) => {
  return (
    <motion.div variants={fadeInUp} transition={{ delay: index * 0.1 }}>
      <Card className={cn("relative transition-all duration-300 hover:shadow-lg", recommended && "border-primary shadow-lg")}>
        {recommended && <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">Recommended</Badge>}
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {benefits.map((benefit, i) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-center gap-2 text-sm"
              >
                {recommended ? <Check className="w-4 h-4 text-primary" /> : <X className="w-4 h-4 text-muted-foreground" />}
                {benefit}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

ComparisonCard.displayName = "ComparisonCard";

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
      <Card className="h-full hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
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
      <div className="p-2 rounded-md bg-primary/10 transition-colors group-hover:bg-primary/20">
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
