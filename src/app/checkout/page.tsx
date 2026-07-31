"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { cop } from "@/lib/format";
import { PAYMENTS, newOrderId, saveOrder } from "@/lib/order";
import type { OrderMode } from "@/lib/types";
import { Check, Chevron, Whatsapp, Pin, Clock, X } from "@/components/icons";

const MODES: { id: OrderMode; label: string; hint: string }[] = [
  { id: "delivery", label: "Domicilio", hint: "25–35 min" },
  { id: "pickup", label: "Recoger", hint: "15 min" },
  { id: "eatin", label: "En mesa", hint: "Escanea QR" },
];

const SAVED = [
  { label: "Casa", value: "Cra. 45 #72 Sur-10, Sabaneta" },
  { label: "Trabajo", value: "Cl. 50 Sur #38-20, Envigado" },
];

export default function CheckoutPage() {
  const c = useCart();
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 entrega, 1 pago
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("nequi");
  const [invoice, setInvoice] = useState(false);
  const [nit, setNit] = useState("");
  const [touched, setTouched] = useState(false);

  const needsAddress = c.mode === "delivery";
  const step0Valid =
    name.trim().length > 1 &&
    phone.trim().length >= 7 &&
    (!needsAddress || address.trim().length > 4);

  function placeOrder() {
    const id = newOrderId();
    const pay = PAYMENTS.find((p) => p.id === payment)!;
    saveOrder({
      id,
      createdAt: Date.now(),
      mode: c.mode,
      name,
      phone,
      address: needsAddress ? address : undefined,
      notes: notes || undefined,
      payment: pay.label,
      lines: c.lines,
      subtotal: c.subtotal,
      discount: c.discount,
      deliveryFee: c.deliveryFee,
      tip: c.tip,
      total: c.total,
      etaMin: c.mode === "delivery" ? 32 : 15,
    });
    c.clear();
    router.push("/pedido");
  }

  if (c.lines.length === 0) {
    return (
      <Shell>
        <div className="mx-auto max-w-md py-24 text-center">
          <p className="font-display text-2xl">Tu pedido está vacío</p>
          <p className="mt-2 text-muted">Agrega algo del menú para continuar.</p>
          <Link
            href="/#menu"
            className="mt-6 inline-block rounded-full bg-ember px-6 py-3 font-semibold text-ink"
          >
            Ir al menú
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto grid max-w-5xl gap-8 py-8 lg:grid-cols-[1fr_360px]">
        {/* Left: steps */}
        <div>
          <Steps step={step} />

          {step === 0 && (
            <section className="mt-6 space-y-6">
              <Card title="¿Cómo lo quieres?">
                <div className="grid grid-cols-3 gap-2">
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => c.setMode(m.id)}
                      className={`rounded-xl border px-2 py-3 text-center transition-colors ${
                        c.mode === m.id
                          ? "border-ember bg-ember/10"
                          : "border-line hover:border-faint"
                      }`}
                    >
                      <div className="text-sm font-semibold">{m.label}</div>
                      <div className="mt-0.5 flex items-center justify-center gap-1 text-[11px] text-faint">
                        <Clock className="h-3 w-3" />
                        {m.hint}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card title="Tus datos">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Nombre"
                    value={name}
                    onChange={setName}
                    placeholder="Tu nombre"
                    error={touched && name.trim().length <= 1}
                  />
                  <Field
                    label="Celular / WhatsApp"
                    value={phone}
                    onChange={setPhone}
                    placeholder="300 000 0000"
                    error={touched && phone.trim().length < 7}
                  />
                </div>
              </Card>

              {needsAddress && (
                <Card title="Dirección de entrega">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {SAVED.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => setAddress(s.value)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                          address === s.value
                            ? "border-ember bg-ember/10 text-ember"
                            : "border-line text-muted hover:border-faint"
                        }`}
                      >
                        <Pin className="h-3.5 w-3.5" />
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <Field
                    label="Dirección"
                    value={address}
                    onChange={setAddress}
                    placeholder="Cra. 45 #72 Sur-10, apto / detalles"
                    error={touched && address.trim().length <= 4}
                  />
                  <div className="mt-3">
                    <Field
                      label="Notas para el domicilio (opcional)"
                      value={notes}
                      onChange={setNotes}
                      placeholder="Ej: portería, torre 3, dejar en recepción"
                    />
                  </div>
                </Card>
              )}

              <button
                onClick={() => {
                  setTouched(true);
                  if (step0Valid) setStep(1);
                }}
                className="ember-glow flex w-full items-center justify-center gap-2 rounded-full bg-ember py-3.5 font-semibold text-ink transition-transform active:scale-[0.99]"
              >
                Continuar al pago <Chevron className="h-4 w-4" />
              </button>
            </section>
          )}

          {step === 1 && (
            <section className="mt-6 space-y-6">
              <Card title="Medio de pago">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {PAYMENTS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPayment(p.id)}
                      className={`flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors ${
                        payment === p.id
                          ? "border-ember bg-ember/10"
                          : "border-line hover:border-faint"
                      }`}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: p.tone }}
                      />
                      <span className="text-sm font-semibold">{p.label}</span>
                      <span className="text-[11px] text-faint">{p.desc}</span>
                    </button>
                  ))}
                </div>
                {PAYMENTS.find((p) => p.id === payment)?.online && (
                  <p className="mt-3 rounded-xl bg-surface/60 px-3 py-2 text-xs text-muted">
                    🔒 Serás redirigido a la pasarela segura (Wompi / Bold) para
                    confirmar el pago. Demo: no se cobra nada.
                  </p>
                )}
              </Card>

              <Card title="Factura electrónica">
                <label className="flex cursor-pointer items-center justify-between">
                  <span className="text-sm text-muted">
                    Quiero factura con datos fiscales
                  </span>
                  <span
                    onClick={() => setInvoice((v) => !v)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      invoice ? "bg-ember" : "bg-surface-2"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-ink transition-transform ${
                        invoice ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                </label>
                {invoice && (
                  <div className="mt-3">
                    <Field
                      label="NIT / Cédula"
                      value={nit}
                      onChange={setNit}
                      placeholder="900.123.456-7"
                    />
                  </div>
                )}
              </Card>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(0)}
                  className="rounded-full border border-line px-5 py-3.5 font-medium text-muted hover:text-cream"
                >
                  Atrás
                </button>
                <button
                  onClick={placeOrder}
                  className="ember-glow flex flex-1 items-center justify-center gap-2 rounded-full bg-ember py-3.5 font-semibold text-ink transition-transform active:scale-[0.99]"
                >
                  Confirmar pedido · {cop(c.total)}
                </button>
              </div>
              <p className="text-center text-xs text-faint">
                Al confirmar aceptas los términos. Pedido directo, sin comisiones.
              </p>
            </section>
          )}
        </div>

        {/* Right: summary */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface/40 p-5">
            <h3 className="font-display text-lg font-semibold">Resumen</h3>
            <div className="mt-4 space-y-3">
              {c.lines.map((l) => (
                <div key={l.key} className="flex gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                    <Image src={l.image} alt={l.name} fill className="object-cover" />
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ember text-[10px] font-bold text-ink">
                      {l.qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{l.name}</p>
                    {l.mods.length > 0 && (
                      <p className="truncate text-xs text-faint">{l.mods.join(", ")}</p>
                    )}
                  </div>
                  <span className="text-sm font-semibold">{cop(l.unit * l.qty)}</span>
                </div>
              ))}
            </div>
            <div className="my-4 h-px bg-line" />
            <dl className="space-y-1.5 text-sm">
              <SumRow label="Subtotal" value={cop(c.subtotal)} />
              {c.discount > 0 && (
                <SumRow label={`Descuento (${c.coupon})`} value={`- ${cop(c.discount)}`} accent />
              )}
              {c.deliveryFee > 0 && <SumRow label="Domicilio" value={cop(c.deliveryFee)} />}
              {c.tip > 0 && <SumRow label="Propina" value={cop(c.tip)} />}
            </dl>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
              <span className="font-display text-lg font-semibold">Total</span>
              <span className="font-mono text-2xl font-semibold tracking-tight">{cop(c.total)}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-faint">
            <Whatsapp className="h-4 w-4 text-leaf" />
            ¿Dudas? Escríbenos por WhatsApp
          </div>
        </aside>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen">
      <header className="glass sticky top-0 z-20 border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ember text-base font-black text-ink">
              M
            </span>
            <span className="font-display text-lg font-semibold">Muestra</span>
          </Link>
          <Link
            href="/#menu"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-cream"
          >
            <X className="h-4 w-4" /> Seguir pidiendo
          </Link>
        </div>
      </header>
      <div className="px-5">{children}</div>
    </div>
  );
}

function Steps({ step }: { step: number }) {
  const labels = ["Entrega", "Pago", "Listo"];
  return (
    <div className="flex items-center gap-2">
      {labels.map((l, i) => (
        <div key={l} className="flex flex-1 items-center gap-2">
          <div
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
              i < step
                ? "bg-leaf text-ink"
                : i === step
                ? "bg-ember text-ink"
                : "border border-line text-faint"
            }`}
          >
            {i < step ? <Check className="h-4 w-4" /> : i + 1}
          </div>
          <span className={`text-sm ${i <= step ? "text-cream" : "text-faint"}`}>{l}</span>
          {i < labels.length - 1 && <div className="h-px flex-1 bg-line" />}
        </div>
      ))}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-5">
      <h3 className="mb-3 font-display text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-muted">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-ink/40 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-faint ${
          error ? "border-wine-2" : "border-line focus:border-faint"
        }`}
      />
    </label>
  );
}

function SumRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className={accent ? "text-leaf" : "text-cream"}>{value}</dd>
    </div>
  );
}
