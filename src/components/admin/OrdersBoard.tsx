"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INCOMING_POOL } from "@/lib/admin-data";
import { cop } from "@/lib/format";
import { CHANNEL_TONE } from "./ui";
import { Check, Clock, X, Whatsapp } from "@/components/icons";

type Status = "nuevo" | "cocina" | "listo" | "entregado";

interface KOrder {
  id: number;
  customer: string;
  items: string[];
  total: number;
  mode: "Domicilio" | "Recoger" | "En mesa";
  channel: "Web" | "WhatsApp" | "QR";
  at: number;
}

const COLS: { id: Status; label: string; tone: string }[] = [
  { id: "nuevo", label: "Nuevos", tone: "#ee6c2b" },
  { id: "cocina", label: "En cocina", tone: "#e5b567" },
  { id: "listo", label: "Listos", tone: "#86b06a" },
  { id: "entregado", label: "Entregados", tone: "#8a7663" },
];
const NEXT: Record<Status, Status | null> = {
  nuevo: "cocina",
  cocina: "listo",
  listo: "entregado",
  entregado: null,
};
const ACTION: Record<Status, string> = {
  nuevo: "Aceptar",
  cocina: "Marcar listo",
  listo: "Entregar",
  entregado: "",
};

let SEED = 1050;
function makeOrder(status: Status): KOrder & { status: Status } {
  const t = INCOMING_POOL[Math.floor(Math.random() * INCOMING_POOL.length)];
  return {
    id: SEED++,
    customer: t.customer,
    items: t.items,
    total: t.total,
    mode: t.mode,
    channel: t.channel,
    at: Date.now(),
    status,
  };
}

export default function OrdersBoard() {
  const [orders, setOrders] = useState<(KOrder & { status: Status })[]>(() => {
    const seed: Status[] = ["nuevo", "cocina", "cocina", "listo", "entregado", "entregado"];
    return seed.map((s, i) => ({ ...makeOrder(s), at: Date.now() - i * 240000 }));
  });
  const [flash, setFlash] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [, setTick] = useState(0);
  const [sound, setSound] = useState(true);
  const soundRef = useRef(sound);
  soundRef.current = sound;

  // relative-time refresh
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 15000);
    return () => clearInterval(t);
  }, []);

  // incoming orders
  useEffect(() => {
    const t = setInterval(() => {
      const o = makeOrder("nuevo");
      setOrders((prev) => [o, ...prev]);
      setFlash(o.id);
      setToast(`Nuevo pedido #${o.id} · ${o.customer}`);
      setTimeout(() => setFlash(null), 2600);
      setTimeout(() => setToast(null), 3200);
    }, 13000);
    return () => clearInterval(t);
  }, []);

  function advance(id: number) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = NEXT[o.status];
        return next ? { ...o, status: next } : o;
      })
    );
  }
  function reject(id: number) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  const newCount = orders.filter((o) => o.status === "nuevo").length;

  return (
    <div className="space-y-4">
      {/* toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="live-dot h-2.5 w-2.5 rounded-full bg-leaf" />
          <span className="font-display text-lg font-semibold">Órdenes en vivo</span>
          {newCount > 0 && (
            <span className="rounded-full bg-ember px-2 py-0.5 font-mono text-xs font-bold text-ink">
              {newCount} nuevo{newCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
          Alertas de sonido
          <span
            onClick={() => setSound((s) => !s)}
            className={`relative h-5 w-9 rounded-full transition-colors ${
              sound ? "bg-leaf" : "bg-surface-2"
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-ink transition-transform ${
                sound ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </span>
        </label>
      </div>

      {/* board */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLS.map((col) => {
          const list = orders.filter((o) => o.status === col.id);
          return (
            <div
              key={col.id}
              className="flex flex-col rounded-2xl border border-line bg-ink-2/40"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: col.tone }}
                  />
                  <span className="text-sm font-semibold">{col.label}</span>
                </div>
                <span className="font-mono text-xs text-faint">{list.length}</span>
              </div>
              <div className="no-scrollbar flex max-h-[62vh] flex-col gap-3 overflow-y-auto p-3">
                <AnimatePresence mode="popLayout">
                  {list.map((o) => (
                    <OrderCard
                      key={o.id}
                      o={o}
                      flash={flash === o.id}
                      onAdvance={() => advance(o.id)}
                      onReject={() => reject(o.id)}
                    />
                  ))}
                </AnimatePresence>
                {list.length === 0 && (
                  <p className="py-8 text-center text-xs text-faint">Sin pedidos</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
          >
            <div className="ember-glow flex items-center gap-2 rounded-full bg-ember px-4 py-2.5 text-sm font-semibold text-ink shadow-2xl">
              <span className="h-2 w-2 rounded-full bg-ink/50" />
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function minutesAgo(at: number) {
  const m = Math.floor((Date.now() - at) / 60000);
  return m <= 0 ? "ahora" : `${m} min`;
}

function OrderCard({
  o,
  flash,
  onAdvance,
  onReject,
}: {
  o: KOrder & { status: Status };
  flash: boolean;
  onAdvance: () => void;
  onReject: () => void;
}) {
  const late = o.status === "cocina" && Date.now() - o.at > 18 * 60000;
  return (
    <motion.div
      layout
      layoutId={String(o.id)}
      initial={{ opacity: 0, scale: 0.9, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`rounded-xl border bg-surface/60 p-3 ${
        flash ? "border-ember ring-1 ring-ember/50" : "border-line"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold">#{o.id}</span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: CHANNEL_TONE[o.channel] }}
            title={o.channel}
          />
          <span className="label-mono text-faint">{o.channel}</span>
        </div>
        <span className="flex items-center gap-1 font-mono text-[11px] text-faint">
          <Clock className="h-3 w-3" />
          {minutesAgo(o.at)}
        </span>
      </div>

      <p className="mt-1.5 text-sm font-semibold">{o.customer}</p>
      <ul className="mt-1 space-y-0.5">
        {o.items.map((it, i) => (
          <li key={i} className="truncate text-xs text-muted">
            {it}
          </li>
        ))}
      </ul>

      <div className="mt-2.5 flex items-center justify-between">
        <span className="label-mono text-faint">{o.mode}</span>
        <span className="font-mono text-sm font-semibold">{cop(o.total)}</span>
      </div>

      {late && (
        <p className="mt-2 rounded-md bg-wine/20 px-2 py-1 text-[11px] text-wine-2">
          ⏱ Lleva +18 min en cocina
        </p>
      )}

      {o.status !== "entregado" ? (
        <div className="mt-3 flex items-center gap-2">
          {o.status === "nuevo" && (
            <button
              onClick={onReject}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-faint transition-colors hover:text-wine-2"
              aria-label="Rechazar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onAdvance}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition-transform active:scale-[0.98] ${
              o.status === "nuevo"
                ? "bg-ember text-ink"
                : o.status === "cocina"
                ? "bg-gold text-ink"
                : "bg-leaf text-ink"
            }`}
          >
            {o.status === "listo" && o.channel === "WhatsApp" && (
              <Whatsapp className="h-4 w-4" />
            )}
            {ACTION[o.status]}
          </button>
        </div>
      ) : (
        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-line py-2 text-xs text-leaf">
          <Check className="h-3.5 w-3.5" /> Completado
        </div>
      )}
    </motion.div>
  );
}
