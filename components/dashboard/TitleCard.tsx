import { cn } from "@/lib/utils";
import React from "react";
interface TitleCardProps {
  total: number;
  title: string;
  icon: React.ReactNode;
  variant?: "primary" | "income" | "expense";
}
const TitleCard = ({
  total,
  title,
  icon,
  variant = "primary",
}: TitleCardProps) => {
  const variantStyle = {
    primary: "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white",
    income:
      "border border-border bg-card text-emerald-600 dark:text-emerald-400",
    expense: "border border-border bg-card text-red-600 dark:text-red-400",
  } as const;
  return (
    <div className={`rounded-xl p-4 sm:p-6 shadow-sm ${variantStyle[variant]}`}>
      <div className="mb-2 flex items-center justify-between">
        <span
          className={cn(
            "text-xs sm:text-sm opacity-90",
            variant === "primary" ? "text-white" : "text-muted-foreground"
          )}
        >
          {title}
        </span>
        <div className="shrink-0 [&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-5 sm:[&_svg]:w-5">
          {icon}
        </div>
      </div>
      <p className="text-2xl sm:text-3xl">Rp {total.toLocaleString("id-ID")}</p>
      {(variant === "income" || variant === "expense") && (
        <p className="mt-1 text-xs text-gray-500">Bulan ini</p>
      )}
    </div>
  );
};

export default TitleCard;
