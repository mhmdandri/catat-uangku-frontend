"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  ArrowUpDown,
  Target,
  CreditCard,
  Users,
} from "lucide-react";
const TABS = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/transactions", label: "Transaksi", icon: ArrowUpDown },
  { href: "/dashboard/accounts", label: "Rekening", icon: CreditCard },
  { href: "/dashboard/goals", label: "Goals", icon: Target },
  { href: "/dashboard/groups", label: "Grup", icon: Users },
] as const;

export function BottomTabs() {
  const pathname = usePathname();
  return (
    <nav
      className="lg:hidden fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 dark:bg-zinc-950/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
      aria-label="Bottom Navigation"
    >
      <div className="mx-auto grid max-w-md grid-cols-5">
        {TABS.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/dashboard" && pathname.startsWith(tab.href));
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "flex flex-col items-center justify-center gap-1 py-2 text-xs transition",
                isActive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-500 dark:text-zinc-400"
              )}
            >
              <Icon
                className={clsx(
                  "h-5 w-5",
                  isActive ? "text-emerald-600 dark:text-emerald-400" : ""
                )}
              />
              <span className="leading-none">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
