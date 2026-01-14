"use client";

import { useMemo, useState, useCallback } from "react";
import type { Group, GroupMember, GroupSummary } from "@/lib/types/group";
import GroupListView from "./GroupListView";
//import GroupDetailView from "./GroupDetailView";
// import AddGroupModal from "./AddGroupModal";
// import AddMemberModal from "./AddMemberModal";
// import AddTransactionModal from "./AddTransactionModal";
import GroupSummaryCards from "./GroupSummaryCard";

type GroupPageProps = {
  data: Group[];
  summary?: GroupSummary;
};

export default function GroupsPage({ data, summary }: GroupPageProps) {
  const [, setSelectedGroupId] = useState<string | null>(null);

  // const [openAddGroup, setOpenAddGroup] = useState(false);
  // const [openAddMember, setOpenAddMember] = useState(false);
  // const [openAddTransaction, setOpenAddTransaction] = useState(false);

  const groups = data ?? [];

  const getGroupMembers = useCallback(
    (groupId: string): GroupMember[] => {
      const group = groups.find((item) => item.id === groupId);
      if (!group?.members?.length) return [];
      return group.members.filter((member) => member.is_active);
    },
    [groups]
  );

  // const isGroupAdmin = useCallback(
  //   (groupId: string) => {
  //     if (!user?.id) return false;
  //     const me = getGroupMembers(groupId).find(
  //       (member) => member.user_id === user.id
  //     );
  //     return me?.role === "admin" || me?.role === "owner";
  //   },
  //   [getGroupMembers, user?.id]
  // );

  const totalMembers = useMemo(() => {
    if (summary) return summary.totalMembers;
    return groups.reduce((sum, group) => {
      const activeMembers =
        group.members?.filter((member) => member.is_active) ?? [];
      return sum + activeMembers.length;
    }, 0);
  }, [groups, summary]);

  const totalGroups = summary?.totalGroups ?? groups.length;
  const totalTransactions = summary?.totalTransactions ?? 0;

  // const currentGroup = useMemo(
  //   () => groups.find((g) => g.id === selectedGroupId) ?? null,
  //   [groups, selectedGroupId]
  // );

  // const currentMembers = useMemo(
  //   () => (selectedGroupId ? getGroupMembers(selectedGroupId) : []),
  //   [selectedGroupId, getGroupMembers]
  // );

  // const currentTransactions = useMemo(
  //   () => (selectedGroupId ? getGroupTransactions(selectedGroupId) : []),
  //   [selectedGroupId, getGroupTransactions]
  // );

  // const currentIsAdmin = selectedGroupId
  //   ? isGroupAdmin(selectedGroupId)
  //   : false;
  // const totalMembers = groups.reduce((sum, g) => sum + g.memberCount, 0);

  return (
    <>
      <div className="bg-background text-foreground space-y-4 sm:space-y-6">
        <GroupSummaryCards
          totalGroups={totalGroups}
          totalMembers={totalMembers}
          totalTransactions={totalTransactions}
        />
        <GroupListView
          groups={groups}
          getGroupMembers={getGroupMembers}
          //isGroupAdmin={isGroupAdmin}
          onSelectGroup={(id) => setSelectedGroupId(id)}
          //onOpenAddGroup={() => setOpenAddGroup(true)}
        />
        {/* {!selectedGroupId || !currentGroup ? (
          <>
            <GroupSummaryCards
              totalGroups={groups.length}
              totalMembers={totalMembers}
              totalTransactions={transactions.length}
            />
            <GroupListView
              groups={groups}
              getGroupMembers={getGroupMembers}
              isGroupAdmin={isGroupAdmin}
              onSelectGroup={(id) => setSelectedGroupId(id)}
              onOpenAddGroup={() => setOpenAddGroup(true)}
            />
          </>
        ) : (
          <GroupDetailView
            group={currentGroup}
            members={currentMembers}
            transactions={currentTransactions}
            isAdmin={currentIsAdmin}
            onBack={() => setSelectedGroupId(null)}
            //onOpenAddMember={() => setOpenAddMember(true)}
            //onOpenAddTransaction={() => setOpenAddTransaction(true)}
          />
        )} */}
      </div>

      {/* Modals */}
      {/* <AddGroupModal
        open={openAddGroup}
        onOpenChange={setOpenAddGroup}
        onSubmit={(data) => {
          console.log("Adding group:", data);
          setOpenAddGroup(false);
        }}
      />

      <AddMemberModal
        open={openAddMember}
        onOpenChange={setOpenAddMember}
        onSubmit={(data) => {
          console.log("Adding member to group:", selectedGroupId, data);
          setOpenAddMember(false);
        }}
      />

      <AddTransactionModal
        open={openAddTransaction}
        onOpenChange={setOpenAddTransaction}
        onSubmit={(data) => {
          console.log("Adding transaction to group:", selectedGroupId, data);
          setOpenAddTransaction(false);
        }}
      /> */}
    </>
  );
}
