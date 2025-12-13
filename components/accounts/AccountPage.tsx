"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AccountSummary } from "@/components/accounts/AccountSummary";
import { AccountCard } from "@/components/accounts/AccountCard";
import { useBalanceVisibilityStore } from "@/store/useBalanceVisibilityStore";
import {
  calculateAccountTotalsByCurrency,
  createAccountPayload,
  createInitialAccountForm,
  mapTransactionResponses,
  shouldFetchTransactions,
} from "@/lib/account-helpers";
import { del, get, post, put } from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AddAccountFormData,
  EditAccountPayload,
  type Account,
  type AccountTransaction,
  type AccountTransactionsErrorMap,
  type AccountTransactionsLoadingMap,
  type AccountTransactionsMap,
  type Transaction,
  type UUID,
} from "@/lib/types";
import { useUser } from "../providers/UserProvider";
import axios from "axios";
import { AccountStats } from "./AccountStats";
import { AddAccountModal } from "./AddAccountModal";
import { useAccountModalStore } from "@/store/useAccountModalStore";
import { toastError, toastSuccess } from "@/lib/toast";
import ModalDelete from "./ModalDelete";
import SheetEdit from "./SheetEdit";
import { AccountSummarySkeleton } from "./AccountSkeleton";

const AccountPage: React.FC = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const { showBalances } = useBalanceVisibilityStore();
  const { isAddModalOpen, closeAddModal } = useAccountModalStore();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<UUID | null>(null);
  const [selectedAccDeleteId, setSelectedAccDeleteId] = useState<UUID | null>(
    null
  );
  const [selectedAccEditId, setSelectedAccEditId] = useState<UUID | null>(null);
  const [transactionsByAccount, setTransactionsByAccount] =
    useState<AccountTransactionsMap>({});
  const [transactionsLoading, setTransactionsLoading] =
    useState<AccountTransactionsLoadingMap>({});
  const [transactionsError, setTransactionsError] =
    useState<AccountTransactionsErrorMap>({});
  const [formData, setFormData] = useState<AddAccountFormData>(
    createInitialAccountForm()
  );
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formEdit, setFormEdit] = useState<EditAccountPayload>({
    name: "",
    type: "bank",
    number: "",
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
    async (accountId: UUID) => {
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
        const mapped = mapTransactionResponses(res.data, accountId);
        setTransactionsByAccount((prev) => ({ ...prev, [accountId]: mapped }));
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
  const getAccountTransactions = (accountId: UUID): AccountTransaction[] =>
    transactionsByAccount[accountId] ?? [];
  const handleAccountSelect = useCallback(
    (accountId: UUID) => {
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
        closeAddModal();
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
    [closeAddModal, formData, user?.id]
  );
  const handleConfirmDelete = (accountId: UUID) => {
    setShowModalDelete(true);
    setSelectedAccDeleteId(accountId);
  };
  const handleDelete = useCallback(
    async (accountId: UUID) => {
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
  const handleShowEdit = (accountId: UUID) => {
    setShowEditForm(true);
    setSelectedAccEditId(accountId);
    const account = accounts.find((acc) => acc.id === accountId);
    if (account) {
      setFormEdit({
        name: account.name,
        type: account.type,
        number: account.number ?? "",
        currency: account.currency ?? "IDR",
        is_active: account.is_active,
      });
    }
  };
  const handleSaveEdit = async () => {
    setIsLoadingAccounts(true);
    setFetchError(null);
    try {
      const res = await put<{ message: string; data: EditAccountPayload }>(
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
          <div className="col-span-full rounded-xl border border-dashed border-border bg-card p-4 sm:p-6 text-center text-sm text-muted-foreground">
            Belum ada akun. Tambahkan akun baru dari tombol di kanan atas.
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
        open={isAddModalOpen}
        formData={formData}
        onClose={closeAddModal}
        onChange={setFormData}
        onSubmit={handleAddAccount}
      />
    </>
  );
};

export default AccountPage;
