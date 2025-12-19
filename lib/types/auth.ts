export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type LoginPayload = {
  email: string;
  password: string;
  remember_me?: boolean;
};
