import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { ACRONYM_APP_NAME, APP_NAME } from "@/constant";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/5">
      <div className="container px-4 py-16 text-center">
        {/* Logo */}
        <div className="mb-8 inline-flex items-center gap-3">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold  leading-none">{ACRONYM_APP_NAME}</span>
            </div>
            <span className="text-2xl font-semibold leading-none">{APP_NAME}</span>
          </Link>
        </div>

        {/* 404 Text */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-md mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">Oops! The page you are looking for doesn&apos;t exist or has been moved.</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button size="lg" className="group min-w-[140px]" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Go Back
            </Button>
            <Button size="lg" variant="secondary" className="group min-w-[140px]" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Home Page
              </Link>
            </Button>
          </div>

          {/* Optional: Additional Help */}
          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">
            <p>
              Need help?{" "}
              <a href="/contact" className="text-primary hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Optional: Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default NotFound;
