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

interface SendCryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type PaymentMethod = "bank" | "crypto";

export default function SendCryptoModal({
  isOpen,
  onClose,
  onSuccess,
}: SendCryptoModalProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
  const [recipientId, setRecipientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      // Create transaction
      const { error: transactionError } = await supabase
        .from("transactions")
        .insert({
          sender_id: user.id,
          recipient_id: recipientId || user.id, // Default to self if no recipient specified
          amount: parseFloat(amount),
          payment_method: paymentMethod,
          status: "completed",
        });

      if (transactionError) throw transactionError;

      // Update sender's wallet
      const { error: senderWalletError } = await supabase.rpc(
        "update_wallet_balance",
        {
          user_id_input: user.id,
          amount_input: -parseFloat(amount),
        },
      );

      if (senderWalletError) throw senderWalletError;

      // Update recipient's wallet if different from sender
      if (recipientId && recipientId !== user.id) {
        const { error: recipientWalletError } = await supabase.rpc(
          "update_wallet_balance",
          {
            user_id_input: recipientId,
            amount_input: parseFloat(amount),
          },
        );

        if (recipientWalletError) throw recipientWalletError;
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send crypto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Crypto</DialogTitle>
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
                placeholder="Enter recipient's crypto wallet address"
                onChange={(e) => setRecipientId(e.target.value)}
              />
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            className="w-full"
            onClick={handleSend}
            disabled={loading || !amount}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
