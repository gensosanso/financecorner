import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  created_at: string;
  profiles: { email: string };
};

export default function AdminDashboard() {
  const [deposits, setDeposits] = useState<Transaction[]>([]);
  const [withdrawals, setWithdrawals] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);

    const { data: depositsData } = await supabase
      .from("deposits")
      .select("*, profiles(email)")
      .order("created_at", { ascending: false });

    const { data: withdrawalsData } = await supabase
      .from("withdrawals")
      .select("*, profiles(email)")
      .order("created_at", { ascending: false });

    if (depositsData) setDeposits(depositsData);
    if (withdrawalsData) setWithdrawals(withdrawalsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();

    const depositsSubscription = supabase
      .channel("deposits_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "deposits" },
        fetchTransactions,
      )
      .subscribe();

    const withdrawalsSubscription = supabase
      .channel("withdrawals_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "withdrawals" },
        fetchTransactions,
      )
      .subscribe();

    return () => {
      depositsSubscription.unsubscribe();
      withdrawalsSubscription.unsubscribe();
    };
  }, []);

  const handleStatusUpdate = async (
    table: string,
    id: string,
    status: string,
  ) => {
    const { error } = await supabase
      .from(table)
      .update({ status })
      .eq("id", id);

    if (!error && status === "completed") {
      const transaction =
        table === "deposits"
          ? deposits.find((d) => d.id === id)
          : withdrawals.find((w) => w.id === id);

      if (transaction) {
        await supabase.rpc("update_wallet_balance", {
          user_id_input: transaction.user_id,
          amount_input:
            table === "deposits" ? transaction.amount : -transaction.amount,
        });
      }
    }
  };

  const TransactionTable = ({
    data,
    type,
  }: {
    data: Transaction[];
    type: "deposits" | "withdrawals";
  }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.profiles?.email}</TableCell>
            <TableCell>${item.amount}</TableCell>
            <TableCell>
              <Badge
                variant={
                  item.status === "completed"
                    ? "default"
                    : item.status === "pending"
                      ? "secondary"
                      : "destructive"
                }
              >
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(item.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="space-x-2">
              {item.status === "pending" && (
                <>
                  <Button
                    size="sm"
                    onClick={() =>
                      handleStatusUpdate(type, item.id, "completed")
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      handleStatusUpdate(type, item.id, "rejected")
                    }
                  >
                    Reject
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background pt-[72px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="deposits" className="w-full">
          <TabsList>
            <TabsTrigger value="deposits">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          </TabsList>

          <TabsContent value="deposits" className="mt-4">
            <TransactionTable data={deposits} type="deposits" />
          </TabsContent>

          <TabsContent value="withdrawals" className="mt-4">
            <TransactionTable data={withdrawals} type="withdrawals" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
