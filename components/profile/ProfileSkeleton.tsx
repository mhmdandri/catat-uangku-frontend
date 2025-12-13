import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="h-32 bg-linear-to-br from-emerald-600 to-emerald-700" />
        <div className="px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <div className="relative -mt-12 sm:-mt-16">
                <Skeleton className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-white bg-gray-200" />
              </div>
              <div className="pb-1 sm:pb-2 space-y-2 w-full">
                <Skeleton className="h-6 w-44 sm:w-48" />
                <Skeleton className="h-4 w-56 sm:w-60" />
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>
            <Skeleton className="h-10 w-full sm:w-32 rounded-lg" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto border-b border-border px-4 sm:mx-0 sm:px-0">
        <Skeleton className="h-10 w-28 shrink-0 rounded-md" />
        <Skeleton className="h-10 w-24 shrink-0 rounded-md" />
        <Skeleton className="h-10 w-28 shrink-0 rounded-md" />
      </div>
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Skeleton className="h-10 w-full sm:w-28 rounded-lg" />
          <Skeleton className="h-10 w-full sm:w-44 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
