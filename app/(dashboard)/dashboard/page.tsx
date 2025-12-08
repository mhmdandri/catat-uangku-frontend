"use client";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Coffee,
  ShoppingBag,
  Home,
  Car,
  Pizza,
  Heart,
} from "lucide-react";
import TitleCard from "./TitleCard";
import { MonthlyFinanceChart } from "./MonthlyChart";
import { CategoryExpenseChart } from "./CategoryChart";
import { RecentTransactionsCard } from "./RecentTrxCard";
import { GoalsCard } from "./GoalsCard";
import { BudgetCard } from "./BudgetCard";

export default function DashboardPage() {
  const userData = {
    totalBalance: 12500000,
    totalIncome: 8000000,
    totalExpense: 1365000,
  };

  const balanceCards: Array<{
    title: string;
    total: number;
    icon: React.ReactNode;
    variant: "primary" | "income" | "expense";
  }> = [
    {
      title: "Saldo Total",
      total: userData.totalBalance,
      icon: <Wallet className="h-5 w-5 opacity-75" />,
      variant: "primary",
    },
    {
      title: "Pemasukan",
      total: userData.totalIncome,
      icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
      variant: "income",
    },
    {
      title: "Pengeluaran",
      total: userData.totalExpense,
      icon: <TrendingDown className="h-5 w-5 text-red-600" />,
      variant: "expense",
    },
  ];

  const recentTransactions: Array<{
    id: number;
    title: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    icon: typeof TrendingUp;
    color: string;
    date: string;
  }> = [
    {
      id: 1,
      title: "Gaji Bulanan",
      amount: 8000000,
      type: "income",
      category: "Salary",
      icon: TrendingUp,
      color: "text-emerald-600",
      date: "2025-12-01",
    },
    {
      id: 2,
      title: "Kopi & Snack",
      amount: -45000,
      type: "expense",
      category: "Food",
      icon: Coffee,
      color: "text-orange-600",
      date: "2025-12-06",
    },
    {
      id: 3,
      title: "Belanja Bulanan",
      amount: -850000,
      type: "expense",
      category: "Shopping",
      icon: ShoppingBag,
      color: "text-purple-600",
      date: "2025-12-05",
    },
    {
      id: 4,
      title: "Listrik & Air",
      amount: -320000,
      type: "expense",
      category: "Bills",
      icon: Home,
      color: "text-blue-600",
      date: "2025-12-03",
    },
    {
      id: 5,
      title: "Bensin",
      amount: -150000,
      type: "expense",
      category: "Transport",
      icon: Car,
      color: "text-red-600",
      date: "2025-12-07",
    },
  ];

  const categoryExpenses = [
    { name: "Makanan", value: 450000, color: "#f97316" },
    { name: "Belanja", value: 850000, color: "#a855f7" },
    { name: "Tagihan", value: 320000, color: "#3b82f6" },
    { name: "Transport", value: 280000, color: "#ef4444" },
    { name: "Lainnya", value: 200000, color: "#6b7280" },
  ];

  const monthlyData = [
    { month: "Jul", income: 7500000, expense: 4200000 },
    { month: "Agu", income: 8200000, expense: 4500000 },
    { month: "Sep", income: 7800000, expense: 3900000 },
    { month: "Oct", income: 8500000, expense: 4800000 },
    { month: "Nov", income: 8000000, expense: 4300000 },
    { month: "Des", income: 8000000, expense: 1365000 },
  ];

  const goals = [
    {
      id: 1,
      name: "Dana Darurat",
      target: 30000000,
      current: 12500000,
      icon: Heart,
      color: "bg-red-500",
    },
    {
      id: 2,
      name: "Liburan Bali",
      target: 10000000,
      current: 6800000,
      icon: Pizza,
      color: "bg-blue-500",
    },
    {
      id: 3,
      name: "Motor Baru",
      target: 25000000,
      current: 8200000,
      icon: Car,
      color: "bg-purple-500",
    },
  ];

  const budgets = [
    {
      category: "Makanan",
      spent: 450000,
      limit: 1000000,
      color: "bg-orange-500",
    },
    {
      category: "Transport",
      spent: 280000,
      limit: 500000,
      color: "bg-red-500",
    },
    {
      category: "Hiburan",
      spent: 200000,
      limit: 800000,
      color: "bg-blue-500",
    },
  ];

  return (
    <>
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        {balanceCards.map((card) => (
          <TitleCard
            key={card.title}
            total={card.total}
            title={card.title}
            icon={card.icon}
            variant={card.variant}
          />
        ))}
      </div>
      {/* Charts Row */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <MonthlyFinanceChart data={monthlyData} />
        <CategoryExpenseChart data={categoryExpenses} />
      </div>
      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <RecentTransactionsCard transactions={recentTransactions} />

        <div className="space-y-6">
          <GoalsCard goals={goals} />
          <BudgetCard budgets={budgets} />
        </div>
      </div>
    </>
  );
}
