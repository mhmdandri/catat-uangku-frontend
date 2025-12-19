import React from "react";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CategoryIconProps {
  iconName?: string | null;
  color?: string | null;
  size?: number;
  className?: string;
  showBackground?: boolean;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({
  iconName,
  color = "#6B7280",
  size = 20,
  className = "",
  showBackground = true,
}) => {
  // Get icon component from Lucide, fallback to Circle
  const IconComponent =
    (iconName &&
      (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon)) ||
    LucideIcons.Circle;

  const iconColor = color || "#6B7280";

  if (showBackground) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-lg ${className}`}
        style={{
          backgroundColor: `${iconColor}20`, // 20 = 12.5% opacity
          padding: "8px",
          minWidth: "40px",
          minHeight: "40px",
        }}
      >
        <IconComponent size={size} color={iconColor} strokeWidth={2} />
      </div>
    );
  }

  return (
    <IconComponent
      size={size}
      color={iconColor}
      strokeWidth={2}
      className={className}
    />
  );
};

export default CategoryIcon;
