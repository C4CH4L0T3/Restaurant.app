"use client";

import {
  REVENUE_7D,
  SALES_BY_HOUR,
  CHANNELS,
  TOP_PRODUCTS,
} from "@/lib/admin-data";
import { cop, copCompact } from "@/lib/format";
import { Panel } from "./ui";
import { TrendUp } from "@/components/icons";

const KPIS = [
  { label: "Ingresos (30 días)", value: cop(229_000_000), delta: "+14%" },
  { label: "Pedidos (30 días)", value: "6.650", delta: "+11%" },
  { label: "Ticket promedio", value: cop(34_500), delta: "+4%" },
  { label: "Clientes recurrentes", value: "42%", delta: "+6%" },
  { label: "Tasa de conversión", value: "6,8%", delta: "+1,2 pts" },
  { label: "Carritos abandonados", value: "14%", delta: "−3 pts", down: true },
];

export default function Analytics() {
  const maxRev = Math.max(...REVENUE_7D.map((d) => d.v));
  const maxHour = Math.max(...SALES_BY_HOUR.map((s) => s.v));
  const maxSold = Math.max(...TOP_PRODUCTS.map((p) => p.sold));

  return (
    <div className="space-y-4">
      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-2xl border border-line bg-surface/40 p-4">
            <p className="label-mono text-muted">{k.label}</p>
            <p className="mt-1.5 font-mono text-xl font-semibold tracking-tight">
              {k.value}
            </p>
            <p
              className={`mt-1 inline-flex items-center gap-1 font-mono text-xs ${
                k.down ? "text-leaf" : "text-leaf"
              }`}
            >
              <TrendUp className="h-3 w-3" /> {k.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue 7d */}
      <Panel
        title="Ingresos · últimos 7 días"
        right={
          <span className="rounded-full bg-leaf/15 px-2.5 py-1 font-mono text-xs font-semibold text-leaf">
            {cop(REVENUE_7D.reduce((s, d) => s + d.v, 0))}
          </span>
        }
      >
        <div className="flex h-52 items-end gap-3">
          {REVENUE_7D.map((d) => {
            const peak = d.v === maxRev;
            return (
              <div key={d.d} className="group flex flex-1 flex-col items-center gap-2">
                <div className="relative flex w-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      peak
                        ? "bg-gradient-to-t from-gold/50 to-gold"
                        : "bg-gradient-to-t from-ember/30 to-ember/80 group-hover:to-ember"
                    }`}
                    style={{ height: `${(d.v / maxRev) * 100}%` }}
                  />
                  <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-1.5 py-0.5 font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                    {copCompact(d.v)} · {d.o}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-faint">{d.d}</span>
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        {/* Ventas por hora */}
        <Panel title="Ventas por hora (hoy)">
          <div className="flex h-40 items-end gap-1.5">
            {SALES_BY_HOUR.map((s) => (
              <div key={s.h} className="group flex flex-1 flex-col items-center gap-1.5">
                <div className="relative flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-ember/30 to-ember/70 group-hover:to-ember"
                    style={{ height: `${(s.v / maxHour) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] text-faint">{s.h}</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Channels */}
        <Panel title="Canales de venta">
          <div className="space-y-3">
            {CHANNELS.map((c) => (
              <div key={c.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted">{c.name}</span>
                  <span className="font-mono text-xs">{c.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${c.pct}%`, background: c.tone }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Top products */}
      <Panel title="Productos más vendidos (30 días)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="label-mono text-faint">
                <th className="pb-2 text-left font-normal">Producto</th>
                <th className="pb-2 text-right font-normal">Unidades</th>
                <th className="pb-2 text-right font-normal">Ingresos</th>
                <th className="hidden pb-2 pl-6 text-left font-normal sm:table-cell">
                  Participación
                </th>
              </tr>
            </thead>
            <tbody>
              {TOP_PRODUCTS.map((p) => (
                <tr key={p.name} className="border-t border-line">
                  <td className="py-2.5 font-medium">{p.name}</td>
                  <td className="py-2.5 text-right font-mono">{p.sold}</td>
                  <td className="py-2.5 text-right font-mono">{cop(p.revenue)}</td>
                  <td className="hidden py-2.5 pl-6 sm:table-cell">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-ember"
                        style={{ width: `${(p.sold / maxSold) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
