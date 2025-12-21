"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconPicker from "@/components/ui/IconPicker";
import CategoryIcon from "@/components/ui/CategoryIcon";
import { post } from "@/lib/axios";
import { toastError, toastSuccess } from "@/lib/toast";
import type { Category } from "@/lib/types/category";
import type { Scope } from "@/lib/types/account";
import type { TransactionType } from "@/lib/types/transaction";
import { LoaderIcon } from "lucide-react";
import axios from "axios";

const DEFAULT_COLOR = "#6B7280";
const DEFAULT_ICON = "Circle";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (category: Category) => void;
  defaultType?: TransactionType;
  scope?: Scope;
  groupId?: string | null;
}

const AddCategoryModal = ({
  open,
  onClose,
  onCreated,
  defaultType = "expense",
  scope = "personal",
  groupId = null,
}: AddCategoryModalProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<TransactionType>(defaultType);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [icon, setIcon] = useState(DEFAULT_ICON);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setName("");
    setType(defaultType);
    setColor(DEFAULT_COLOR);
    setIcon(DEFAULT_ICON);
  }, [defaultType, open]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!name.trim()) {
      toastError("Nama kategori wajib diisi");
      return;
    }
    if (!icon) {
      toastError("Icon wajib dipilih");
      return;
    }
    if (scope === "group" && !groupId) {
      toastError("Group tidak ditemukan");
      return;
    }

    const payload: {
      name: string;
      type: TransactionType;
      color?: string;
      icon: string;
      group_id?: string | null;
    } = {
      name: name.trim(),
      type,
      color,
      icon,
    };
    if (scope === "group") {
      payload.group_id = groupId;
    }
    setIsSubmitting(true);
    try {
      const res = await post<{ data: Category }>("/categories", payload);
      if (!res?.data) {
        toastError("Gagal membuat kategori");
        return;
      }
      toastSuccess("Kategori berhasil dibuat");
      onCreated(res.data);
      onClose();
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
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !isSubmitting) onClose();
      }}
    >
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-2xl overflow-y-auto sm:max-h-[calc(100dvh-4rem)]">
        <DialogHeader>
          <DialogTitle>Buat kategori baru</DialogTitle>
          <DialogDescription>
            Tambahkan kategori baru untuk transaksi kamu.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
            <CategoryIcon iconName={icon} color={color} size={20} />
            <div>
              <p className="text-sm font-medium text-foreground">
                {name.trim() || "Nama kategori"}
              </p>
              <p className="text-xs text-muted-foreground">
                {type === "income" ? "Pemasukan" : "Pengeluaran"}
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            <Label>Jenis Kategori</Label>
            <Tabs
              value={type}
              onValueChange={(value) => setType(value as TransactionType)}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="expense" disabled={isSubmitting}>
                  Pengeluaran
                </TabsTrigger>
                <TabsTrigger value="income" disabled={isSubmitting}>
                  Pemasukan
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category-name">Nama kategori</Label>
            <Input
              id="category-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Kopi & Snack"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-3">
            <Label>Warna</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-md border border-border bg-background"
                disabled={isSubmitting}
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="max-w-[140px]"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label>Pilih icon</Label>
            <IconPicker selectedIcon={icon} onSelectIcon={setIcon} color={color} />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <LoaderIcon className="h-4 w-4 animate-spin" />}
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
