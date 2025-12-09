export type AuthLoginRequest = {
  email: string;
  password: string;
  remember_me?: boolean;
};

export type AuthRegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthResponse = {
  access_token: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  group_members: GroupMember[];
};

export type GroupMember = {
  id: string;
  user_id: string;
  group_id: string;
  role: "admin" | "member";
  joined_at: string;
  is_active: boolean;
};
