import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "../navigation/Navbar";
import Footer from "../landing/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const LearnPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={!!user} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">{t("learn.title")}</h1>

        <Tabs defaultValue="basics" className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="basics">{t("learn.basics")}</TabsTrigger>
            <TabsTrigger value="trading">{t("learn.trading")}</TabsTrigger>
            <TabsTrigger value="defi">{t("learn.defi")}</TabsTrigger>
            <TabsTrigger value="security">{t("learn.security")}</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("learn.what.is.crypto")}</CardTitle>
                <CardDescription>
                  {t("learn.what.is.crypto.desc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{t("learn.what.is.crypto.content")}</p>
                <h3 className="text-lg font-semibold mt-4">
                  {t("learn.key.concepts")}
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t("learn.blockchain")}</li>
                  <li>{t("learn.decentralization")}</li>
                  <li>{t("learn.wallets")}</li>
                  <li>{t("learn.keys")}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Essential steps to begin your crypto journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <h4 className="font-semibold">Create a Wallet</h4>
                    <p className="text-muted-foreground">
                      Learn how to set up and secure your digital wallet
                    </p>
                  </li>
                  <li>
                    <h4 className="font-semibold">Buy Your First Crypto</h4>
                    <p className="text-muted-foreground">
                      Understanding different ways to purchase cryptocurrency
                    </p>
                  </li>
                  <li>
                    <h4 className="font-semibold">Security Best Practices</h4>
                    <p className="text-muted-foreground">
                      Essential security measures to protect your assets
                    </p>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trading Fundamentals</CardTitle>
                <CardDescription>
                  Learn the basics of cryptocurrency trading
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Types of Orders:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Market Orders:</span> Buy or
                    sell at the current market price
                  </li>
                  <li>
                    <span className="font-medium">Limit Orders:</span> Set a
                    specific price for your trade
                  </li>
                  <li>
                    <span className="font-medium">Stop Orders:</span>{" "}
                    Automatically trade when price reaches a certain level
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Analysis</CardTitle>
                <CardDescription>
                  Understanding charts and indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Technical analysis involves studying price charts and using
                  indicators to make trading decisions. Key concepts include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Trend Analysis</li>
                  <li>Support and Resistance</li>
                  <li>Moving Averages</li>
                  <li>Volume Analysis</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="defi" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Decentralized Finance (DeFi)</CardTitle>
                <CardDescription>
                  Understanding the future of financial services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  DeFi refers to financial services built on blockchain
                  technology that operate without traditional intermediaries
                  like banks.
                </p>
                <h3 className="text-lg font-semibold mt-4">
                  Key DeFi Services:
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Lending and Borrowing</li>
                  <li>Decentralized Exchanges (DEX)</li>
                  <li>Yield Farming</li>
                  <li>Liquidity Pools</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Crypto Security Best Practices</CardTitle>
                <CardDescription>
                  Protecting your digital assets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Essential Security Tips:
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use Strong Passwords</li>
                  <li>Enable Two-Factor Authentication</li>
                  <li>Keep Private Keys Secure</li>
                  <li>Use Hardware Wallets for Large Holdings</li>
                  <li>Be Aware of Common Scams</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default LearnPage;
