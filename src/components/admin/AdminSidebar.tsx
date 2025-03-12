import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wallet, Send, PiggyBank, HandCoins } from "lucide-react";

type NavItem = {
  title: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  {
    title: "Deposits",
    icon: Wallet,
    href: "/admin/deposits",
  },
  {
    title: "Withdrawals",
    icon: Send,
    href: "/admin/withdrawals",
  },
  {
    title: "Transactions",
    icon: HandCoins,
    href: "/admin/transactions",
  },
  {
    title: "Lending",
    icon: PiggyBank,
    href: "/admin/lending",
  },
];

interface AdminSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function AdminSidebar({
  currentPath,
  onNavigate,
}: AdminSidebarProps) {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-border px-3 py-4 space-y-2 shadow-sm">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold text-blue-deep">
          Admin Panel
        </h2>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                isActive && "bg-secondary",
              )}
              onClick={() => onNavigate(item.href)}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
