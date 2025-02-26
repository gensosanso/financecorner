import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import LendingModal from "../dashboard/LendingModal";
import BorrowModal from "../dashboard/BorrowModal";

const LendingPage = () => {
  const { user } = useAuth();
  const [isLendingModalOpen, setIsLendingModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [activeLoans, setActiveLoans] = useState([]);
  const [activeBorrows, setActiveBorrows] = useState([]);

  const fetchUserData = async () => {
    if (!user) return;

    // Fetch wallet balance
    const { data: walletData } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", user.id)
      .single();

    if (walletData) {
      setBalance(walletData.balance);
    }

    // Fetch active loans (where user is lender)
    const { data: loansData } = await supabase
      .from("lending_offers")
      .select("*, lending_contracts(*, profiles(email))")
      .eq("lender_id", user.id)
      .eq("status", "active");

    if (loansData) {
      setActiveLoans(loansData);
    }

    // Fetch active borrows (where user is borrower)
    const { data: borrowsData } = await supabase
      .from("lending_contracts")
      .select("*, lending_offers(*, profiles(email))")
      .eq("borrower_id", user.id)
      .eq("status", "active");

    if (borrowsData) {
      setActiveBorrows(borrowsData);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-[72px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Crypto Lending</h1>
          <div className="flex gap-4">
            <Button onClick={() => setIsLendingModalOpen(true)}>
              Create Lending Offer
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsBorrowModalOpen(true)}
            >
              View Borrowing Options
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Active Loans */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Active Loans</h2>
            <div className="space-y-4">
              {activeLoans.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No active loans
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Interest Rate</TableHead>
                      <TableHead>Borrower</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeLoans.map((loan: any) => (
                      <TableRow key={loan.id}>
                        <TableCell>${loan.amount}</TableCell>
                        <TableCell>{loan.interest_rate}%</TableCell>
                        <TableCell>
                          {loan.lending_contracts?.[0]?.profiles?.email ||
                            "Pending"}
                        </TableCell>
                        <TableCell>
                          <Badge>{loan.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </Card>

          {/* Active Borrows */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Active Borrows</h2>
            <div className="space-y-4">
              {activeBorrows.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No active borrows
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Interest Rate</TableHead>
                      <TableHead>Lender</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeBorrows.map((borrow: any) => (
                      <TableRow key={borrow.id}>
                        <TableCell>${borrow.amount}</TableCell>
                        <TableCell>{borrow.interest_rate}%</TableCell>
                        <TableCell>
                          {borrow.lending_offers?.profiles?.email}
                        </TableCell>
                        <TableCell>
                          {new Date(borrow.end_date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </Card>
        </div>

        <LendingModal
          isOpen={isLendingModalOpen}
          onClose={() => setIsLendingModalOpen(false)}
          onSuccess={fetchUserData}
          balance={balance}
        />

        <BorrowModal
          isOpen={isBorrowModalOpen}
          onClose={() => setIsBorrowModalOpen(false)}
          onSuccess={fetchUserData}
        />
      </div>
    </div>
  );
};

export default LendingPage;
