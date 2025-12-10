"use client";

import React, { useMemo, useState } from "react";
import { useBalanceVisibilityStore } from "@/store/useBalanceVisibilityStore";
import { accounts, accountTransactions } from "@/lib/accounts";
import type { Account, AccountTransaction } from "@/lib/types";
import { AccountSummary } from "@/components/accounts/AccountSummary";
import { AccountCard } from "@/components/accounts/AccountCard";
import { AccountStats } from "@/components/accounts/AccountStats";
import {
  AddAccountModal,
  type AddAccountFormData,
} from "@/components/accounts/AddAccountModal";
import { useAccountModalStore } from "@/store/useAccountModalStore";

const AccountPage: React.FC = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );
  const [formData, setFormData] = useState<AddAccountFormData>({
    accountName: "",
    accountType: "bank",
    balance: "",
  });

  const { showBalances } = useBalanceVisibilityStore();
  const { isAddModalOpen, closeAddModal } = useAccountModalStore();

  // hitung summary dengan useMemo biar lebih rapi
  const {
    totalBalance,
    totalBankBalance,
    totalEWalletBalance,
    totalCashBalance,
  } = useMemo(() => {
    const total = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const bank = accounts
      .filter((acc) => acc.type === "bank")
      .reduce((sum, acc) => sum + acc.balance, 0);
    const ewallet = accounts
      .filter((acc) => acc.type === "e-wallet")
      .reduce((sum, acc) => sum + acc.balance, 0);
    const cash = accounts
      .filter((acc) => acc.type === "cash")
      .reduce((sum, acc) => sum + acc.balance, 0);

    return {
      totalBalance: total,
      totalBankBalance: bank,
      totalEWalletBalance: ewallet,
      totalCashBalance: cash,
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: ganti dengan logic real (API / state management)
    console.log("Adding account:", formData);
    closeAddModal();
    setFormData({ accountName: "", accountType: "bank", balance: "" });
  };

  const getAccountTransactions = (accountId: number): AccountTransaction[] =>
    accountTransactions.filter((t) => t.accountId === accountId);

  const handleEditAccount = (accountId: number) => {
    console.log("Edit account", accountId);
    // TODO: buka modal edit / route ke page edit
  };

  const handleDeleteAccount = (accountId: number) => {
    console.log("Delete account", accountId);
    // TODO: konfirmasi & call API delete
  };

  return (
    <>
      <AccountSummary
        totalBalance={totalBalance}
        totalBankBalance={totalBankBalance}
        totalEWalletBalance={totalEWalletBalance}
        totalCashBalance={totalCashBalance}
        showBalances={showBalances}
      />
      {/* Accounts Grid */}
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account: Account) => (
          <AccountCard
            key={account.id}
            account={account}
            transactions={getAccountTransactions(account.id)}
            isSelected={selectedAccountId === account.id}
            showBalances={showBalances}
            onSelect={() =>
              setSelectedAccountId(
                selectedAccountId === account.id ? null : account.id
              )
            }
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
          />
        ))}
      </div>

      <AccountStats accounts={accounts} showBalances={showBalances} />

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
