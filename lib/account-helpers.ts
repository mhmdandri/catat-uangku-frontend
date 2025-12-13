import { Banknote, Building2, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  Account,
  AccountPayload,
  AccountTotals,
  AccountTransaction,
  AccountTransactionsLoadingMap,
  AccountTransactionsMap,
  AccountType,
  AddAccountFormData,
  CurrencySummary,
  Transaction,
  UUID,
} from "./types";

type AccountTypeStyle = {
  icon: LucideIcon;
  color: string;
};

export const accountTypeStyles: Record<AccountType, AccountTypeStyle> = {
  bank: { icon: Building2, color: "bg-blue-500" },
  "e-wallet": { icon: Smartphone, color: "bg-purple-500" },
  cash: { icon: Banknote, color: "bg-emerald-500" },
};

export const buildAccountNumber = (account: Account): string => {
  if (account.number) {
    if (account.type === "bank") {
      return `***${account.number.slice(-4)}`;
    }
    return `${account.number.slice(0, 4)}****${account.number.slice(-4)}`;
  }
  return "-";
};

export const mapTransactionResponses = (
  data: Transaction[],
  accountId: UUID
): AccountTransaction[] =>
  data.map((item) => {
    const line = item.transaction_lines?.find(
      (l) => l.account_id === accountId
    );
    const lineAmount = line ? line.credit - line.debit : item.total_amount ?? 0;
    const signedAmount =
      item.type === "expense" ? -Math.abs(lineAmount) : Math.abs(lineAmount);
    return {
      id: item.id,
      accountId,
      title:
        item.description ||
        (item.type === "income" ? "Pemasukan" : "Pengeluaran"),
      amount: signedAmount,
      type: item.type,
      date: item.date,
    };
  });

export const calculateAccountTotals = (accounts: Account[]): AccountTotals =>
  accounts.reduce(
    (totals, acc) => {
      const balance = acc.balance ?? 0;
      totals.totalBalance += balance;
      if (acc.type === "bank") totals.totalBankBalance += balance;
      if (acc.type === "e-wallet") totals.totalEWalletBalance += balance;
      if (acc.type === "cash") totals.totalCashBalance += balance;
      return totals;
    },
    {
      totalBalance: 0,
      totalBankBalance: 0,
      totalEWalletBalance: 0,
      totalCashBalance: 0,
    }
  );

export const shouldFetchTransactions = (
  accountId: UUID,
  transactionsByAccount: AccountTransactionsMap,
  transactionsLoading: AccountTransactionsLoadingMap
): boolean =>
  !transactionsByAccount[accountId] && !transactionsLoading[accountId];

export const createAccountPayload = (
  formData: AddAccountFormData,
  userId: UUID
): AccountPayload => ({
  owner_user_id: userId,
  name: formData.name,
  type: formData.type,
  first_balance: formData.first_balance || 0,
  number: formData.number?.trim() || null,
  currency: formData.currency?.trim() || "",
  scope: "personal",
  is_shared: false,
  is_active: true,
});

export function calculateAccountTotalsByCurrency(
  accounts: Account[]
): CurrencySummary[] {
  const map = new Map<string, CurrencySummary>();

  for (const acc of accounts) {
    const currency = acc.currency ?? "IDR";
    const balance = acc.balance ?? 0;

    if (!map.has(currency)) {
      map.set(currency, {
        currency,
        totalBalance: 0,
        totalBankBalance: 0,
        totalEWalletBalance: 0,
        totalCashBalance: 0,
      });
    }

    const s = map.get(currency)!;
    s.totalBalance += balance;

    if (acc.type === "bank") s.totalBankBalance += balance;
    else if (acc.type === "e-wallet") s.totalEWalletBalance += balance;
    else if (acc.type === "cash") s.totalCashBalance += balance;
  }
  return Array.from(map.values()).sort((a, b) =>
    a.currency === "IDR"
      ? -1
      : b.currency === "IDR"
      ? 1
      : a.currency.localeCompare(b.currency)
  );
}

export const createInitialAccountForm = (): AddAccountFormData => ({
  name: "",
  type: "bank",
  number: "",
  first_balance: 0,
});

export const CURRENCIES = [
  { code: "IDR", label: "Rupiah (IDR)", symbol: "Rp" },
  { code: "SGD", label: "Singapore Dollar (SGD)", symbol: "S$" },
  { code: "MYR", label: "Malaysian Ringgit (MYR)", symbol: "RM" },
  { code: "THB", label: "Thai Baht (THB)", symbol: "฿" },
  { code: "PHP", label: "Philippine Peso (PHP)", symbol: "₱" },
  { code: "VND", label: "Vietnamese Dong (VND)", symbol: "₫" },
  { code: "JPY", label: "Japanese Yen (JPY)", symbol: "¥" },
  { code: "CNY", label: "Chinese Yuan (CNY)", symbol: "¥" },
  { code: "KRW", label: "South Korean Won (KRW)", symbol: "₩" },
  { code: "INR", label: "Indian Rupee (INR)", symbol: "₹" },
  { code: "USD", label: "US Dollar (USD)", symbol: "$" },
  { code: "CAD", label: "Canadian Dollar (CAD)", symbol: "C$" },
  { code: "BRL", label: "Brazilian Real (BRL)", symbol: "R$" },
  { code: "MXN", label: "Mexican Peso (MXN)", symbol: "$" },
  { code: "EUR", label: "Euro (EUR)", symbol: "€" },
  { code: "GBP", label: "British Pound (GBP)", symbol: "£" },
  { code: "CHF", label: "Swiss Franc (CHF)", symbol: "CHF" },
  { code: "SEK", label: "Swedish Krona (SEK)", symbol: "kr" },
  { code: "NOK", label: "Norwegian Krone (NOK)", symbol: "kr" },
  { code: "DKK", label: "Danish Krone (DKK)", symbol: "kr" },
  { code: "SAR", label: "Saudi Riyal (SAR)", symbol: "﷼" },
  { code: "AED", label: "UAE Dirham (AED)", symbol: "د.إ" },
  { code: "AUD", label: "Australian Dollar (AUD)", symbol: "A$" },
  { code: "NZD", label: "New Zealand Dollar (NZD)", symbol: "NZ$" },
  { code: "ZAR", label: "South African Rand (ZAR)", symbol: "R" },
];

export const getCurrencyByCode = (code?: string) =>
  CURRENCIES.find((c) => c.code === code);

export const getCurrencySymbol = (code?: string) =>
  getCurrencyByCode(code)?.symbol ?? "Rp";

export const formatMoney = (
  amount: number,
  currency = "IDR",
  locale = "id-ID"
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
