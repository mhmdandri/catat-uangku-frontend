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
    income: "border border-gray-200 bg-white text-emerald-600",
    expense: "border border-gray-200 bg-white text-red-600",
  } as const;

  return (
    <div className={`rounded-xl p-6 shadow-sm ${variantStyle[variant]}`}>
      <div className="mb-2 flex items-center justify-between">
        <span
          className={cn(
            "text-sm opacity-90",
            variant === "primary" ? "text-white" : "text-gray-600"
          )}
        >
          {title}
        </span>
        {icon}
      </div>
      <p className="text-3xl">Rp {total.toLocaleString("id-ID")}</p>
      {(variant === "income" || variant === "expense") && (
        <p className="mt-1 text-xs text-gray-500">Bulan ini</p>
      )}
    </div>
  );
};

export default TitleCard;
