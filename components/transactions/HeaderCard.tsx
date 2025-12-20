import { ArrowUpDown, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type Props = {
  totalCount?: number;
  totalIncome?: number;
  totalExpense?: number;
  isLoading?: boolean;
};

export default function HeaderCards({
  totalCount,
  totalIncome,
  totalExpense,
  isLoading = false,
}: Props) {
  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Transaksi
          </CardTitle>
          <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <div className="text-3xl font-semibold">{totalCount}</div>
          )}
          <p className="mt-1 text-xs text-muted-foreground">Semua waktu</p>
        </CardContent>
      </Card>

      <Card className="border-emerald-200/60 dark:border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-500/10 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Total Pemasukan
          </CardTitle>
          <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-9 w-28" />
          ) : (
            <div className="text-3xl font-semibold text-emerald-700 dark:text-emerald-300">
              Rp {totalIncome?.toLocaleString("id-ID")}
            </div>
          )}
          <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-300/80">
            Bulan ini
          </p>
        </CardContent>
      </Card>

      <Card className="border-red-200/60 dark:border-red-500/30 bg-red-50/60 dark:bg-red-500/10 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">
            Total Pengeluaran
          </CardTitle>
          <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-300" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-9 w-28" />
          ) : (
            <div className="text-3xl font-semibold text-red-700 dark:text-red-300">
              Rp {totalExpense?.toLocaleString("id-ID")}
            </div>
          )}
          <p className="mt-1 text-xs text-red-700/80 dark:text-red-300/80">
            Bulan ini
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
