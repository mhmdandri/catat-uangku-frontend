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
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
      <h3 className="mb-3 sm:mb-4 text-base sm:text-lg text-foreground">
        Goals
      </h3>

      <div className="space-y-4">
        {budgets.map((budget, index) => {
          const percentage = (budget.spent / budget.limit) * 100;

          return (
            <div key={index}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-foreground">
                  {budget.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {percentage.toFixed(0)}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                <div
                  className={`h-full ${budget.color}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
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
