"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCTS, RESTAURANT } from "@/lib/data";
import {
  ORDERS,
  SALES_BY_HOUR,
  TOP_PRODUCTS,
  CUSTOMERS,
  CRM_STATS,
  PROMOS,
  type AdminOrder,
  type Promo,
} from "@/lib/admin-data";
import { cop, copCompact } from "@/lib/format";
import { Bag, TrendUp, Star, Check, Fire, Gift, Pin, Whatsapp } from "@/components/icons";
import OrdersBoard from "./OrdersBoard";
import Analytics from "./Analytics";
import Settings from "./Settings";
import { Toggle } from "./ui";

type Tab = "resumen" | "pedidos" | "menu" | "promos" | "clientes" | "analitica" | "ajustes";

const NAV: { id: Tab; label: string; icon: React.ReactNode; live?: boolean }[] = [
  { id: "resumen", label: "Resumen", icon: <TrendUp className="h-4 w-4" /> },
  { id: "pedidos", label: "Órdenes en vivo", icon: <Bag className="h-4 w-4" />, live: true },
  { id: "menu", label: "Menú", icon: <Fire className="h-4 w-4" /> },
  { id: "promos", label: "Promociones", icon: <Gift className="h-4 w-4" /> },
  { id: "clientes", label: "Clientes (CRM)", icon: <Star className="h-4 w-4" /> },
  { id: "analitica", label: "Analítica", icon: <TrendUp className="h-4 w-4" /> },
  { id: "ajustes", label: "Ajustes", icon: <Pin className="h-4 w-4" /> },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("resumen");
  const [openStore, setOpenStore] = useState(true);
  const [delivery, setDelivery] = useState(true);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[248px_1fr]">
      {/* Sidebar */}
      <aside className="hidden border-r border-line bg-ink-2 lg:flex lg:flex-col">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ember text-lg font-black text-ink">
            M
          </span>
          <div>
            <p className="font-display font-semibold leading-none">{RESTAURANT.name}</p>
            <p className="text-[11px] text-faint">Panel del negocio</p>
          </div>
        </div>
        <nav className="mt-2 flex-1 space-y-1 px-3">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                tab === n.id
                  ? "bg-ember/15 text-ember"
                  : "text-muted hover:bg-surface hover:text-cream"
              }`}
            >
              {n.icon}
              {n.label}
              {n.live && (
                <span className="live-dot ml-auto h-2 w-2 rounded-full bg-leaf" />
              )}
            </button>
          ))}
        </nav>
        <a
          href="/"
          className="m-3 rounded-xl border border-line px-3 py-2.5 text-center text-sm text-muted hover:text-cream"
        >
          ← Ver sitio público
        </a>
      </aside>

      {/* Main */}
      <div className="flex flex-col">
        {/* Topbar */}
        <header className="glass sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <div>
            <h1 className="font-display text-xl font-semibold">
              {NAV.find((n) => n.id === tab)?.label}
            </h1>
            <p className="text-xs text-faint">
              {new Date().toLocaleDateString("es-CO", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Toggle
              label={openStore ? "Abierto" : "Cerrado"}
              on={openStore}
              onChange={setOpenStore}
              color="leaf"
            />
            <Toggle
              label="Domicilios"
              on={delivery}
              onChange={setDelivery}
              color="ember"
            />
          </div>
        </header>

        {/* Mobile tabs */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-line px-4 py-2 lg:hidden">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm ${
                tab === n.id ? "bg-ember text-ink" : "border border-line text-muted"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>

        <main className="flex-1 px-4 py-6 md:px-6">
          {tab === "resumen" && <Resumen />}
          {tab === "pedidos" && <OrdersBoard />}
          {tab === "menu" && <MenuAdmin />}
          {tab === "promos" && <Promos />}
          {tab === "clientes" && <Clientes />}
          {tab === "analitica" && <Analytics />}
          {tab === "ajustes" && <Settings />}
        </main>
      </div>
    </div>
  );
}

/* ---------------- Resumen ---------------- */

function Resumen() {
  const maxV = Math.max(...SALES_BY_HOUR.map((s) => s.v));
  const kpis = [
    { label: "Ventas de hoy", value: cop(8140000), delta: "+18%", up: true },
    { label: "Pedidos", value: "127", delta: "+12%", up: true },
    { label: "Ticket promedio", value: cop(34100), delta: "+6%", up: true },
    { label: "Clientes nuevos", value: "23", delta: "+9%", up: true },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-line bg-surface/40 p-4">
            <p className="label-mono text-muted">{k.label}</p>
            <p className="mt-1.5 font-mono text-2xl font-semibold tracking-tight">{k.value}</p>
            <p className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-leaf">
              <TrendUp className="h-3 w-3" /> {k.delta} vs. ayer
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Chart */}
        <div className="rounded-2xl border border-line bg-surface/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Ventas por hora</h3>
              <p className="text-xs text-faint">Hoy · pico a las 7:00 p.m.</p>
            </div>
            <span className="rounded-full bg-ember/15 px-2.5 py-1 text-xs font-semibold text-ember">
              +18%
            </span>
          </div>
          <div className="mt-6 flex h-44 items-end gap-2">
            {SALES_BY_HOUR.map((s) => (
              <div key={s.h} className="group flex flex-1 flex-col items-center gap-1.5">
                <div className="relative flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-ember/40 to-ember transition-all group-hover:from-ember group-hover:to-gold"
                    style={{ height: `${(s.v / maxV) * 100}%` }}
                  />
                  <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded-md bg-ink px-1.5 py-0.5 text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                    {copCompact(s.v)}
                  </span>
                </div>
                <span className="text-[10px] text-faint">{s.h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="rounded-2xl border border-line bg-surface/40 p-5">
          <h3 className="font-display text-lg font-semibold">Más vendidos</h3>
          <div className="mt-4 space-y-3">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-surface text-xs font-bold text-muted">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{p.name}</p>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-ember"
                      style={{ width: `${(p.sold / TOP_PRODUCTS[3].sold) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-muted">{p.sold}u</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LiveOrders compact />
    </div>
  );
}

