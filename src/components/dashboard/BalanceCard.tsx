import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BalanceCardProps {
  balance?: number;
  loading?: boolean;
}

const BalanceCard = ({ balance = 0, loading = false }: BalanceCardProps) => {
  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-10 w-[180px]" />
        ) : (
          <div className="text-3xl font-bold">${balance.toLocaleString()}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
