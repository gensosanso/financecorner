import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { OrderType } from "./TradingPage";

const TradingForm = () => {
  const [orderType, setOrderType] = useState<OrderType>("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    console.log({ orderType, amount, price });
  };

  return (
    <div>
      <Tabs defaultValue="limit" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="limit" className="flex-1">
            Limit
          </TabsTrigger>
          <TabsTrigger value="market" className="flex-1">
            Market
          </TabsTrigger>
        </TabsList>

        <TabsContent value="limit">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button
                type="button"
                variant={orderType === "buy" ? "default" : "outline"}
                className="w-full"
                onClick={() => setOrderType("buy")}
              >
                Buy
              </Button>
              <Button
                type="button"
                variant={orderType === "sell" ? "default" : "outline"}
                className="w-full"
                onClick={() => setOrderType("sell")}
              >
                Sell
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (BTC)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Total (USD)</Label>
              <div className="text-lg font-medium">
                $
                {((parseFloat(price) || 0) * (parseFloat(amount) || 0)).toFixed(
                  2,
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              variant={orderType === "buy" ? "default" : "destructive"}
            >
              {orderType === "buy" ? "Buy BTC" : "Sell BTC"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="market">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button
                type="button"
                variant={orderType === "buy" ? "default" : "outline"}
                className="w-full"
                onClick={() => setOrderType("buy")}
              >
                Buy
              </Button>
              <Button
                type="button"
                variant={orderType === "sell" ? "default" : "outline"}
                className="w-full"
                onClick={() => setOrderType("sell")}
              >
                Sell
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="market-amount">Amount (BTC)</Label>
              <Input
                id="market-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              variant={orderType === "buy" ? "default" : "destructive"}
            >
              {orderType === "buy"
                ? "Buy BTC at Market Price"
                : "Sell BTC at Market Price"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingForm;
