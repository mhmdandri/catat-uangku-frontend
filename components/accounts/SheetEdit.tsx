import { AccountType, EditAccountPayload } from "@/lib/types";
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

interface SheetEditProps {
  open: boolean;
  onClose: () => void;
  editForm: EditAccountPayload;
  setEditForm: (form: EditAccountPayload) => void;
  onSave: () => void;
}
const SheetEdit = ({
  open,
  onClose,
  editForm,
  setEditForm,
  onSave,
}: SheetEditProps) => {
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit account</SheetTitle>
            <SheetDescription>
              Atur perubahan akun anda disini. klik tombol simpan ketika sudah
              selesai.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Nama Akun</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="no">No Rekening</Label>
              <Input
                id="no"
                value={editForm?.number || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, number: e.target.value })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tipe">Tipe Rekening</Label>
              <select
                id="tipe"
                value={editForm.type}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    type: e.target.value as AccountType,
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              >
                <option value="bank">Bank</option>
                <option value="e-wallet">E-Wallet</option>
                <option value="cash">Cash</option>
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="currency">Mata Uang</Label>
              <SelectCurrency
                id="currency"
                value={editForm.currency}
                onChange={(value: string) =>
                  setEditForm({
                    ...editForm,
                    currency: value,
                  })
                }
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
                  className="scale-125"
                  id="isActive"
                  checked={editForm?.is_active}
                  onCheckedChange={(checked) =>
                    setEditForm({ ...editForm, is_active: checked })
                  }
                />
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button onClick={onSave}>Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SheetEdit;
