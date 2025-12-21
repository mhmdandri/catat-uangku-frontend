"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import FilterCard from "@/components/transactions/FilterCard";
import TransactionTable from "@/components/transactions/TransactionTable";
import HeaderCards from "./HeaderCard";
import { Transaction, TransactionType } from "@/lib/types/transaction";
import AddTransaction from "./AddTransaction";
import EditTransaction from "./EditTransaction";
import { useModalStore } from "@/store/useModalStore";
import { useUser } from "../providers/UserProvider";
import { del, get } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { usePageLoadState } from "@/hooks/usePageLoadState";
import DialogDelete from "../DialogDelete";
import { toastError, toastSuccess } from "@/lib/toast";
import axios from "axios";

interface TransactionPageProps {
  data: Transaction[];
}

export default function TransactionPage({ data }: TransactionPageProps) {
  const { isOpen, closeModal, openModal } = useModalStore();
  const { user, isLoading: isUserLoading } = useUser();
  const [filterType, setFilterType] = useState<"all" | TransactionType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [transactions, setTransactions] = useState<Transaction[]>(data);
  const [isTransactionsRefreshing, setIsTransactionsRefreshing] =
    useState(false);
  const [isTransactionMutating, setIsTransactionMutating] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  useEffect(() => {
    setTransactions(data);
  }, [data]);
  const fetchTransactions = useCallback(async () => {
    if (isTransactionsRefreshing) return;
    if (!user?.id) {
      if (!isUserLoading) {
        setFetchError("Pengguna tidak ditemukan");
      }
      return;
    }
    setIsTransactionsRefreshing(true);
    setFetchError(null);
    try {
      const res = await get<{ data: Transaction[] }>(
        `/transactions/user/${user.id}`
      );
      setTransactions(res.data ?? []);
    } catch {
      setFetchError("Gagal memuat transaksi");
    } finally {
      setIsTransactionsRefreshing(false);
    }
  }, [isTransactionsRefreshing, isUserLoading, user?.id]);
  const handleRefresh = useCallback(() => {
    void fetchTransactions();
  }, [fetchTransactions]);
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

  const { totalIncome, totalExpense } = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        const amount = t.total_amount ?? 0;
        if (t.type === "income") acc.totalIncome += amount;
        if (t.type === "expense") acc.totalExpense += Math.abs(amount);
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );
  }, [transactions]);
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
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-background p-6 text-foreground shadow-lg">
            <h3 className="mb-2 text-xl font-semibold">
              Tambah Transaksi Baru
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Form tambah transaksi akan ditampilkan di sini
            </p>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      <main className="flex-1 overflow-y-auto">
        <div className="space-y-6">
          <HeaderCards
            totalCount={transactions.length}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            isLoading={isPageLoading}
          />

          <FilterCard
            filterType={filterType}
            onChangeFilter={setFilterType}
            searchQuery={searchQuery}
            onChangeSearch={setSearchQuery}
            onOpenAdvancedFilter={() => setShowAddModal(true)}
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
