"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS } from "@/lib/data";
import type { Product } from "@/lib/types";
import { cop } from "@/lib/format";
import { useCart } from "./CartProvider";
import { TagChip } from "./ui";
import { Check, Clock, Minus, Plus, X } from "./icons";

export default function ProductModal() {
  const { activeProduct, closeProduct } = useCart();
  return (
    <AnimatePresence>
      {activeProduct && (
        <ModalInner key={activeProduct.id} product={activeProduct} onClose={closeProduct} />
      )}
    </AnimatePresence>
  );
}

function ModalInner({ product, onClose }: { product: Product; onClose: () => void }) {
  const { add, openProduct } = useCart();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [single, setSingle] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    product.modifiers?.forEach((g) => {
      if (g.type === "single" && g.required) init[g.id] = g.options[0].id;
    });
    return init;
  });
  const [multi, setMulti] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const { unit, mods } = useMemo(() => {
    let extra = 0;
    const labels: string[] = [];
    product.modifiers?.forEach((g) => {
      if (g.type === "single") {
        const id = single[g.id];
        const opt = g.options.find((o) => o.id === id);
        if (opt) {
          extra += opt.price;
          labels.push(opt.label);
        }
      } else {
        const set = multi[g.id];
        set?.forEach((oid) => {
          const opt = g.options.find((o) => o.id === oid);
          if (opt) {
            extra += opt.price;
            labels.push(opt.label);
          }
        });
      }
    });
    return { unit: product.price + extra, mods: labels };
  }, [product, single, multi]);

  const pairs = (product.pairWith ?? [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 3) as Product[];

  function toggleMulti(gid: string, oid: string, max?: number) {
    setMulti((prev) => {
      const set = new Set(prev[gid] ?? []);
      if (set.has(oid)) set.delete(oid);
      else {
        if (max && set.size >= max) return prev;
        set.add(oid);
      }
      return { ...prev, [gid]: set };
    });
  }

  function handleAdd() {
    const key = [product.id, ...Object.values(single), ...mods, note].join("|");
    add({
      key,
      productId: product.id,
      name: product.name,
      unit,
      qty,
      image: product.image,
      mods,
      note: note.trim() || undefined,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[2rem] border border-line bg-ink-2 sm:rounded-[2rem]"
      >
        {/* Image header */}
        <div className="relative h-52 shrink-0 sm:h-60">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="glass absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-line/70 text-cream"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-4 flex gap-1.5">
            {product.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </div>
        </div>

        {/* Scroll body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-2xl font-semibold">{product.name}</h3>
            <span className="font-mono text-xl font-semibold tracking-tight text-ember">
              {cop(product.price)}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {product.description}
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs text-faint">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {product.prepMin} min
            </span>
            {product.kcal && <span>{product.kcal} kcal</span>}
            <span className="flex items-center gap-1 text-leaf">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-leaf" /> Disponible
            </span>
          </div>

          {/* Modifier groups */}
          {product.modifiers?.map((g) => (
            <div key={g.id} className="mt-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{g.label}</h4>
                <span className="text-[11px] uppercase tracking-wide text-faint">
                  {g.required ? "Obligatorio" : g.max ? `Hasta ${g.max}` : "Opcional"}
                </span>
              </div>
              <div className="mt-2.5 space-y-2">
                {g.options.map((o) => {
                  const selected =
                    g.type === "single"
                      ? single[g.id] === o.id
                      : multi[g.id]?.has(o.id) ?? false;
                  return (
                    <button
                      key={o.id}
                      onClick={() =>
                        g.type === "single"
                          ? setSingle((s) => ({ ...s, [g.id]: o.id }))
                          : toggleMulti(g.id, o.id, g.max)
                      }
                      className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors ${
                        selected
                          ? "border-ember bg-ember/10"
                          : "border-line bg-surface/50 hover:border-faint"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-md border ${
                            selected ? "border-ember bg-ember text-ink" : "border-faint"
                          }`}
                        >
                          {selected && <Check className="h-3.5 w-3.5" />}
                        </span>
                        {o.label}
                      </span>
                      {o.price > 0 && (
                        <span className="text-xs text-muted">+ {cop(o.price)}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Special instructions */}
          <div className="mt-6">
            <h4 className="font-semibold">Notas para la cocina</h4>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Ej: sin cebolla, término medio, poca sal…"
              className="mt-2 w-full resize-none rounded-xl border border-line bg-surface/50 px-3.5 py-2.5 text-sm outline-none placeholder:text-faint focus:border-faint"
            />
          </div>

          {/* Cross-sell */}
          {pairs.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold">Va perfecto con</h4>
              <div className="mt-2.5 flex gap-2 overflow-x-auto no-scrollbar">
                {pairs.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => openProduct(p)}
                    className="flex w-36 shrink-0 flex-col rounded-xl border border-line bg-surface/50 p-2 text-left transition-colors hover:border-faint"
                  >
                    <div className="relative h-16 overflow-hidden rounded-lg">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <span className="mt-1.5 truncate text-xs font-medium">{p.name}</span>
                    <span className="text-xs text-ember">{cop(p.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div className="glass flex shrink-0 items-center gap-3 border-t border-line px-5 py-4">
          <div className="flex items-center gap-1 rounded-full border border-line bg-surface p-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="ember-glow flex flex-1 items-center justify-between rounded-full bg-ember px-5 py-3 font-semibold text-ink transition-transform active:scale-[0.98]"
          >
            <span>Agregar</span>
            <span className="font-mono tracking-tight">{cop(unit * qty)}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
