import { Calendar, Edit, Trash2 } from "lucide-react";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Transaction } from "@/lib/types";
import CategoryIcon from "../ui/CategoryIcon";
import { EmptyPage } from "../EmptyPage";
import { useModalStore } from "@/store/useModalStore";

type Props = {
  transactions?: Transaction[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}: Props) {
  const { openModal } = useModalStore();

  return (
    <>
      <Card className="shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="min-w-[140px]">Tanggal</TableHead>
                <TableHead className="min-w-[260px]">Deskripsi</TableHead>
                <TableHead className="min-w-[140px]">Kategori</TableHead>
                <TableHead className="min-w-[140px]">Rekening</TableHead>
                <TableHead className="min-w-[140px] text-right">
                  Jumlah
                </TableHead>
                <TableHead className="min-w-[120px] text-center">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions?.map((t) => (
                <TableRow key={t.id} className="hover:bg-muted/40">
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {t.date}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <CategoryIcon
                        iconName={t.category.icon}
                        color={t.category.color}
                        size={20}
                        showBackground={true}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {t.title || "-"}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {t.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {t.category.name || "-"}
                    </span>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {t.transaction_lines?.[0]?.account_name || "-"}
                  </TableCell>

                  <TableCell className="text-right">
                    <span
                      className={
                        t.type === "income"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {t.type === "income" ? "+" : "-"} Rp{" "}
                      {Math.abs(t.total_amount ?? 0).toLocaleString("id-ID")}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit?.(t.id)}
                        aria-label="Edit transaksi"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete?.(t.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400"
                        aria-label="Hapus transaksi"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {transactions?.length === 0 && (
          <EmptyPage
            btnText="Tambah Transaksi"
            title="Belum ada transaksi"
            description="Kamu belum ada transaksi. Mulai buat transaksi dengan tekan tombol di bawah atau kanan atas"
            onClick={() => openModal("transaction")}
          />
        )}
      </Card>
    </>
  );
}
