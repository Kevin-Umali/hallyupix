import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Disc, Music, Mic } from "lucide-react";

type SpinnerVariant = "pulse" | "morph" | "progress" | "minimal";

interface CustomLoaderProps {
  show?: boolean;
  wait?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  text?: string;
  variant?: SpinnerVariant;
  icons?: React.ElementType[];
}

const CustomLoader: React.FC<CustomLoaderProps> = ({
  show = true,
  wait = "delay-300",
  size = "md",
  color = "foreground",
  text = "Loading",
  variant = "minimal",
  icons = [Disc, Music, Mic],
}) => {
  const sizeClasses = {
    sm: "text-sm tracking-wide",
    md: "text-base tracking-wider",
    lg: "text-lg tracking-widest",
  };

  const letters = text.split("");

  const textVariants = {
    pulse: {
      animate: (i: number) => ({
        opacity: [0.3, 1, 0.3],
        scale: [0.9, 1, 0.9],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut",
        },
      }),
    },
    morph: {
      animate: (i: number) => ({
        y: [0, -4, 0],
        rotate: [0, 10, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut",
        },
      }),
    },
    progress: {
      animate: (i: number) => ({
        opacity: [0, 1, 1, 0],
        x: [-20, 0, 0, 20],
        transition: {
          duration: 2,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut",
        },
      }),
    },
    minimal: {
      animate: (i: number) => ({
        opacity: [0.4, 1, 0.4],
        y: [0, -2, 0],
        transition: {
          duration: 1,
          repeat: Infinity,
          delay: i * 0.08,
          ease: "linear",
        },
      }),
    },
  };

  return (
    <div
      className={cn("inline-flex flex-col items-center transition-opacity", show ? `opacity-100 duration-500 ${wait}` : "opacity-0 duration-500 delay-0")}
      role="output"
      aria-live="polite"
      aria-label={text}
    >
      {/* Icons Section */}
      <div className="flex gap-6 mb-6">
        {icons.map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 0.8, 1],
              transition: {
                duration: 1.5,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className={cn(`text-${color}`)}
          >
            <Icon size={24} />
          </motion.div>
        ))}
      </div>

      {/* Text Animation */}
      <div className="flex">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={textVariants[variant]}
            animate="animate"
            className={cn(
              sizeClasses[size],
              "font-bold",
              letter === " " ? "mx-1" : "mx-[1px]",
              `text-${color}`,
              "relative",
              "after:absolute after:inset-0",
              `after:text-${color}`,
              "after:content-[attr(data-text)]",
              "after:-webkit-text-stroke-[1px]",
              "after:text-transparent"
            )}
            data-text={letter}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

CustomLoader.displayName = "CustomLoader";

export default CustomLoader;
