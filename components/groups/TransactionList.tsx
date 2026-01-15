import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { GroupTransaction } from "./types";

export default function TransactionList({
  transactions,
}: {
  transactions: GroupTransaction[];
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Transaksi Grup</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {transactions.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between hover:bg-muted/40"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`rounded-lg bg-muted p-2 ${t.color}`}>
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {t.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.username} • {t.date} • {t.category}
                  </p>
                </div>
              </div>

              <div
                className={
                  t.type === "income"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {t.type === "income" ? "+" : "-"} Rp{" "}
                {Math.abs(t.amount).toLocaleString("id-ID")}
              </div>
            </div>
          );
        })}

        {transactions.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Belum ada transaksi
          </div>
        )}
      </CardContent>
    </Card>
  );
}
