"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useDeviceStore } from "@/store/useDeviceStore";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LoaderIcon, TrendingDown, TrendingUp } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { get, put } from "@/lib/axios";
import axios from "axios";
import { CategoryPicker } from "../CategoryPicker";
import { useUser } from "../providers/UserProvider";
import { toastError, toastSuccess } from "@/lib/toast";
import type {
  Transaction,
  TransactionPayload,
  TransactionType,
} from "@/lib/types/transaction";
import type { Category } from "@/lib/types/category";
import type { Account } from "@/lib/types/account";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";
import AddCategoryModal from "../categories/AddCategoryModal";

const buildInitialForm = (transaction?: Transaction | null) => ({
  account: transaction?.transaction_lines?.[0]?.account_id ?? "",
  amount: transaction ? String(Math.abs(transaction.total_amount ?? 0)) : "",
  title: transaction?.title ?? "",
  description: transaction?.description ?? "",
  date: transaction?.date ?? new Date().toISOString(),
  scope: transaction?.scope ?? "personal",
});

const buildFallbackCategory = (transaction: Transaction): Category => ({
  id: transaction.category_id,
  group_id: transaction.group_id ?? null,
  owner_user_id: null,
  name: transaction.category?.name ?? "Kategori",
  type: transaction.type,
  color: transaction.category?.color ?? undefined,
  icon: transaction.category?.icon ?? "Circle",
});

interface EditTransactionProps {
  open: boolean;
  transaction?: Transaction | null;
  onClose: () => void;
  onSubmit: () => void;
}

