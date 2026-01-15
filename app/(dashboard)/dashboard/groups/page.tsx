import GroupPage from "@/components/groups/GroupPage";
import { serverGet } from "@/lib/api/server";
import { AuthMeResponse } from "@/lib/types/auth";
import { GroupListResponse } from "@/lib/types/group";
import React from "react";

const getGroups = async () => {
  const user = await serverGet<AuthMeResponse>("/auth/me");
  const res = await serverGet<GroupListResponse>(
    `/groups/user/${user.data.id}`
  );
  return res;
};

const page = async () => {
  const { data: groups, summary } = await getGroups();
  return (
    <>
      <GroupPage data={groups} summary={summary} />
    </>
  );
};

export default page;
