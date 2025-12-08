export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthRegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthResponse = {
  access_token: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
};
