"use client";

import { cn } from "@/lib/utils";
import { useLoadingStore } from "@/store/useLoadingStore";
import { LoaderIcon } from "lucide-react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin size-6 text-primary", className)}
      {...props}
    />
  );
}

export function GlobalLoadingOverlay() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <Spinner className="size-8" />
    </div>
  );
}
