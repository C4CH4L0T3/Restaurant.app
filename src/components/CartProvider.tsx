"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";
import type { CartLine, OrderMode, Product } from "@/lib/types";

interface CartState {
  lines: CartLine[];
  mode: OrderMode;
  tipPct: number;
  coupon: string | null;
  open: boolean;
}

interface CartCtx extends CartState {
  add: (line: CartLine) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  setMode: (m: OrderMode) => void;
  setTip: (pct: number) => void;
  applyCoupon: (code: string) => boolean;
  setOpen: (v: boolean) => void;
  clear: () => void;
  activeProduct: Product | null;
  openProduct: (p: Product) => void;
  closeProduct: () => void;
  count: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tip: number;
  total: number;
}

const Ctx = createContext<CartCtx | null>(null);

const COUPONS: Record<string, number> = {
  MUESTRA10: 0.1,
  BIENVENIDO: 0.15,
};

const DELIVERY_FEE = 5900;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [mode, setMode] = useState<OrderMode>("delivery");
  const [tipPct, setTipPct] = useState(0);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.key === line.key);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + line.qty };
        return next;
      }
      return [...prev, line];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l))
    );
  }, []);

  const remove = useCallback(
    (key: string) => setLines((prev) => prev.filter((l) => l.key !== key)),
    []
  );

  const applyCoupon = useCallback((code: string) => {
    const c = code.trim().toUpperCase();
    if (COUPONS[c] !== undefined) {
      setCoupon(c);
      return true;
    }
    return false;
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    setCoupon(null);
    setTipPct(0);
  }, []);

  const derived = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + l.unit * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const discount = coupon ? Math.round(subtotal * COUPONS[coupon]) : 0;
    const deliveryFee = mode === "delivery" && subtotal > 0 ? DELIVERY_FEE : 0;
    const tip = Math.round(((subtotal - discount) * tipPct) / 100);
    const total = Math.max(0, subtotal - discount) + deliveryFee + tip;
    return { subtotal, count, discount, deliveryFee, tip, total };
  }, [lines, coupon, mode, tipPct]);

  const value: CartCtx = {
    lines,
    mode,
    tipPct,
    coupon,
    open,
    add,
    setQty,
    remove,
    setMode,
    setTip: setTipPct,
    applyCoupon,
    setOpen,
    clear,
    activeProduct,
    openProduct: setActiveProduct,
    closeProduct: () => setActiveProduct(null),
    ...derived,
  };

  return (
    <Ctx.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
