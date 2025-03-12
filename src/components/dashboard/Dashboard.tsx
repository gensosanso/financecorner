import { Send, Wallet, PiggyBank, Plus, HandCoins, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t, language, setLanguage } = useLanguage();
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

    // Check URL for language parameter and set it
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    if (langParam && ["en", "fr", "es", "pt"].includes(langParam)) {
      localStorage.setItem("language", langParam);
      setLanguage(langParam as any);
    }

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
    <div className="min-h-screen bg-off-white pt-[72px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t("nav.dashboard")}</h1>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="h-4 w-4" />
            {language === "fr"
              ? "Retour à l'accueil"
              : language === "es"
                ? "Volver a la página principal"
                : language === "pt"
                  ? "Voltar para a página inicial"
                  : "Back to Homepage"}
          </Button>
        </div>

        <div className="mb-8">
          <BalanceCard balance={balance} loading={loading} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionCard
            icon={Plus}
            title={
              language === "fr"
                ? "Déposer des fonds"
                : language === "es"
                  ? "Depositar fondos"
                  : language === "pt"
                    ? "Depositar fundos"
                    : "Deposit Funds"
            }
            description={
              language === "fr"
                ? "Ajouter des fonds à votre portefeuille"
                : language === "es"
                  ? "Añadir fondos a su cartera"
                  : language === "pt"
                    ? "Adicionar fundos à sua carteira"
                    : "Add funds to your wallet"
            }
            buttonText={
              language === "fr"
                ? "Déposer"
                : language === "es"
                  ? "Depositar"
                  : language === "pt"
                    ? "Depositar"
                    : "Deposit"
            }
            onClick={handleDeposit}
          />
          <ActionCard
            icon={Send}
            title={
              language === "fr"
                ? "Envoyer Crypto"
                : language === "es"
                  ? "Enviar Cripto"
                  : language === "pt"
                    ? "Enviar Cripto"
                    : "Send Crypto"
            }
            description={
              language === "fr"
                ? "Envoyez instantanément de la cryptomonnaie vers d'autres portefeuilles"
                : language === "es"
                  ? "Envíe criptomonedas a otras carteras al instante"
                  : language === "pt"
                    ? "Envie criptomoedas para outras carteiras instantaneamente"
                    : "Send cryptocurrency to other wallets instantly"
            }
            buttonText={
              language === "fr"
                ? "Envoyer"
                : language === "es"
                  ? "Enviar"
                  : language === "pt"
                    ? "Enviar"
                    : "Send Now"
            }
            onClick={handleSendCrypto}
          />
          <ActionCard
            icon={Wallet}
            title={
              language === "fr"
                ? "Retirer des fonds"
                : language === "es"
                  ? "Retirar fondos"
                  : language === "pt"
                    ? "Retirar fundos"
                    : "Withdraw Funds"
            }
            description={
              language === "fr"
                ? "Retirez vos fonds vers votre compte bancaire"
                : language === "es"
                  ? "Retire sus fondos a su cuenta bancaria"
                  : language === "pt"
                    ? "Retire seus fundos para sua conta bancária"
                    : "Withdraw your funds to your bank account"
            }
            buttonText={
              language === "fr"
                ? "Retirer"
                : language === "es"
                  ? "Retirar"
                  : language === "pt"
                    ? "Retirar"
                    : "Withdraw"
            }
            onClick={handleWithdraw}
          />
          <ActionCard
            icon={PiggyBank}
            title={
              language === "fr"
                ? "Prêter Crypto"
                : language === "es"
                  ? "Prestar Cripto"
                  : language === "pt"
                    ? "Emprestar Cripto"
                    : "Lend Crypto"
            }
            description={
              language === "fr"
                ? "Gagnez des intérêts en prêtant vos actifs crypto"
                : language === "es"
                  ? "Gane intereses prestando sus activos cripto"
                  : language === "pt"
                    ? "Ganhe juros emprestando seus ativos cripto"
                    : "Earn interest by lending your crypto assets"
            }
            buttonText={
              language === "fr"
                ? "Créer une offre"
                : language === "es"
                  ? "Crear oferta"
                  : language === "pt"
                    ? "Criar oferta"
                    : "Create Offer"
            }
            onClick={handleLending}
          />
          <ActionCard
            icon={HandCoins}
            title={
              language === "fr"
                ? "Emprunter Crypto"
                : language === "es"
                  ? "Pedir prestado Cripto"
                  : language === "pt"
                    ? "Pedir emprestado Cripto"
                    : "Borrow Crypto"
            }
            description={
              language === "fr"
                ? "Empruntez des actifs crypto auprès d'autres utilisateurs"
                : language === "es"
                  ? "Pida prestados activos cripto de otros usuarios"
                  : language === "pt"
                    ? "Peça emprestado ativos cripto de outros usuários"
                    : "Borrow crypto assets from other users"
            }
            buttonText={
              language === "fr"
                ? "Voir les offres"
                : language === "es"
                  ? "Ver ofertas"
                  : language === "pt"
                    ? "Ver ofertas"
                    : "View Offers"
            }
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
