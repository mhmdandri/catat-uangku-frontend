"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  date: string;
}
interface Props {
  transactions: Transaction[];
}
export function RecentTransactionsCard({ transactions }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm lg:col-span-2">
      <div className="mb-3 sm:mb-4 flex items-center justify-between gap-3">
        <h3 className="text-base sm:text-lg text-foreground">
          Transaksi Terbaru
        </h3>
        <Link
          href="/dashboard/transactions"
          className="flex items-center gap-1 text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          Lihat Semua
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="space-y-2.5 sm:space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-border/80 dark:border-white/5 p-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`shrink-0 rounded-lg bg-gray-100 dark:bg-white/5 p-2 ${transaction.color}`}
              >
                <transaction.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground">
                  {transaction.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {transaction.category} • {transaction.date}
                </p>
              </div>
            </div>
            <p
              className={`shrink-0 text-sm ${
                transaction.type === "income"
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"} Rp{" "}
              {Math.abs(transaction.amount).toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
