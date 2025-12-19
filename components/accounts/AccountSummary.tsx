"use client";
import React from "react";
import { ChevronLeft, ChevronRight, Sparkles, Wallet } from "lucide-react";
import { CurrencyCardCarousel } from "./CurrencyCardCaraousel";
import { useCarouselNav } from "./useCarouselNav";
import { CurrencyCardGrid } from "./CurrencyCardGrid";
import { Summary } from "@/lib/types/account";

interface AccountSummaryProps {
  summaries: Summary[];
  showBalances: boolean;
}

export const AccountSummary: React.FC<AccountSummaryProps> = ({
  summaries,
  showBalances,
}) => {
  const isSingleCurrency = summaries.length === 1;

  const {
    viewportRef,
    firstCardRef,
    slidesToShow,
    useCarousel,
    canPrev,
    canNext,
    updateNavState,
    scrollByCard,
  } = useCarouselNav(summaries.length);

  return (
    <div className="mb-6">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-600 via-emerald-600 to-emerald-700 p-6 shadow-xl sm:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-200" />
                <p className="text-sm text-white/90">Total Saldo</p>
              </div>
              <p className="text-xs text-white/75">
                {isSingleCurrency
                  ? "Keseluruhan rekening"
                  : `${summaries.length} mata uang aktif`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {useCarousel && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollByCard("left")}
                    disabled={!canPrev}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur transition hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous"
                    title="Sebelumnya"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollByCard("right")}
                    disabled={!canNext}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur transition hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next"
                    title="Selanjutnya"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Wallet className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          {useCarousel ? (
            <div className="relative">
              <div
                ref={viewportRef}
                onScroll={updateNavState}
                className="overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex">
                  {summaries.map((s, idx) => (
                    <CurrencyCardCarousel
                      key={s.currency}
                      summary={s}
                      showBalances={showBalances}
                      isSingleCurrency={isSingleCurrency}
                      slidesToShow={slidesToShow}
                      innerRef={idx === 0 ? firstCardRef : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`grid gap-4 ${
                isSingleCurrency
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {summaries.map((s) => (
                <CurrencyCardGrid
                  key={s.currency}
                  summary={s}
                  showBalances={showBalances}
                  isSingleCurrency={isSingleCurrency}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
