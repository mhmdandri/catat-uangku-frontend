"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Wallet } from "lucide-react";
import React from "react";

interface AccountSummarySkeletonProps {
  slidesToShow?: number;
}

export const AccountSummarySkeleton: React.FC<AccountSummarySkeletonProps> = ({
  slidesToShow,
}) => {
  return (
    <div className="mb-6">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-600 via-emerald-600 to-emerald-700 p-6 shadow-xl sm:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative">
          <div className="mb-6 flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-white/30" />
              <Skeleton className="h-3 w-48 bg-white/20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-xl bg-white/20" />
              <Skeleton className="h-10 w-10 rounded-xl bg-white/20" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <Wallet className="h-6 w-6 text-white/40" />
              </div>
            </div>
          </div>
          <div
            className={`grid gap-4 ${
              slidesToShow === 1
                ? "grid-cols-1"
                : slidesToShow === 2
                ? "grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {Array.from({ length: slidesToShow ?? 3 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white/10 p-5 backdrop-blur-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg bg-white/30" />
                    <Skeleton className="h-4 w-16 bg-white/30" />
                  </div>
                  <Skeleton className="h-5 w-5 rounded-full bg-white/30" />
                </div>
                <div className="mb-4 space-y-2">
                  <Skeleton className="h-3 w-16 bg-white/20" />
                  <Skeleton className="h-8 w-32 bg-white/30" />
                </div>
                <div className="grid grid-cols-3 gap-3 border-t border-white/20 pt-4">
                  <Skeleton className="h-6 w-full bg-white/20" />
                  <Skeleton className="h-6 w-full bg-white/20" />
                  <Skeleton className="h-6 w-full bg-white/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
