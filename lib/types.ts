import type { LucideIcon } from "lucide-react";

export type UUID = string;
export type ISODateString = string;
export type Nullable<T> = T | null;

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

export type AccountPayload = {
  owner_user_id: UUID;
  group_id?: UUID;
  name: string;
  type: "bank" | "e-wallet" | "cash";
  first_balance: number;
  currency: string;
  scope: "personal" | "group";
  is_shared: boolean;
  is_active: boolean;
};

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
export type AccountType = "bank" | "e-wallet" | "cash";

export type AccountResponse = {
  id: string;
  owner_user_id: string;
  group_id: string;
  name: string;
  type: AccountType;
  first_balance: number;
  balance: number;
  currency: string;
  scope: "personal" | "group";
  is_shared: boolean;
  is_active: boolean;
};

export interface Account {
  id: UUID;
  name: string;
  type: AccountType;
  balance: number;
  accountNumber: string;
  icon: LucideIcon;
  color: string;
  transactions?: number;
}

export interface AccountTransaction {
  id: UUID;
  accountId: UUID;
  title: string;
  amount: number;
  type: TransactionType;
  date: ISODateString;
}

export type Transaction = {
  id: UUID;
  group_id: Nullable<UUID>;
  category_id: UUID;
  created_by_user_id: UUID;
  date: ISODateString;
  type: TransactionType;
  total_amount: number;
  scope: "personal" | "group";
  description?: string;
  transaction_lines?: TransactionLine[];
};
export type TransactionType = "income" | "expense";
export interface TransactionLine {
  id: UUID;
  transaction_id: UUID;
  account_id: UUID;
  debit: number;
  credit: number;
  note: string;
}
