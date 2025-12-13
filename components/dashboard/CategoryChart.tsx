"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
type CategoryExpense = {
  name: string;
  value: number;
  color: string;
};
interface CategoryExpenseChartProps {
  data: CategoryExpense[];
  title?: string;
  height?: number;
}

export function CategoryExpenseChart({
  data,
  title = "Pengeluaran per Kategori",
  height = 300,
}: CategoryExpenseChartProps) {
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
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              outerRadius={90}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: "var(--foreground)" }}
              itemStyle={{ color: "var(--foreground)" }}
              formatter={(value: number) =>
                `Rp ${value.toLocaleString("id-ID")}`
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
