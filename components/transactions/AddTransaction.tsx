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
import { Account, Category, TransactionPayload } from "@/lib/types";
import { useDeviceStore } from "@/store/useDeviceStore";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { get, post } from "@/lib/axios";
import axios from "axios";
import { CategoryPicker } from "../CategoryPicker";
import { useUser } from "../providers/UserProvider";
import { useLoadingStore } from "@/store/useLoadingStore";
import { toastError, toastSuccess } from "@/lib/toast";
import { useRouter } from "next/navigation";

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
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { user } = useUser();
  const router = useRouter();
  const { startLoading, stopLoading } = useLoadingStore();
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense"
  );
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [formData, setFormData] = useState(createInitialForm);

  useEffect(() => {
    if (accounts.length > 0 && !formData.account) {
      setFormData((prev) => ({ ...prev, account: accounts[0].id }));
    }
  }, [accounts, formData.account]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await get<{ data: Category[] }>("/categories");
        console.log(res.data);
        setCategories(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Error message: ", error.message);
        }
      }
    };
    const getAccount = async () => {
      try {
        const res = await get<{ data: Account[] }>(
          `/accounts/user/${user?.id}`
        );
        console.log(res.data);
        setAccounts(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Error message: ", error.message);
        }
      }
    };
    getAccount();
    getCategories();
  }, [user?.id]);
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
    setSelectedCategory(undefined); // Reset category when type changes
  };

  const filteredCategories = categories.filter(
    (cat) => cat.type === transactionType
  );

  const resetForm = useCallback(() => {
    setFormData(createInitialForm());
    setSelectedCategory(undefined);
    setTransactionType("expense");
  }, []);

  const handleSubmit = async () => {
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
    startLoading();
    try {
      await post<TransactionPayload>("/transactions", payload);
      toastSuccess("Berhasil membuat transaksi");
      resetForm();
      onClose();
      router.refresh();
      onSubmit();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        toastError(message);
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
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
                      >
                        <TrendingDown className="text-red-500" />
                        Pengeluaran
                      </TabsTrigger>
                      <TabsTrigger
                        value="income"
                        className="w-full flex gap-4 items-center self-center"
                      >
                        <TrendingUp className="text-green-500" />
                        Pemasukan
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="expense" className="my-2 space-y-3">
                      <div className="grid gap-2">
                        <Label>Pilih Akun</Label>
                        <select
                          className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                          value={formData.account}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              account: e.target.value,
                            }))
                          }
                        >
                          {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                              {account.name}
                            </option>
                          ))}
                        </select>
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
                        ></Input>
                      </div>
                      <div className="grid gap-2">
                        <Label>Category</Label>
                        <CategoryPicker
                          selectedCategory={selectedCategory}
                          onSelectCategory={handleCategorySelect}
                          data={filteredCategories}
                          type={transactionType}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Deskripsi</Label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="beli kopi dan makan di warung pak eko"
                        ></Textarea>
                      </div>
                    </TabsContent>
                    <TabsContent value="income" className="my-2 space-y-3">
                      <div className="grid gap-2">
                        <Label>Pilih Akun</Label>
                        <Input
                          type="text"
                          value={formData.account}
                          onChange={(e) =>
                            handleInputChange("account", e.target.value)
                          }
                          placeholder="cth: gaji bulanan"
                        ></Input>
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
                        ></Input>
                      </div>
                      <div className="grid gap-2">
                        <Label>Category</Label>
                        <CategoryPicker
                          selectedCategory={selectedCategory}
                          onSelectCategory={handleCategorySelect}
                          data={filteredCategories}
                          type={transactionType}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Deskripsi</Label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="gaji bulan ini"
                        ></Textarea>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <SheetFooter className="flex gap-2 flex-col">
            <Button onClick={handleSubmit} className="w-full sm:w-auto">
              Save changes
            </Button>
            <SheetClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
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