/* ---------------- Pedidos ---------------- */

const STATUS_STYLE: Record<AdminOrder["status"], string> = {
  Nuevo: "bg-ember/15 text-ember border-ember/30",
  "En cocina": "bg-gold/15 text-gold border-gold/30",
  "En camino": "bg-leaf/15 text-leaf border-leaf/30",
  Entregado: "bg-surface text-faint border-line",
};

function LiveOrders({ compact }: { compact?: boolean }) {
  const [orders, setOrders] = useState(ORDERS);
  const flow: AdminOrder["status"][] = ["Nuevo", "En cocina", "En camino", "Entregado"];

  function advance(id: string) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const i = flow.indexOf(o.status);
        return { ...o, status: flow[Math.min(i + 1, flow.length - 1)] };
      })
    );
  }

  const list = compact ? orders.slice(0, 4) : orders;

  return (
    <div className="rounded-2xl border border-line bg-surface/40">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="live-dot h-2 w-2 rounded-full bg-leaf" />
          <h3 className="font-display text-lg font-semibold">Pedidos en vivo</h3>
        </div>
        <span className="text-xs text-faint">Toca un pedido para avanzarlo</span>
      </div>
      <div className="divide-y divide-line">
        {list.map((o) => (
          <button
            key={o.id}
            onClick={() => advance(o.id)}
            className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-surface/60"
          >
            <div className="w-14 font-mono text-sm text-muted">{o.id}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{o.customer}</p>
              <p className="truncate text-xs text-faint">{o.items}</p>
            </div>
            <div className="hidden text-xs text-faint sm:block">
              <span className="rounded-full border border-line px-2 py-0.5">{o.channel}</span>
            </div>
            <div className="hidden w-20 text-xs text-muted md:block">{o.mode}</div>
            <div className="w-24 text-right text-sm font-semibold">{cop(o.total)}</div>
            <span
              className={`w-24 shrink-0 rounded-full border px-2.5 py-1 text-center text-xs font-semibold ${STATUS_STYLE[o.status]}`}
            >
              {o.status}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Menú admin ---------------- */

function MenuAdmin() {
  const [items, setItems] = useState(() =>
    PRODUCTS.slice(0, 10).map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
      soldOut: false,
    }))
  );
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  function toggleSold(id: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, soldOut: !i.soldOut } : i)));
  }
  function startEdit(id: string, price: number) {
    setEditing(id);
    setDraft(String(price));
  }
  function saveEdit(id: string) {
    const val = Number(draft.replace(/\D/g, ""));
    if (val > 0) setItems((prev) => prev.map((i) => (i.id === id ? { ...i, price: val } : i)));
    setEditing(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-2xl border border-ember/30 bg-ember/5 px-4 py-3 text-sm text-muted">
        <Fire className="h-4 w-4 text-ember" />
        Edita precios y agota productos al instante, desde tu celular. Los cambios se
        reflejan en la carta y el QR en tiempo real.
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface/40">
        <div className="divide-y divide-line">
          {items.map((i) => (
            <div key={i.id} className="flex items-center gap-3 px-4 py-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={i.image}
                  alt={i.name}
                  fill
                  className={`object-cover ${i.soldOut ? "grayscale" : ""}`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{i.name}</p>
                {editing === i.id ? (
                  <div className="mt-1 flex items-center gap-1">
                    <input
                      autoFocus
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(i.id)}
                      className="w-24 rounded-lg border border-ember bg-ink px-2 py-1 text-sm outline-none"
                    />
                    <button
                      onClick={() => saveEdit(i.id)}
                      className="grid h-7 w-7 place-items-center rounded-lg bg-ember text-ink"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(i.id, i.price)}
                    className="mt-0.5 text-sm text-ember hover:underline"
                  >
                    {cop(i.price)} · editar
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`hidden text-xs sm:inline ${
                    i.soldOut ? "text-faint" : "text-leaf"
                  }`}
                >
                  {i.soldOut ? "Agotado" : "Disponible"}
                </span>
                <Toggle
                  on={!i.soldOut}
                  onChange={() => toggleSold(i.id)}
                  color="leaf"
                  compact
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Promociones ---------------- */

const PROMO_STATUS: Record<Promo["status"], string> = {
  Activa: "bg-leaf/15 text-leaf border-leaf/30",
  Programada: "bg-gold/15 text-gold border-gold/30",
  Pausada: "bg-surface text-faint border-line",
};

function Promos() {
  const [promos, setPromos] = useState(PROMOS);

  function toggle(code: string) {
    setPromos((prev) =>
      prev.map((p) =>
        p.code === code
          ? { ...p, status: p.status === "Pausada" ? "Activa" : "Pausada" }
          : p
      )
    );
  }

  const totalRevenue = promos.reduce((s, p) => s + p.revenue, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-3">
          <div className="rounded-2xl border border-line bg-surface/40 px-4 py-3">
            <p className="text-xs text-muted">Ventas por promos</p>
            <p className="font-display text-xl font-semibold text-leaf">
              {cop(totalRevenue)}
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-surface/40 px-4 py-3">
            <p className="text-xs text-muted">Activas</p>
            <p className="font-display text-xl font-semibold">
              {promos.filter((p) => p.status === "Activa").length}
            </p>
          </div>
        </div>
        <button className="ember-glow flex items-center gap-2 rounded-full bg-ember px-4 py-2.5 text-sm font-semibold text-ink">
          <Gift className="h-4 w-4" /> Nueva promoción
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface/40 divide-y divide-line">
        {promos.map((p) => (
          <div key={p.code} className="flex flex-wrap items-center gap-3 px-4 py-3.5">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{p.title}</p>
              <p className="text-xs text-faint">
                <span className="font-mono text-ember">{p.code}</span> · {p.type}
              </p>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{p.uses}</p>
              <p className="text-xs text-faint">usos</p>
            </div>
            <div className="hidden w-28 text-right md:block">
              <p className="text-sm font-semibold">{cop(p.revenue)}</p>
              <p className="text-xs text-faint">generado</p>
            </div>
            <span
              className={`w-24 shrink-0 rounded-full border px-2.5 py-1 text-center text-xs font-semibold ${PROMO_STATUS[p.status]}`}
            >
              {p.status}
            </span>
            {p.status !== "Programada" && (
              <Toggle
                on={p.status === "Activa"}
                onChange={() => toggle(p.code)}
                color="leaf"
                compact
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Clientes (CRM) ---------------- */

const TAG_STYLE: Record<string, string> = {
  VIP: "bg-ember/15 text-ember border-ember/30",
  Frecuente: "bg-gold/15 text-gold border-gold/30",
  Nuevo: "bg-leaf/15 text-leaf border-leaf/30",
};

function Clientes() {
  const stats = [
    { label: "Clientes totales", value: CRM_STATS.total.toLocaleString("es-CO") },
    { label: "Tasa de recompra", value: `${Math.round(CRM_STATS.returning * 100)}%` },
    { label: "Valor de vida (LTV)", value: cop(CRM_STATS.avgLtv) },
    { label: "Cumpleaños este mes", value: `${CRM_STATS.birthdaysThisMonth} 🎂` },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-surface/40 p-4">
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1.5 font-display text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-leaf/30 bg-leaf/5 px-4 py-3 text-sm text-muted">
        <Whatsapp className="h-4 w-4 text-leaf" />
        Tu base de datos es tuya. Lanza campañas por WhatsApp a clientes VIP,
        recupera inactivos y felicita cumpleaños automáticamente.
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface/40">
        <div className="hidden grid-cols-[1.4fr_1fr_0.6fr_0.8fr_auto] gap-3 border-b border-line px-4 py-2.5 text-xs uppercase tracking-wide text-faint md:grid">
          <span>Cliente</span>
          <span>Favorito</span>
          <span className="text-right">Pedidos</span>
          <span className="text-right">Gastado</span>
          <span className="text-right">Acción</span>
        </div>
        <div className="divide-y divide-line">
          {CUSTOMERS.map((cu) => (
            <div
              key={cu.phone}
              className="grid grid-cols-2 items-center gap-3 px-4 py-3 md:grid-cols-[1.4fr_1fr_0.6fr_0.8fr_auto]"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{cu.name}</p>
                  <span
                    className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${TAG_STYLE[cu.tag]}`}
                  >
                    {cu.tag}
                  </span>
                </div>
                <p className="text-xs text-faint">
                  {cu.phone} · {cu.points} pts
                </p>
              </div>
              <p className="hidden truncate text-sm text-muted md:block">{cu.fav}</p>
              <p className="hidden text-right text-sm md:block">{cu.orders}</p>
              <p className="text-right text-sm font-semibold md:text-right">
                {cop(cu.spent)}
              </p>
              <div className="col-span-2 flex justify-end md:col-span-1">
                <button className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-leaf hover:bg-surface">
                  <Whatsapp className="h-3.5 w-3.5" />
                  Campaña
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

