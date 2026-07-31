"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { cop } from "@/lib/format";
import { useCart } from "./CartProvider";
import { TagChip } from "./ui";
import { Clock, Plus } from "./icons";

export default function ProductCard({ product }: { product: Product }) {
  const { openProduct, add } = useCart();
  const soldOut = product.soldOut;

  function quickAdd(e: React.MouseEvent) {
    e.stopPropagation();
    if (soldOut) return;
    if (product.modifiers?.length) {
      openProduct(product);
      return;
    }
    add({
      key: product.id,
      productId: product.id,
      name: product.name,
      unit: product.price,
      qty: 1,
      image: product.image,
      mods: [],
    });
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={product.name}
      onClick={() => openProduct(product)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProduct(product);
        }
      }}
      onMouseMove={onMove}
      className="spotlight group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-line bg-surface/50 text-left transition-[transform,border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:border-ember/40 hover:bg-surface hover:shadow-[0_24px_60px_-28px_rgba(238,108,43,0.5)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 320px"
          className={`object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.08] ${
            soldOut ? "grayscale" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-3">
          {product.tags.slice(0, 2).map((t) => (
            <TagChip key={t} tag={t} />
          ))}
        </div>
        {soldOut && (
          <div className="absolute inset-0 grid place-items-center bg-ink/70">
            <span className="rounded-full border border-line bg-ink px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              Agotado por hoy
            </span>
          </div>
        )}
      </div>

      <div className="relative z-[1] flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight transition-colors duration-300 group-hover:text-ember">
            {product.name}
          </h3>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-faint">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {product.prepMin}min
          </span>
          {product.kcal && <span>{product.kcal}kcal</span>}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-semibold tracking-tight">
              {cop(product.price)}
            </span>
            {product.compareAt && (
              <span className="font-mono text-xs text-faint line-through">
                {cop(product.compareAt)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={quickAdd}
            disabled={soldOut}
            aria-label={`Agregar ${product.name}`}
            className={`grid h-10 w-10 place-items-center rounded-full transition-all duration-200 ${
              soldOut
                ? "cursor-not-allowed border border-line text-faint"
                : "cursor-pointer bg-cream text-ink hover:rotate-90 hover:scale-110 hover:bg-ember active:scale-90"
            }`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
