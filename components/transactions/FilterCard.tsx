import { Filter, Search } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TransactionType } from "@/lib/types/transaction";

type Props = {
  filterType: "all" | TransactionType;
  onChangeFilter: (v: "all" | TransactionType) => void;
  searchQuery: string;
  onChangeSearch: (v: string) => void;
  onOpenAdvancedFilter?: () => void;
};

export default function FilterCard({
  filterType,
  onChangeFilter,
  searchQuery,
  onChangeSearch,
  onOpenAdvancedFilter,
}: Props) {
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => onChangeSearch(e.target.value)}
              placeholder="Cari transaksi..."
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => onChangeFilter("all")}
              className="h-9"
            >
              Semua
            </Button>
            <Button
              variant={filterType === "income" ? "default" : "outline"}
              onClick={() => onChangeFilter("income")}
              className="h-9"
            >
              Pemasukan
            </Button>
            <Button
              variant={filterType === "expense" ? "default" : "outline"}
              onClick={() => onChangeFilter("expense")}
              className="h-9"
            >
              Pengeluaran
            </Button>

            <Button
              variant="outline"
              onClick={onOpenAdvancedFilter}
              className="h-9 gap-2"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
