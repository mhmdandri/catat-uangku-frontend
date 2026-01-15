export type GroupRole = "admin" | "member" | "owner";
export type GroupMember = {
  id: string;
  user_id: string;
  group_id: string;
  role: GroupRole;
  joined_at: string;
  is_active: boolean;
};

export type Group = {
  id: string;
  name: string;
  type: string;
  members?: GroupMember[];
};

export type GroupSummary = {
  totalGroups: number;
  totalMembers: number;
  totalTransactions: number;
};

export type GroupListResponse = {
  summary: GroupSummary;
  data: Group[];
};
