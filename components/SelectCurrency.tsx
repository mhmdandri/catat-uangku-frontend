// components/select-currency.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCIES } from "@/lib/account-helpers";

interface SelectCurrencyProps {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SelectCurrency({
  id,
  value,
  onChange,
  disabled,
}: SelectCurrencyProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih mata uang" />
      </SelectTrigger>

      <SelectContent id={id}>
        {CURRENCIES.map(
          (currency: { code: string; symbol: string; label: string }) => (
            <SelectItem key={currency.code} value={currency.code}>
              <div className="flex items-center gap-2">
                <span className="w-8 font-medium">{currency.symbol}</span>
                <span>{currency.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {currency.code}
                </span>
              </div>
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}
