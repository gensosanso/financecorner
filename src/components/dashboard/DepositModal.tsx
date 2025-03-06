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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type PaymentMethod = "bank" | "crypto";

export default function DepositModal({
  isOpen,
  onClose,
  onSuccess,
}: DepositModalProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
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
        payment_method: paymentMethod,
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
          <div className="space-y-2">
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select
              value={paymentMethod}
              onValueChange={(value) =>
                setPaymentMethod(value as PaymentMethod)
              }
            >
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Account</SelectItem>
                <SelectItem value="crypto">Crypto Address</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {paymentMethod === "bank" && (
            <div className="space-y-2">
              <Label htmlFor="bank-details">Bank Account Details</Label>
              <Input
                id="bank-details"
                placeholder="Enter bank account number"
              />
            </div>
          )}
          {paymentMethod === "crypto" && (
            <div className="space-y-2">
              <Label htmlFor="crypto-address">Crypto Address</Label>
              <Input
                id="crypto-address"
                placeholder="Enter your crypto wallet address"
              />
            </div>
          )}
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
