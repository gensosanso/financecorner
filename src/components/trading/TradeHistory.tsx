import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockTrades = [
  { price: 45123.45, amount: 0.5, time: "12:30:45", type: "buy" },
  { price: 45122.3, amount: 0.8, time: "12:30:40", type: "sell" },
  { price: 45121.15, amount: 1.2, time: "12:30:35", type: "buy" },
  { price: 45120.0, amount: 0.3, time: "12:30:30", type: "sell" },
  { price: 45118.85, amount: 0.9, time: "12:30:25", type: "buy" },
  { price: 45117.7, amount: 0.6, time: "12:30:20", type: "sell" },
];

const TradeHistory = () => {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Price (USD)</TableHead>
            <TableHead>Amount (BTC)</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTrades.map((trade, index) => (
            <TableRow key={index}>
              <TableCell
                className={
                  trade.type === "sell" ? "text-red-500" : "text-green-500"
                }
              >
                {trade.price.toFixed(2)}
              </TableCell>
              <TableCell>{trade.amount.toFixed(4)}</TableCell>
              <TableCell className="text-muted-foreground">
                {trade.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TradeHistory;
