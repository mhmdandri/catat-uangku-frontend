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

export type AuthMeSummary = {
  totalTransaction: number;
  totalAccount: number;
  totalGroup: number;
  durationMember: number;
};

export type AuthMeUserProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  bio: string;
  avatarUrl: string;
};

export type AuthMeData = {
  id: string;
  name: string;
  email: string;
};

export type AuthMeResponse = {
  summary: AuthMeSummary;
  userProfile: AuthMeUserProfile;
  data: AuthMeData;
};
