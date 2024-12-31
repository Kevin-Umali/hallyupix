// // components/landing/search-demo.tsx
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Search, SlidersHorizontal, Heart } from "lucide-react";

// export const SearchDemo = () => {
//   return (
//     <section className="py-20">
//       <div className="container mx-auto px-4">
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
//           <Card>
//             <CardContent className="p-6 space-y-4">
//               {/* Search Bar */}
//               <div className="flex gap-2">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input placeholder="Search photocards, albums, or benefits..." className="pl-10 h-11" />
//                 </div>
//                 <Button variant="outline" size="icon" className="h-11 w-11">
//                   <SlidersHorizontal className="h-4 w-4" />
//                 </Button>
//               </div>

//               {/* Quick Filters */}
//               <div className="flex flex-wrap gap-2">
//                 <Badge variant="secondary" className="cursor-pointer">
//                   NewJeans
//                 </Badge>
//                 <Badge variant="secondary" className="cursor-pointer">
//                   TWICE
//                 </Badge>
//                 <Badge variant="secondary" className="cursor-pointer">
//                   LE SSERAFIM
//                 </Badge>
//                 <Badge variant="secondary" className="cursor-pointer">
//                   Pre-order Benefits
//                 </Badge>
//                 <Badge variant="secondary" className="cursor-pointer">
//                   Album PCs
//                 </Badge>
//               </div>

//               {/* Search Results Preview */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
//                 <SearchResult image="/demo/pc1.jpg" title="NewJeans Ditto PC" member="Hanni" price="$15.00" />
//                 <SearchResult image="/demo/pc2.jpg" title="TWICE Ready To Be POB" member="Mina" price="$25.00" />
//                 <SearchResult image="/demo/pc3.jpg" title="LE SSERAFIM Unforgiven" member="Kazuha" price="$20.00" />
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// const SearchResult = ({ image, title, member, price }: { image: string; title: string; member: string; price: string }) => {
//   return (
//     <Card className="group overflow-hidden">
//       <CardContent className="p-0">
//         <div className="relative">
//           <img src={image} alt={title} className="w-full aspect-square object-cover" />
//           <Button
//             size="icon"
//             variant="ghost"
//             className="absolute top-2 right-2 h-8 w-8 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
//           >
//             <Heart className="h-4 w-4" />
//           </Button>
//         </div>
//         <div className="p-3">
//           <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
//           <p className="text-xs text-muted-foreground">{member}</p>
//           <p className="text-sm font-semibold mt-1">{price}</p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
