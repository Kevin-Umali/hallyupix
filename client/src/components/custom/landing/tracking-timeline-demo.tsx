import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Timeline, TimelineItem, TimelineOrderItem } from "@/components/custom/timeline";
import { Badge } from "@/components/ui/badge";
import { APP_NAME, ORDER_DETAILS, ORDER_ITEMS, TIMELINE_EVENTS } from "@/constant";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const TrackingTimelineDemo = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Order Tracking Preview</h2>
          <p className="text-muted-foreground">See how easily you can track orders with {APP_NAME} and share them with your customers</p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <motion.div variants={fadeInUp} className="flex gap-2">
                  <Input placeholder="Example: #12345" className="h-12" disabled />
                  <Button className="h-12 px-6" disabled>
                    <Search className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </motion.div>

                <motion.div variants={fadeInUp} className="relative">
                  <Card>
                    <CardContent className="p-6">
                      <div className="absolute -top-3 left-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Preview Example</div>

                      <OrderHeader />
                      <OrderDetailsGrid details={ORDER_DETAILS} />
                      <OrderItems items={ORDER_ITEMS} />

                      <motion.div variants={fadeInUp} className="bg-secondary/10 rounded-lg p-6 border-t">
                        <Timeline>
                          {TIMELINE_EVENTS.map((event, index) => (
                            <TimelineItem key={index} {...event} />
                          ))}
                        </Timeline>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

TrackingTimelineDemo.displayName = "TrackingTimelineDemo";

const OrderHeader = () => (
  <div className="flex justify-between items-start mb-6">
    <div>
      <h4 className="text-lg font-medium">Order #12345</h4>
      <p className="text-sm text-muted-foreground">K-pop Corner Shop</p>
    </div>
    <Badge className="text-sm px-3 py-1">Processing</Badge>
  </div>
);

OrderHeader.displayName = "OrderHeader";

const OrderDetailsGrid = ({ details }: { details: Array<{ label: string; value: string }> }) => (
  <div className="mb-6 space-y-4">
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
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

const OrderItems = ({ items }: { items: Array<(typeof ORDER_ITEMS)[number]> }) => (
  <div className="mb-6">
    <h5 className="font-medium mb-3">Order Items</h5>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index}>
          <TimelineOrderItem key={index} {...item} />
          {index < items.length - 1 && <div className="border-separate" />}
        </div>
      ))}
    </div>
  </div>
);

OrderItems.displayName = "OrderItems";
