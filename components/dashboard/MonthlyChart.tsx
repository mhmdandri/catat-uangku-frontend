// components/dashboard/MonthlyFinanceChart.tsx
"use client";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

type MonthlyPoint = {
  month: string;
  income: number;
  expense: number;
};

interface MonthlyFinanceChartProps {
  data: MonthlyPoint[];
  title?: string;
  height?: number;
}

export function MonthlyFinanceChart({
  data,
  title = "Grafik Keuangan Bulanan",
  height = 300,
}: MonthlyFinanceChartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg text-gray-900">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => `Rp ${value.toLocaleString("id-ID")}`}
          />
          <Legend />
          <Bar dataKey="income" fill="#10b981" name="Pemasukan" />
          <Bar dataKey="expense" fill="#ef4444" name="Pengeluaran" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
