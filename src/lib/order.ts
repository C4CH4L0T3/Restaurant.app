import type { CartLine, OrderMode } from "./types";

export interface PlacedOrder {
  id: string;
  createdAt: number;
  mode: OrderMode;
  name: string;
  phone: string;
  address?: string;
  notes?: string;
  payment: string;
  lines: CartLine[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tip: number;
  total: number;
  etaMin: number;
}

const KEY = "muestra:lastOrder";

export function saveOrder(o: PlacedOrder) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(o));
  } catch {}
}

export function loadOrder(): PlacedOrder | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PlacedOrder) : null;
  } catch {
    return null;
  }
}

export function newOrderId() {
  return "#" + Math.floor(1000 + Math.random() * 9000);
}

export const PAYMENTS = [
  { id: "nequi", label: "Nequi", desc: "Pago inmediato", tone: "#7b1fa2", online: true },
  { id: "daviplata", label: "Daviplata", desc: "Pago inmediato", tone: "#e30613", online: true },
  { id: "bancolombia", label: "Bancolombia QR", desc: "Escanea y paga", tone: "#ffcc00", online: true },
  { id: "pse", label: "PSE", desc: "Débito bancario", tone: "#0a4d8c", online: true },
  { id: "tarjeta", label: "Tarjeta", desc: "Crédito / débito", tone: "#3b82f6", online: true },
  { id: "efectivo", label: "Efectivo", desc: "Contra entrega", tone: "#86b06a", online: false },
];
