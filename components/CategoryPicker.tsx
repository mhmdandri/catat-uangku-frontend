import React, { useMemo, useState } from "react";
import type { Category } from "@/lib/types/category";
import type { TransactionType } from "@/lib/types/transaction";
import { Check, Plus, Search, X, ChevronDown, ChevronUp } from "lucide-react";
import CategoryIcon from "./ui/CategoryIcon";
import { useDeviceStore } from "@/store/useDeviceStore";

const getContrastColor = (color?: string | null) => {
  if (!color || color[0] !== "#") return undefined;
  const hex = color.slice(1);
  if (hex.length !== 3 && hex.length !== 6) return undefined;
  const normalized =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  if ([r, g, b].some((v) => Number.isNaN(v))) return undefined;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 160 ? "#111827" : "#F9FAFB";
};
interface CategoryPickerProps {
  data: Category[];
  selectedCategory?: Category;
  onSelectCategory: (category: Category) => void;
  type?: TransactionType;
  showAddNew?: boolean;
  onAddNew?: () => void;
  initialVisibleCount?: number;
  step?: number;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  data: categories,
  selectedCategory,
  onSelectCategory,
  showAddNew = true,
  onAddNew,
  initialVisibleCount,
  step = 12,
}) => {
  const { isMobile } = useDeviceStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch] = useState(true);
  initialVisibleCount = isMobile ? 3 : 4;
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  const visibleCategories = useMemo(() => {
    if (isSearching) return filteredCategories;
    return filteredCategories.slice(0, visibleCount);
  }, [filteredCategories, visibleCount, isSearching]);

  const canShowMore = !isSearching && visibleCount < filteredCategories.length;
  const canShowLess = !isSearching && visibleCount > initialVisibleCount;
  const shouldShowAdd =
    showAddNew && !!onAddNew && (canShowLess || !canShowMore);

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.trim().length === 0) {
                setVisibleCount(initialVisibleCount);
              }
            }}
            placeholder="Cari kategori..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-10 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setVisibleCount(initialVisibleCount);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {visibleCategories.map((category) => {
          const isSelected = selectedCategory?.id === category.id;
          const iconColor = getContrastColor(category.color) ?? category.color;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category)}
              type="button"
              className={`group relative flex flex-col items-center gap-1 rounded-lg border p-2 transition ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-border bg-background hover:bg-accent"
              }`}
            >
              {isSelected && (
                <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600">
                  <Check className="h-2.5 w-2.5 text-white" />
                </div>
              )}

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-muted transition-transform duration-200 ${
                  isSelected ? "scale-110" : "group-hover:scale-105"
                }`}
                style={
                  category.color
                    ? { backgroundColor: category.color }
                    : undefined
                }
              >
                <CategoryIcon
                  iconName={category.icon}
                  color={iconColor}
                  size={18}
                  showBackground={false}
                />
              </div>

              <p
                className={`line-clamp-2 text-center text-xs transition-colors ${
                  isSelected ? "text-emerald-900" : "text-gray-700"
                }`}
              >
                {category.name}
              </p>
            </button>
          );
        })}

        {shouldShowAdd && (
          <button
            onClick={onAddNew}
            type="button"
            className="group flex flex-col items-center gap-1 rounded-lg border border-dashed border-border bg-muted/40 p-2 transition hover:border-emerald-500/60 hover:bg-emerald-500/10"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted transition group-hover:bg-emerald-500/15">
              <Plus className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
            </div>
            <p className="text-center text-xs text-muted-foreground transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
              Tambah
            </p>
          </button>
        )}
      </div>

      {(canShowMore || canShowLess) && (
        <div className="flex items-center justify-center gap-2">
          {canShowMore && (
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + step)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              lebih banyak <ChevronDown className="h-4 w-4" />
            </button>
          )}

          {canShowLess && (
            <button
              type="button"
              onClick={() => setVisibleCount(initialVisibleCount)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              lebih sedikit <ChevronUp className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {filteredCategories.length === 0 && (
        <div className="text-center">
          <Search className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm text-gray-500">Kategori tidak ditemukan</p>
          <p className="text-xs text-gray-400">Coba kata kunci lain</p>
        </div>
      )}
    </div>
  );
};
