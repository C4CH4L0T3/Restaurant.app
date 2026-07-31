"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { loadOrder, type PlacedOrder } from "@/lib/order";
import type { OrderMode } from "@/lib/types";
import { cop } from "@/lib/format";
import { RESTAURANT } from "@/lib/data";
import { Check, Clock, Whatsapp, Pin, Bag } from "@/components/icons";

const STAGES: Record<OrderMode, { key: string; label: string; desc: string }[]> = {
  delivery: [
    { key: "recibido", label: "Pedido recibido", desc: "Confirmamos tu orden ✅" },
    { key: "prep", label: "En preparación", desc: "Alistando tus ingredientes" },
    { key: "cocina", label: "En cocina", desc: "¡A la parrilla! 🔥" },
    { key: "repartidor", label: "Repartidor asignado", desc: "Juan D. va en camino a recogerlo" },
    { key: "camino", label: "En camino", desc: "Tu pedido salió hacia tu dirección" },
    { key: "entregado", label: "Entregado", desc: "¡Buen provecho! 🍔" },
  ],
  pickup: [
    { key: "recibido", label: "Pedido recibido", desc: "Confirmamos tu orden ✅" },
    { key: "prep", label: "En preparación", desc: "Alistando tus ingredientes" },
    { key: "cocina", label: "En cocina", desc: "¡A la parrilla! 🔥" },
    { key: "listo", label: "Listo para recoger", desc: "Pasa por tu pedido al local" },
  ],
  eatin: [
    { key: "recibido", label: "Pedido recibido", desc: "Confirmamos tu orden ✅" },
    { key: "prep", label: "En preparación", desc: "Alistando tus ingredientes" },
    { key: "cocina", label: "En cocina", desc: "¡A la parrilla! 🔥" },
    { key: "servido", label: "Servido en mesa", desc: "¡Buen provecho! 🍔" },
  ],
};

export default function PedidoPage() {
  const [order, setOrder] = useState<PlacedOrder | null | undefined>(undefined);
  const [stage, setStage] = useState(0);
  const [eta, setEta] = useState(0);

  useEffect(() => {
    const o = loadOrder();
    setOrder(o);
    if (o) setEta(o.etaMin);
  }, []);

  const stages = order ? STAGES[order.mode] : [];

  // advance status
  useEffect(() => {
    if (!order) return;
    if (stage >= stages.length - 1) return;
    const t = setTimeout(() => setStage((s) => s + 1), 4500);
    return () => clearTimeout(t);
  }, [order, stage, stages.length]);

  // eta countdown
  useEffect(() => {
    if (!order || stage >= stages.length - 1) return;
    const t = setInterval(() => setEta((e) => Math.max(1, e - 1)), 12000);
    return () => clearInterval(t);
  }, [order, stage, stages.length]);

  if (order === undefined) return <Shell><div className="py-24 text-center text-muted">Cargando…</div></Shell>;

  if (!order) {
    return (
      <Shell>
        <div className="mx-auto max-w-md py-24 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-surface">
            <Bag className="h-7 w-7 text-faint" />
          </div>
          <p className="mt-4 font-display text-2xl">No hay pedidos recientes</p>
          <p className="mt-2 text-muted">Haz un pedido para ver el seguimiento en vivo.</p>
          <Link href="/#menu" className="mt-6 inline-block rounded-full bg-ember px-6 py-3 font-semibold text-ink">
            Ir al menú
          </Link>
        </div>
      </Shell>
    );
  }

  const done = stage >= stages.length - 1;

  return (
    <Shell>
      <div className="mx-auto max-w-2xl py-8">
        {/* Header card */}
        <div className="grain-card overflow-hidden rounded-[2rem] border border-line p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Pedido {order.id}</p>
              <h1 className="mt-1 font-display text-3xl font-semibold">
                {done ? "¡Listo! 🎉" : stages[stage].label}
              </h1>
              <p className="mt-1 text-muted">{stages[stage].desc}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-ember">
                <Clock className="h-4 w-4" />
                <span className="font-display text-2xl font-semibold">
                  {done ? "—" : `${eta}′`}
                </span>
              </div>
              <p className="text-xs text-faint">{done ? "Completado" : "tiempo estimado"}</p>
            </div>
          </div>

          {/* progress bar */}
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-gradient-to-r from-ember to-gold transition-all duration-700"
              style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Stepper */}
        <div className="mt-6 rounded-2xl border border-line bg-surface/40 p-6">
          <ol className="relative space-y-6">
            {stages.map((s, i) => {
              const state = i < stage ? "done" : i === stage ? "active" : "todo";
              return (
                <li key={s.key} className="flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full border-2 transition-colors ${
                        state === "done"
                          ? "border-leaf bg-leaf text-ink"
                          : state === "active"
                          ? "border-ember bg-ember text-ink"
                          : "border-line text-faint"
                      }`}
                    >
                      {state === "done" ? (
                        <Check className="h-4 w-4" />
                      ) : state === "active" ? (
                        <span className="live-dot h-2.5 w-2.5 rounded-full bg-ink" />
                      ) : (
                        <span className="text-xs">{i + 1}</span>
                      )}
                    </span>
                    {i < stages.length - 1 && (
                      <span
                        className={`mt-1 h-8 w-0.5 ${i < stage ? "bg-leaf" : "bg-line"}`}
                      />
                    )}
                  </div>
                  <div className="pt-1">
                    <p className={`font-semibold ${state === "todo" ? "text-faint" : "text-cream"}`}>
                      {s.label}
                    </p>
                    <p className="text-sm text-muted">{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Delivery info */}
        {order.mode === "delivery" && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-surface/40 p-4">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ember/15 text-ember">
              <Pin className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">Entrega en</p>
              <p className="text-sm text-muted">{order.address}</p>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="mt-4 rounded-2xl border border-line bg-surface/40 p-5">
          <h3 className="font-display text-lg font-semibold">Tu pedido</h3>
          <div className="mt-3 space-y-3">
            {order.lines.map((l) => (
              <div key={l.key} className="flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                  <Image src={l.image} alt={l.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {l.qty}× {l.name}
                  </p>
                  {l.mods.length > 0 && (
                    <p className="text-xs text-faint">{l.mods.join(", ")}</p>
                  )}
                </div>
                <span className="text-sm">{cop(l.unit * l.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
            <span className="font-semibold">Total · {order.payment}</span>
            <span className="font-display text-xl font-semibold">{cop(order.total)}</span>
          </div>
        </div>

        <a
          href={`https://wa.me/${RESTAURANT.whatsapp}`}
          target="_blank"
          className="mt-4 flex items-center justify-center gap-2 rounded-full border border-line py-3.5 font-medium text-cream hover:border-faint"
        >
          <Whatsapp className="h-5 w-5 text-leaf" />
          Contactar al restaurante
        </a>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen">
      <header className="glass sticky top-0 z-20 border-b border-line">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ember text-base font-black text-ink">
              M
            </span>
            <span className="font-display text-lg font-semibold">Muestra</span>
          </Link>
          <span className="flex items-center gap-1.5 text-xs text-leaf">
            <span className="live-dot h-2 w-2 rounded-full bg-leaf" /> Seguimiento en vivo
          </span>
        </div>
      </header>
      <div className="px-5">{children}</div>
    </div>
  );
}
