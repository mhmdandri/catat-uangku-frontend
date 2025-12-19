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
export type Profile = {
  id: number;
  user_id: string;
  first_name: string;
  last_name?: string | null;
  email: string;
  phone?: string | null;
  address?: string | null;
  bio?: string | null;
  birthdate?: string | null;
  age?: number | null;
  is_verified: boolean;
  created_at?: string;
  updated_at?: string;
  avatar_url?: string | null;
};
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
