/**
 * Example: Cara menggunakan CategoryIcon, CategorySelector, dan IconPicker
 */

// 1. Import komponen
import CategoryIcon from "@/components/ui/CategoryIcon";
import CategorySelector from "@/components/ui/CategorySelector";
import IconPicker from "@/components/ui/IconPicker";
import type { Transaction } from "@/lib/types/transaction";
import { useState } from "react";

// 2. Contoh penggunaan CategoryIcon
function TransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <div className="flex items-center gap-3">
      {/* Icon dengan background */}
      <CategoryIcon
        iconName={transaction.category.icon}
        color={transaction.category.color}
        size={20}
        showBackground={true}
      />

      {/* Icon tanpa background */}
      <CategoryIcon
        iconName={transaction.category.icon}
        color={transaction.category.color}
        size={16}
        showBackground={false}
      />

      <div>
        <p>{transaction.title}</p>
        <p>{transaction.category.name}</p>
      </div>
    </div>
  );
}

// 3. Contoh penggunaan CategorySelector
function TransactionForm() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories] = useState([]);

  return (
    <div>
      <label>Kategori</label>
      <CategorySelector
        categories={categories}
        selectedId={selectedCategoryId}
        onChange={setSelectedCategoryId}
        type="expense" // atau "income"
        placeholder="Pilih kategori transaksi"
      />
    </div>
  );
}

// 4. Contoh penggunaan IconPicker
function CategoryForm() {
  const [icon, setIcon] = useState("Circle");
  const [color, setColor] = useState("#6B7280");

  return (
    <div className="space-y-4">
      {/* Preview icon yang dipilih */}
      <div className="flex items-center gap-3">
        <CategoryIcon
          iconName={icon}
          color={color}
          size={24}
          showBackground={true}
        />
        <span>Icon Preview</span>
      </div>

      {/* Color picker */}
      <div>
        <label>Warna</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 rounded"
        />
      </div>

      {/* Icon picker */}
      <div>
        <label>Pilih Icon</label>
        <IconPicker selectedIcon={icon} onSelectIcon={setIcon} color={color} />
      </div>
    </div>
  );
}

export { TransactionItem, TransactionForm, CategoryForm };
