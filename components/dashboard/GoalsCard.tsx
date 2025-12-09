// components/dashboard/GoalsCard.tsx

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
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg text-gray-900">Goals</h3>

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
                  <span className="text-sm text-gray-900">{goal.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {percentage.toFixed(0)}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full ${goal.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="mt-1 text-xs text-gray-500">
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
