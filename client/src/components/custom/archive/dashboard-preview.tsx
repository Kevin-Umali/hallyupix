// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { motion } from "framer-motion";

// // components/custom/landing/dashboard-preview.tsx
// export const DashboardPreview = () => {
//   return (
//     <section className="py-20 bg-secondary/5">
//       <div className="container mx-auto px-4">
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
//           <h2 className="text-3xl font-bold mb-4">Powerful Dashboards</h2>
//           <p className="text-muted-foreground">Everything you need, all in one place</p>
//         </motion.div>

//         <Tabs defaultValue="seller" className="max-w-5xl mx-auto">
//           <TabsList className="grid w-full grid-cols-2 mb-8">
//             <TabsTrigger value="seller">Seller Dashboard</TabsTrigger>
//             <TabsTrigger value="buyer">Buyer Dashboard</TabsTrigger>
//           </TabsList>

//           <TabsContent value="seller">
//             <div className="grid md:grid-cols-3 gap-6">
//               {/* Quick Stats */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Today's Overview</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">New Orders</span>
//                       <span className="font-bold">12</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Total Sales</span>
//                       <span className="font-bold">₱15,750</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Pending</span>
//                       <span className="font-bold">25</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Recent Orders */}
//               <Card className="col-span-2">
//                 <CardHeader>
//                   <CardTitle>Recent Orders</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">{/* Order items */}</div>
//                 </CardContent>
//               </Card>

//               {/* Inventory Alerts */}
//               <Card className="col-span-3">
//                 <CardHeader>
//                   <CardTitle>Inventory Alerts</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <Alert>
//                       <AlertTitle>Low Stock Alert</AlertTitle>
//                       <AlertDescription>"NewJeans OMG Album" is running low (5 left)</AlertDescription>
//                     </Alert>
//                     <Alert>
//                       <AlertTitle>Pre-order Reminder</AlertTitle>
//                       <AlertDescription>TWICE World Tour Merch pre-order ends in 2 days</AlertDescription>
//                     </Alert>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="buyer">
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Active Orders */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Active Orders</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">{/* Order items */}</div>
//                 </CardContent>
//               </Card>

//               {/* Order History */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Order History</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">{/* Order history items */}</div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </section>
//   );
// };
