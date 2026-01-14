import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (data: {
    title: string;
    amount: string;
    type: "expense" | "income";
    category: string;
    description: string;
    date: string;
  }) => void;
};

export default function AddTransactionModal({
  open,
  onOpenChange,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense" as "expense" | "income",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Transaksi</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Judul</label>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((s) => ({ ...s, title: e.target.value }))
              }
              placeholder="Contoh: Bayar Kost"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Jumlah (Rp)
              </label>
              <Input
                type="number"
                value={form.amount}
                onChange={(e) =>
                  setForm((s) => ({ ...s, amount: e.target.value }))
                }
                placeholder="50000"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Tipe</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    type: e.target.value as "expense" | "income",
                  }))
                }
                className="h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="expense">Pengeluaran</option>
                <option value="income">Pemasukan</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Kategori</label>
            <Input
              value={form.category}
              onChange={(e) =>
                setForm((s) => ({ ...s, category: e.target.value }))
              }
              placeholder="Contoh: Makanan"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Tanggal</label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Deskripsi</label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((s) => ({ ...s, description: e.target.value }))
              }
              placeholder="Catatan transaksi..."
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit">Tambah</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
