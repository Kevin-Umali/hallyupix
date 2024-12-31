// components/ui/timeline.tsx
import { cn } from "@/lib/utils";
import { Check, Circle, Clock, ImageIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export const Timeline = ({ children, className }: TimelineProps) => {
  return <div className={cn("space-y-4", className)}>{children}</div>;
};

interface TimelineItemProps {
  title: string;
  description: string;
  date: string;
  status: "complete" | "current" | "pending";
  details?: string[];
  index?: number;
}

export const TimelineItem = ({ title, description, date, status, details, index = 0 }: TimelineItemProps) => {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} className="flex gap-4">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.1 + 0.2,
          }}
          className={cn(
            "w-10 h-10 rounded-full border-2 flex items-center justify-center",
            status === "complete" && "border-primary bg-primary text-primary-foreground",
            status === "current" && "border-primary",
            status === "pending" && "border-muted"
          )}
        >
          {status === "complete" && <Check className="w-5 h-5" />}
          {status === "current" && <Circle className="w-5 h-5 fill-primary" />}
          {status === "pending" && <Clock className="w-5 h-5 text-muted-foreground" />}
        </motion.div>
        <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }} className="w-0.5 bg-border" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        className="pb-10 w-full"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium text-base">{title}</div>
            <div className="text-sm text-muted-foreground mt-1">{description}</div>
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap">{date}</div>
        </div>

        {details && details.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            className="mt-3 space-y-1"
          >
            {details.map((detail, detailIndex) => (
              <motion.div
                key={detailIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.4 + detailIndex * 0.1 }}
                className="text-sm text-muted-foreground pl-4 border-l-2 border-secondary"
              >
                {detail}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

interface TimelineOrderItemProps {
  image?: string;
  name: string;
  variant: string;
  quantity: number;
  price: string;
  benefits: string[];
  index?: number;
}

export const TimelineOrderItem = ({ image, name, variant, quantity, price, benefits, index = 0 }: TimelineOrderItemProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      className="w-full"
    >
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              className="relative w-20 h-20 bg-secondary rounded-md overflow-hidden flex items-center justify-center"
            >
              {!imageError && image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" onError={() => setImageError(true)} />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="w-6 h-6 mb-1" />
                  <span className="text-xs">No image</span>
                </div>
              )}
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-4">
                <div className="min-w-0">
                  <motion.h6
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                    className="font-medium truncate"
                  >
                    {name}
                  </motion.h6>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                    className="text-sm text-muted-foreground truncate"
                  >
                    {variant}
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  className="text-right shrink-0"
                >
                  <p className="font-medium">{price}</p>
                  <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                </motion.div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {benefits.map((benefit, benefitIndex) => (
                  <motion.div
                    key={benefitIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.5 + benefitIndex * 0.1 }}
                  >
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      {benefit}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
