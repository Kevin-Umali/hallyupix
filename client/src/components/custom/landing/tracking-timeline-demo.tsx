import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Timeline, TimelineItem, TimelineOrderItem } from "@/components/custom/timeline";
import { Badge } from "@/components/ui/badge";

export const TrackingTimelineDemo = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Order Tracking Preview</h2>
          <p className="text-muted-foreground">See how easily you can track orders with H A L L Y U P I X</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Search Demo */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-2">
                  <Input placeholder="Example: #12345" className="h-12" disabled />
                  <Button className="h-12 px-6" disabled>
                    <Search className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </motion.div>

                {/* Example Result */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="absolute -top-3 left-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">Preview Example</div>

                      {/* Order Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="text-lg font-medium">Order #12345</h4>
                          <p className="text-sm text-muted-foreground">K-pop Corner Shop</p>
                        </div>
                        <Badge className="text-sm px-3 py-1">Processing</Badge>
                      </div>

                      {/* Order Details */}
                      <div className="mb-6 space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Order Date</p>
                            <p className="font-medium">Feb 20, 2024</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Amount</p>
                            <p className="font-medium">₱2,500.00</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Payment Method</p>
                            <p className="font-medium">GCash</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Shipping Method</p>
                            <p className="font-medium">J&T Express</p>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="mb-6">
                        <h5 className="font-medium mb-3">Order Items</h5>
                        <div className="space-y-3">
                          <TimelineOrderItem
                            image="/products/album.jpg"
                            name="TWICE Ready To Be Album"
                            variant="Version A"
                            quantity={1}
                            price="₱1,500.00"
                            benefits={["Pre-order Poster", "Random PC", "ID Card"]}
                          />
                          <div className="border-separate" />
                          <TimelineOrderItem
                            image="/products/pc.jpg"
                            name="NewJeans OMG Photocard"
                            variant="Hanni Ver."
                            quantity={2}
                            price="₱500.00"
                            benefits={["PC Sleeve", "Freebies"]}
                          />
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="bg-secondary/10 rounded-lg p-6 border-t">
                        <Timeline>
                          <TimelineItem
                            title="Order Confirmed"
                            description="Payment received via GCash"
                            date="Feb 20, 2024 - 2:30 PM"
                            status="complete"
                            details={["Payment Reference: GC123456", "Amount: ₱2,500.00"]}
                          />
                          <TimelineItem
                            title="Processing Order"
                            description="Preparing your items for shipment"
                            date="Feb 21, 2024 - 10:15 AM"
                            status="current"
                            details={["Checking stock availability", "Packaging items", "Preparing shipping label"]}
                          />
                          <TimelineItem title="Shipping" description="Package will be picked up by J&T Express" date="Expected Feb 23, 2024" status="pending" />
                          <TimelineItem title="Delivery" description="Estimated delivery to your address" date="Expected Feb 24-25, 2024" status="pending" />
                        </Timeline>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
