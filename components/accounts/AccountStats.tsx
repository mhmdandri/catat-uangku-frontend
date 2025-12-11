import { CreditCard, TrendingUp, Wallet } from "lucide-react";
import React from "react";
import type { Account } from "@/lib/types";

interface AccountStatsProps {
  accounts: Account[];
  showBalances: boolean;
}

export const AccountStats: React.FC<AccountStatsProps> = ({
  accounts,
  showBalances,
}) => {
  const hasAccounts = accounts.length > 0;

  const mostUsedAccount = hasAccounts
    ? accounts.reduce((max, acc) =>
        (acc.transactions ?? 0) > (max.transactions ?? 0) ? acc : max
      )
    : null;

  const highestBalanceAccount = hasAccounts
    ? accounts.reduce((max, acc) => (acc.balance > max.balance ? acc : max))
    : null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg text-gray-900">Total Rekening</h3>
          <CreditCard className="h-6 w-6 text-emerald-600" />
        </div>
        <p className="text-3xl text-gray-900">{accounts.length ?? "-"}</p>
        <p className="mt-2 text-sm text-gray-500">Rekening aktif</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg text-gray-900">Rekening Terbanyak</h3>
          <TrendingUp className="h-6 w-6 text-blue-600" />
        </div>
        <p className="text-2xl text-gray-900">{mostUsedAccount?.name || "-"}</p>
        <p className="mt-2 text-sm text-gray-500">
          {hasAccounts
            ? `${mostUsedAccount?.transactions ?? 0} transaksi`
            : "Belum ada data transaksi"}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg text-gray-900">Saldo Terbesar</h3>
          <Wallet className="h-6 w-6 text-purple-600" />
        </div>
        <p className="text-2xl text-gray-900">
          {highestBalanceAccount?.name || "-"}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          {hasAccounts
            ? showBalances
              ? `Rp ${highestBalanceAccount?.balance.toLocaleString("id-ID")}`
              : "Rp ••••••••"
            : "Belum ada saldo"}
        </p>
      </div>
    </div>
  );
};
