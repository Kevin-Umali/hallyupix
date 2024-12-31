// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { motion } from "framer-motion";

// // components/landing/order-management.tsx
// export const OrderManagement = () => {
//   return (
//     <section className="py-20 bg-secondary/5">
//       <div className="container mx-auto px-4">
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
//           <h2 className="text-3xl font-bold mb-4">Track Orders Effortlessly</h2>
//           <p className="text-muted-foreground">Simple order tracking for both sellers and buyers</p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
//           {/* Seller View */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Seller View</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 border rounded-lg">
//                   <div>
//                     <div className="font-medium">Order #12345</div>
//                     <div className="text-sm text-muted-foreground">Maria Santos</div>
//                     <div className="text-sm">₱1,500 - 2 items</div>
//                   </div>
//                   <div className="space-y-2">
//                     <Badge>Processing</Badge>
//                     <Button size="sm" className="w-full">
//                       Update Status
//                     </Button>
//                   </div>
//                 </div>
//                 {/* More order items */}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Buyer View */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Buyer View</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="p-4 border rounded-lg">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <div className="font-medium">K-pop Corner Shop</div>
//                       <div className="text-sm text-muted-foreground">Order #12345</div>
//                     </div>
//                     <Badge>Processing</Badge>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="text-sm">
//                       <span className="text-muted-foreground">Items:</span> TWICE Album, Photocard
//                     </div>
//                     <div className="text-sm">
//                       <span className="text-muted-foreground">Total:</span> ₱1,500
//                     </div>
//                     <div className="text-sm">
//                       <span className="text-muted-foreground">Order Date:</span> Feb 20, 2024
//                     </div>
//                   </div>
//                 </div>
//                 {/* More order items */}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// };
