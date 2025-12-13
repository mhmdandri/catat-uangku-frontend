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
          "group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition",
          isActive
            ? "cursor-pointer hover:shadow-md"
            : "cursor-default opacity-60",
        ].join(" ")}
        onClick={isActive ? onSelect : undefined}
        aria-disabled={!isActive}
      >
        {/* overlay tipis biar kerasa disabled, tapi edit tetap bisa diklik */}
        {!isActive && (
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-white/40" />
        )}

        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`${style.color} rounded-xl p-3`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg text-gray-900">{account.name}</h3>

                {!isActive && (
                  <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
                    Nonaktif
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500">{accountNumber}</p>
            </div>
          </div>

          <div className="flex gap-1">
            {/* EDIT: selalu aktif */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(account.id);
              }}
              className={[
                "rounded-lg p-2 transition hover:bg-gray-100",
                // kalau nonaktif, tetap tampil (biar user bisa edit untuk mengaktifkan lagi)
                isActive ? "opacity-0 group-hover:opacity-100" : "opacity-100",
              ].join(" ")}
              aria-label="Edit akun"
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </button>

            {/* DELETE: dibuat disable saat nonaktif (opsional) */}
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
                  ? "opacity-0 hover:bg-red-50 group-hover:opacity-100"
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
            <p className="mb-1 text-sm text-gray-500">Saldo</p>
            <span className="ml-auto self-center rounded-full bg-gray-200 px-2 py-0.5 text-center text-xs text-gray-600">
              {account.currency || "IDR"}
            </span>
          </div>

          <p className="text-2xl text-gray-900">
            {showBalances
              ? formatMoney(balance, account.currency || "IDR")
              : "••••••••"}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ArrowUpDown className="h-4 w-4" />
            <span>{transactionCount} transaksi</span>
          </div>
          <span className="text-xs text-gray-500 capitalize">
            {account.type}
          </span>
        </div>

        {/* Kalau nonaktif, biasanya transaksi detail juga nggak perlu dibuka */}
        {isActive && isSelected && (
          <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
            <h4 className="mb-2 text-sm text-gray-700">Transaksi Terbaru</h4>

            {transactionsLoading ? (
              <p className="py-4 text-center text-sm text-gray-500">
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
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-2"
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
                      <p className="text-sm text-gray-900">
                        {transaction.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`text-sm ${
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
              <p className="py-4 text-center text-sm text-gray-500">
                Belum ada transaksi
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
