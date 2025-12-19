import { Account } from "./account";
import { GroupMember } from "./group";
import { Profile } from "./profile";

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  group_members?: GroupMember[];
  accounts?: Account[];
  profile?: Profile;
};
