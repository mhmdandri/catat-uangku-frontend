import {
  ArrowDownRight,
  ArrowUpDown,
  ArrowUpRight,
  Edit,
  Trash2,
} from "lucide-react";
import React from "react";
import {
  accountTypeStyles,
  buildAccountNumber,
  formatMoney,
} from "@/lib/account-helpers";
import type { Account, AccountTransaction } from "@/lib/types";

interface AccountCardProps {
  account: Account;
  transactions: AccountTransaction[];
  transactionsLoading?: boolean;
  transactionsError?: string | null;
  isSelected: boolean;
  showBalances: boolean;
  onSelect: () => void;
  onEdit: (accountId: Account["id"]) => void;
  onDelete: (accountId: Account["id"]) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  transactions,
  transactionsLoading,
  transactionsError,
  isSelected,
  showBalances,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const style = accountTypeStyles[account.type] ?? accountTypeStyles.bank;
  const Icon = style.icon;
  const transactionCount =
    transactions.length || account.transaction_lines?.length || 0;
  const accountNumber = buildAccountNumber(account);
  const balance = account.balance ?? 0;
  const isActive = !!account.is_active;

  return (
    <>
      <div
        className={[
          "group relative rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm transition",
          isActive
            ? "cursor-pointer hover:shadow-md"
            : "cursor-default opacity-60",
        ].join(" ")}
        onClick={isActive ? onSelect : undefined}
        aria-disabled={!isActive}
      >
        {!isActive && (
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-white/40 dark:bg-black/30" />
        )}

        <div className="mb-4 flex items-start justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className={`${style.color} rounded-xl p-2.5 sm:p-3 shrink-0`}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-base sm:text-lg text-foreground">
                  {account.name}
                </h3>
                {!isActive && (
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    Nonaktif
                  </span>
                )}
              </div>

              <p className="truncate text-xs sm:text-sm text-muted-foreground">
                {accountNumber}
              </p>
            </div>
          </div>

          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(account.id);
              }}
              className={[
                "rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-white/5",
                isActive
                  ? "sm:opacity-0 sm:group-hover:opacity-100 opacity-100"
                  : "opacity-100",
              ].join(" ")}
              aria-label="Edit akun"
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isActive) return;
                onDelete(account.id);
              }}
              disabled={!isActive}
              className={[
                "rounded-lg p-2 transition",
                isActive
                  ? "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-red-50"
                  : "opacity-40 cursor-not-allowed",
              ].join(" ")}
              aria-label="Hapus akun"
              title={!isActive ? "Aktifkan akun untuk menghapus" : undefined}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex">
            <p className="mb-1 text-sm text-muted-foreground">Saldo</p>
            <span className="ml-auto self-center rounded-full bg-muted px-2 py-0.5 text-center text-xs text-muted-foreground">
              {account.currency || "IDR"}
            </span>
          </div>

          <p className="text-xl sm:text-2xl text-foreground">
            {showBalances
              ? formatMoney(balance, account.currency || "IDR")
              : "••••••••"}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-white/5 px-3 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowUpDown className="h-4 w-4" />
            <span>{transactionCount} transaksi</span>
          </div>
          <span className="text-xs text-muted-foreground capitalize">
            {account.type}
          </span>
        </div>

        {isActive && isSelected && (
          <div className="mt-4 space-y-2 border-t border-border pt-4">
            <h4 className="mb-2 text-sm text-foreground">Transaksi Terbaru</h4>

            {transactionsLoading ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                Memuat transaksi...
              </p>
            ) : transactionsError ? (
              <p className="py-4 text-center text-sm text-red-600">
                {transactionsError}
              </p>
            ) : transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-white/5 p-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`rounded p-1 ${
                        transaction.type === "income"
                          ? "bg-emerald-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowDownRight className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-foreground">
                        {transaction.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.date}
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
              ))
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                Belum ada transaksi
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
