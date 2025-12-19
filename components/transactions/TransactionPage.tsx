"use client";

import React, { useMemo, useState, useEffect } from "react";

import FilterCard from "@/components/transactions/FilterCard";
import TransactionTable from "@/components/transactions/TransactionTable";
import HeaderCards from "./HeaderCard";
import { Transaction, TransactionType } from "@/lib/types/transaction";
import AddTransaction from "./AddTransaction";
import { useModalStore } from "@/store/useModalStore";

interface TransactionPageProps {
  data: Transaction[];
}

export default function TransactionPage({ data }: TransactionPageProps) {
  const { isOpen, closeModal } = useModalStore();
  const [filterType, setFilterType] = useState<"all" | TransactionType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(data);
  useEffect(() => {
    setTransactions(data);
  }, [data]);
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

  return (
    <>
      <AddTransaction
        open={isOpen("transaction")}
        onClose={() => closeModal("transaction")}
        setForm={() => {}}
        onSubmit={() => {}}
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
          />

          <FilterCard
            filterType={filterType}
            onChangeFilter={setFilterType}
            searchQuery={searchQuery}
            onChangeSearch={setSearchQuery}
            onOpenAdvancedFilter={() => setShowAddModal(true)}
          />

          <TransactionTable
            transactions={filteredTransactions}
            onEdit={(id) => console.log("edit", id)}
            onDelete={(id) => console.log("delete", id)}
          />
        </div>
      </main>
    </>
  );
}
