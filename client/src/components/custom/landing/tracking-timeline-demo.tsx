import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight } from "lucide-react";
import { Timeline, TimelineItem, TimelineOrderItem } from "@/components/custom/timeline";
import { ORDER_DETAILS, ORDER_ITEMS, TIMELINE_EVENTS } from "@/constant";

interface OrderDetail {
  label: string;
  value: string;
}

interface OrderItem {
  image?: string;
  name: string;
  variant: string;
  quantity: number;
  price: string;
  benefits: string[];
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

interface GridProps {
  details: OrderDetail[];
}

interface ItemsProps {
  items: OrderItem[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

export const TrackingTimelineDemo = () => (
  <Section className="py-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-muted/50" />
    <div className="container relative mx-auto px-4">
      <Header />
      <PreviewCard />
    </div>
  </Section>
);

TrackingTimelineDemo.displayName = "TrackingTimelineDemo";

const Section = ({ children, className }: SectionProps) => <section className={`relative ${className}`}>{children}</section>;

Section.displayName = "Section";

const Header = () => (
  <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center mb-12">
    <h2 className="text-3xl font-bold mb-4">
      Track Orders with <span className="bg-gradient-text bg-clip-text text-transparent">Precision</span>
    </h2>
    <p className="text-muted-foreground">Real-time tracking, automated updates, and a beautiful interface for you and your customers</p>
  </motion.div>
);

Header.displayName = "Header";

const PreviewCard = () => (
  <motion.div className="max-w-3xl mx-auto" initial="initial" animate="animate" variants={containerVariants}>
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-card opacity-50" />
      <CardContent className="relative p-6">
        <SearchBar />
        <PreviewContent />
      </CardContent>
    </Card>
  </motion.div>
);

PreviewCard.displayName = "PreviewCard";

const SearchBar = () => (
  <motion.div variants={fadeInUp} className="flex gap-2">
    <Input placeholder="Example: #12345" className="h-12 backdrop-blur-sm" disabled />
    <Button className="h-12 px-6 bg-gradient-primary hover:opacity-90 transition-opacity" disabled>
      <Search className="w-4 h-4 mr-2" />
      Track Order
    </Button>
  </motion.div>
);

SearchBar.displayName = "SearchBar";

const PreviewContent = () => (
  <motion.div variants={fadeInUp} className="mt-6">
    <Card className="backdrop-blur-md">
      <CardContent className="p-6">
        <Badge className="absolute -top-3 left-4 bg-gradient-success/10 text-primary" variant="outline">
          Live Preview
        </Badge>
        <OrderHeader />
        <StatusBadges />
        <OrderDetailsGrid details={ORDER_DETAILS} />
        <OrderItems items={ORDER_ITEMS} />
        <TimelineSection />
        <ShareButton />
      </CardContent>
    </Card>
  </motion.div>
);

PreviewContent.displayName = "PreviewContent";

const OrderHeader = () => (
  <div className="flex justify-between items-start mb-6">
    <div>
      <h4 className="text-lg font-medium bg-gradient-text bg-clip-text text-transparent">Order #12345</h4>
      <p className="text-sm text-muted-foreground">K-pop Corner Shop</p>
    </div>
    <Badge className="bg-gradient-success/20 text-primary border-0">Processing</Badge>
  </div>
);

OrderHeader.displayName = "OrderHeader";

const StatusBadges = () => (
  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
    {["Payment Verified", "Stock Reserved", "Processing"].map((status, i) => (
      <Badge key={i} variant="outline" className="bg-gradient-success/10 border-0 whitespace-nowrap">
        <Clock className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    ))}
  </div>
);

StatusBadges.displayName = "StatusBadges";

const OrderDetailsGrid = ({ details }: GridProps) => (
  <div className="mb-6 p-4 rounded-lg bg-gradient-muted/10 backdrop-blur-sm">
    <div className="grid grid-cols-2 gap-4">
      {details.map(({ label, value }) => (
        <div key={label}>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-medium">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

OrderDetailsGrid.displayName = "OrderDetailsGrid";

const OrderItems = ({ items }: ItemsProps) => (
  <div className="mb-6">
    <h5 className="font-medium mb-3 bg-gradient-text bg-clip-text text-transparent">Order Items</h5>
    <div className="space-y-3">
      {items.map((item, index) => (
        <TimelineOrderItem key={index} {...item} index={index} />
      ))}
    </div>
  </div>
);

OrderItems.displayName = "OrderItems";

const TimelineSection = () => (
  <motion.div variants={fadeInUp} className="bg-gradient-muted/20 rounded-lg p-6 border backdrop-blur-sm">
    <Timeline>
      {TIMELINE_EVENTS.map((event, index) => (
        <TimelineItem key={index} {...event} index={index} />
      ))}
    </Timeline>
  </motion.div>
);

TimelineSection.displayName = "TimelineSection";

const ShareButton = () => (
  <motion.div variants={fadeInUp} className="mt-6 flex justify-end">
    <Button className="bg-gradient-primary hover:opacity-90 transition-opacity group">
      Share Tracking Link
      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
    </Button>
  </motion.div>
);

ShareButton.displayName = "ShareButton";
