import type { LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  to: string;
  icon: LucideIcon;
}

export interface NavItem {
  title: string;
  to?: string;
  icon: LucideIcon;
  description: string;
  subItems: NavSubItem[];
}
