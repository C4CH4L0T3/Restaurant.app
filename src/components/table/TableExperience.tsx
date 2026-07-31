"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { RESTAURANT } from "@/lib/data";
import type { CartLine } from "@/lib/types";
import { cop } from "@/lib/format";
import { useCart } from "@/components/CartProvider";
import MenuExperience from "@/components/MenuExperience";
import ProductModal from "@/components/ProductModal";
import { Bag, Minus, Plus, X, Check } from "@/components/icons";

type RoundStatus = "recibido" | "cocina" | "servido";
const FLOW: RoundStatus[] = ["recibido", "cocina", "servido"];
const STATUS_LABEL: Record<RoundStatus, string> = {
  recibido: "Recibido en caja",
  cocina: "En cocina 🔥",
  servido: "Servido ✅",
};
const STATUS_STYLE: Record<RoundStatus, string> = {
  recibido: "bg-ember/15 text-ember border-ember/30",
  cocina: "bg-gold/15 text-gold border-gold/30",
  servido: "bg-leaf/15 text-leaf border-leaf/30",
};

interface Round {
  id: string;
  at: number;
  lines: CartLine[];
  status: RoundStatus;
}

const TIPS = [0, 5, 10, 15];

export default function TableExperience({ table }: { table: string }) {
  const c = useCart();
  const storeKey = `muestra:mesa:${table}`;

  const [rounds, setRounds] = useState<Round[]>([]);
  const [sheet, setSheet] = useState(false);
  const [view, setView] = useState<"pedido" | "cuenta">("pedido");
  const [toast, setToast] = useState<string | null>(null);
  const [tipPct, setTipPct] = useState(10);
  const [split, setSplit] = useState(1);
  const [billRequested, setBillRequested] = useState(false);

  // load / persist table session
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(storeKey);
      if (raw) setRounds(JSON.parse(raw));
    } catch {}
  }, [storeKey]);
  useEffect(() => {
    try {
      sessionStorage.setItem(storeKey, JSON.stringify(rounds));
    } catch {}
  }, [rounds, storeKey]);

  // auto-advance kitchen status
  useEffect(() => {
    if (!rounds.some((r) => r.status !== "servido")) return;
    const t = setInterval(() => {
      setRounds((prev) =>
        prev.map((r) =>
          r.status === "servido"
            ? r
            : { ...r, status: FLOW[Math.min(FLOW.indexOf(r.status) + 1, 2)] }
        )
      );
    }, 6000);
    return () => clearInterval(t);
  }, [rounds]);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }

  function sendToKitchen() {
    if (c.lines.length === 0) return;
    setRounds((prev) => [
      { id: "R" + (prev.length + 1), at: Date.now(), lines: c.lines, status: "recibido" },
      ...prev,
    ]);
    c.clear();
    c.setOpen(false);
    flash("¡Pedido enviado a cocina! 🔥");
    setView("pedido");
  }

  function callWaiter() {
    flash(`Mesero en camino a la Mesa ${table} 🙋`);
  }

  const tabTotal = useMemo(
    () =>
      rounds.reduce(
        (s, r) => s + r.lines.reduce((ls, l) => ls + l.unit * l.qty, 0),
        0
      ),
    [rounds]
  );
  const currentTotal = c.subtotal;
  const grand = tabTotal + Math.round((tabTotal * tipPct) / 100);
  const perPerson = Math.ceil(grand / split);

  return (
    <div className="relative z-10 min-h-screen pb-28">
      {/* Header */}
      <header className="glass sticky top-0 z-30 border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ember text-lg font-black text-ink">
              M
            </span>
            <div>
              <p className="font-display text-lg font-semibold leading-none">
                {RESTAURANT.name}
              </p>
              <p className="text-[11px] text-faint">Menú digital · en tu mesa</p>
            </div>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-3.5 py-1.5 text-sm font-semibold text-ember">
            <span className="live-dot h-2 w-2 rounded-full bg-ember" />
            Mesa {table}
          </span>
        </div>
      </header>

      {/* Welcome band */}
      <div className="mx-auto max-w-5xl px-5 pt-8">
        <div className="grain-card flex flex-col gap-4 rounded-[2rem] border border-line p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-ember">Bienvenido a la Mesa {table}</p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
              Pide desde tu celular 📲
            </h1>
            <p className="mt-1.5 max-w-md text-sm text-muted">
              Explora la carta, personaliza tus platos y envíalos directo a cocina.
              Sin esperas, sin filas. Cuando quieras, pide la cuenta desde aquí.
            </p>
          </div>
          <button
            onClick={callWaiter}
            className="shrink-0 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-cream transition-colors hover:border-faint"
          >
            🙋 Llamar al mesero
          </button>
        </div>
      </div>

      {/* Menu (reused) */}
      <MenuExperience />

      {/* Kitchen status recap (if rounds) */}
      {rounds.length > 0 && (
        <div className="mx-auto max-w-5xl px-5 pb-8">
          <div className="rounded-2xl border border-line bg-surface/40 p-5">
            <div className="flex items-center gap-2">
              <span className="live-dot h-2 w-2 rounded-full bg-leaf" />
              <h3 className="font-display text-lg font-semibold">Estado de tu mesa</h3>
            </div>
            <div className="mt-3 space-y-2">
              {rounds.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-ink/30 px-3.5 py-2.5"
                >
                  <span className="text-sm text-muted">
                    {r.lines.reduce((s, l) => s + l.qty, 0)} items ·{" "}
                    {r.lines.map((l) => l.name.split(" ").slice(0, 2).join(" ")).join(", ")}
                  </span>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[r.status]}`}
                  >
                    {STATUS_LABEL[r.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-5 pb-10 text-center text-xs text-faint">
        ¿Prefieres a domicilio o para recoger?{" "}
        <Link href="/" className="text-ember hover:underline">
          Ver opciones de envío
        </Link>
      </div>

      {/* Bottom dock */}
      {(c.count > 0 || rounds.length > 0) && (
        <div className="fixed inset-x-0 bottom-0 z-30 p-4">
          <div className="mx-auto max-w-5xl">
            <button
              onClick={() => {
                setView(c.count > 0 ? "pedido" : "cuenta");
                setSheet(true);
              }}
              className="ember-glow flex w-full items-center justify-between rounded-full bg-ember px-5 py-3.5 font-semibold text-ink shadow-2xl"
            >
              <span className="flex items-center gap-2">
                <Bag className="h-5 w-5" />
                {c.count > 0
                  ? `${c.count} para enviar a cocina`
                  : "Ver mi mesa"}
              </span>
              <span>{c.count > 0 ? cop(currentTotal) : cop(tabTotal)}</span>
            </button>
          </div>
        </div>
      )}

      {/* Sheet */}
      <AnimatePresence>
        {sheet && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheet(false)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative z-10 flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[2rem] border border-line bg-ink-2 sm:rounded-[2rem]"
            >
              {/* tabs */}
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div className="flex gap-1 rounded-full border border-line bg-surface p-1">
                  <TabBtn on={view === "pedido"} onClick={() => setView("pedido")}>
                    Esta ronda
                  </TabBtn>
                  <TabBtn on={view === "cuenta"} onClick={() => setView("cuenta")}>
                    La cuenta
                  </TabBtn>
                </div>
                <button
                  onClick={() => setSheet(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line hover:bg-surface"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                {view === "pedido" ? (
                  <RoundView lines={c.lines} onQty={c.setQty} onRemove={c.remove} />
                ) : (
                  <BillView
                    rounds={rounds}
                    tabTotal={tabTotal}
                    tipPct={tipPct}
                    setTipPct={setTipPct}
                    split={split}
                    setSplit={setSplit}
                    grand={grand}
                    perPerson={perPerson}
                  />
                )}
              </div>

              {/* footer actions */}
              <div className="border-t border-line px-4 py-3.5">
                {view === "pedido" ? (
                  <button
                    disabled={c.count === 0}
                    onClick={sendToKitchen}
                    className="ember-glow flex w-full items-center justify-center gap-2 rounded-full bg-ember py-3.5 font-semibold text-ink transition-transform active:scale-[0.99] disabled:opacity-40"
                  >
                    Enviar a cocina · {cop(currentTotal)}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setBillRequested(true);
                      flash("Cuenta solicitada. El mesero la lleva a tu mesa 🧾");
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-cream py-3.5 font-semibold text-ink transition-transform active:scale-[0.99]"
                  >
                    {billRequested ? "Cuenta solicitada ✓" : `Pedir la cuenta · ${cop(grand)}`}
                  </button>
                )}
                <button
                  onClick={callWaiter}
                  className="mt-2 w-full rounded-full border border-line py-2.5 text-sm font-medium text-muted hover:text-cream"
                >
                  🙋 Llamar al mesero
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-20 z-[60] mx-auto w-max max-w-[90vw]"
          >
            <div className="glass flex items-center gap-2 rounded-full border border-leaf/40 px-4 py-2.5 text-sm font-medium text-cream shadow-xl">
              <Check className="h-4 w-4 text-leaf" />
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProductModal />
    </div>
  );
}

function TabBtn({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
        on ? "bg-ember text-ink" : "text-muted hover:text-cream"
      }`}
    >
      {children}
    </button>
  );
}

