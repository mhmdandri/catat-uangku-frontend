import {
  ArrowDownRight,
  ArrowUpDown,
  ArrowUpRight,
  Edit,
  Trash2,
} from "lucide-react";
import React from "react";
import type { Account, AccountTransaction } from "@/lib/types";

interface AccountCardProps {
  account: Account;
  transactions: AccountTransaction[];
  isSelected: boolean;
  showBalances: boolean;
  onSelect: () => void;
  onEdit: (accountId: number) => void;
  onDelete: (accountId: number) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  transactions,
  isSelected,
  showBalances,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const Icon = account.icon;

  return (
    <div
      className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
      onClick={onSelect}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`${account.color} rounded-xl p-3`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg text-gray-900">{account.name}</h3>
            <p className="text-sm text-gray-500">{account.accountNumber}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(account.id);
            }}
            className="rounded-lg p-2 opacity-0 transition hover:bg-gray-100 group-hover:opacity-100"
          >
            <Edit className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(account.id);
            }}
            className="rounded-lg p-2 opacity-0 transition hover:bg-red-50 group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      </div>

      <div className="mb-3">
        <p className="mb-1 text-sm text-gray-500">Saldo</p>
        <p className="text-2xl text-gray-900">
          {showBalances
            ? `Rp ${account.balance.toLocaleString("id-ID")}`
            : "Rp ••••••••"}
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ArrowUpDown className="h-4 w-4" />
          <span>{account.transactions} transaksi</span>
        </div>
        <span className="text-xs text-gray-500 capitalize">{account.type}</span>
      </div>

      {isSelected && (
        <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
          <h4 className="mb-2 text-sm text-gray-700">Transaksi Terbaru</h4>
          {transactions.length > 0 ? (
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
                    <p className="text-sm text-gray-900">{transaction.title}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
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
  );
};
