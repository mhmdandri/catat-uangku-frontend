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
  name?: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}
export function SelectCurrency({
  id,
  name,
  value,
  onChange,
  disabled,
}: SelectCurrencyProps) {
  const triggerId = id ?? name;
  const fieldName = name ?? id ?? "currency";
  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      name={fieldName}
    >
      <SelectTrigger
        id={triggerId}
        className="w-full h-auto min-h-11 sm:min-h-10 py-2.5 sm:py-2"
      >
        <SelectValue placeholder="Pilih mata uang" />
      </SelectTrigger>

      <SelectContent>
        {CURRENCIES.map(
          (currency: { code: string; symbol: string; label: string }) => (
            <SelectItem
              key={currency.code}
              value={currency.code}
              className="py-2.5 sm:py-2"
            >
              <div className="flex w-full items-center gap-2">
                <span className="w-8 shrink-0 font-medium">
                  {currency.symbol}
                </span>
                <span className="min-w-0 flex-1 truncate">
                  {currency.label}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
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
