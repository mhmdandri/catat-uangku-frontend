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
import { get, post } from "@/lib/axios";
import axios from "axios";
import { CategoryPicker } from "../CategoryPicker";
import { useUser } from "../providers/UserProvider";
import { toastError, toastSuccess } from "@/lib/toast";
import { TransactionPayload } from "@/lib/types/transaction";
import { Category } from "@/lib/types/category";
import { Account, AccountListResponse, Scope } from "@/lib/types/account";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";
import AddCategoryModal from "../categories/AddCategoryModal";

const createInitialForm = (scope: Scope) => ({
  account: "",
  amount: "",
  title: "",
  description: "",
  date: new Date().toISOString(),
  scope,
});

interface AddTransactionProps {
  open: boolean;
  setForm: (form: TransactionPayload) => void;
  onClose: () => void;
  onSubmit: () => void;
  scope?: Scope;
  groupId?: string | null;
}
const AddTransaction = ({
  open,
  onClose,
  onSubmit,
  setForm,
  scope = "personal",
  groupId = null,
}: AddTransactionProps) => {
  const { isMobile } = useDeviceStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isAccountsLoading, setIsAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState<string | null>(null);
  const { user, isLoading: isUserLoading } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense"
  );
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [formData, setFormData] = useState(() => createInitialForm(scope));
  const scopedAccounts = useMemo(() => {
    if (scope === "group") {
      if (!groupId) return [];
      return accounts.filter(
        (account) => account.scope === "group" && account.group_id === groupId
      );
    }
    return accounts.filter((account) => account.scope === "personal");
  }, [accounts, groupId, scope]);
  const scopedAccountsError =
    accountsError ??
    (scope === "group" && !groupId ? "Group tidak ditemukan" : null);

  const fetchCategories = useCallback(async () => {
    setIsCategoriesLoading(true);
    setCategoriesError(null);
    try {
      const res = await get<{ data: Category[] }>("/categories");
      console.log(res.data);
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
    if (!user?.data.id) {
      setAccounts([]);
      setAccountsError("Pengguna tidak ditemukan");
      setIsAccountsLoading(false);
      return;
    }
    setIsAccountsLoading(true);
    setAccountsError(null);
    try {
      const res = await get<AccountListResponse>(
        `/accounts/user/${user.data.id}`
      );
      console.log(res.data);
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
  }, [user?.data.id, isUserLoading]);

  useEffect(() => {
    if (!scopedAccounts.length) return;
    if (
      !formData.account ||
      !scopedAccounts.some((acc) => acc.id === formData.account)
    ) {
      setFormData((prev) => ({ ...prev, account: scopedAccounts[0].id }));
    }
  }, [formData.account, scopedAccounts]);

  useEffect(() => {
    if (!open) return;
    setFormData((prev) => ({ ...prev, scope }));
  }, [open, scope]);

  useEffect(() => {
    if (!open) {
      setShowAddCategory(false);
    }
  }, [open]);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    void fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    if (selectedCategory) {
      setForm({
        ...formData,
        type: transactionType,
        category_id: selectedCategory.id,
        account_id: formData.account,
        total_amount: Number(formData.amount),
        ...(scope === "group" && groupId ? { group_id: groupId } : {}),
      } as TransactionPayload);
    }
  }, [formData, groupId, scope, selectedCategory, setForm, transactionType]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleTypeChange = (type: "expense" | "income") => {
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

  const filteredCategories = categories.filter(
    (cat) => cat.type === transactionType
  );

  const isInitialDataLoading = isAccountsLoading || isCategoriesLoading;
  const isFormBlocked =
    isInitialDataLoading ||
    isSubmitting ||
    !!scopedAccountsError ||
    !!categoriesError ||
    scopedAccounts.length === 0;
  const isAccountFieldDisabled =
    isAccountsLoading ||
    !!scopedAccountsError ||
    isSubmitting ||
    scopedAccounts.length === 0;

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

  const resetForm = useCallback(() => {
    setFormData(createInitialForm(scope));
    setSelectedCategory(undefined);
    setTransactionType("expense");
  }, [scope]);

  const handleSubmit = async () => {
    if (isFormBlocked) return;
    if (!selectedCategory?.id) {
      toastError("Kategori wajib dipilih");
      return;
    }
    if (scope === "group" && !groupId) {
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
      category_id: selectedCategory?.id ?? "",
      date: formData.date,
      title: formData.title,
      account_id: formData.account,
      type: transactionType,
      total_amount: Number(formData.amount),
      scope: formData.scope,
      description: formData.description,
    };
    if (scope === "group") {
      payload.group_id = groupId;
    }
    console.log("Submitting payload:", payload);
    setIsSubmitting(true);
    try {
      await post<TransactionPayload>("/transactions", payload);
      toastSuccess("Berhasil membuat transaksi");
      resetForm();
      onClose();
      onSubmit();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as
          | { error?: string; message?: string }
          | string
          | undefined;
        const message =
          (typeof data === "object" && data?.error) ||
          (typeof data === "object" && data?.message) ||
          (typeof data === "string" ? data : null) ||
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
        scope={scope}
        groupId={groupId}
      />
      <Sheet
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen && !isSubmitting) {
            resetForm();
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
            <SheetTitle>Buat transaksi baru</SheetTitle>
            <SheetDescription>
              Isi detail transaksi kamu di form berikut dan simpan untuk
              menambahkannya
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 min-h-0 overflow-y-auto px-4">
            <div className="grid flex-1 auto-rows-min gap-5 sm:gap-6">
              <div className="grid gap-3">
                <Label>Jenis Transaksi</Label>
                <div className="w-full">
                  <Tabs
                    value={transactionType}
                    onValueChange={(value) =>
                      handleTypeChange(value as "expense" | "income")
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
                        accountsError={scopedAccountsError}
                        isAccountFieldDisabled={isAccountFieldDisabled}
                        formData={formData}
                        isSubmitting={isSubmitting}
                        fetchAccounts={fetchAccounts}
                        handleInputChange={handleInputChange}
                        renderCategoryContent={renderCategoryContent}
                        accounts={accounts}
                        renderFetchError={renderFetchError}
                      />
                    </TabsContent>
                    <TabsContent value="income" className="my-2 space-y-3">
                      <IncomeForm
                        accounts={accounts}
                        isAccountsLoading={isAccountsLoading}
                        accountsError={scopedAccountsError}
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

export default AddTransaction;
