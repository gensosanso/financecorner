import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockOrders = [
  { price: 45123.45, amount: 0.5, total: 22561.73, type: "sell" },
  { price: 45122.3, amount: 0.8, total: 36097.84, type: "sell" },
  { price: 45121.15, amount: 1.2, total: 54145.38, type: "sell" },
  { price: 45120.0, amount: 0.3, total: 13536.0, type: "buy" },
  { price: 45118.85, amount: 0.9, total: 40606.97, type: "buy" },
  { price: 45117.7, amount: 0.6, total: 27070.62, type: "buy" },
];

const OrderBook = () => {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Price (USD)</TableHead>
            <TableHead>Amount (BTC)</TableHead>
            <TableHead>Total (USD)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockOrders.map((order, index) => (
            <TableRow key={index}>
              <TableCell
                className={
                  order.type === "sell" ? "text-red-500" : "text-green-500"
                }
              >
                {order.price.toFixed(2)}
              </TableCell>
              <TableCell>{order.amount.toFixed(4)}</TableCell>
              <TableCell>{order.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderBook;
