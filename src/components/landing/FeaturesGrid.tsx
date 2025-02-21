import React from "react";
import FeatureCard from "./FeatureCard";
import { ArrowUpRight, Wallet, Shield, LineChart } from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    icon: ArrowUpRight,
    title: "Instant Trading",
    description:
      "Execute trades instantly with our high-performance matching engine and deep liquidity pools.",
  },
  {
    icon: Wallet,
    title: "Secure Wallet",
    description:
      "Store your crypto assets safely with our institutional-grade security infrastructure.",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description:
      "Rest easy knowing your assets are protected by state-of-the-art security measures.",
  },
  {
    icon: LineChart,
    title: "Market Analytics",
    description:
      "Access comprehensive market data and analytics to make informed trading decisions.",
  },
];

const FeaturesGrid = ({ features = defaultFeatures }: FeaturesGridProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto py-16 px-4 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the powerful features that make our platform the preferred
          choice for crypto traders
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesGrid;
