import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Card
            key={i}
            className={
              i === 1
                ? "border-emerald-200/60 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                : i === 2
                ? "border-red-200/60 bg-red-50/60 dark:border-red-500/30 dark:bg-red-500/10"
                : undefined
            }
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-5" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-10 w-full lg:max-w-md" />
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-9 w-24" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[920px] space-y-3 px-4 py-4">
            <div className="grid grid-cols-[140px_1fr_140px_140px_140px_120px] items-center gap-3 rounded-lg bg-muted/60 px-3 py-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20 justify-self-end" />
              <Skeleton className="h-4 w-16 justify-self-end" />
            </div>

            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[140px_1fr_140px_140px_140px_120px] items-center gap-3 rounded-lg border border-border/60 bg-muted/30 px-3 py-3"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>

                <Skeleton className="h-7 w-24 rounded-full" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-5 w-24 justify-self-end" />

                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
