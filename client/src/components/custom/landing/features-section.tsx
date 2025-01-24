import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SELLER_FEATURES } from "@/constant";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGroupProps {
  title: string;
  description: string;
  features: ReadonlyArray<Feature>;
  columns: string;
}

interface FeatureCardProps extends Feature {
  index: number;
}

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};

export const FeaturesSection = () => (
  <section className="relative py-12 md:py-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-muted/20 pointer-events-none" />
    <div className="container relative mx-auto px-4">
      <FeatureGroup
        title="Transform Your Selling Experience"
        description="Everything you need to manage your K-pop shop efficiently"
        features={SELLER_FEATURES}
        columns="lg:grid-cols-3"
      />
    </div>
  </section>
);

const FeatureGroup = ({ title, description, features, columns }: FeatureGroupProps) => (
  <>
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-100px" }}
      className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
    >
      <h2 className="text-3xl font-bold mb-4">
        {title}
        <span className="bg-gradient-text bg-clip-text text-transparent block mt-1 md:mt-2 text-xl md:text-3xl">Tools Built for Sellers</span>
      </h2>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
    <div className={cn("grid grid-cols-1 md:grid-cols-2", columns, "gap-4 md:gap-6")}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} {...feature} index={index} />
      ))}
    </div>
  </>
);

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => (
  <motion.div
    variants={fadeInUp}
    initial="initial"
    whileInView="whileInView"
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="group"
  >
    <Card className="h-full hover:border-primary/40 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
      <CardContent className="p-4 md:p-6 h-full flex flex-col justify-between">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="p-2 md:p-3 rounded-xl bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-all duration-300">
            <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary group-hover:text-primary/80 transition-colors" />
          </div>
          <div className="flex-1 space-y-1 md:space-y-2">
            <h3 className="font-semibold text-base md:text-xl text-foreground/90 group-hover:text-foreground transition-colors">{title}</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors">
              {description}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-primary/5 opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300 rounded-xl pointer-events-none" />
      </CardContent>
    </Card>
  </motion.div>
);
