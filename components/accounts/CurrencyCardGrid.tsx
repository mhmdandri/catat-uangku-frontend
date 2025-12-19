"use client";

import React from "react";
import { CurrencyCardBase } from "./CurrencyCardBase";
import { Summary } from "@/lib/types/account";

interface CurrencyCardGridProps {
  summary: Summary;
  showBalances: boolean;
  isSingleCurrency: boolean;
}

export const CurrencyCardGrid: React.FC<CurrencyCardGridProps> = (props) => {
  return <CurrencyCardBase {...props} />;
};
