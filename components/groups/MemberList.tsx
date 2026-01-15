import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { GroupMember } from "./types";

type Props = {
  members: GroupMember[];
};

export default function MemberList({ members }: Props) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Anggota Grup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                {m.username.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {m.username}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {m.email}
                </p>
              </div>
            </div>

            {m.role === "admin" && <Badge variant="secondary">Admin</Badge>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
