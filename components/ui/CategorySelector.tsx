import React, { useState } from "react";
import CategoryIcon from "./CategoryIcon";
import { ChevronDown } from "lucide-react";
import type { Category } from "@/lib/types/category";

interface CategorySelectorProps {
  categories: Category[];
  selectedId?: string;
  onChange: (categoryId: string) => void;
  type?: "income" | "expense";
  placeholder?: string;
  className?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedId,
  onChange,
  type,
  placeholder = "Pilih kategori",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredCategories = type
    ? categories.filter((cat) => cat.type === type)
    : categories;

  const selected = categories.find((cat) => cat.id === selectedId);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-background border border-input rounded-lg hover:bg-accent transition-colors"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <CategoryIcon
              iconName={selected.icon}
              color={selected.color}
              size={20}
              showBackground={false}
            />
            <span className="font-medium text-foreground">{selected.name}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <ChevronDown
          size={20}
          className={`transition-transform text-muted-foreground ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-2 bg-popover border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {filteredCategories.length === 0 ? (
              <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                Tidak ada kategori
              </div>
            ) : (
              filteredCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    onChange(category.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left ${
                    selectedId === category.id ? "bg-accent" : ""
                  }`}
                >
                  <CategoryIcon
                    iconName={category.icon}
                    color={category.color}
                    size={20}
                    showBackground={false}
                  />
                  <span className="font-medium text-foreground">
                    {category.name}
                  </span>
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySelector;
