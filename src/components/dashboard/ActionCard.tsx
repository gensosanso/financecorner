import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const ActionCard = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
}: ActionCardProps) => {
  return (
    <Card className="w-full bg-white border-gray-border hover:shadow-lg transition-all duration-300 hover:border-blue-medium">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-blue-light/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-blue-medium" />
        </div>
        <CardTitle className="text-xl font-semibold text-blue-deep">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-dark">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onClick} className="w-full">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
