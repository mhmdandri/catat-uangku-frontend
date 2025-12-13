import { Wallet } from "lucide-react";
import React from "react";

const BrandHeader: React.FC = () => (
  <div className="mb-6 sm:mb-8 flex items-center gap-3">
    <div className="rounded-2xl bg-emerald-600 p-2.5 sm:p-3">
      <Wallet className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
    </div>
    <span className="text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
      catatUangku
    </span>
  </div>
);

export default BrandHeader;
