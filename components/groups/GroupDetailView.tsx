import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import MemberList from "./MemberList";
import TransactionList from "./TransactionList";
import type { Group, GroupMember, GroupTransaction } from "./types";

type Props = {
  group: Group;
  members: GroupMember[];
  transactions: GroupTransaction[];
  isAdmin: boolean;
  onBack: () => void;
  onOpenAddMember: () => void;
  onOpenAddTransaction: () => void;
};

export default function GroupDetailView({
  group,
  members,
  transactions,
}: Props) {
  const balance = group.totalIncome - group.totalExpense;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* summary cards */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Saldo Grup</span>
              <Wallet className="h-5 w-5 text-muted-foreground" />
            </div>
            <div
              className={`text-3xl font-semibold ${
                balance >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              Rp {Math.abs(balance).toLocaleString("id-ID")}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {balance >= 0 ? "Surplus" : "Defisit"}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total Pemasukan
              </span>
              <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-3xl font-semibold text-emerald-600 dark:text-emerald-400">
              Rp {group.totalIncome.toLocaleString("id-ID")}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Total income</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total Pengeluaran
              </span>
              <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-3xl font-semibold text-red-600 dark:text-red-400">
              Rp {group.totalExpense.toLocaleString("id-ID")}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Total expense</p>
          </CardContent>
        </Card>
      </div>

      {/* main grid: transaksi + anggota */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TransactionList transactions={transactions} />
        </div>
        <MemberList members={members} />
      </div>
    </div>
  );
}
