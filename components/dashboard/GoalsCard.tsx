interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}
interface Props {
  goals: Goal[];
}
export function GoalsCard({ goals }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
      <h3 className="mb-3 sm:mb-4 text-base sm:text-lg text-foreground">
        Goals
      </h3>

      <div className="space-y-4">
        {goals.slice(0, 2).map((goal) => {
          const percentage = (goal.current / goal.target) * 100;

          return (
            <div key={goal.id}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`rounded-lg ${goal.color} p-1.5`}>
                    <goal.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-foreground">{goal.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {percentage.toFixed(0)}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                <div
                  className={`h-full ${goal.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                Rp {goal.current.toLocaleString("id-ID")} / Rp{" "}
                {goal.target.toLocaleString("id-ID")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
