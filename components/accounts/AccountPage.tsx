"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Banknote, Building2, Smartphone } from "lucide-react";
import { useBalanceVisibilityStore } from "@/store/useBalanceVisibilityStore";
import {
  type Account,
  type AccountResponse,
  type AccountTransaction,
  type AccountType,
  type AccountPayload,
  type Transaction,
  type UUID,
} from "@/lib/types";
import { AccountSummary } from "@/components/accounts/AccountSummary";
import { AccountCard } from "@/components/accounts/AccountCard";
import { AccountStats } from "@/components/accounts/AccountStats";
import {
  AddAccountModal,
  type AddAccountFormData,
} from "@/components/accounts/AddAccountModal";
import { useAccountModalStore } from "@/store/useAccountModalStore";
import { useUser } from "../providers/UserProvider";
import { get, post } from "@/lib/axios";
import { toastSuccess } from "@/lib/toast";
import { toast } from "react-toastify";
import axios from "axios";
import { useLoadingStore } from "@/store/useLoadingStore";
import { Skeleton } from "@/components/ui/skeleton";

const accountTypeStyles: Record<
  AccountType,
  { icon: typeof Building2; color: string }
> = {
  bank: { icon: Building2, color: "bg-blue-500" },
  "e-wallet": { icon: Smartphone, color: "bg-purple-500" },
  cash: { icon: Banknote, color: "bg-emerald-500" },
};

const buildAccountNumber = (account: AccountResponse) => {
  const scopeLabel = account.scope === "group" ? "Group" : "Personal";
  if (account.currency) {
    return `${account.currency.toUpperCase()} • ${scopeLabel}`;
  }
  return scopeLabel;
};

const mapTransactionResponses = (
  data: Transaction[],
  accountId: UUID
): AccountTransaction[] =>
  data.map((item) => {
    const line = item.transaction_lines?.find((l) => l.account_id === accountId);
    const lineAmount = line
      ? line.credit - line.debit
      : item.total_amount ?? 0;
    const signedAmount =
      item.type === "expense" ? -Math.abs(lineAmount) : Math.abs(lineAmount);
    return {
      id: item.id,
      accountId,
      title:
        item.description ||
        (item.type === "income" ? "Pemasukan" : "Pengeluaran"),
      amount: signedAmount,
      type: item.type,
      date: item.date,
    };
  });
