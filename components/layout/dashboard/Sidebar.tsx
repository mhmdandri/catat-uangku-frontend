"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowUpDown,
  Target,
  CreditCard,
  Bell,
  Wallet,
  Users,
} from "lucide-react";
import clsx from "clsx";
import { User } from "@/lib/types";
import { Skeleton } from "../../ui/skeleton";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
interface SidebarProps {
  userData: User | null;
  onLogout?: () => void;
  isLoading?: boolean;
}

export function Sidebar({ userData, onLogout, isLoading }: SidebarProps) {
  const pathname = usePathname();
  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/transactions",
      label: "Transaksi",
      icon: ArrowUpDown,
    },
    {
      href: "/dashboard/goals",
      label: "Goals",
      icon: Target,
    },
    {
      href: "/dashboard/accounts",
      label: "Rekening",
      icon: CreditCard,
    },
    {
      href: "/dashboard/groups",
      label: "Grup",
      icon: Users,
    },
    {
      href: "/dashboard/notifications",
      label: "Notifikasi",
      icon: Bell,
    },
  ];
  return (
    <aside className="hidden w-64 border-r border-b border-border bg-card lg:block text-foreground">
      <div className="flex h-full flex-col">
        <div className="border-b border-border p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-emerald-600 p-2">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl text-emerald-600 dark:text-emerald-400">
              catatUangku
            </span>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition",
                  isActive
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : "text-gray-600 hover:bg-gray-50 dark:text-zinc-300 dark:hover:bg-white/5"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        {isLoading || !userData ? (
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 dark:bg-white/5 p-3">
              <div className="rounded-full">
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </div>
        ) : (
          <div className="border-t border-border p-4">
            <ProfileDropdown
              user={userData}
              onLogout={onLogout}
              variant="full"
            />
          </div>
        )}
      </div>
    </aside>
  );
}
