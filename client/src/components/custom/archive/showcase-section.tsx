// // components/landing/showcase-section.tsx
// import { motion } from "framer-motion";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { OrderItem } from "@/components/custom/order/order-item";

// export const ShowcaseSection = () => {
//   return (
//     <section className="py-20">
//       <div className="container mx-auto px-4">
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
//           <h2 className="text-3xl font-bold mb-4">Powerful Shop Management</h2>
//           <p className="text-muted-foreground">Everything you need to run your K-pop shop efficiently</p>
//         </motion.div>

//         <Tabs defaultValue="orders" className="max-w-5xl mx-auto">
//           <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4">
//             <TabsTrigger value="orders">Order Management</TabsTrigger>
//             <TabsTrigger value="inventory">Inventory</TabsTrigger>
//             <TabsTrigger value="payments">Payments</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>

//           <TabsContent value="orders" className="mt-6">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-4 gap-4">
//                     <div className="col-span-1 space-y-1">
//                       <div className="text-sm font-medium text-muted-foreground">New Orders</div>
//                       <div className="text-2xl font-bold text-primary">12</div>
//                     </div>
//                     <div className="col-span-1 space-y-1">
//                       <div className="text-sm font-medium text-muted-foreground">Processing</div>
//                       <div className="text-2xl font-bold">25</div>
//                     </div>
//                     <div className="col-span-1 space-y-1">
//                       <div className="text-sm font-medium text-muted-foreground">Shipped</div>
//                       <div className="text-2xl font-bold">18</div>
//                     </div>
//                     <div className="col-span-1 space-y-1">
//                       <div className="text-sm font-medium text-muted-foreground">Completed</div>
//                       <div className="text-2xl font-bold">156</div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <OrderItem
//                       customer="Maria Santos"
//                       items={["TWICE Ready To Be Album", "Chaeyoung PC"]}
//                       status="Processing"
//                       date="2024-02-20"
//                       total="₱1,500"
//                     />
//                     <OrderItem customer="John Dela Cruz" items={["NewJeans OMG Photobook"]} status="Shipped" date="2024-02-19" total="₱2,000" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Similar structure for other tabs */}
//         </Tabs>
//       </div>
//     </section>
//   );
// };
