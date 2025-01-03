import { HeroSection } from "@/components/custom/landing/hero-section";
import { TrackingTimelineDemo } from "@/components/custom/landing/tracking-timeline-demo";
import { FeaturesSection } from "@/components/custom/landing/features-section";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Testimonials } from "@/components/custom/landing/testimonials";
import { WorkflowSection } from "@/components/custom/landing/workflows-section";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ACRONYM_APP_NAME, APP_NAME } from "@/constant";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const startPosition = window.scrollY;
    const startTime = performance.now();
    const duration = 800; // Duration in milliseconds

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, startPosition * (1 - easeOutCubic(progress)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} className="w-10 h-10 bg-primary rounded-md flex items-center justify-center text-white text-xl font-bold">
              {ACRONYM_APP_NAME}
            </motion.div>
            <span className="text-xl font-semibold">{APP_NAME}</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Sign In</Link>
            </Button>
            <Button asChild className="shadow-lg hover:shadow-primary/25 transition-all">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <HeroSection />
        <TrackingTimelineDemo />
        <FeaturesSection />
        <WorkflowSection />
        <Testimonials />
      </main>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button size="icon" className="rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-110" onClick={scrollToTop}>
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t py-8 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
