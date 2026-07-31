"use client";

import { useState } from "react";
import { RESTAURANT } from "@/lib/data";
import { HOURS, DELIVERY_ZONES, PAYMENT_CFG } from "@/lib/admin-data";
import { cop } from "@/lib/format";
import { Panel, Toggle } from "./ui";
import { Pin, Plus, Check } from "@/components/icons";

const ACCENTS = ["#ee6c2b", "#e5b567", "#7c2f2f", "#86b06a", "#c0453a", "#3b82f6"];

export default function Settings() {
  const [hours, setHours] = useState(HOURS);
  const [zones, setZones] = useState(DELIVERY_ZONES);
  const [pays, setPays] = useState(PAYMENT_CFG);
  const [accent, setAccent] = useState("#ee6c2b");

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Business info */}
      <Panel title="Datos del negocio">
        <div className="space-y-3">
          <Field label="Nombre" value={RESTAURANT.name} />
          <Field label="Dirección" value={RESTAURANT.address} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Teléfono" value={RESTAURANT.phone} />
            <Field label="WhatsApp" value={`+${RESTAURANT.whatsapp}`} />
          </div>
          <button className="mt-1 w-full rounded-xl bg-ember py-2.5 text-sm font-semibold text-ink">
            Guardar cambios
          </button>
        </div>
      </Panel>

      {/* Hours */}
      <Panel title="Horarios de atención">
        <div className="space-y-1.5">
          {hours.map((h, i) => (
            <div
              key={h.day}
              className="flex items-center justify-between rounded-lg px-1 py-1.5"
            >
              <span className="w-24 text-sm">{h.day}</span>
              <span
                className={`flex-1 font-mono text-xs ${
                  h.on ? "text-muted" : "text-faint line-through"
                }`}
              >
                {h.hours}
              </span>
              <Toggle
                on={h.on}
                onChange={(v) =>
                  setHours((prev) => prev.map((x, j) => (j === i ? { ...x, on: v } : x)))
                }
                color="leaf"
                compact
              />
            </div>
          ))}
        </div>
      </Panel>

      {/* Delivery zones */}
      <Panel
        title="Zonas de domicilio"
        right={
          <button className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs text-muted hover:text-cream">
            <Plus className="h-3.5 w-3.5" /> Agregar
          </button>
        }
      >
        <div className="space-y-2">
          {zones.map((z, i) => (
            <div
              key={z.name}
              className="flex items-center gap-3 rounded-xl border border-line bg-ink/30 p-3"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ember/15 text-ember">
                <Pin className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{z.name}</p>
                <p className="font-mono text-[11px] text-faint">
                  Envío {cop(z.fee)} · mín. {cop(z.min)} · {z.eta}
                </p>
              </div>
              <Toggle
                on={z.on}
                onChange={(v) =>
                  setZones((prev) => prev.map((x, j) => (j === i ? { ...x, on: v } : x)))
                }
                color="ember"
                compact
              />
            </div>
          ))}
        </div>
      </Panel>

      {/* Payments */}
      <Panel title="Métodos de pago">
        <div className="space-y-1.5">
          {pays.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg px-1 py-1.5"
            >
              <span className="text-sm">{p.label}</span>
              <Toggle
                on={p.on}
                onChange={(v) =>
                  setPays((prev) => prev.map((x, j) => (j === i ? { ...x, on: v } : x)))
                }
                color="leaf"
                compact
              />
            </div>
          ))}
        </div>
      </Panel>

      {/* Branding */}
      <Panel title="Marca y apariencia" className="lg:col-span-2">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <span
              className="grid h-12 w-12 place-items-center rounded-2xl text-2xl font-black text-ink"
              style={{ background: accent }}
            >
              M
            </span>
            <div>
              <p className="text-sm font-medium">Logo</p>
              <p className="text-xs text-faint">Sube el logo de tu restaurante</p>
            </div>
          </div>
          <div className="h-10 w-px bg-line" />
          <div>
            <p className="mb-2 text-sm font-medium">Color de acento</p>
            <div className="flex gap-2">
              {ACCENTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setAccent(c)}
                  className="grid h-8 w-8 place-items-center rounded-full ring-offset-2 ring-offset-ink transition-transform hover:scale-110"
                  style={{ background: c, boxShadow: accent === c ? `0 0 0 2px ${c}` : "none" }}
                  aria-label={`Acento ${c}`}
                >
                  {accent === c && <Check className="h-4 w-4 text-ink" />}
                </button>
              ))}
            </div>
          </div>
          <div className="h-10 w-px bg-line" />
          <p className="max-w-xs text-xs text-faint">
            Todo el sitio de tu cliente y el menú QR se re-colorean al instante con tu
            marca.
          </p>
        </div>
      </Panel>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1 block label-mono text-faint">{label}</span>
      <input
        defaultValue={value}
        className="w-full rounded-xl border border-line bg-ink/40 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-faint"
      />
    </label>
  );
}
