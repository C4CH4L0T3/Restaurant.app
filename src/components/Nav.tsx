"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { RESTAURANT } from "@/lib/data";
import { useCart } from "./CartProvider";
import { Bag } from "./icons";
import { Magnetic } from "./motion";

const LINKS = [
  { href: "#mesa", label: "Menú QR" },
  { href: "#menu", label: "Carta" },
  { href: "#directo", label: "¿Por qué directo?" },
  { href: "#puntos", label: "Puntos" },
];

export default function Nav() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "glass border-b border-line/70 py-2.5" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ember text-lg font-black text-ink shadow-lg transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
            M
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            {RESTAURANT.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="underline-grow py-1 text-sm text-muted transition-colors duration-200 hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="/admin"
            className="hidden cursor-pointer rounded-full border border-line px-3.5 py-2 text-xs font-medium text-muted transition-colors duration-200 hover:border-faint hover:text-cream sm:block"
          >
            Panel del negocio
          </a>
          <Magnetic strength={0.25}>
            <button
              onClick={() => setOpen(true)}
              className="relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink transition-all duration-200 hover:shadow-[0_10px_30px_-8px_rgba(244,236,224,0.4)] active:scale-95"
            >
              <Bag className="h-4 w-4" />
              <span className="hidden sm:inline">Pedido</span>
              <AnimatePresence mode="popLayout">
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.2, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="grid h-5 min-w-5 place-items-center rounded-full bg-ember px-1 text-[11px] font-bold text-ink"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-ember via-gold to-ember"
      />
    </header>
  );
}
