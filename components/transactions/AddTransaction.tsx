"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Skeleton } from "../ui/skeleton";
import { get, post } from "@/lib/axios";
import axios from "axios";
import { CategoryPicker } from "../CategoryPicker";
import { useUser } from "../providers/UserProvider";
import { toastError, toastSuccess } from "@/lib/toast";
import { TransactionPayload } from "@/lib/types/transaction";
import { Category } from "@/lib/types/category";
import { Account } from "@/lib/types/account";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const createInitialForm = () => ({
  account: "",
  amount: "",
  title: "",
  description: "",
  date: new Date().toISOString(),
  scope: "personal" as const,
});

interface AddTransactionProps {
  open: boolean;
  setForm: (form: TransactionPayload) => void;
  onClose: () => void;
  onSubmit: () => void;
}
const AddTransaction = ({
  open,
  onClose,
  onSubmit,
  setForm,
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
  const [formData, setFormData] = useState(createInitialForm);

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
  }, [user?.id, isUserLoading]);

  useEffect(() => {
    if (accounts.length > 0 && !formData.account) {
      setFormData((prev) => ({ ...prev, account: accounts[0].id }));
    }
  }, [accounts, formData.account]);

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
        created_by_user_id: user?.id || "",
        account_id: formData.account,
        total_amount: Number(formData.amount),
      } as TransactionPayload);
    }
  }, [formData, selectedCategory, transactionType, setForm, user?.id]);

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

  const filteredCategories = categories.filter(
    (cat) => cat.type === transactionType
  );

  // Block submit until the required option lists are ready to avoid empty/flicker states.
  const isInitialDataLoading = isAccountsLoading || isCategoriesLoading;
  const isFormBlocked =
    isInitialDataLoading || isSubmitting || !!accountsError || !!categoriesError;
  const isAccountFieldDisabled =
    isAccountsLoading || !!accountsError || isSubmitting;

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
      />
    );
  };

  const resetForm = useCallback(() => {
    setFormData(createInitialForm());
    setSelectedCategory(undefined);
    setTransactionType("expense");
  }, []);

  const handleSubmit = async () => {
    if (isFormBlocked) return;
    const payload: TransactionPayload = {
      category_id: selectedCategory?.id ?? "",
      date: formData.date,
      title: formData.title,
      created_by_user_id: user?.id || "",
      account_id: formData.account,
      type: transactionType,
      total_amount: Number(formData.amount),
      scope: formData.scope,
      description: formData.description,
    };
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
        const message = error.response?.data?.message || error.message;
        toastError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
                      <div className="grid gap-2">
                        <Label>Pilih Akun</Label>
                        {isAccountsLoading ? (
                          <Skeleton className="h-10 w-full" />
                        ) : accountsError ? (
                          renderFetchError(accountsError, fetchAccounts)
                        ) : (
                          <Select
                            value={formData.account}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                account: value,
                              }))
                            }
                            disabled={isAccountFieldDisabled}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih akun" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label>Nominal</Label>
                        <Input
                          type="number"
                          value={formData.amount}
                          onChange={(e) =>
                            handleInputChange("amount", e.target.value)
                          }
                          placeholder="10000"
                          disabled={isSubmitting}
                        ></Input>
                      </div>
                      <div className="grid gap-2">
                        <Label>Judul</Label>
                        <Input
                          type="text"
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          placeholder="cth: beli kopi dan makan"
                          disabled={isSubmitting}
                        ></Input>
                      </div>
                      <div className="grid gap-2">
                        <Label>Category</Label>
                        <div
                          className={
                            isSubmitting ? "pointer-events-none opacity-60" : ""
                          }
                        >
                          {renderCategoryContent()}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Deskripsi</Label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="beli kopi dan makan di warung pak eko"
                          disabled={isSubmitting}
                        ></Textarea>
                      </div>
                    </TabsContent>
                    <TabsContent value="income" className="my-2 space-y-3">
                      <div className="grid gap-2">
                        <Label>Pilih Akun</Label>
                        {isAccountsLoading ? (
                          <Skeleton className="h-10 w-full" />
                        ) : accountsError ? (
                          renderFetchError(accountsError, fetchAccounts)
                        ) : (
                          <Input
                            type="text"
                            value={formData.account}
                            onChange={(e) =>
                              handleInputChange("account", e.target.value)
                            }
                            placeholder="cth: gaji bulanan"
                            disabled={isAccountFieldDisabled}
                          />
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label>Nominal</Label>
                        <Input
                          type="number"
                          value={formData.amount}
                          onChange={(e) =>
                            handleInputChange("amount", e.target.value)
                          }
                          placeholder="10000"
                          disabled={isSubmitting}
                        ></Input>
                      </div>
                      <div className="grid gap-2">
                        <Label>Judul</Label>
                        <Input
                          type="text"
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          placeholder="cth: gaji bulanan"
                          disabled={isSubmitting}
                        ></Input>
                      </div>
                      <div className="grid gap-2">
                        <Label>Category</Label>
                        <div
                          className={
                            isSubmitting ? "pointer-events-none opacity-60" : ""
                          }
                        >
                          {renderCategoryContent()}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Deskripsi</Label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="gaji bulan ini"
                          disabled={isSubmitting}
                        ></Textarea>
                      </div>
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
              {isSubmitting && (
                <LoaderIcon className="h-4 w-4 animate-spin" />
              )}
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
