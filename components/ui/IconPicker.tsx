import React, { useState } from "react";
import { allCategoryIcons } from "@/lib/categoryIcons";
import CategoryIcon from "./CategoryIcon";
import { Search } from "lucide-react";

interface IconPickerProps {
  selectedIcon?: string;
  onSelectIcon: (iconName: string) => void;
  color?: string;
}

const IconPicker: React.FC<IconPickerProps> = ({
  selectedIcon,
  onSelectIcon,
  color = "#6B7280",
}) => {
  const [search, setSearch] = useState("");

  const filteredIcons = allCategoryIcons.filter(
    (icon) =>
      icon.name.toLowerCase().includes(search.toLowerCase()) ||
      icon.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari icon..."
          className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-64 overflow-y-auto p-2 border border-border rounded-lg">
        {filteredIcons.map((icon) => (
          <button
            key={icon.name}
            type="button"
            onClick={() => onSelectIcon(icon.name)}
            className={`p-2 rounded-lg hover:bg-accent transition-colors ${
              selectedIcon === icon.name ? "bg-accent ring-2 ring-ring" : ""
            }`}
            title={icon.label}
          >
            <CategoryIcon
              iconName={icon.name}
              color={color}
              size={20}
              showBackground={false}
            />
          </button>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center py-8 text-sm text-muted-foreground">
          Icon tidak ditemukan
        </div>
      )}
    </div>
  );
};

export default IconPicker;
