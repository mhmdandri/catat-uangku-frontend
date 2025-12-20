import { LoaderIcon, X } from "lucide-react";
import React from "react";
import { SelectCurrency } from "../SelectCurrency";
import { AddAccountFormData, AccountType } from "@/lib/types/account";

interface AddAccountModalProps {
  open: boolean;
  formData: AddAccountFormData;
  onClose: () => void;
  onChange: (data: AddAccountFormData) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
  open,
  formData,
  onClose,
  onChange,
  onSubmit,
  isLoading = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md rounded-xl bg-card border border-border p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl text-foreground">Tambah Rekening Baru</h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama"
              className="mb-2 block text-sm text-muted-foreground"
            >
              Nama Rekening
            </label>
            <input
              id="nama"
              type="text"
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground px-4 py-2.5 sm:py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              placeholder="Contoh: BCA - Main"
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <label
              htmlFor="no"
              className="mb-2 block text-sm text-muted-foreground"
            >
              No Rekening
            </label>
            <input
              id="no"
              type="text"
              value={formData.number}
              onChange={(e) =>
                onChange({ ...formData, number: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground px-4 py-2.5 sm:py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              placeholder="4123-456-7890"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="mb-2 block text-sm text-muted-foreground"
            >
              Tipe Rekening
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) =>
                onChange({
                  ...formData,
                  type: e.target.value as AccountType,
                })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground px-4 py-2.5 sm:py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              disabled={isLoading}
            >
              <option value="bank">Bank</option>
              <option value="e-wallet">E-Wallet</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="currency"
              className="mb-2 block text-sm text-muted-foreground"
            >
              Mata Uang
            </label>
            <SelectCurrency
              id="currency"
              value={formData.currency || ""}
              onChange={(value) =>
                onChange({
                  ...formData,
                  currency: value,
                })
              }
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="balance"
              className="mb-2 block text-sm text-muted-foreground"
            >
              Saldo Awal
            </label>
            <input
              id="balance"
              type="number"
              value={formData.first_balance}
              onChange={(e) =>
                onChange({
                  ...formData,
                  first_balance: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground px-4 py-2.5 sm:py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              placeholder="0"
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="w-full sm:flex-1 rounded-lg border border-border px-4 py-2.5 text-foreground transition hover:bg-gray-50 dark:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && <LoaderIcon className="h-4 w-4 animate-spin" />}
              Tambah Rekening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
