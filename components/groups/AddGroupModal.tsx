import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (data: { name: string; description: string }) => void;
};

export default function AddGroupModal({ open, onOpenChange, onSubmit }: Props) {
  const [form, setForm] = useState({ name: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", description: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buat Grup Baru</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Nama Grup</label>
            <Input
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="Contoh: Liburan Bali 2025"
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
              placeholder="Deskripsi grup..."
              rows={3}
              required
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
            <Button type="submit">Buat Grup</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
