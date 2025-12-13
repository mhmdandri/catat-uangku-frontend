import { X } from "lucide-react";
import React from "react";
import type { AddAccountFormData, AccountType } from "@/lib/types";
import { SelectCurrency } from "../SelectCurrency";

interface AddAccountModalProps {
  open: boolean;
  formData: AddAccountFormData;
  onClose: () => void;
  onChange: (data: AddAccountFormData) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
  open,
  formData,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl text-gray-900">Tambah Rekening Baru</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Nama Rekening
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              placeholder="Contoh: BCA - Main"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-700">
              No Rekening
            </label>
            <input
              type="text"
              value={formData.number || ""}
              onChange={(e) =>
                onChange({ ...formData, number: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              placeholder="4123-456-7890"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Tipe Rekening
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                onChange({
                  ...formData,
                  type: e.target.value as AccountType,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            >
              <option value="bank">Bank</option>
              <option value="e-wallet">E-Wallet</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="currency"
              className="mb-2 block text-sm text-gray-700"
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
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Saldo Awal
            </label>
            <input
              type="number"
              value={formData.first_balance}
              onChange={(e) =>
                onChange({
                  ...formData,
                  first_balance: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              placeholder="0"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              Tambah Rekening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
