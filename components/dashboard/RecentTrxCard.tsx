// components/dashboard/RecentTransactionsCard.tsx
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
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg text-gray-900">Transaksi Terbaru</h3>
        <Link
          href="/dashboard/transactions"
          className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
        >
          Lihat Semua
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`rounded-lg bg-gray-100 p-2 ${transaction.color}`}
              >
                <transaction.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-900">{transaction.title}</p>
                <p className="text-xs text-gray-500">
                  {transaction.category} • {transaction.date}
                </p>
              </div>
            </div>

            <p
              className={
                transaction.type === "income"
                  ? "text-emerald-600"
                  : "text-red-600"
              }
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
