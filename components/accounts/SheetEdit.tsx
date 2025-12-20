import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { SelectCurrency } from "../SelectCurrency";
import { useDeviceStore } from "@/store/useDeviceStore";
import { AccountType, EditAccountPayload } from "@/lib/types/account";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { LoaderIcon } from "lucide-react";

interface SheetEditProps {
  open: boolean;
  onClose: () => void;
  editForm: EditAccountPayload;
  setEditForm: (form: EditAccountPayload) => void;
  onSave: () => void;
  isLoading?: boolean;
}
const SheetEdit = ({
  open,
  onClose,
  editForm,
  setEditForm,
  onSave,
  isLoading = false,
}: SheetEditProps) => {
  const { isMobile } = useDeviceStore();
  return (
    <>
      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen && !isLoading) onClose();
        }}
      >
        <SheetContent
          className="px-3 sm:px-6"
          side={isMobile ? "bottom" : "right"}
        >
          <SheetHeader className="pb-6">
            <SheetTitle>Edit account</SheetTitle>
            <SheetDescription>
              Atur perubahan akun anda disini. klik tombol simpan ketika sudah
              selesai.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-5 sm:gap-6">
            <div className="grid gap-3">
              <Label htmlFor="nama">Nama Akun</Label>
              <Input
                id="nama"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="no">No Rekening</Label>
              <Input
                id="no"
                value={editForm.number ?? ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    number: e.target.value || null,
                  })
                }
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tipe">Tipe Rekening</Label>
              <Select
                value={editForm.type}
                onValueChange={(value: AccountType) =>
                  setEditForm({
                    ...editForm,
                    type: value,
                  })
                }
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>{editForm.type.toLocaleUpperCase()}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank</SelectItem>
                  <SelectItem value="e-wallet">E-Wallet</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="currency">Mata Uang</Label>
              <SelectCurrency
                id="currency"
                value={editForm.currency ?? ""}
                onChange={(value: string) =>
                  setEditForm({
                    ...editForm,
                    currency: value,
                  })
                }
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="isActive">Status Akun</Label>
                <p className="text-sm text-muted-foreground">
                  {editForm?.is_active ? "Aktif" : "Nonaktif"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  className="scale-110 sm:scale-125"
                  id="isActive"
                  checked={editForm?.is_active}
                  onCheckedChange={(checked) =>
                    setEditForm({ ...editForm, is_active: checked })
                  }
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
          <SheetFooter className="pt-6 flex gap-2 sm:flex-row sm:justify-end">
            <Button
              onClick={onSave}
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading && <LoaderIcon className="h-4 w-4 animate-spin" />}
              Save changes
            </Button>
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                disabled={isLoading}
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

export default SheetEdit;