const AccountPage: React.FC = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<UUID | null>(null);
  const { startLoading, stopLoading } = useLoadingStore();
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [transactionsByAccount, setTransactionsByAccount] = useState<
    Record<UUID, AccountTransaction[]>
  >({});
  const [transactionsLoading, setTransactionsLoading] = useState<
    Record<UUID, boolean>
  >({});
  const [transactionsError, setTransactionsError] = useState<
    Record<UUID, string | null>
  >({});
  const [formData, setFormData] = useState<AddAccountFormData>({
    accountName: "",
    accountType: "bank",
    balance: "",
  });

  const { showBalances } = useBalanceVisibilityStore();
  const { isAddModalOpen, closeAddModal } = useAccountModalStore();
  const { user, isLoading: isUserLoading } = useUser();
  const isLoadingAccounts = loadingAccounts || isUserLoading;

  useEffect(() => {
    if (user?.accounts && user.accounts.length > 0) {
      setAccounts(user.accounts);
      setLoadingAccounts(false);
    }
  }, [user?.accounts]);

  useEffect(() => {
    if (!user && !isUserLoading) {
      setAccounts([]);
      setLoadingAccounts(false);
    }
  }, [user, isUserLoading]);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    const fetchAccounts = async () => {
      setLoadingAccounts(true);
      setFetchError(null);
      try {
        const response = await get<{ data: AccountResponse[] }>(
          `/accounts/user/${user.id}`
        );
        if (!cancelled) {
          setAccounts(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
        if (!cancelled) {
          setFetchError("Gagal memuat daftar akun");
        }
      } finally {
        if (!cancelled) {
          setLoadingAccounts(false);
        }
      }
    };
    fetchAccounts();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const uiAccounts: Account[] = useMemo(
    () =>
      accounts.map((item) => {
        const style = accountTypeStyles[item.type] ?? accountTypeStyles.bank;
        const txCount = transactionsByAccount[item.id]?.length ?? 0;
        return {
          id: item.id,
          name: item.name,
          type: item.type,
          balance: item.balance ?? 0,
          accountNumber: buildAccountNumber(item),
          icon: style.icon,
          color: style.color,
          transactions: txCount,
        };
      }),
    [accounts, transactionsByAccount]
  );

  // hitung summary dengan useMemo biar lebih rapi
  const {
    totalBalance,
    totalBankBalance,
    totalEWalletBalance,
    totalCashBalance,
  } = useMemo(() => {
    return uiAccounts.reduce(
      (totals, acc) => {
        const balance = acc.balance ?? 0;
        totals.totalBalance += balance;
        if (acc.type === "bank") totals.totalBankBalance += balance;
        if (acc.type === "e-wallet") totals.totalEWalletBalance += balance;
        if (acc.type === "cash") totals.totalCashBalance += balance;
        return totals;
      },
      {
        totalBalance: 0,
        totalBankBalance: 0,
        totalEWalletBalance: 0,
        totalCashBalance: 0,
      }
    );
  }, [uiAccounts]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: AccountPayload = {
      owner_user_id: user!.id,
      name: formData.accountName,
      type: formData.accountType,
      first_balance: parseFloat(formData.balance) || 0,
      currency: "IDR",
      scope: "personal",
      is_shared: false,
      is_active: true,
    };
    startLoading();
    try {
      const res = await post<AccountPayload>("/accounts", payload);
      console.log("Account created:", res);
      toastSuccess("Akun berhasil ditambahkan");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Gagal menambahkan akun";
        toast.error(message);
      } else {
        toast.error("Gagal menambahkan akun");
      }
    } finally {
      stopLoading();
    }
    closeAddModal();
    setFormData({ accountName: "", accountType: "bank", balance: "" });
  };

  const loadTransactionsForAccount = useCallback(
    async (accountId: UUID) => {
      if (transactionsByAccount[accountId] || transactionsLoading[accountId]) {
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
          // Anggap tidak ada transaksi untuk akun ini; hindari refetch loop.
          setTransactionsByAccount((prev) => ({ ...prev, [accountId]: [] }));
          setTransactionsError((prev) => ({ ...prev, [accountId]: null }));
          return;
        } else {
          // Log minimal untuk debugging tanpa membanjiri console pada error 404.
          console.warn("Failed to fetch transactions:", error);
          const message =
            axios.isAxiosError(error) && error.response?.data?.error
              ? String(error.response.data.error)
              : "Gagal memuat transaksi";
          setTransactionsError((prev) => ({ ...prev, [accountId]: message }));
        }
      } finally {
        setTransactionsLoading((prev) => ({ ...prev, [accountId]: false }));
      }
    },
    [transactionsByAccount, transactionsLoading]
  );

  const getAccountTransactions = (accountId: UUID): AccountTransaction[] =>
    transactionsByAccount[accountId] ?? [];

  const handleEditAccount = (accountId: UUID) => {
    console.log("Edit account", accountId);
    // TODO: buka modal edit / route ke page edit
  };

  const handleDeleteAccount = (accountId: UUID) => {
    console.log("Delete account", accountId);
    // TODO: konfirmasi & call API delete
  };

  useEffect(() => {
    if (accounts.length === 0) return;
    accounts.forEach((acc) => {
      if (!transactionsByAccount[acc.id] && !transactionsLoading[acc.id]) {
        void loadTransactionsForAccount(acc.id);
      }
    });
  }, [accounts, loadTransactionsForAccount, transactionsByAccount, transactionsLoading]);

  useEffect(() => {
    if (selectedAccountId) {
      void loadTransactionsForAccount(selectedAccountId);
    }
  }, [selectedAccountId, loadTransactionsForAccount]);

  return (
    <>
      {isLoadingAccounts ? (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 space-y-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ) : (
        <AccountSummary
          totalBalance={totalBalance}
          totalBankBalance={totalBankBalance}
          totalEWalletBalance={totalEWalletBalance}
          totalCashBalance={totalCashBalance}
          showBalances={showBalances}
        />
      )}
      {fetchError && <p className="mb-3 text-sm text-red-600">{fetchError}</p>}
      {/* Accounts Grid */}
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoadingAccounts &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
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

        {!isLoadingAccounts && uiAccounts.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
            Belum ada akun. Tambahkan akun baru dari tombol di kanan atas.
          </div>
        )}

        {!isLoadingAccounts &&
          uiAccounts.map((account: Account) => (
            <AccountCard
              key={account.id}
              account={account}
              transactions={getAccountTransactions(account.id)}
              transactionsLoading={!!transactionsLoading[account.id]}
              transactionsError={transactionsError[account.id]}
              isSelected={selectedAccountId === account.id}
              showBalances={showBalances}
              onSelect={() => {
                const nextSelected =
                  selectedAccountId === account.id ? null : account.id;
                setSelectedAccountId(nextSelected);
                if (nextSelected) {
                  void loadTransactionsForAccount(nextSelected);
                }
              }}
              onEdit={handleEditAccount}
              onDelete={handleDeleteAccount}
            />
          ))}
      </div>

      {isLoadingAccounts ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-3"
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
        <AccountStats accounts={uiAccounts} showBalances={showBalances} />
      )}

      <AddAccountModal
        open={isAddModalOpen}
        formData={formData}
        onClose={closeAddModal}
        onChange={setFormData}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AccountPage;
