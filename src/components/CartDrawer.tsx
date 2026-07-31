"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS, RESTAURANT } from "@/lib/data";
import type { OrderMode } from "@/lib/types";
import { cop } from "@/lib/format";
import { useCart } from "./CartProvider";
import { Bag, Check, Minus, Plus, Whatsapp, X, Clock } from "./icons";

const MODES: { id: OrderMode; label: string; hint: string }[] = [
  { id: "delivery", label: "Domicilio", hint: "25–35 min" },
  { id: "pickup", label: "Recoger", hint: "15 min" },
  { id: "eatin", label: "En mesa", hint: "QR" },
];

const TIPS = [0, 5, 10, 15];

export default function CartDrawer() {
  const c = useCart();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  function goCheckout() {
    c.setOpen(false);
    router.push("/checkout");
  }

  function tryCoupon() {
    if (!code.trim()) return;
    const ok = c.applyCoupon(code);
    setCouponMsg(ok ? "ok" : "bad");
  }

  function checkout() {
    const lines = c.lines
      .map((l) => {
        const mods = l.mods.length ? `\n     + ${l.mods.join(", ")}` : "";
        const note = l.note ? `\n     📝 ${l.note}` : "";
        return `• ${l.qty}x ${l.name}${mods}${note}  —  ${cop(l.unit * l.qty)}`;
      })
      .join("\n");
    const modeLabel = MODES.find((m) => m.id === c.mode)!.label;
    const msg = `¡Hola ${RESTAURANT.name}! 🍔 Quiero hacer este pedido:\n\n${lines}\n\n${
      c.discount ? `Descuento (${c.coupon}): -${cop(c.discount)}\n` : ""
    }${c.deliveryFee ? `Domicilio: ${cop(c.deliveryFee)}\n` : ""}${
      c.tip ? `Propina: ${cop(c.tip)}\n` : ""
    }*Total: ${cop(c.total)}*\n\nTipo de pedido: ${modeLabel}\nNombre:\nDirección:\nMedio de pago:`;
    window.open(
      `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  const suggestion = PRODUCTS.filter(
    (p) => p.categoryId === "bebidas" && !c.lines.some((l) => l.productId === p.id)
  ).sort((a, b) => b.popularity - a.popularity)[0];

  return (
    <AnimatePresence>
      {c.open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => c.setOpen(false)}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-ink-2"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2">
                <Bag className="h-5 w-5 text-ember" />
                <h3 className="font-display text-xl font-semibold">Tu pedido</h3>
                {c.count > 0 && (
                  <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted">
                    {c.count} items
                  </span>
                )}
              </div>
              <button
                onClick={() => c.setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-line hover:bg-surface"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {c.lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-surface">
                  <Bag className="h-7 w-7 text-faint" />
                </div>
                <p className="font-display text-xl">Tu pedido está vacío</p>
                <p className="text-sm text-muted">
                  Agrega algo delicioso del menú y aparecerá aquí.
                </p>
                <button
                  onClick={() => c.setOpen(false)}
                  className="mt-2 rounded-full bg-ember px-6 py-2.5 font-semibold text-ink"
                >
                  Ver el menú
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {/* mode toggle */}
                  <div className="grid grid-cols-3 gap-2 rounded-2xl border border-line bg-surface/50 p-1.5">
                    {MODES.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => c.setMode(m.id)}
                        className={`rounded-xl px-2 py-2 text-center transition-colors ${
                          c.mode === m.id ? "bg-cream text-ink" : "text-muted hover:text-cream"
                        }`}
                      >
                        <div className="text-sm font-semibold">{m.label}</div>
                        <div
                          className={`flex items-center justify-center gap-1 text-[10px] ${
                            c.mode === m.id ? "text-ink/70" : "text-faint"
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          {m.hint}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* lines */}
                  <div className="mt-4 space-y-3">
                    {c.lines.map((l) => (
                      <div
                        key={l.key}
                        className="flex gap-3 rounded-2xl border border-line bg-surface/40 p-2.5"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                          <Image src={l.image} alt={l.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-sm font-semibold leading-tight">
                              {l.name}
                            </span>
                            <button
                              onClick={() => c.remove(l.key)}
                              className="text-faint hover:text-cream"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          {l.mods.length > 0 && (
                            <span className="mt-0.5 line-clamp-1 text-xs text-muted">
                              {l.mods.join(", ")}
                            </span>
                          )}
                          {l.note && (
                            <span className="text-xs italic text-faint">📝 {l.note}</span>
                          )}
                          <div className="mt-auto flex items-center justify-between pt-1.5">
                            <div className="flex items-center gap-1 rounded-full border border-line">
                              <button
                                onClick={() => c.setQty(l.key, l.qty - 1)}
                                className="grid h-7 w-7 place-items-center rounded-full hover:bg-surface"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-5 text-center text-sm font-semibold">
                                {l.qty}
                              </span>
                              <button
                                onClick={() => c.setQty(l.key, l.qty + 1)}
                                className="grid h-7 w-7 place-items-center rounded-full hover:bg-surface"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-semibold">
                              {cop(l.unit * l.qty)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* upsell */}
                  {suggestion && (
                    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-ember/40 bg-ember/5 p-2.5">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={suggestion.image}
                          alt={suggestion.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-ember">¿Le sumas?</p>
                        <p className="text-sm font-semibold">{suggestion.name}</p>
                      </div>
                      <button
                        onClick={() =>
                          c.add({
                            key: suggestion.id,
                            productId: suggestion.id,
                            name: suggestion.name,
                            unit: suggestion.price,
                            qty: 1,
                            image: suggestion.image,
                            mods: [],
                          })
                        }
                        className="rounded-full bg-cream px-3 py-1.5 text-xs font-semibold text-ink"
                      >
                        + {cop(suggestion.price)}
                      </button>
                    </div>
                  )}

                  {/* coupon */}
                  <div className="mt-4">
                    <div className="flex gap-2">
                      <input
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                          setCouponMsg(null);
                        }}
                        placeholder="Código promocional"
                        className="flex-1 rounded-xl border border-line bg-surface/50 px-3.5 py-2.5 text-sm uppercase outline-none placeholder:normal-case placeholder:text-faint focus:border-faint"
                      />
                      <button
                        onClick={tryCoupon}
                        className="rounded-xl border border-line px-4 text-sm font-semibold hover:bg-surface"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponMsg === "ok" && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-leaf">
                        <Check className="h-3.5 w-3.5" /> ¡Cupón {c.coupon} aplicado!
                      </p>
                    )}
                    {couponMsg === "bad" && (
                      <p className="mt-1.5 text-xs text-wine-2">
                        Código no válido. Prueba MUESTRA10.
                      </p>
                    )}
                  </div>

                  {/* tip */}
                  <div className="mt-4">
                    <p className="mb-2 text-sm text-muted">Propina para el equipo 💛</p>
                    <div className="grid grid-cols-4 gap-2">
                      {TIPS.map((t) => (
                        <button
                          key={t}
                          onClick={() => c.setTip(t)}
                          className={`rounded-xl border py-2 text-sm font-semibold transition-colors ${
                            c.tipPct === t
                              ? "border-ember bg-ember/10 text-ember"
                              : "border-line text-muted hover:border-faint"
                          }`}
                        >
                          {t === 0 ? "Sin" : `${t}%`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* totals + checkout */}
                <div className="border-t border-line px-5 py-4">
                  <dl className="space-y-1.5 text-sm">
                    <Row label="Subtotal" value={cop(c.subtotal)} />
                    {c.discount > 0 && (
                      <Row label={`Descuento (${c.coupon})`} value={`- ${cop(c.discount)}`} accent />
                    )}
                    {c.deliveryFee > 0 && <Row label="Domicilio" value={cop(c.deliveryFee)} />}
                    {c.tip > 0 && <Row label="Propina" value={cop(c.tip)} />}
                    <div className="my-2 h-px bg-line" />
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-semibold">Total</span>
                      <span className="font-mono text-2xl font-semibold tracking-tight">
                        {cop(c.total)}
                      </span>
                    </div>
                  </dl>
                  <button
                    onClick={goCheckout}
                    className="ember-glow mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-ember py-3.5 font-semibold text-ink transition-transform active:scale-[0.98]"
                  >
                    Pagar en línea · {cop(c.total)}
                  </button>
                  <button
                    onClick={checkout}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-leaf/40 bg-leaf/10 py-3 font-semibold text-leaf transition-colors hover:bg-leaf/15"
                  >
                    <Whatsapp className="h-5 w-5" />
                    Pedir por WhatsApp
                  </button>
                  <p className="mt-2 text-center text-[11px] text-faint">
                    Sin comisiones · Pago seguro o confirmación por chat
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className={accent ? "text-leaf" : "text-cream"}>{value}</dd>
    </div>
  );
}
