// components/landing/features-section.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SELLER_FEATURES } from "@/constant";

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <FeatureGroup
          title="Powerful Tools for Sellers"
          description="Everything you need to manage your K-pop shop efficiently"
          features={SELLER_FEATURES}
          columns="lg:grid-cols-4"
        />
      </div>
    </section>
  );
};

FeaturesSection.displayName = "FeaturesSection";

const FeatureGroup = ({
  title,
  description,
  features,
  columns,
}: {
  title: string;
  description: string;
  features: ReadonlyArray<{
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
  }>;
  columns: string;
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </motion.div>

      <div className={`grid md:grid-cols-2 ${columns} gap-6`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </>
  );
};

FeatureGroup.displayName = "FeatureGroup";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full group hover:shadow-lg transition-all duration-300 border-secondary/50">
        <CardContent className="p-6">
          <div className="mb-4 relative">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
              <Icon className={cn(color, "w-12 h-12 transition-transform duration-300 group-hover:scale-110")} />
            </motion.div>
            <div className={`absolute -inset-2 bg-${color}-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </div>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

FeatureCard.displayName = "FeatureCard";
