import type { LucideIcon } from "lucide-react";

export type Group = {
  id: number;
  name: string;
  description: string;
  createdBy: number;
  memberCount: number;
  totalExpense: number;
  totalIncome: number;
  createdAt: string;
};

export type GroupMember = {
  id: number;
  groupId: number;
  userId: number;
  username: string;
  email: string;
  role: "admin" | "member";
  joinedAt: string;
};

export type GroupTransaction = {
  id: number;
  groupId: number;
  userId: number;
  username: string;
  title: string;
  amount: number; // negative = expense, positive = income (sesuai mock kamu)
  type: "income" | "expense";
  category: string;
  icon: LucideIcon;
  color: string; // tailwind class for icon color
  date: string;
  description: string;
};

export type UserData = {
  username: string;
  email: string;
  userId: number;
};

export type PageMode = "list" | "detail";
