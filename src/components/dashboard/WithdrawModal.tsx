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

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  balance: number;
}

export default function WithdrawModal({
  isOpen,
  onClose,
  onSuccess,
  balance,
}: WithdrawModalProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWithdraw = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const withdrawAmount = parseFloat(amount);
      if (withdrawAmount > balance) {
        throw new Error("Insufficient balance");
      }

      const { error: withdrawError } = await supabase
        .from("withdrawals")
        .insert({
          user_id: user.id,
          amount: withdrawAmount,
          status: "pending",
        });

      if (withdrawError) throw withdrawError;

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create withdrawal",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
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
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            className="w-full"
            onClick={handleWithdraw}
            disabled={loading || !amount || parseFloat(amount) <= 0}
          >
            {loading ? "Processing..." : "Withdraw"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
