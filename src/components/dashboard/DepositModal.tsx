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

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DepositModal({
  isOpen,
  onClose,
  onSuccess,
}: DepositModalProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeposit = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const { error: depositError } = await supabase.from("deposits").insert({
        user_id: user.id,
        amount: parseFloat(amount),
        status: "pending",
      });

      if (depositError) throw depositError;

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create deposit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
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
            onClick={handleDeposit}
            disabled={loading || !amount}
          >
            {loading ? "Processing..." : "Deposit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
