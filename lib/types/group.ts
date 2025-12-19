export type GroupRole = "admin" | "member";
export type GroupMember = {
  id: string;
  user_id: string;
  group_id: string;
  role: GroupRole;
  joined_at: string;
  is_active: boolean;
};
