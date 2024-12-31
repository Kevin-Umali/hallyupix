import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Store, BadgeCheck, ImageIcon, Clock, Package, ShoppingBag, XCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type ProductStatus = "Pre-order" | "On-hand" | "Reserved" | "Sold Out";

interface ProductCardProps {
  image?: string;
  title: string;
  price: string;
  originalPrice?: string;
  seller: string;
  isVerified: boolean;
  status: ProductStatus;
  salePercentage?: number;
  isNewArrival?: boolean;
  index?: number;
  onWishlistClick?: () => void;
  onViewDetails?: () => void;
}

const statusConfig = {
  "Pre-order": {
    color: "bg-blue-500",
    icon: ShoppingBag,
  },
  "On-hand": {
    color: "bg-green-500",
    icon: Package,
  },
  Reserved: {
    color: "bg-yellow-500",
    icon: Clock,
  },
  "Sold Out": {
    color: "bg-red-500",
    icon: XCircle,
  },
} as const;

export const ProductCard = ({
  image,
  title,
  price,
  originalPrice,
  seller,
  isVerified,
  status,
  salePercentage,
  isNewArrival,
  index = 0,
  onWishlistClick,
  onViewDetails,
}: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const StatusIcon = statusConfig[status].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      <Card className={cn("group overflow-hidden h-full transition-shadow duration-200", isHovered && "shadow-lg")}>
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-secondary">
            {/* Status Badge */}
            <div className="absolute left-3 top-3 z-20">
              <Badge className={cn("px-2 py-1 flex items-center gap-1", statusConfig[status].color, "text-white")}>
                <StatusIcon className="w-3 h-3" />
                {status}
              </Badge>
            </div>

            {/* Sale Badge */}
            {salePercentage && (
              <div className="absolute right-3 top-3 z-20">
                <Badge variant="destructive" className="px-2 py-1">
                  -{salePercentage}%
                </Badge>
              </div>
            )}

            {/* New Badge */}
            {isNewArrival && (
              <motion.div className="absolute left-3 top-12 z-20" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <Badge className="bg-violet-500 text-white">New</Badge>
              </motion.div>
            )}

            {/* Product Image */}
            <motion.div className="w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              {!imageError && image ? (
                <img
                  src={image}
                  alt={title}
                  className={cn("w-full h-full object-cover", status === "Sold Out" && "opacity-75 grayscale")}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                    <span className="text-sm">No image</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Wishlist Button */}
            <motion.div
              className="absolute top-3 right-3 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button size="icon" variant="secondary" className="h-8 w-8" disabled={status === "Sold Out"} onClick={onWishlistClick}>
                <Heart className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col gap-3">
            {/* Title and Seller */}
            <div>
              <h3 className="font-medium line-clamp-2 text-sm mb-1">{title}</h3>
              <div className="flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground truncate">{seller}</span>
                {isVerified && <BadgeCheck className="w-3.5 h-3.5 text-primary" />}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className={cn("font-semibold", salePercentage && "text-rose-500")}>{price}</span>
              {originalPrice && <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
