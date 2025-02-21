import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface LendingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  balance: number;
}

export default function LendingModal({
  isOpen,
  onClose,
  onSuccess,
  balance,
}: LendingModalProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateOffer = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const lendAmount = parseFloat(amount);
      if (lendAmount > balance) {
        throw new Error("Insufficient balance");
      }

      const { error: offerError } = await supabase
        .from("lending_offers")
        .insert({
          lender_id: user.id,
          amount: lendAmount,
          interest_rate: parseFloat(interestRate),
          duration_days: parseInt(durationDays),
          status: "active",
        });

      if (offerError) throw offerError;

      // Update wallet balance
      const { error: walletError } = await supabase.rpc(
        "update_wallet_balance",
        {
          user_id_input: user.id,
          amount_input: -lendAmount,
        },
      );

      if (walletError) throw walletError;

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create lending offer",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Lending Offer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              placeholder="Enter interest rate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (Days)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="Enter duration in days"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            className="w-full"
            onClick={handleCreateOffer}
            disabled={loading || !amount || !interestRate || !durationDays}
          >
            {loading ? "Creating..." : "Create Offer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
