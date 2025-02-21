import { Send, Wallet, PiggyBank, Plus, HandCoins } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import ActionCard from "./ActionCard";
import BalanceCard from "./BalanceCard";
import SendCryptoModal from "./SendCryptoModal";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import LendingModal from "./LendingModal";
import BorrowModal from "./BorrowModal";

const Dashboard = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isLendingModalOpen, setIsLendingModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  const fetchBalance = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", user.id)
      .single();

    if (!error && data) {
      setBalance(data.balance);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBalance();

    // Subscribe to realtime wallet updates
    const walletSubscription = supabase
      .channel("wallet_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "wallets",
          filter: `user_id=eq.${user?.id}`,
        },
        () => fetchBalance(),
      )
      .subscribe();

    return () => {
      walletSubscription.unsubscribe();
    };
  }, [user]);

  const handleSendCrypto = () => {
    setIsSendModalOpen(true);
  };

  const handleDeposit = () => {
    setIsDepositModalOpen(true);
  };

  const handleWithdraw = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleLending = () => {
    setIsLendingModalOpen(true);
  };

  const handleBorrow = () => {
    setIsBorrowModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pt-[72px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="mb-8">
          <BalanceCard balance={balance} loading={loading} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionCard
            icon={Plus}
            title="Deposit Funds"
            description="Add funds to your wallet"
            buttonText="Deposit"
            onClick={handleDeposit}
          />
          <ActionCard
            icon={Send}
            title="Send Crypto"
            description="Send cryptocurrency to other wallets instantly"
            buttonText="Send Now"
            onClick={handleSendCrypto}
          />
          <ActionCard
            icon={Wallet}
            title="Withdraw Funds"
            description="Withdraw your funds to your bank account"
            buttonText="Withdraw"
            onClick={handleWithdraw}
          />
          <ActionCard
            icon={PiggyBank}
            title="Lend Crypto"
            description="Earn interest by lending your crypto assets"
            buttonText="Create Offer"
            onClick={handleLending}
          />
          <ActionCard
            icon={HandCoins}
            title="Borrow Crypto"
            description="Borrow crypto assets from other users"
            buttonText="View Offers"
            onClick={handleBorrow}
          />
        </div>

        <SendCryptoModal
          isOpen={isSendModalOpen}
          onClose={() => setIsSendModalOpen(false)}
          onSuccess={fetchBalance}
        />

        <DepositModal
          isOpen={isDepositModalOpen}
          onClose={() => setIsDepositModalOpen(false)}
          onSuccess={fetchBalance}
        />

        <WithdrawModal
          isOpen={isWithdrawModalOpen}
          onClose={() => setIsWithdrawModalOpen(false)}
          onSuccess={fetchBalance}
          balance={balance}
        />

        <LendingModal
          isOpen={isLendingModalOpen}
          onClose={() => setIsLendingModalOpen(false)}
          onSuccess={fetchBalance}
          balance={balance}
        />

        <BorrowModal
          isOpen={isBorrowModalOpen}
          onClose={() => setIsBorrowModalOpen(false)}
          onSuccess={fetchBalance}
        />
      </div>
    </div>
  );
};

export default Dashboard;
