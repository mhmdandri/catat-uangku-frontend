"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { formatMoney, getCurrencySymbol } from "@/lib/account-helpers";
import { CurrencySummary } from "@/lib/types";
interface CurrencyCardBaseProps {
  summary: CurrencySummary;
  showBalances: boolean;
  isSingleCurrency: boolean;
}
export const CurrencyCardBase: React.FC<CurrencyCardBaseProps> = ({
  summary,
  showBalances,
  isSingleCurrency,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/10 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:shadow-lg">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-xs text-white backdrop-blur-sm">
            {getCurrencySymbol(summary.currency)}
          </div>
          <div>
            <p className="text-sm text-white/90">{summary.currency}</p>
            {!isSingleCurrency && (
              <p className="text-xs text-white/60">Mata Uang</p>
            )}
          </div>
        </div>
        <TrendingUp className="h-5 w-5 text-emerald-200 opacity-75" />
      </div>
      <div className="relative mb-4">
        <p className="mb-1 text-xs text-white/70">Total</p>
        <p
          className={`text-white transition-all duration-300 ${
            isSingleCurrency ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
          }`}
        >
          {showBalances
            ? formatMoney(summary.totalBalance, summary.currency)
            : "••••••••"}
        </p>
      </div>
      <div className="relative grid grid-cols-3 gap-3 border-t border-white/20 pt-4">
        <Breakdown
          label="Bank"
          value={summary.totalBankBalance}
          currency={summary.currency}
          showBalances={showBalances}
          dotClass="bg-blue-300"
        />
        <Breakdown
          label="E-Wallet"
          value={summary.totalEWalletBalance}
          currency={summary.currency}
          showBalances={showBalances}
          dotClass="bg-purple-300"
        />
        <Breakdown
          label="Cash"
          value={summary.totalCashBalance}
          currency={summary.currency}
          showBalances={showBalances}
          dotClass="bg-emerald-300"
        />
      </div>
    </div>
  );
};
function Breakdown({
  label,
  value,
  currency,
  showBalances,
  dotClass,
}: {
  label: string;
  value: number;
  currency: string;
  showBalances: boolean;
  dotClass: string;
}) {
  return (
    <div className="group/item">
      <div className="mb-1 flex items-center gap-1">
        <div className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
        <p className="text-xs text-white/70">{label}</p>
      </div>
      <p className="text-sm text-white transition-all duration-200 group-hover/item:text-white/90">
        {showBalances
          ? formatMoney(value, currency).replace(/\s[A-Z]{3}/, "")
          : "••••"}
      </p>
    </div>
  );
}
