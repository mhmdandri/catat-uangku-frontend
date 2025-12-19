"use client";

import React from "react";
import { CurrencyCardBase } from "./CurrencyCardBase";
import { Summary } from "@/lib/types/account";

interface CurrencyCardCarouselProps {
  summary: Summary;
  showBalances: boolean;
  isSingleCurrency: boolean;
  slidesToShow: number;
  innerRef?: React.Ref<HTMLDivElement>;
}

export const CurrencyCardCarousel: React.FC<CurrencyCardCarouselProps> = ({
  summary,
  showBalances,
  isSingleCurrency,
  slidesToShow,
  innerRef,
}) => {
  return (
    <div
      ref={innerRef}
      className="shrink-0 snap-start px-2"
      style={{
        width: `${100 / slidesToShow}%`,
        minWidth: `${100 / slidesToShow}%`,
      }}
    >
      <CurrencyCardBase
        summary={summary}
        showBalances={showBalances}
        isSingleCurrency={isSingleCurrency}
      />
    </div>
  );
};
