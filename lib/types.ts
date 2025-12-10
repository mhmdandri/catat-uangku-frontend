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
export interface Account {
  id: number;
  name: string;
  type: AccountType;
  balance: number;
  accountNumber: string;
  icon: LucideIcon;
  color: string;
  transactions: number;
}
export type TransactionType = "income" | "expense";
export interface AccountTransaction {
  id: number;
  accountId: number;
  title: string;
  amount: number;
  type: TransactionType;
  date: string; // ISO string, bisa diubah ke Date kalau mau
}
