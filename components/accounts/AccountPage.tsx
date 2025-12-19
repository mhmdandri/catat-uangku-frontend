"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AccountSummary } from "@/components/accounts/AccountSummary";
import { AccountCard } from "@/components/accounts/AccountCard";
import { useToggleStore } from "@/store/useToggleStore";
import {
  calculateAccountTotalsByCurrency,
  createAccountPayload,
  createInitialAccountForm,
  shouldFetchTransactions,
} from "@/lib/accountHelpers";
import { del, get, post, put } from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "../providers/UserProvider";
import axios from "axios";
import { AccountStats } from "./AccountStats";
import { AddAccountModal } from "./AddAccountModal";
import { useModalStore } from "@/store/useModalStore";
import { toastError, toastSuccess } from "@/lib/toast";
import ModalDelete from "./ModalDelete";
import SheetEdit from "./SheetEdit";
import { AccountSummarySkeleton } from "./AccountSkeleton";
import { EmptyPage } from "../EmptyPage";
import { Account, EditAccountPayload } from "@/lib/types/account";
import { Transaction } from "@/lib/types/transaction";

const AccountPage: React.FC = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const showBalances = useToggleStore((state) =>
    state.isActive("balanceVisibility")
  );
  const { isOpen, closeModal } = useModalStore();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const [selectedAccDeleteId, setSelectedAccDeleteId] = useState<string | null>(
    null
  );
  const [selectedAccEditId, setSelectedAccEditId] = useState<string | null>(
    null
  );
  const [transactionsByAccount, setTransactionsByAccount] = useState<
    Record<string, Transaction[]>
  >({});
  const [transactionsLoading, setTransactionsLoading] = useState<
    Record<string, boolean>
  >({});
  const [transactionsError, setTransactionsError] = useState<
    Record<string, string | null>
  >({});
  const [formData, setFormData] = useState(createInitialAccountForm());
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formEdit, setFormEdit] = useState<EditAccountPayload>({
    name: "",
    type: "bank",
    currency: "IDR",
    number: null,
    is_shared: false,
    is_active: true,
  });
  useEffect(() => {
    let active = true;
    if (!user?.id) {
      setAccounts([]);
      setIsLoadingAccounts(false);
      return;
    }
    const fetchAccounts = async () => {
      setIsLoadingAccounts(true);
      setFetchError(null);
      try {
        const response = await get<{ data: Account[] }>(
          `/accounts/user/${user.id}`
        );
        if (!active) return;
        setAccounts(response.data ?? []);
      } catch {
        if (!active) return;
        setFetchError("Gagal memuat daftar akun");
        setAccounts([]);
      } finally {
        if (active) setIsLoadingAccounts(false);
      }
    };
    void fetchAccounts();
    return () => {
      active = false;
    };
  }, [user?.id]);
  const loadTransactionsForAccount = useCallback(
    async (accountId: string) => {
      if (
        !shouldFetchTransactions(
          accountId,
          transactionsByAccount,
          transactionsLoading
        )
      ) {
        return;
      }
      setTransactionsLoading((prev) => ({ ...prev, [accountId]: true }));
      setTransactionsError((prev) => ({ ...prev, [accountId]: null }));
      try {
        const res = await get<{ data: Transaction[] }>(
          `/transactions/account/${accountId}`
        );
        setTransactionsByAccount((prev) => ({
          ...prev,
          [accountId]: res.data ?? [],
        }));
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setTransactionsByAccount((prev) => ({ ...prev, [accountId]: [] }));
          setTransactionsError((prev) => ({ ...prev, [accountId]: null }));
        } else {
          const message =
            axios.isAxiosError(error) && error.response?.data?.error
              ? String(error.response.data.error)
              : "Gagal memuat transaksi";
          setTransactionsByAccount((prev) => ({ ...prev, [accountId]: [] }));
          setTransactionsError((prev) => ({ ...prev, [accountId]: message }));
        }
      } finally {
        setTransactionsLoading((prev) => ({ ...prev, [accountId]: false }));
      }
    },
    [transactionsByAccount, transactionsLoading]
  );
  useEffect(() => {
    accounts.forEach((account) => {
      if (
        shouldFetchTransactions(
          account.id,
          transactionsByAccount,
          transactionsLoading
        )
      ) {
        void loadTransactionsForAccount(account.id);
      }
    });
  }, [
    accounts,
    loadTransactionsForAccount,
    transactionsByAccount,
    transactionsLoading,
  ]);
  const getAccountTransactions = (accountId: string): Transaction[] =>
    transactionsByAccount[accountId] ?? [];
  const handleAccountSelect = useCallback(
    (accountId: string) => {
      const nextSelected = selectedAccountId === accountId ? null : accountId;
      setSelectedAccountId(nextSelected);
      if (nextSelected) {
        void loadTransactionsForAccount(nextSelected);
      }
    },
    [loadTransactionsForAccount, selectedAccountId]
  );
  const handleAddAccount = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!user?.id) {
        toastError("Pengguna tidak ditemukan");
        return;
      }
      console.log("Adding account with data:", formData);
      setIsLoadingAccounts(true);
      setFetchError(null);
      try {
        const payload = createAccountPayload(formData, user.id);
        await post("/accounts", payload);
        const refreshed = await get<{ data: Account[] }>(
          `/accounts/user/${user.id}`
        );
        toastSuccess("Akun berhasil ditambahkan");
        setAccounts(refreshed.data ?? []);
        setFormData(createInitialAccountForm());
        closeModal("account");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            (error.response?.data as { error?: string })?.error ??
            error.message;
          toastError(`Gagal menambahkan akun: ${message}`);
          setFetchError(`Gagal menambahkan akun: ${message}`);
        } else {
          toastError("Gagal menambahkan akun");
          setFetchError("Gagal menambahkan akun");
        }
      } finally {
        setIsLoadingAccounts(false);
      }
    },
    [formData, user?.id, closeModal]
  );
  const handleConfirmDelete = (accountId: string) => {
    setShowModalDelete(true);
    setSelectedAccDeleteId(accountId);
  };
  const handleDelete = useCallback(
    async (accountId: string) => {
      if (!user?.id) {
        toastError("Pengguna tidak ditemukan");
        return;
      }
      setIsLoadingAccounts(true);
      setFetchError(null);
      try {
        await del(`/accounts/${accountId}`);
        const refreshed = await get<{ data: Account[] }>(
          `/accounts/user/${user.id}`
        );
        toastSuccess("Akun berhasil dihapus");
        setAccounts(refreshed.data ?? []);
        setSelectedAccDeleteId(null);
        setShowModalDelete(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            (error.response?.data as { error?: string })?.error ??
            error.message;
          toastError(message);
        }
      } finally {
        setIsLoadingAccounts(false);
      }
    },
    [user?.id]
  );
  const handleShowEdit = (accountId: string) => {
    setShowEditForm(true);
    setSelectedAccEditId(accountId);
    const account = accounts.find((acc) => acc.id === accountId);
    if (account) {
      setFormEdit({
        name: account.name,
        type: account.type,
        number: account.number ?? null,
        currency: account.currency ?? "IDR",
        is_shared: account.is_shared,
        is_active: account.is_active,
      });
    }
  };
  const handleSaveEdit = async () => {
    setIsLoadingAccounts(true);
    setFetchError(null);
    try {
      const res = await put<{ message: string; data: Account }>(
        `/accounts/${selectedAccEditId}`,
        formEdit
      );
      const refreshed = await get<{ data: Account[] }>(
        `/accounts/user/${user?.id}`
      );
      toastSuccess(res.message);
      setAccounts(refreshed.data ?? []);
      setShowEditForm(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { error?: string })?.error ?? error.message;
        toastError(message);
      }
    } finally {
      setIsLoadingAccounts(false);
    }
  };
  const summaries = useMemo(
    () => calculateAccountTotalsByCurrency(accounts),
    [accounts]
  );
  const isLoading = isLoadingAccounts || isUserLoading;
  const { openModal } = useModalStore();
  return (
    <>
      {showEditForm && (
        <SheetEdit
          open={showEditForm}
          onClose={() => setShowEditForm(false)}
          onSave={handleSaveEdit}
          editForm={formEdit}
          setEditForm={setFormEdit}
        ></SheetEdit>
      )}
      {showModalDelete && selectedAccDeleteId && (
        <ModalDelete
          open={showModalDelete}
          onClose={() => setShowModalDelete(false)}
          onDelete={() => handleDelete(selectedAccDeleteId)}
        ></ModalDelete>
      )}
      {isLoading ? (
        <AccountSummarySkeleton />
      ) : (
        <AccountSummary summaries={summaries} showBalances={showBalances} />
      )}
      {fetchError && !isLoading && (
        <p className="mb-3 text-sm text-red-600">{fetchError}</p>
      )}
      <div className="mb-4 sm:mb-6 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isLoadingAccounts &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
              <div className="mb-3 space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-28" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        {!isLoadingAccounts && accounts.length === 0 && (
          <div className="col-span-full rounded-xl bg-card border border-gray-100 text-center text-sm">
            <EmptyPage
              btnText="Tambah Akun"
              title="Belum ada akun"
              description="Kamu belum punya akun. Mulai buat akun dengan tekan tombol dibawah atau dikanan atas"
              onClick={() => openModal("account")}
            />
          </div>
        )}
        {!isLoadingAccounts &&
          accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              transactions={getAccountTransactions(account.id)}
              transactionsLoading={!!transactionsLoading[account.id]}
              transactionsError={transactionsError[account.id]}
              isSelected={selectedAccountId === account.id}
              showBalances={showBalances}
              onSelect={() => handleAccountSelect(account.id)}
              onEdit={() => handleShowEdit(account.id)}
              onDelete={() => handleConfirmDelete(account.id)}
            />
          ))}
      </div>
      {isLoadingAccounts ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      ) : (
        <AccountStats
          accounts={accounts}
          showBalances={showBalances}
          transactionsByAccount={transactionsByAccount}
        />
      )}
      <AddAccountModal
        open={isOpen("account")}
        formData={formData}
        onClose={() => closeModal("account")}
        onChange={setFormData}
        onSubmit={handleAddAccount}
      />
    </>
  );
};

export default AccountPage;
