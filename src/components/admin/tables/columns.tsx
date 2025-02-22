import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const depositColumns: ColumnDef<any>[] = [
  {
    accessorKey: "profiles.email",
    header: "User",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `$${row.getValue("amount")}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "completed"
              ? "default"
              : status === "pending"
                ? "secondary"
                : "destructive"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.getValue("created_at")).toLocaleDateString(),
  },
];

export const transactionColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs">
        {(row.getValue("id") as string).slice(0, 8)}...
      </span>
    ),
  },
  {
    accessorKey: "sender.email",
    header: "From",
  },
  {
    accessorKey: "recipient.email",
    header: "To",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium">
        ${(row.getValue("amount") as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "completed"
              ? "default"
              : status === "pending"
                ? "secondary"
                : "destructive"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleString(),
  },
];

export const lendingOfferColumns: ColumnDef<any>[] = [
  {
    accessorKey: "profiles.email",
    header: "Lender",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `$${row.getValue("amount")}`,
  },
  {
    accessorKey: "interest_rate",
    header: "Interest Rate",
    cell: ({ row }) => `${row.getValue("interest_rate")}%`,
  },
  {
    accessorKey: "duration_days",
    header: "Duration",
    cell: ({ row }) => `${row.getValue("duration_days")} days`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("status") === "active" ? "default" : "secondary"}
      >
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.getValue("created_at")).toLocaleDateString(),
  },
];

export const lendingContractColumns: ColumnDef<any>[] = [
  {
    accessorKey: "lending_offers.profiles.email",
    header: "Lender",
  },
  {
    accessorKey: "profiles.email",
    header: "Borrower",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `$${row.getValue("amount")}`,
  },
  {
    accessorKey: "interest_rate",
    header: "Interest Rate",
    cell: ({ row }) => `${row.getValue("interest_rate")}%`,
  },
  {
    accessorKey: "duration_days",
    header: "Duration",
    cell: ({ row }) => `${row.getValue("duration_days")} days`,
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) =>
      new Date(row.getValue("start_date")).toLocaleDateString(),
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => new Date(row.getValue("end_date")).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("status") === "active" ? "default" : "secondary"}
      >
        {row.getValue("status")}
      </Badge>
    ),
  },
];
