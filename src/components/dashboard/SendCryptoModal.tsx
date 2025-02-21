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

interface SendCryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SendCryptoModal({
  isOpen,
  onClose,
  onSuccess,
}: SendCryptoModalProps) {
  const { user } = useAuth();
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      // Get recipient user ID
      const { data: recipientData, error: recipientError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", recipientEmail)
        .single();

      if (recipientError || !recipientData) {
        throw new Error("Recipient not found");
      }

      // Create transaction
      const { error: transactionError } = await supabase
        .from("transactions")
        .insert({
          sender_id: user.id,
          recipient_id: recipientData.id,
          amount: parseFloat(amount),
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

      // Update recipient's wallet
      const { error: recipientWalletError } = await supabase.rpc(
        "update_wallet_balance",
        {
          user_id_input: recipientData.id,
          amount_input: parseFloat(amount),
        },
      );

      if (recipientWalletError) throw recipientWalletError;

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
            <Label htmlFor="recipient">Recipient Email</Label>
            <Input
              id="recipient"
              placeholder="Enter recipient's email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>
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
            onClick={handleSend}
            disabled={loading || !amount || !recipientEmail}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
