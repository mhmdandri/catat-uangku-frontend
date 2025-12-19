/**
 * Daftar icon Lucide React yang umum digunakan untuk kategori transaksi
 * Pastikan nama icon sesuai dengan nama yang ada di lucide-react
 */

export const categoryIcons = {
  // Income icons
  income: [
    { name: "TrendingUp", label: "Trending Up" },
    { name: "ArrowUpCircle", label: "Arrow Up" },
    { name: "DollarSign", label: "Dollar" },
    { name: "Briefcase", label: "Briefcase" },
    { name: "Gift", label: "Gift" },
    { name: "PiggyBank", label: "Piggy Bank" },
    { name: "Wallet", label: "Wallet" },
    { name: "Award", label: "Award" },
    { name: "TrendingDown", label: "Trending Down" },
  ],

  // Food & Drink
  food: [
    { name: "Coffee", label: "Coffee" },
    { name: "Utensils", label: "Utensils" },
    { name: "Pizza", label: "Pizza" },
    { name: "Apple", label: "Apple" },
    { name: "Wine", label: "Wine" },
    { name: "IceCream", label: "Ice Cream" },
    { name: "Cookie", label: "Cookie" },
    { name: "Cake", label: "Cake" },
  ],

  // Shopping
  shopping: [
    { name: "ShoppingBag", label: "Shopping Bag" },
    { name: "ShoppingCart", label: "Shopping Cart" },
    { name: "Shirt", label: "Shirt" },
    { name: "Package", label: "Package" },
    { name: "Store", label: "Store" },
    { name: "Tag", label: "Tag" },
  ],

  // Bills & Utilities
  bills: [
    { name: "Home", label: "Home" },
    { name: "Lightbulb", label: "Lightbulb" },
    { name: "Wifi", label: "Wifi" },
    { name: "Phone", label: "Phone" },
    { name: "Zap", label: "Electricity" },
    { name: "Droplet", label: "Water" },
    { name: "Flame", label: "Gas" },
  ],

  // Transportation
  transportation: [
    { name: "Car", label: "Car" },
    { name: "Bus", label: "Bus" },
    { name: "Train", label: "Train" },
    { name: "Plane", label: "Plane" },
    { name: "Bike", label: "Bike" },
    { name: "Fuel", label: "Fuel" },
    { name: "ParkingSquare", label: "Parking" },
  ],

  // Entertainment
  entertainment: [
    { name: "Popcorn", label: "Popcorn" },
    { name: "Music", label: "Music" },
    { name: "Tv", label: "TV" },
    { name: "Gamepad2", label: "Gaming" },
    { name: "Camera", label: "Camera" },
    { name: "Film", label: "Film" },
    { name: "Ticket", label: "Ticket" },
  ],

  // Health & Fitness
  health: [
    { name: "Heart", label: "Health" },
    { name: "Activity", label: "Activity" },
    { name: "Dumbbell", label: "Fitness" },
    { name: "Pill", label: "Medicine" },
    { name: "Stethoscope", label: "Doctor" },
    { name: "HeartPulse", label: "Heart Pulse" },
  ],

  // Education
  education: [
    { name: "BookOpen", label: "Book" },
    { name: "GraduationCap", label: "Graduation" },
    { name: "Library", label: "Library" },
    { name: "PenTool", label: "Pen" },
    { name: "School", label: "School" },
  ],

  // Others
  others: [
    { name: "MoreHorizontal", label: "More" },
    { name: "Circle", label: "Circle" },
    { name: "Star", label: "Star" },
    { name: "Sparkles", label: "Sparkles" },
  ],
} as const;

// Flat list untuk dropdown
export const allCategoryIcons = Object.values(categoryIcons).flat();

// Helper untuk get icon by name
export const getIconByName = (name: string) => {
  return allCategoryIcons.find((icon) => icon.name === name);
};

// Default icon jika tidak ditemukan
export const defaultIcon = { name: "Circle", label: "Default" };
