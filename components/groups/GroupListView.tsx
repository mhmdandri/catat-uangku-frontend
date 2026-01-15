import GroupCard from "./GroupCard";
import type { Group, GroupMember } from "@/lib/types/group";

type Props = {
  groups: Group[];
  getGroupMembers: (groupId: string) => GroupMember[];
  isGroupAdmin?: (groupId: string) => boolean;
  onSelectGroup: (groupId: string) => void;
  onOpenAddGroup?: () => void;
};

export default function GroupListView({
  groups,
  getGroupMembers,
  isGroupAdmin,
  onSelectGroup,
}: Props) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Grid responsive */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((g) => (
          <GroupCard
            key={g.id}
            group={g}
            members={getGroupMembers(g.id)}
            isAdmin={isGroupAdmin?.(g.id) ?? false}
            onSelect={onSelectGroup}
          />
        ))}
      </div>
    </div>
  );
}