function RoundView({
  lines,
  onQty,
  onRemove,
}: {
  lines: CartLine[];
  onQty: (k: string, q: number) => void;
  onRemove: (k: string) => void;
}) {
  if (lines.length === 0)
    return (
      <div className="py-16 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface">
          <Bag className="h-6 w-6 text-faint" />
        </div>
        <p className="mt-3 font-display text-lg">Aún no has elegido nada</p>
        <p className="text-sm text-muted">Agrega platos del menú y envíalos a cocina.</p>
      </div>
    );
  return (
    <div className="space-y-3">
      {lines.map((l) => (
        <div key={l.key} className="flex gap-3 rounded-2xl border border-line bg-surface/40 p-2.5">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
            <Image src={l.image} alt={l.name} fill className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-semibold leading-tight">{l.name}</span>
              <button onClick={() => onRemove(l.key)} className="text-faint hover:text-cream">
                <X className="h-4 w-4" />
              </button>
            </div>
            {l.mods.length > 0 && (
              <span className="mt-0.5 line-clamp-1 text-xs text-muted">{l.mods.join(", ")}</span>
            )}
            {l.note && <span className="text-xs italic text-faint">📝 {l.note}</span>}
            <div className="mt-auto flex items-center justify-between pt-1.5">
              <div className="flex items-center gap-1 rounded-full border border-line">
                <button
                  onClick={() => onQty(l.key, l.qty - 1)}
                  className="grid h-7 w-7 place-items-center rounded-full hover:bg-surface"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-5 text-center text-sm font-semibold">{l.qty}</span>
                <button
                  onClick={() => onQty(l.key, l.qty + 1)}
                  className="grid h-7 w-7 place-items-center rounded-full hover:bg-surface"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="text-sm font-semibold">{cop(l.unit * l.qty)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BillView({
  rounds,
  tabTotal,
  tipPct,
  setTipPct,
  split,
  setSplit,
  grand,
  perPerson,
}: {
  rounds: Round[];
  tabTotal: number;
  tipPct: number;
  setTipPct: (n: number) => void;
  split: number;
  setSplit: (n: number) => void;
  grand: number;
  perPerson: number;
}) {
  if (rounds.length === 0)
    return (
      <div className="py-16 text-center">
        <p className="font-display text-lg">Tu mesa aún no tiene consumos</p>
        <p className="text-sm text-muted">Envía tu primer pedido a cocina.</p>
      </div>
    );
  return (
    <div>
      <div className="space-y-3">
        {rounds.map((r, i) => (
          <div key={r.id} className="rounded-2xl border border-line bg-surface/40 p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-faint">
                Ronda {rounds.length - i}
              </span>
              <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[r.status]}`}>
                {STATUS_LABEL[r.status]}
              </span>
            </div>
            {r.lines.map((l) => (
              <div key={l.key} className="flex justify-between py-0.5 text-sm">
                <span className="text-muted">
                  {l.qty}× {l.name}
                </span>
                <span>{cop(l.unit * l.qty)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* tip */}
      <div className="mt-5">
        <p className="mb-2 text-sm text-muted">Propina (opcional)</p>
        <div className="grid grid-cols-4 gap-2">
          {TIPS.map((t) => (
            <button
              key={t}
              onClick={() => setTipPct(t)}
              className={`rounded-xl border py-2 text-sm font-semibold transition-colors ${
                tipPct === t ? "border-ember bg-ember/10 text-ember" : "border-line text-muted"
              }`}
            >
              {t === 0 ? "Sin" : `${t}%`}
            </button>
          ))}
        </div>
      </div>

      {/* split */}
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-line bg-surface/40 px-4 py-3">
        <span className="text-sm text-muted">Dividir entre</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSplit(Math.max(1, split - 1))}
            className="grid h-8 w-8 place-items-center rounded-full border border-line"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center font-display text-lg font-semibold">{split}</span>
          <button
            onClick={() => setSplit(split + 1)}
            className="grid h-8 w-8 place-items-center rounded-full border border-line"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* totals */}
      <div className="mt-4 space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Consumo</span>
          <span>{cop(tabTotal)}</span>
        </div>
        {tipPct > 0 && (
          <div className="flex justify-between">
            <span className="text-muted">Propina {tipPct}%</span>
            <span>{cop(Math.round((tabTotal * tipPct) / 100))}</span>
          </div>
        )}
        <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
          <span className="font-display text-lg font-semibold">Total</span>
          <span className="font-display text-2xl font-semibold">{cop(grand)}</span>
        </div>
        {split > 1 && (
          <p className="pt-1 text-right text-sm text-ember">
            {cop(perPerson)} por persona
          </p>
        )}
      </div>
    </div>
  );
}
