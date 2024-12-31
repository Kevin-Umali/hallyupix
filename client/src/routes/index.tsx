import { HeroSection } from "@/components/custom/landing/hero-section";
import { TrackingTimelineDemo } from "@/components/custom/landing/tracking-timeline-demo";
import { FeaturesSection } from "@/components/custom/landing/features-section";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Testimonials } from "@/components/custom/landing/testimonials";
import { FeaturedListing } from "@/components/custom/landing/featured-listing";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center text-white text-xl font-bold">HP</div>
            <span className="text-xl font-semibold">H A L L Y U P I X</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero - Introduces the platform */}
        <HeroSection />
        {/* Demo - Shows the tracking feature in action */}
        <TrackingTimelineDemo />
        {/* Features - Highlights key functionality */}
        <FeaturesSection />
        {/* Featured Listings - Shows real examples */}
        <FeaturedListing />
        {/* Social Proof */}
        <Testimonials />
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="pt-8 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} H A L L Y U P I X. All rights reserved.</div>
      </footer>
    </div>
  );
}
