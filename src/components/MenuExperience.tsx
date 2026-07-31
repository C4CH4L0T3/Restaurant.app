"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import type { DietTag } from "@/lib/types";
import { Eyebrow, TAG_META, CategoryIcon } from "./ui";
import { Search } from "./icons";
import { Reveal } from "./motion";
import ProductCard from "./ProductCard";

const FILTERS: DietTag[] = ["veg", "picante", "singluten"];

export default function MenuExperience() {
  const [cat, setCat] = useState("top");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Set<DietTag>>(new Set());

  function toggle(tag: DietTag) {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const inCat = cat === "top" ? p.tags.includes("top") : p.categoryId === cat;
      const inQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const inFilters = [...active].every((t) => p.tags.includes(t));
      return (q ? inQuery : inCat) && inFilters;
    });
  }, [cat, query, active]);

  return (
    <section id="menu" className="scroll-mt-20 bg-ink-2/60 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Carta digital</Eyebrow>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Arma tu pedido
              </h2>
            </div>
            <p className="max-w-xs text-sm text-muted">
              Personaliza cada plato, elige adiciones y déjanos notas para la
              cocina. Igual que en el local.
            </p>
          </div>
        </Reveal>

        {/* Search */}
        <Reveal delay={0.05}>
          <div className="group mt-8 flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-3 transition-colors focus-within:border-ember/60">
            <Search className="h-5 w-5 text-faint transition-colors group-focus-within:text-ember" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca una hamburguesa, alitas, brunch…"
              className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-faint"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="cursor-pointer text-xs text-faint transition-colors hover:text-cream"
              >
                Limpiar
              </button>
            )}
          </div>
        </Reveal>

        {/* Category tabs */}
        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => {
            const on = cat === c.id && !query;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setCat(c.id);
                  setQuery("");
                }}
                className={`relative flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  on
                    ? "border-transparent text-ink"
                    : "border-line bg-surface/60 text-muted hover:border-faint hover:text-cream"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-ember to-ember-2"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <CategoryIcon id={c.id} className="h-4 w-4" />
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dietary filters */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-faint">Filtrar:</span>
          {FILTERS.map((t) => {
            const on = active.has(t);
            return (
              <button
                key={t}
                onClick={() => toggle(t)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                  on
                    ? "border-cream bg-cream text-ink"
                    : "border-line text-muted hover:border-faint hover:text-cream"
                }`}
              >
                {TAG_META[t].icon}
                {TAG_META[t].label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {results.length > 0 ? (
          <motion.div layout className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {results.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i * 0.04, 0.3),
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-12 rounded-3xl border border-dashed border-line py-16 text-center">
            <p className="font-display text-xl">Sin resultados</p>
            <p className="mt-1 text-sm text-muted">
              Prueba con otra búsqueda o quita los filtros.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
