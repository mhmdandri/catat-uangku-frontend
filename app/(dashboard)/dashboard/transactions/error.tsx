"use client";
import { Button } from "@/components/ui/button";
import { toastError } from "@/lib/toast";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  toastError(error.message);
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Terjadi Kesalahan
        </h2>
        <p className="mt-2 text-muted-foreground">
          Gagal memuat data transaksi. Silakan coba lagi.
        </p>
      </div>
      <Button onClick={reset} className="bg-emerald-600 hover:bg-emerald-700">
        Coba Lagi
      </Button>
    </div>
  );
}
