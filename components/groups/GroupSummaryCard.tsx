import { Users, ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "../ui/card";

type Props = {
  totalGroups: number;
  totalMembers: number;
  totalTransactions: number;
};

export default function GroupSummaryCards({
  totalGroups,
  totalMembers,
  totalTransactions,
}: Props) {
  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="shadow-sm">
        <CardContent className="p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Grup</span>
            <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-semibold text-foreground">
            {totalGroups}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Grup aktif</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Anggota</span>
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-semibold text-foreground">
            {totalMembers}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Dari semua grup</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Transaksi Grup
            </span>
            <ArrowUpDown className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-3xl font-semibold text-foreground">
            {totalTransactions}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Total transaksi</p>
        </CardContent>
      </Card>
    </div>
  );
}
