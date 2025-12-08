// components/dashboard/CategoryExpenseChart.tsx
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
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg text-gray-900">{title}</h3>
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
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `Rp ${value.toLocaleString("id-ID")}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
