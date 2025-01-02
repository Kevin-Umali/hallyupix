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
  StarIcon,
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
              Built for Philippine K-pop Community
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Simplify Your K-pop Shop Management
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A better way to manage your K-pop shop orders and help buyers track their purchases. Say goodbye to complicated spreadsheets!
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Excel Sheets",
                benefits: [
                  "Manual updates",
                  "Prone to errors",
                  "Hard to share status",
                  "No real-time updates",
                  "No inventory tracking",
                  "Limited accessibility",
                ],
                recommended: false,
              },
              {
                title: "Social Media DMs",
                benefits: ["Mixed conversations", "Hard to track orders", "Easy to miss updates", "No organization", "No review system"],
                recommended: false,
              },
              {
                title: APP_NAME,
                benefits: ["Automated tracking", "Real-time updates", "Organized orders", "Easy status sharing", "Verified reviews", "Rating system"],
                recommended: true,
              },
            ].map((card, index) => (
              <ComparisonCard key={card.title} {...card} index={index} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" variants={staggerChildren} initial="initial" animate="animate">
          <FeatureCard
            title="For Sellers"
            description="Manage your K-pop shop efficiently"
            features={[
              { icon: ListChecks, title: "Order Management", description: "Track all your orders in one place" },
              { icon: Package, title: "Inventory Tracking", description: "Manage your pre-orders and stock" },
              { icon: MessageSquare, title: "Customer Updates", description: "Send updates with one click" },
              { icon: BarChart, title: "Sales Analytics", description: "Track your shop's performance" },
              { icon: StarIcon, title: "Shop Reviews", description: "Build trust with verified buyer reviews" },
              { icon: BadgeCheck, title: "Seller Rating", description: "Showcase your reliability" },
            ]}
          />

          <FeatureCard
            title="For Buyers"
            description="Track your K-pop purchases easily"
            features={[
              { icon: Clock, title: "Real-time Updates", description: "Get instant order status updates" },
              { icon: ShoppingBag, title: "Order History", description: "View all your purchases in one place" },
              { icon: Bell, title: "Notifications", description: "Get alerts for order updates" },
              { icon: FileText, title: "Digital Receipts", description: "Access your receipts anytime" },
              { icon: ThumbsUp, title: "Product Reviews", description: "Share your experience" },
              { icon: Medal, title: "Buyer Reputation", description: "Build your profile as a reliable buyer" },
            ]}
          />
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button size="lg" className="group" asChild>
            <Link to="/sign-up" className="flex items-center gap-2">
              Start Managing Orders
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="group">
            See How It Works
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

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
