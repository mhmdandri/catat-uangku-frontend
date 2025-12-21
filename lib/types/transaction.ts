import type { Scope } from "./account";
import type { CategoryMini } from "./category";
export type TransactionType = "income" | "expense";

export type TransactionLine = {
  id: string;
  transaction_id: string;
  account_id: string;
  account_name: string;
  debit: number;
  credit: number;
  note?: string | null;
};

export type Attachment = {
  id: string;
  transaction_id: string;
  file_name: string;
  file_url: string;
  uploaded_at: string;
};

export type Transaction = {
  id: string;
  group_id?: string | null;
  category_id: string;
  created_by_user_id: string;
  date: string;
  title: string;
  type: TransactionType;
  total_amount: number;
  scope: Scope;
  description?: string | null;
  category: CategoryMini;
  transaction_lines?: TransactionLine[];
  attachments?: Attachment[];
};
export type TransactionPayload = {
  group_id?: string | null;
  category_id: string;
  account_id: string;
  date?: string;
  title: string;
  type: TransactionType;
  total_amount: number;
  scope: Scope;
  description?: string | null;
};
