import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TradingChart from "./TradingChart";
import OrderBook from "./OrderBook";
import TradeHistory from "./TradeHistory";
import TradingForm from "./TradingForm";
import { useAuth } from "@/contexts/AuthContext";

export type OrderType = "buy" | "sell";

const TradingPage = () => {
  const { user } = useAuth();
  const [selectedPair, setSelectedPair] = useState("BTC/USD");

  return (
    <div className="min-h-screen bg-background pt-[72px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Chart & Order Book */}
          <div className="lg:col-span-3 space-y-6">
            {/* Trading Pair Selection */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold">{selectedPair}</h2>
                  <div className="text-green-500 font-semibold">$45,123.45</div>
                  <div className="text-green-500 text-sm">+5.67%</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    24h Volume:
                  </span>
                  <span className="font-medium">$1.2B</span>
                </div>
              </div>
            </Card>

            {/* Chart */}
            <Card className="p-4">
              <TradingChart />
            </Card>

            {/* Order Book & Trade History */}
            <Card className="p-4">
              <Tabs defaultValue="order-book">
                <TabsList className="mb-4">
                  <TabsTrigger value="order-book">Order Book</TabsTrigger>
                  <TabsTrigger value="trade-history">Trade History</TabsTrigger>
                </TabsList>
                <TabsContent value="order-book">
                  <OrderBook />
                </TabsContent>
                <TabsContent value="trade-history">
                  <TradeHistory />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column - Trading Form */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-4">
              <TradingForm />
            </Card>

            {/* User's Open Orders */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Open Orders</h3>
              <div className="text-sm text-muted-foreground text-center py-8">
                No open orders
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPage;
