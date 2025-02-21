import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroSection = ({
  title = "Next-Gen Crypto Trading Platform",
  subtitle = "Trade, send, and lend cryptocurrency with confidence using our secure and intuitive platform.",
  primaryCTA = "Get Started",
  secondaryCTA = "Learn More",
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
}: HeroSectionProps) => {
  return (
    <section className="w-full h-[600px] bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" onClick={onPrimaryClick} className="text-lg px-8">
              {primaryCTA}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onSecondaryClick}
              className="text-lg px-8"
            >
              {secondaryCTA}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="relative w-full max-w-[500px] aspect-square mx-auto">
            <img
              src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80"
              alt="Crypto Trading Platform"
              className="rounded-2xl shadow-2xl object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
