import { LucideIcon } from "lucide-react";

export interface RouteItem {
  title: string;
  url: string;
  icon?: LucideIcon;    
  description?: string; 
}

export interface Route {
  title: string;
  items: RouteItem[];
}