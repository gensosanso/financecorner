import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface BorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type LendingOffer = {
  id: string;
  amount: number;
  interest_rate: number;
  duration_days: number;
  lender_id: string;
  profiles: { email: string };
};

export default function BorrowModal({
  isOpen,
  onClose,
  onSuccess,
}: BorrowModalProps) {
  const { user } = useAuth();
  const [offers, setOffers] = useState<LendingOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchOffers();
    }
  }, [isOpen]);

  const fetchOffers = async () => {
    const { data, error } = await supabase
      .from("lending_offers")
      .select("*, profiles(email)")
      .eq("status", "active");

    if (!error && data) {
      setOffers(data);
    }
  };

  const handleBorrow = async (offer: LendingOffer) => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      // Create lending contract
      const { error: contractError } = await supabase
        .from("lending_contracts")
        .insert({
          offer_id: offer.id,
          borrower_id: user.id,
          amount: offer.amount,
          interest_rate: offer.interest_rate,
          duration_days: offer.duration_days,
          status: "active",
          start_date: new Date().toISOString(),
          end_date: new Date(
            Date.now() + offer.duration_days * 24 * 60 * 60 * 1000,
          ).toISOString(),
        });

      if (contractError) throw contractError;

      // Update offer status
      const { error: offerError } = await supabase
        .from("lending_offers")
        .update({ status: "taken" })
        .eq("id", offer.id);

      if (offerError) throw offerError;

      // Update borrower's wallet
      const { error: walletError } = await supabase.rpc(
        "update_wallet_balance",
        {
          user_id_input: user.id,
          amount_input: offer.amount,
        },
      );

      if (walletError) throw walletError;

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to borrow");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Available Lending Offers</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {offers.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No active offers available
            </p>
          ) : (
            <div className="space-y-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">Amount: ${offer.amount}</p>
                    <p className="text-sm text-muted-foreground">
                      Interest: {offer.interest_rate}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Duration: {offer.duration_days} days
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Lender: {offer.profiles?.email}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleBorrow(offer)}
                    disabled={loading || offer.lender_id === user?.id}
                  >
                    {loading ? "Processing..." : "Borrow"}
                  </Button>
                </div>
              ))}
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
