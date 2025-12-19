import type { TransactionType } from "./transaction";

export type Category = {
  id: string;
  group_id?: string | null;
  owner_user_id: string | null;
  name: string;
  type: TransactionType;
  color?: string | null;
  icon?: string | null;
};

export type CategoryMini = {
  id: string;
  name: string;
  type: TransactionType;
  color?: string | null;
  icon: string;
};
