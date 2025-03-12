import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

interface BalanceCardProps {
  balance?: number;
  loading?: boolean;
}

const BalanceCard = ({ balance = 0, loading = false }: BalanceCardProps) => {
  const { language } = useLanguage();
  return (
    <Card className="w-full bg-gradient-to-br from-blue-deep to-blue-medium text-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">
          {language === "fr"
            ? "Solde Total"
            : language === "es"
              ? "Saldo Total"
              : language === "pt"
                ? "Saldo Total"
                : "Total Balance"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-10 w-[180px] bg-white/20" />
        ) : (
          <div className="text-3xl font-bold">${balance.toLocaleString()}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
