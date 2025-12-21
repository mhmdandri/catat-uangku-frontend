"use client";

import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  minDate?: Date;
};

const toDate = (value: string) =>
  value ? new Date(`${value}T00:00:00`) : undefined;

const toValue = (date: Date) => format(date, "yyyy-MM-dd");

const DatePickerField = ({
  label,
  value,
  onChange,
  disabled = false,
  minDate,
}: DatePickerFieldProps) => {
  const [open, setOpen] = React.useState(false);
  const selectedDate = toDate(value);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            {selectedDate
              ? format(selectedDate, "yyyy-MM-dd")
              : "Pilih tanggal"}
            <CalendarIcon className="h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              onChange(date ? toValue(date) : "");
              if (date) setOpen(false);
            }}
            disabled={minDate ? { before: minDate } : undefined}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

type TransactionDateFilterDialogProps = {
  open: boolean;
  onClose: () => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
  isRangeInvalid: boolean;
  isRefreshing?: boolean;
};

const TransactionDateFilterDialog = ({
  open,
  onClose,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
  onReset,
  isRangeInvalid,
  isRefreshing = false,
}: TransactionDateFilterDialogProps) => {
  const startDateValue = toDate(startDate);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Tanggal</DialogTitle>
          <DialogDescription>
            Pilih rentang tanggal untuk memfilter transaksi
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <DatePickerField
            label="Tanggal mulai"
            value={startDate}
            onChange={onStartDateChange}
            disabled={isRefreshing}
          />
          <DatePickerField
            label="Tanggal akhir"
            value={endDate}
            onChange={onEndDateChange}
            disabled={isRefreshing}
            minDate={startDateValue}
          />
          {isRangeInvalid && (
            <p className="text-xs text-red-600">
              Tanggal akhir tidak boleh sebelum tanggal mulai.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isRefreshing}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={isRefreshing}
          >
            Reset
          </Button>
          <Button
            type="button"
            onClick={onApply}
            disabled={isRefreshing || isRangeInvalid}
          >
            Terapkan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDateFilterDialog;
