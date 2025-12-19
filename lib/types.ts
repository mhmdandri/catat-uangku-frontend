export type UUID = string;
export type ISODateString = string;
export type Nullable<T> = T | null;
export type DataScope = "personal" | "group";
export type AccountType = "bank" | "e-wallet" | "cash";

/**
 * Auth
 */
export type AuthLoginPayload = {
  email: string;
  password: string;
  remember_me?: boolean;
};
export type AuthRegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type AuthTokenResponse = {
  access_token: string;
};
/**
 * Profile
 */
export type Profile = {
  id: number;
  user_id: UUID;
  first_name: string;
  last_name?: Nullable<string>;
  email: string;
  phone?: Nullable<string>;
  address?: Nullable<string>;
  bio?: Nullable<string>;
  birthdate?: Nullable<ISODateString>;
  age?: Nullable<number>;
  is_verified: boolean;
  created_at?: ISODateString;
  updated_at?: ISODateString;
  avatar_url?: Nullable<string>;
};
export type PasswordChangePayload = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};
export type ProfileUpdatePayload = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  birthdate?: string;
  age?: number;
};

/**
 * Transactions
 */
export type TransactionBase = {
  group_id?: Nullable<UUID>;
  category_id: UUID;
  account_id: UUID;
  date?: ISODateString;
  title: string;
  type: TransactionType;
  total_amount?: Nullable<number>;
  scope: DataScope;
  description?: Nullable<string>;
};
export type TransactionPayload = TransactionBase & {
  created_by_user_id: UUID;
};
export type Transaction = TransactionBase & {
  id: UUID;
  created_by_user_id: UUID;
  category: Category;
  transaction_lines?: TransactionLine[];
};

/**
 * Accounts
 */
export type AccountBase = {
  name: string;
  type: AccountType;
  number?: Nullable<string>;
  currency?: Nullable<string>;
  scope: DataScope;
};
export type AccountPayload = AccountBase & {
  owner_user_id: UUID;
  group_id?: Nullable<UUID>;
  first_balance: number;
  is_shared: boolean;
  is_active: boolean;
};
export type EditAccountPayload = Partial<AccountBase> & {
  type: AccountType;
  is_active?: boolean;
};
export type AddAccountFormData = Pick<
  AccountPayload,
  "name" | "type" | "number" | "currency" | "first_balance"
>;
/**
 * User & Groups
 */
export type GroupRole = "admin" | "member";
export type GroupMember = {
  id: UUID;
  user_id: UUID;
  group_id: UUID;
  role: GroupRole;
  joined_at: ISODateString;
  is_active: boolean;
};
export type User = {
  id: UUID;
  name: string;
  email: string;
  created_at: ISODateString;
  group_members?: GroupMember[];
  accounts?: AccountResponse[];
  profile?: Nullable<Profile>;
};
/**
 * UI Preferences (local only)
 */
export type Preferences = {
  currency: string;
  language: string;
  theme: "light" | "dark" | "system";
  notifications: {
    email: boolean;
    push: boolean;
    budgetAlert: boolean;
    transactionReminder: boolean;
  };
  privacy: {
    showBalance: boolean;
    profilePublic: boolean;
  };
};
export type AccountResponse = AccountBase & {
  id: UUID;
  owner_user_id: UUID;
  group_id?: Nullable<UUID>;
  first_balance?: Nullable<number>;
  balance?: Nullable<number>;
  is_shared: boolean;
  is_active: boolean;
  transaction_lines?: TransactionLine[];
};
export type Account = AccountResponse;
export type CurrencySummary = {
  currency: string;
  totalBalance: number;
  totalBankBalance: number;
  totalEWalletBalance: number;
  totalCashBalance: number;
};
export type AccountTotals = {
  totalBalance: number;
  totalBankBalance: number;
  totalEWalletBalance: number;
  totalCashBalance: number;
};
export type AccountTransaction = {
  id: UUID;
  accountId: UUID;
  title: string;
  amount: number;
  type: TransactionType;
  date: ISODateString;
};
export type AccountTransactionsMap = Record<UUID, AccountTransaction[]>;
export type AccountTransactionsLoadingMap = Record<UUID, boolean>;
export type AccountTransactionsErrorMap = Record<UUID, string | null>;
export type TransactionType = "income" | "expense";
export type TransactionTypeFilter = "all" | TransactionType;
export interface TransactionLine {
  id: UUID;
  transaction_id: UUID;
  account_id: UUID;
  account_name: string;
  debit: number;
  credit: number;
  note: string;
}

export type Category = {
  id: UUID;
  group_id?: Nullable<UUID>;
  owner_user_id: UUID;
  name: string;
  type: TransactionType;
  color?: Nullable<string>;
  icon?: Nullable<string>;
};
