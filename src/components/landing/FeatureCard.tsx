import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleIcon } from "lucide-react";

interface FeatureCardProps {
  icon?: React.ElementType;
  title?: string;
  description?: string;
}

const FeatureCard = ({
  icon: Icon = CircleIcon,
  title = "Feature Title",
  description = "This is a sample feature description that highlights the benefits and functionality of this particular feature.",
}: FeatureCardProps) => {
  return (
    <Card className="w-[350px] h-[280px] bg-background hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
