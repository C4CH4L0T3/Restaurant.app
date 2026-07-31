"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { RESTAURANT } from "@/lib/data";
import { Eyebrow } from "./ui";
import { TrendUp, Whatsapp, Check } from "./icons";
import { Reveal } from "./motion";

const BENEFITS = [
  {
    title: "0% de comisión",
    body: "Las apps cobran 25–30% por pedido. Aquí el 100% de la venta es tuya.",
  },
  {
    title: "Base de datos propia",
    body: "Cada cliente queda en tu CRM: teléfono, historial y cumpleaños para volver a venderle.",
  },
  {
    title: "Ticket promedio más alto",
    body: "Sugerencias, combos y adiciones automáticas suben la venta por pedido.",
  },
  {
    title: "Control total desde el celular",
    body: "Cambia precios, agota productos y crea promos en segundos, sin depender de nadie.",
  },
];

export default function WhyDirect() {
  const [orders, setOrders] = useState(600);
  const avgTicket = 34000;
  const commission = 0.28;

  const monthlySales = orders * avgTicket;
  const savedMonthly = Math.round(monthlySales * commission);
  const savedYearly = savedMonthly * 12;

  return (
    <section id="directo" className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="max-w-2xl">
          <Eyebrow>La cuenta que sí importa</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl text-balance">
            Deja de regalarle tu ganancia a las apps de domicilio.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Con tu propia plataforma de pedidos, recuperas la inversión en semanas.
            Mira cuánto podrías ahorrar:
          </p>
        </Reveal>

        <Reveal className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]" delay={0.05}>
          {/* Calculator */}
          <div className="grain-card relative overflow-hidden rounded-[2rem] border border-line p-7">
            <div className="flex items-center gap-2 text-sm text-muted">
              <TrendUp className="h-4 w-4 text-leaf" />
              Calculadora de ahorro
            </div>

            <div className="mt-6">
              <div className="flex items-end justify-between">
                <label className="text-sm text-muted">Pedidos al mes</label>
                <span className="font-display text-2xl font-semibold">{orders}</span>
              </div>
              <input
                type="range"
                min={100}
                max={2000}
                step={50}
                value={orders}
                onChange={(e) => setOrders(Number(e.target.value))}
                className="mt-3 w-full accent-ember"
              />
              <div className="mt-1 flex justify-between text-[11px] text-faint">
                <span>100</span>
                <span>2.000</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-line bg-ink/40 p-4">
                <p className="text-xs text-muted">Ticket promedio</p>
                <p className="mt-1 font-display text-xl font-semibold">{cop(avgTicket)}</p>
              </div>
              <div className="rounded-2xl border border-line bg-ink/40 p-4">
                <p className="text-xs text-muted">Comisión apps</p>
                <p className="mt-1 font-mono text-xl font-semibold text-wine-2">
                  28%
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-leaf/30 bg-leaf/10 p-5">
              <p className="text-sm text-leaf">Ahorro estimado al mes</p>
              <p className="font-display text-4xl font-semibold text-leaf">
                {cop(savedMonthly)}
              </p>
              <p className="mt-1 text-sm text-muted">
                Es decir <strong className="text-cream">{cop(savedYearly)}</strong> al
                año que se quedan en tu bolsillo.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="flex gap-4 rounded-2xl border border-line bg-surface/40 p-5 transition-colors hover:border-faint"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-leaf/15 text-leaf">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted">{b.body}</p>
                </div>
              </div>
            ))}
            <a
              href={`https://wa.me/${RESTAURANT.whatsapp}`}
              target="_blank"
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-cream py-3.5 font-semibold text-ink transition-transform hover:scale-[1.01]"
            >
              <Whatsapp className="h-5 w-5 text-leaf" />
              Quiero mi plataforma
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
