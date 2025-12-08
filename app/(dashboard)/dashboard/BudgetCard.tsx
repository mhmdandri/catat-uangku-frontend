// components/dashboard/BudgetCard.tsx

interface Budget {
  category: string;
  spent: number;
  limit: number;
  color: string;
}

interface Props {
  budgets: Budget[];
}

export function BudgetCard({ budgets }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg text-gray-900">Budget Bulan Ini</h3>

      <div className="space-y-4">
        {budgets.map((budget, index) => {
          const percentage = (budget.spent / budget.limit) * 100;

          return (
            <div key={index}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-900">{budget.category}</span>
                <span className="text-xs text-gray-500">
                  {percentage.toFixed(0)}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full ${budget.color}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Rp {budget.spent.toLocaleString("id-ID")} / Rp{" "}
                {budget.limit.toLocaleString("id-ID")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
