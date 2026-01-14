"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import FilterCard from "@/components/transactions/FilterCard";
import TransactionTable from "@/components/transactions/TransactionTable";
import HeaderCards from "./HeaderCard";
import {
  Transaction,
  TransactionListResponse,
  TransactionSummary,
  TransactionType,
} from "@/lib/types/transaction";
import AddTransaction from "./AddTransaction";
import EditTransaction from "./EditTransaction";
import { useModalStore } from "@/store/useModalStore";
import { useUser } from "../providers/UserProvider";
import { del, get } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import TransactionDateFilterDialog from "./TransactionDateFilterDialog";
import { usePageLoadState } from "@/hooks/usePageLoadState";
import DialogDelete from "../DialogDelete";
import { toastError, toastSuccess } from "@/lib/toast";
import axios from "axios";

interface TransactionPageProps {
  data: Transaction[];
  summary?: TransactionSummary;
}

type DateRange = {
  start?: string;
  end?: string;
};

export default function TransactionPage({ data, summary }: TransactionPageProps) {
  const { isOpen, closeModal, openModal } = useModalStore();
  const { user, isLoading: isUserLoading } = useUser();
  const [filterType, setFilterType] = useState<"all" | TransactionType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [transactions, setTransactions] = useState<Transaction[]>(data);
  const [summaryState, setSummaryState] = useState<TransactionSummary | null>(
    summary ?? null
  );
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [isTransactionsRefreshing, setIsTransactionsRefreshing] =
    useState(false);
  const [isTransactionMutating, setIsTransactionMutating] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  useEffect(() => {
    setTransactions(data);
    setSummaryState(summary ?? null);
  }, [data, summary]);
  const buildDateQuery = useCallback((range?: DateRange) => {
    const params = new URLSearchParams();
    if (range?.start) params.set("start_date", range.start);
    if (range?.end) params.set("end_date", range.end);
    const query = params.toString();
    return query ? `?${query}` : "";
  }, []);
  const fetchTransactions = useCallback(
    async (range?: DateRange) => {
      if (isTransactionsRefreshing) return;
      if (!user?.data.id) {
        if (!isUserLoading) {
          setFetchError("Pengguna tidak ditemukan");
        }
        return;
      }
      setIsTransactionsRefreshing(true);
      setFetchError(null);
      try {
        const query = buildDateQuery(range ?? dateRange);
        const res = await get<TransactionListResponse>(
          `/transactions/user/${user.data.id}${query}`
        );
        setTransactions(res.data ?? []);
        setSummaryState(res.summary ?? null);
      } catch {
        setFetchError("Gagal memuat transaksi");
      } finally {
        setIsTransactionsRefreshing(false);
      }
    },
    [
      buildDateQuery,
      dateRange,
      isTransactionsRefreshing,
      isUserLoading,
      user?.data.id,
    ]
  );
  const handleRefresh = useCallback(() => {
    void fetchTransactions();
  }, [fetchTransactions]);
  const openFilterModal = useCallback(() => {
    setFilterStartDate(dateRange.start ?? "");
    setFilterEndDate(dateRange.end ?? "");
    setShowFilterModal(true);
  }, [dateRange.end, dateRange.start]);
  const handleApplyDateFilter = useCallback(() => {
    const nextRange: DateRange = {
      start: filterStartDate || undefined,
      end: filterEndDate || undefined,
    };
    setDateRange(nextRange);
    setShowFilterModal(false);
    void fetchTransactions(nextRange);
  }, [fetchTransactions, filterEndDate, filterStartDate]);
  const handleResetDateFilter = useCallback(() => {
    setFilterStartDate("");
    setFilterEndDate("");
    setDateRange({});
    setShowFilterModal(false);
    void fetchTransactions({});
  }, [fetchTransactions]);
  const isDateRangeInvalid =
    filterStartDate.length > 0 &&
    filterEndDate.length > 0 &&
    new Date(filterEndDate) < new Date(filterStartDate);
  const withTransactionMutation = useCallback(
    async (action: () => void | Promise<void>) => {
      if (isTransactionMutating) return;
      setIsTransactionMutating(true);
      try {
        await action();
      } finally {
        setIsTransactionMutating(false);
      }
    },
    [isTransactionMutating]
  );
  const handleEdit = useCallback(
    (id: string) => {
      setSelectedTransactionId(id);
      openModal("editTransaction");
    },
    [openModal]
  );
  const handleCloseEdit = useCallback(() => {
    closeModal("editTransaction");
    setSelectedTransactionId(null);
  }, [closeModal]);
  const handleConfirmDelete = useCallback((id: string) => {
    setShowModalDelete(true);
    setSelectedTransactionId(id);
  }, []);
  const handleDelete = useCallback(
    (id: string) => {
      void withTransactionMutation(async () => {
        try {
          await del(`/transactions/${id}`);
          setTransactions((prev) => prev.filter((t) => t.id !== id));
          setSummaryState(null);
          setShowModalDelete(false);
          setSelectedTransactionId(null);
          toastSuccess("Transaksi berhasil dihapus");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const message =
              (error.response?.data as { error?: string })?.error ??
              error.message;
            toastError(message);
          }
        }
      });
    },
    [withTransactionMutation]
  );
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesType = filterType === "all" || t.type === filterType;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        (t.description?.toLowerCase().includes(q) ?? false) ||
        t.category_id?.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [transactions, filterType, searchQuery]);
  const selectedTransaction = useMemo(
    () => transactions.find((t) => t.id === selectedTransactionId) ?? null,
    [transactions, selectedTransactionId]
  );

  const derivedTotals = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        const amount = t.total_amount ?? 0;
        if (t.type === "income") acc.totalIncome += amount;
        if (t.type === "expense") acc.totalExpense += Math.abs(amount);
        acc.totalCount += 1;
        return acc;
      },
      { totalCount: 0, totalIncome: 0, totalExpense: 0 }
    );
  }, [transactions]);
  const totalCount = summaryState?.totalCount ?? derivedTotals.totalCount;
  const totalIncome = summaryState?.totalIncome ?? derivedTotals.totalIncome;
  const totalExpense = summaryState?.totalExpense ?? derivedTotals.totalExpense;
  const { isPageLoading, isListLoading } = usePageLoadState({
    isUserLoading,
    itemsLength: transactions.length,
    isRefreshing: isTransactionsRefreshing,
  });

  return (
    <>
      {showModalDelete && (
        <DialogDelete
          open={showModalDelete}
          title="Hapus Transaksi"
          description="Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan."
          onClose={() => setShowModalDelete(false)}
          onDelete={() => handleDelete(selectedTransactionId!)}
        />
      )}
      <AddTransaction
        open={isOpen("transaction")}
        onClose={() => closeModal("transaction")}
        setForm={() => {}}
        onSubmit={handleRefresh}
      />
      <EditTransaction
        open={isOpen("editTransaction")}
        transaction={selectedTransaction}
        onClose={handleCloseEdit}
        onSubmit={handleRefresh}
      />
      <TransactionDateFilterDialog
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        startDate={filterStartDate}
        endDate={filterEndDate}
        onStartDateChange={setFilterStartDate}
        onEndDateChange={setFilterEndDate}
        onApply={handleApplyDateFilter}
        onReset={handleResetDateFilter}
        isRangeInvalid={isDateRangeInvalid}
        isRefreshing={isTransactionsRefreshing}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="space-y-6">
          <HeaderCards
            totalCount={totalCount}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            isLoading={isPageLoading}
          />

          <FilterCard
            filterType={filterType}
            onChangeFilter={setFilterType}
            searchQuery={searchQuery}
            onChangeSearch={setSearchQuery}
            onOpenAdvancedFilter={openFilterModal}
            isDisabled={isPageLoading || isTransactionsRefreshing}
            isRefreshing={isTransactionsRefreshing}
          />

          {fetchError && !isPageLoading && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <p>{fetchError}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="mt-2"
                disabled={isTransactionsRefreshing}
              >
                Coba lagi
              </Button>
            </div>
          )}

          <TransactionTable
            transactions={filteredTransactions}
            onEdit={handleEdit}
            onDelete={handleConfirmDelete}
            isLoading={isListLoading}
            isActionDisabled={isTransactionsRefreshing || isTransactionMutating}
          />
        </div>
      </main>
    </>
  );
}
