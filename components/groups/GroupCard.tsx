import { ChevronRight, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import type { Group, GroupMember } from "@/lib/types/group";

type Props = {
  group: Group;
  members: GroupMember[];
  isAdmin: boolean;
  onSelect: (groupId: string) => void;
};

export default function GroupCard({
  group,
  members,
  isAdmin,
  onSelect,
}: Props) {
  const memberCount = members.length;
  const roleLabel = isAdmin ? "Admin" : "Member";
  const trimmedType = group.type.trim();
  const typeLabel = trimmedType.length > 0 ? trimmedType : "-";

  return (
    <Card
      className="cursor-pointer transition hover:shadow-md"
      onClick={() => onSelect(group.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(group.id)}
    >
      <CardContent className="p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400">
              <Users className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-semibold text-foreground">
                  {group.name}
                </h3>
                {isAdmin && <Badge variant="secondary">Admin</Badge>}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                Tipe: {typeLabel}
              </p>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Anggota Aktif</span>
            <span className="text-foreground">{memberCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Peran Anda</span>
            <span className="text-foreground">{roleLabel}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="flex -space-x-2">
            {members.slice(0, 3).map((m) => (
              <div
                key={m.id}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-emerald-600 text-xs text-white"
                title={m.user_id}
              >
                {m.user_id.charAt(0).toUpperCase()}
              </div>
            ))}
            {members.length > 3 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs text-muted-foreground">
                +{members.length - 3}
              </div>
            )}
          </div>

          <span className="text-sm text-muted-foreground">
            {memberCount} anggota
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
