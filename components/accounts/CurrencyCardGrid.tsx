"use client";

import React from "react";
import { CurrencySummary } from "@/lib/types";
import { CurrencyCardBase } from "./CurrencyCardBase";

interface CurrencyCardGridProps {
  summary: CurrencySummary;
  showBalances: boolean;
  isSingleCurrency: boolean;
}

export const CurrencyCardGrid: React.FC<CurrencyCardGridProps> = (props) => {
  return <CurrencyCardBase {...props} />;
};
