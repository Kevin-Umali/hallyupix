// components/landing/product-showcase.tsx
import { motion } from "framer-motion";
import { ProductCard } from "@/components/custom/product-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type FilterType = "all" | "pre-order" | "on-hand" | "sale" | "new";

const products = [
  {
    image: "/products/unis-album.jpg",
    title: "UNIS 'Universe Ticket' Debut Album",
    price: "₱1,499.00",
    seller: "K-Pop Universe Store",
    isVerified: true,
    status: "Pre-order" as const,
    salePercentage: 10,
    isNewArrival: true,
  },
  {
    image: "/products/exo-pc.jpg",
    title: "EXO Kai 'Rover' Official Photocard",
    price: "₱800.00",
    seller: "EXO-L Trading Hub",
    isVerified: true,
    status: "On-hand" as const,
  },
  {
    image: "/products/bini-lightstick.jpg",
    title: "BINI Official Lightstick Ver. 2",
    price: "₱2,000.00",
    seller: "P-Pop Corner",
    isVerified: true,
    status: "Pre-order" as const,
    salePercentage: 15,
    isNewArrival: true,
  },
  {
    image: "/products/unis-poster.jpg",
    title: "UNIS Limited Edition Group Poster",
    price: "₱600.00",
    seller: "K-Pop Universe Store",
    isVerified: true,
    status: "On-hand" as const,
  },
  {
    image: "/products/exo-album.jpg",
    title: "EXO 'Exist' Special Album",
    price: "₱2,500.00",
    originalPrice: "₱2,800.00",
    seller: "EXO-L Trading Hub",
    isVerified: true,
    status: "On-hand" as const,
    salePercentage: 10,
  },
  {
    image: "/products/bini-pc.jpg",
    title: "BINI 'Feel Good' Photocard Set",
    price: "₱950.00",
    seller: "P-Pop Corner",
    isVerified: false,
    status: "Reserved" as const,
  },
  {
    image: "/products/unis-lightstick.jpg",
    title: "UNIS Official Lightstick",
    price: "₱1,800.00",
    originalPrice: "₱2,000.00",
    seller: "K-Pop Universe Store",
    isVerified: true,
    status: "Pre-order" as const,
    salePercentage: 10,
    isNewArrival: true,
  },
  {
    image: "/products/exo-lanyard.jpg",
    title: "EXO Official Concert Lanyard",
    price: "₱500.00",
    seller: "EXO-L Trading Hub",
    isVerified: true,
    status: "On-hand" as const,
  },
  {
    image: "/products/bini-album.jpg",
    title: "BINI 'Born to Win' Album",
    price: "₱1,250.00",
    originalPrice: "₱1,400.00",
    seller: "P-Pop Corner",
    isVerified: true,
    status: "Pre-order" as const,
    salePercentage: 15,
  },
];

export const FeaturedListing = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProducts = products.filter((product) => {
    switch (activeFilter) {
      case "pre-order":
        return product.status === "Pre-order";
      case "on-hand":
        return product.status === "On-hand";
      case "sale":
        return product.salePercentage && product.salePercentage > 0;
      case "new":
        return product.isNewArrival;
      default:
        return true;
    }
  });

  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Listings</h2>
          <p className="text-muted-foreground">Browse through our curated collection of K-pop merchandise</p>
        </motion.div>

        {/* Filter Options */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button variant={activeFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setActiveFilter("all")} className="min-w-[100px]">
            All Items
          </Button>
          <Button
            variant={activeFilter === "pre-order" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("pre-order")}
            className="min-w-[100px]"
          >
            Pre-orders
          </Button>
          <Button variant={activeFilter === "on-hand" ? "default" : "outline"} size="sm" onClick={() => setActiveFilter("on-hand")} className="min-w-[100px]">
            On-hand
          </Button>
          <Button variant={activeFilter === "sale" ? "default" : "outline"} size="sm" onClick={() => setActiveFilter("sale")} className="min-w-[100px]">
            Sale Items
          </Button>
          <Button variant={activeFilter === "new" ? "default" : "outline"} size="sm" onClick={() => setActiveFilter("new")} className="min-w-[100px]">
            New Arrivals
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="h-full">
                <ProductCard {...product} index={index} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">No items found for the selected filter.</div>
          )}
        </div>
      </div>
    </section>
  );
};
