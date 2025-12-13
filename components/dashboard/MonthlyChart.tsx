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
  const axisStyle = { fill: "var(--muted-foreground)" };
  const tooltipStyle = {
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
    color: "var(--foreground)",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
      <h3 className="mb-3 sm:mb-4 text-base sm:text-lg text-foreground">
        {title}
      </h3>
      <div className="h-60 sm:h-[300px]">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <XAxis dataKey="month" tick={axisStyle} />
            <YAxis tick={axisStyle} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: "var(--foreground)" }}
              itemStyle={{ color: "var(--foreground)" }}
              formatter={(value: number) =>
                `Rp ${value.toLocaleString("id-ID")}`
              }
            />
            <Legend wrapperStyle={{ color: "var(--muted-foreground)" }} />
            <Bar dataKey="income" fill="#10b981" name="Pemasukan" />
            <Bar dataKey="expense" fill="#ef4444" name="Pengeluaran" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
