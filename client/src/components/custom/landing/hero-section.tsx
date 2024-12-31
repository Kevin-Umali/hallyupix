import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
  LucideIcon,
  StarIcon,
  BadgeCheck,
  Medal,
  ThumbsUp,
} from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-secondary/5 py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Built for Philippine K-pop Community
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Simplify Your K-pop Shop Management
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A better way to manage your K-pop shop orders and help buyers track their purchases. Say goodbye to complicated spreadsheets!
          </p>

          {/* Comparison Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <ComparisonCard
              title="Excel Sheets"
              benefits={["Manual updates", "Prone to errors", "Hard to share status", "No real-time updates", "No inventory tracking", "Limited accessibility"]}
              recommended={false}
            />
            <ComparisonCard
              title="Social Media DMs"
              benefits={["Mixed conversations", "Hard to track orders", "Easy to miss updates", "No organization", "No review system"]}
              recommended={false}
            />
            <ComparisonCard
              title="H A L L Y U P I X"
              benefits={["Automated tracking", "Real-time updates", "Organized orders", "Easy status sharing", "Verified reviews", "Rating system"]}
              recommended={true}
            />
          </div>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* For Sellers */}
          <Card>
            <CardHeader>
              <CardTitle>For Sellers</CardTitle>
              <CardDescription>Manage your K-pop shop efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FeatureItem icon={ListChecks} title="Order Management" description="Track all your orders in one place" />
              <FeatureItem icon={Package} title="Inventory Tracking" description="Manage your pre-orders and stock" />
              <FeatureItem icon={MessageSquare} title="Customer Updates" description="Send updates with one click" />
              <FeatureItem icon={BarChart} title="Sales Analytics" description="Track your shop's performance" />
              <FeatureItem icon={StarIcon} title="Shop Reviews" description="Build trust with verified buyer reviews" />
              <FeatureItem icon={BadgeCheck} title="Seller Rating" description="Showcase your reliability and service quality" />
            </CardContent>
          </Card>

          {/* For Buyers */}
          <Card>
            <CardHeader>
              <CardTitle>For Buyers</CardTitle>
              <CardDescription>Track your K-pop purchases easily</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FeatureItem icon={Clock} title="Real-time Updates" description="Get instant order status updates" />
              <FeatureItem icon={ShoppingBag} title="Order History" description="View all your purchases in one place" />
              <FeatureItem icon={Bell} title="Notifications" description="Get alerts for order updates" />
              <FeatureItem icon={FileText} title="Digital Receipts" description="Access your receipts anytime" />
              <FeatureItem icon={ThumbsUp} title="Product Reviews" description="Share your experience and help other buyers" />
              <FeatureItem icon={Medal} title="Buyer Reputation" description="Build your profile as a reliable buyer" />
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button size="lg" className="group" asChild>
            <Link to="/sign-up" className="flex items-center gap-2">
              Start Managing Orders
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            See How It Works
          </Button>
        </div>
      </div>
    </section>
  );
};

// Components used above
const ComparisonCard = ({ title, benefits, recommended }: { title: string; benefits: string[]; recommended: boolean }) => {
  return (
    <Card className={cn("relative", recommended && "border-primary shadow-lg")}>
      {recommended && <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">Recommended</Badge>}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              {recommended ? <Check className="w-4 h-4 text-primary" /> : <X className="w-4 h-4 text-muted-foreground" />}
              {benefit}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const FeatureItem = ({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-md bg-primary/10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
