import { CreditCard, TrendingUp, Wallet } from "lucide-react";
import React from "react";
import type { Account, AccountTransactionsMap } from "@/lib/types";

interface AccountStatsProps {
  accounts: Account[];
  showBalances: boolean;
  transactionsByAccount: AccountTransactionsMap;
}

export const AccountStats: React.FC<AccountStatsProps> = ({
  accounts,
  showBalances,
  transactionsByAccount,
}) => {
  const hasAccounts = accounts.length > 0;

  const getTxCount = (acc: Account) =>
    transactionsByAccount[acc.id]?.length ?? acc.transaction_lines?.length ?? 0;

  const mostUsedAccount = hasAccounts
    ? accounts.reduce((max, acc) => {
        const currentCount = getTxCount(acc);
        const maxCount = getTxCount(max);
        return currentCount > maxCount ? acc : max;
      })
    : null;

  const highestBalanceAccount = hasAccounts
    ? accounts.reduce((max, acc) => {
        const accBalance = acc.balance ?? 0;
        const maxBalance = max.balance ?? 0;
        return accBalance > maxBalance ? acc : max;
      })
    : null;

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <h3 className="text-base sm:text-lg text-foreground">
            Total Rekening
          </h3>
          <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
        </div>
        <p className="text-2xl sm:text-3xl text-foreground">
          {accounts.length ?? "-"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Rekening aktif</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <h3 className="text-base sm:text-lg text-foreground">
            Rekening Terbanyak
          </h3>
          <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
        </div>
        <p className="text-2xl sm:text-3xl text-foreground">
          {mostUsedAccount?.name || "-"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {hasAccounts
            ? `${getTxCount(mostUsedAccount!)} transaksi`
            : "Belum ada data transaksi"}
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <h3 className="text-base sm:text-lg text-foreground">
            Saldo Terbesar
          </h3>
          <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
        </div>
        <p className="text-2xl sm:text-3xl text-foreground">
          {highestBalanceAccount?.name || "-"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {hasAccounts
            ? showBalances
              ? `Rp ${(highestBalanceAccount?.balance ?? 0).toLocaleString(
                  "id-ID"
                )}`
              : "Rp ••••••••"
            : "Belum ada saldo"}
        </p>
      </div>
    </div>
  );
};
