import type { TransactionLine } from "./transaction";

export type AccountType = "bank" | "e-wallet" | "cash";
export type Scope = "personal" | "group";
export type Account = {
  id: string;
  owner_user_id: string;
  group_id?: string | null;
  first_balance?: number | null;
  balance?: number | null;
  is_shared: boolean;
  is_active: boolean;
  transaction_lines?: TransactionLine[];
  name: string;
  type: AccountType;
  number?: string | null;
  currency?: string | null;
  scope: Scope;
};
export type AccountTotals = {
  totalBalance: number;
  totalBankBalance: number;
  totalEWalletBalance: number;
  totalCashBalance: number;
};
export type EditAccountPayload = {
  name: string;
  type: AccountType;
  currency: string;
  number?: string | null;
  is_shared?: boolean;
  is_active: boolean;
};
export type Summary = {
  currency: string;
  totalBalance: number;
  totalBankBalance: number;
  totalEWalletBalance: number;
  totalCashBalance: number;
};
export type AddAccountFormData = {
  name: string;
  number: string;
  type: AccountType;
  currency?: string | null;
  first_balance: number;
};
export type AccountPayload = {
  owner_user_id: string;
  group_id?: string | null;
  name: string;
  type: AccountType;
  number?: string | null;
  first_balance: number;
  currency: string;
  scope: Scope;
  is_shared: boolean;
  is_active: boolean;
};
