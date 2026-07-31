export type DietTag = "veg" | "picante" | "singluten" | "nuevo" | "top";

export interface ModifierOption {
  id: string;
  label: string;
  price: number; // extra cost in COP, 0 = free
}

export interface ModifierGroup {
  id: string;
  label: string;
  type: "single" | "multi";
  required?: boolean;
  max?: number;
  options: ModifierOption[];
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  compareAt?: number; // original price for promo strikethrough
  image: string;
  tags: DietTag[];
  prepMin: number;
  kcal?: number;
  soldOut?: boolean;
  popularity: number; // 0-100, drives "más vendido"
  modifiers?: ModifierGroup[];
  pairWith?: string[]; // product ids for cross-sell
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  source: "Google" | "Instagram";
}

export interface CartLine {
  key: string; // unique per configuration
  productId: string;
  name: string;
  unit: number; // unit price incl. modifiers
  qty: number;
  image: string;
  mods: string[]; // human readable
  note?: string;
}

export type OrderMode = "delivery" | "pickup" | "eatin";
