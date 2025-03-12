import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { DataTable } from "@/components/ui/data-table";
import {
  depositColumns,
  transactionColumns,
  lendingOfferColumns,
  lendingContractColumns,
} from "./tables/columns";
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
import AdminSidebar from "./AdminSidebar";

type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  created_at: string;
  profiles: { email: string };
};

type CryptoTransaction = {
  id: string;
  sender_id: string;
  recipient_id: string;
  amount: number;
  status: string;
  created_at: string;
  sender: { email: string };
  recipient: { email: string };
};

type LendingOffer = {
  id: string;
  lender_id: string;
  amount: number;
  interest_rate: number;
  duration_days: number;
  status: string;
  created_at: string;
  profiles: { email: string };
};

type LendingContract = {
  id: string;
  offer_id: string;
  borrower_id: string;
  amount: number;
  interest_rate: number;
  duration_days: number;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  profiles: { email: string };
  lending_offers: {
    profiles: { email: string };
  };
};

export default function AdminDashboard() {
  const [currentPath, setCurrentPath] = useState("/admin/deposits");
  const [deposits, setDeposits] = useState<Transaction[]>([]);
  const [withdrawals, setWithdrawals] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<CryptoTransaction[]>([]);
  const [lendingOffers, setLendingOffers] = useState<LendingOffer[]>([]);
  const [lendingContracts, setLendingContracts] = useState<LendingContract[]>(
    [],
  );
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

    const { data: transactionsData } = await supabase
      .from("transactions")
      .select(
        "*, sender:profiles!transactions_sender_id_fkey(email), recipient:profiles!transactions_recipient_id_fkey(email)",
      )
      .order("created_at", { ascending: false });

    const { data: offersData } = await supabase
      .from("lending_offers")
      .select("*, profiles(email)")
      .order("created_at", { ascending: false });

    const { data: contractsData } = await supabase
      .from("lending_contracts")
      .select("*, profiles(email), lending_offers(profiles(email))")
      .order("created_at", { ascending: false });

    if (depositsData) setDeposits(depositsData);
    if (withdrawalsData) setWithdrawals(withdrawalsData);
    if (transactionsData) setTransactions(transactionsData);
    if (offersData) setLendingOffers(offersData);
    if (contractsData) setLendingContracts(contractsData);
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

    const transactionsSubscription = supabase
      .channel("transactions_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "transactions" },
        fetchTransactions,
      )
      .subscribe();

    const lendingSubscription = supabase
      .channel("lending_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lending_offers" },
        fetchTransactions,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lending_contracts" },
        fetchTransactions,
      )
      .subscribe();

    return () => {
      depositsSubscription.unsubscribe();
      withdrawalsSubscription.unsubscribe();
      transactionsSubscription.unsubscribe();
      lendingSubscription.unsubscribe();
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

  const renderContent = () => {
    switch (currentPath) {
      case "/admin/deposits":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Deposits</h2>
            <DataTable
              columns={depositColumns}
              data={deposits}
              filterColumn="profiles.email"
              filterPlaceholder="Filter by email..."
            />
          </div>
        );
      case "/admin/withdrawals":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Withdrawals</h2>
            <DataTable
              columns={depositColumns}
              data={withdrawals}
              filterColumn="profiles.email"
              filterPlaceholder="Filter by email..."
            />
          </div>
        );
      case "/admin/transactions":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Transaction History</h2>
            <DataTable
              columns={transactionColumns}
              data={transactions}
              filterColumn="sender.email"
              filterPlaceholder="Filter by sender email..."
            />
          </div>
        );
      case "/admin/lending":
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Active Lending Offers</h2>
              <DataTable
                columns={lendingOfferColumns}
                data={lendingOffers}
                filterColumn="profiles.email"
                filterPlaceholder="Filter by lender email..."
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Active Lending Contracts</h2>
              <DataTable
                columns={lendingContractColumns}
                data={lendingContracts}
                filterColumn="profiles.email"
                filterPlaceholder="Filter by borrower email..."
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-off-white pt-[72px] flex">
      <AdminSidebar currentPath={currentPath} onNavigate={setCurrentPath} />
      <div className="flex-1 px-8 py-8 overflow-auto">{renderContent()}</div>
    </div>
  );
}