const EditTransaction = ({
  open,
  transaction,
  onClose,
  onSubmit,
}: EditTransactionProps) => {
  const { isMobile } = useDeviceStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isAccountsLoading, setIsAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState<string | null>(null);
  const { user, isLoading: isUserLoading } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense");
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [formData, setFormData] = useState(() => buildInitialForm(transaction));
  const [groupId, setGroupId] = useState<string | null>(
    transaction?.group_id ?? null
  );
  const scopedAccounts = useMemo(() => {
    if (!transaction) return accounts;
    if (formData.scope === "group") {
      if (!groupId) return [];
      return accounts.filter(
        (account) => account.scope === "group" && account.group_id === groupId
      );
    }
    return accounts.filter((account) => account.scope === "personal");
  }, [accounts, formData.scope, groupId, transaction]);

  const fetchCategories = useCallback(async () => {
    setIsCategoriesLoading(true);
    setCategoriesError(null);
    try {
      const res = await get<{ data: Category[] }>("/categories");
      setCategories(res.data ?? []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error message: ", error.message);
      }
      setCategories([]);
      setCategoriesError("Gagal memuat kategori");
    } finally {
      setIsCategoriesLoading(false);
    }
  }, []);

  const fetchAccounts = useCallback(async () => {
    if (isUserLoading) {
      setAccountsError(null);
      setIsAccountsLoading(true);
      return;
    }
    if (!user?.id) {
      setAccounts([]);
      setAccountsError("Pengguna tidak ditemukan");
      setIsAccountsLoading(false);
      return;
    }
    setIsAccountsLoading(true);
    setAccountsError(null);
    try {
      const res = await get<{ data: Account[] }>(`/accounts/user/${user.id}`);
      setAccounts(res.data ?? []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error message: ", error.message);
      }
      setAccounts([]);
      setAccountsError("Gagal memuat akun");
    } finally {
      setIsAccountsLoading(false);
    }
  }, [user?.id, isUserLoading]);

  useEffect(() => {
    if (!open) return;
    void fetchCategories();
  }, [fetchCategories, open]);

  useEffect(() => {
    if (!open) return;
    void fetchAccounts();
  }, [fetchAccounts, open]);

  useEffect(() => {
    if (!open) return;
    if (!transaction) {
      setFormData(buildInitialForm());
      setSelectedCategory(undefined);
      setTransactionType("expense");
      setGroupId(null);
      return;
    }
    setFormData(buildInitialForm(transaction));
    setTransactionType(transaction.type);
    setSelectedCategory(buildFallbackCategory(transaction));
    setGroupId(transaction.group_id ?? null);
  }, [open, transaction]);

  useEffect(() => {
    if (!open) {
      setShowAddCategory(false);
    }
  }, [open]);

  useEffect(() => {
    if (!scopedAccounts.length || !open) return;
    if (
      !formData.account ||
      !scopedAccounts.some((acc) => acc.id === formData.account)
    ) {
      setFormData((prev) => ({ ...prev, account: scopedAccounts[0].id }));
    }
  }, [formData.account, open, scopedAccounts]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleTypeChange = (type: TransactionType) => {
    setTransactionType(type);
    setSelectedCategory(undefined);
  };

  const handleOpenAddCategory = useCallback(() => {
    setShowAddCategory(true);
  }, []);

  const handleCategoryCreated = useCallback(
    (category: Category) => {
      setCategories((prev) => [category, ...prev]);
      setSelectedCategory(category);
      setTransactionType(category.type);
      setShowAddCategory(false);
    },
    [setCategories]
  );

  const filteredCategories = useMemo(() => {
    const byType = categories.filter((cat) => cat.type === transactionType);
    if (
      selectedCategory &&
      !byType.some((cat) => cat.id === selectedCategory.id)
    ) {
      return [selectedCategory, ...byType];
    }
    return byType;
  }, [categories, selectedCategory, transactionType]);

  const isInitialDataLoading = isAccountsLoading || isCategoriesLoading;
  const isFormBlocked =
    isInitialDataLoading ||
    isSubmitting ||
    !!accountsError ||
    !!categoriesError ||
    !transaction;
  const isAccountFieldDisabled =
    isAccountsLoading || !!accountsError || isSubmitting || !scopedAccounts.length;

  const renderFetchError = (message: string, onRetry: () => void) => (
    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
      <p>{message}</p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="mt-2"
      >
        Coba lagi
      </Button>
    </div>
  );

  const renderCategoryContent = () => {
    if (isCategoriesLoading) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-9 w-full" />
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-background p-2"
              >
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-3 w-14" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (categoriesError) {
      return renderFetchError(categoriesError, fetchCategories);
    }
    return (
      <CategoryPicker
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        data={filteredCategories}
        type={transactionType}
        onAddNew={handleOpenAddCategory}
      />
    );
  };

  const handleSubmit = async () => {
    if (isFormBlocked || !transaction) return;
    if (!selectedCategory?.id) {
      toastError("Kategori wajib dipilih");
      return;
    }
    if (formData.scope === "group" && !groupId) {
      toastError("Group tidak ditemukan");
      return;
    }
    if (!formData.account) {
      toastError("Akun wajib dipilih");
      return;
    }
    if (scopedAccounts.length > 0) {
      const isValidAccount = scopedAccounts.some(
        (account) => account.id === formData.account
      );
      if (!isValidAccount) {
        toastError("Akun tidak sesuai dengan scope transaksi");
        return;
      }
    }
    const payload: TransactionPayload = {
      category_id: selectedCategory.id,
      title: formData.title,
      account_id: formData.account,
      type: transactionType,
      total_amount: Number(formData.amount),
      scope: formData.scope,
      description: formData.description,
    };
    if (formData.scope === "group") {
      payload.group_id = groupId;
    }
    setIsSubmitting(true);
    try {
      await put(`/transactions/${transaction.id}`, payload);
      toastSuccess("Berhasil memperbarui transaksi");
      onClose();
      onSubmit();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { error?: string })?.error ??
          error.response?.data?.message ??
          error.message;
        toastError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AddCategoryModal
        open={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onCreated={handleCategoryCreated}
        defaultType={transactionType}
        scope={formData.scope}
        groupId={groupId}
      />
      <Sheet
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen && !isSubmitting) {
            onClose();
          }
        }}
      >
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={[
            "flex flex-col p-0",
            isMobile ? "h-[90vh]" : "h-screen",
          ].join(" ")}
        >
          <SheetHeader>
            <SheetTitle>Edit transaksi</SheetTitle>
            <SheetDescription>
              Ubah detail transaksi kamu di form berikut lalu simpan
              perubahannya
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 min-h-0 overflow-y-auto px-4">
            {!transaction ? (
              <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                Transaksi tidak ditemukan.
              </div>
            ) : (
              <div className="grid flex-1 auto-rows-min gap-5 sm:gap-6">
                <div className="grid gap-3">
                  <Label>Jenis Transaksi</Label>
                  <div className="w-full">
                    <Tabs
                      value={transactionType}
                      onValueChange={(value) =>
                        handleTypeChange(value as TransactionType)
                      }
                      className="w-full"
                    >
                      <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger
                          value="expense"
                          className="w-full flex gap-4 items-center self-center"
                          disabled={isSubmitting}
                        >
                          <TrendingDown className="text-red-500" />
                          Pengeluaran
                        </TabsTrigger>
                        <TabsTrigger
                          value="income"
                          className="w-full flex gap-4 items-center self-center"
                          disabled={isSubmitting}
                        >
                          <TrendingUp className="text-green-500" />
                          Pemasukan
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="expense" className="my-2 space-y-3">
                        <ExpenseForm
                          isAccountsLoading={isAccountsLoading}
                          accountsError={accountsError}
                          isAccountFieldDisabled={isAccountFieldDisabled}
                          formData={formData}
                          isSubmitting={isSubmitting}
                          fetchAccounts={fetchAccounts}
                          handleInputChange={handleInputChange}
                          renderCategoryContent={renderCategoryContent}
                          accounts={scopedAccounts}
                          renderFetchError={renderFetchError}
                        />
                      </TabsContent>
                      <TabsContent value="income" className="my-2 space-y-3">
                        <IncomeForm
                          accounts={scopedAccounts}
                          isAccountsLoading={isAccountsLoading}
                          accountsError={accountsError}
                          isAccountFieldDisabled={isAccountFieldDisabled}
                          formData={formData}
                          isSubmitting={isSubmitting}
                          fetchAccounts={fetchAccounts}
                          handleInputChange={handleInputChange}
                          renderCategoryContent={renderCategoryContent}
                          renderFetchError={renderFetchError}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            )}
          </div>
          <SheetFooter className="flex gap-2 flex-col">
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto"
              disabled={isFormBlocked}
            >
              {isSubmitting && <LoaderIcon className="h-4 w-4 animate-spin" />}
              Save changes
            </Button>
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditTransaction;
