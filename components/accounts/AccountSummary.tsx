import { Wallet } from "lucide-react";
import React from "react";

interface AccountSummaryProps {
  totalBalance: number;
  totalBankBalance: number;
  totalEWalletBalance: number;
  totalCashBalance: number;
  showBalances: boolean;
}

export const AccountSummary: React.FC<AccountSummaryProps> = ({
  totalBalance,
  totalBankBalance,
  totalEWalletBalance,
  totalCashBalance,
  showBalances,
}) => {
  return (
    <div className="mb-6 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-700 p-8 text-white shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="mb-2 text-sm opacity-90">Total Saldo Keseluruhan</p>
          <p className="text-4xl">
            {showBalances
              ? `Rp ${totalBalance.toLocaleString("id-ID")}`
              : "Rp ••••••••"}
          </p>
        </div>
        <Wallet className="h-12 w-12 opacity-75" />
      </div>
      <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-4">
        <div>
          <p className="mb-1 text-xs opacity-75">Bank</p>
          <p className="text-lg">
            {showBalances
              ? `Rp ${totalBankBalance.toLocaleString("id-ID")}`
              : "Rp ••••••"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs opacity-75">E-Wallet</p>
          <p className="text-lg">
            {showBalances
              ? `Rp ${totalEWalletBalance.toLocaleString("id-ID")}`
              : "Rp ••••••"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs opacity-75">Cash</p>
          <p className="text-lg">
            {showBalances
              ? `Rp ${totalCashBalance.toLocaleString("id-ID")}`
              : "Rp ••••••"}
          </p>
        </div>
      </div>
    </div>
  );
};
