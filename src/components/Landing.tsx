"use client";

/**
 * Muestra — "Brasa Editorial", cinematic cut.
 *
 * A dark food-broadsheet that plays like a short film: full-bleed photography
 * as the only light source, a monospace "ledger" for every number, monumental
 * Bricolage headlines revealed line-by-line, and scroll-driven parallax that
 * keeps the food in motion. Built against the generic bright-SaaS look.
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { RESTAURANT, PRODUCTS, REVIEWS } from "@/lib/data";
import { cop } from "@/lib/format";
import { CountUp, Magnetic, Reveal } from "@/components/motion";
import Preloader from "@/components/Preloader";

const EASE = [0.23, 1, 0.32, 1] as const;
const MASK_EASE = [0.33, 1, 0.68, 1] as const;

const p = (id: string) => PRODUCTS.find((x) => x.id === id)!;

/* ---------------------------------------------------------------- icons */
function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function Pin({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function Star({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 8.7l5.9-.9L12 2.5Z" />
    </svg>
  );
}
function Mark({ className = "h-3 w-3" }: { className?: string }) {
  return <span className={`inline-block ${className}`} style={{ color: "var(--color-ember)" }}>✦</span>;
}

/* ---------------------------------------------------------------- shared bits */

/** Line-mask reveal: the child rises out from behind a clip edge. */
function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: MASK_EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Stars({ value = 5 }: { value?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3 w-3 ${i < Math.round(value) ? "opacity-100" : "opacity-25"}`} />
      ))}
    </span>
  );
}

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={`label-mono inline-flex items-center gap-2 text-faint ${className ?? ""}`}>
      <Mark /> {children}
    </span>
  );
}

/* ================================================================ NAV */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 28);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    { href: "#carta", label: "La carta" },
    { href: "#directo", label: "¿Por qué directo?" },
    { href: "#visita", label: "Visítanos" },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "glass border-b border-line/70 py-2.5" : "py-4"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ember text-lg font-black text-ink shadow-lg transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-105">
            M
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">{RESTAURANT.name}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="underline-grow py-1 text-sm text-muted transition-colors duration-200 hover:text-cream">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a href="/admin" className="hidden rounded-full border border-line px-3.5 py-2 text-xs font-medium text-muted transition-colors duration-200 hover:border-faint hover:text-cream sm:block">
            Panel del negocio
          </a>
          <Magnetic strength={0.25}>
            <Link href="/mesa/5" className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink transition-all duration-200 hover:shadow-[0_10px_30px_-8px_rgba(244,236,224,0.4)] active:scale-95">
              Pedir <Arrow className="h-3.5 w-3.5" />
            </Link>
          </Magnetic>
        </div>
      </div>

      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-ember via-gold to-ember" />
    </header>
  );
}

/* ================================================================ HERO */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.28]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const hero = p("clasica");

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* full-bleed cinematic plate */}
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0 will-change-transform">
        <Image
          src={hero.image.replace("w=900", "w=1920")}
          alt={hero.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      {/* cinematic scrims — the photo is the light, we shape its edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-transparent to-ink/30" />
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 220px 40px rgba(16,12,10,0.9)" }} />

      {/* top editorial meta row */}
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 pt-24 md:pt-28">
        <motion.a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT.name + " " + RESTAURANT.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="label-mono flex items-center gap-1.5 text-cream/60 transition-colors hover:text-cream"
        >
          <Pin className="h-3 w-3" /> Sabaneta — Est. 2019
        </motion.a>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="label-mono hidden text-cream/50 sm:block">
          6.15°N / 75.62°W
        </motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="label-mono flex items-center gap-2 text-leaf">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-leaf" /> Abierto
        </motion.span>
      </div>

      {/* headline block */}
      <motion.div style={{ y: copyY }} className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] max-w-7xl flex-col justify-center px-5 pb-32">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Eyebrow className="text-cream/60">Brunch · Burgers · Café de origen</Eyebrow>
          </motion.div>

          <h1 className="mt-4 font-display text-[15.5vw] font-extrabold uppercase leading-[0.82] tracking-[-0.035em] sm:text-[12vw] md:text-[8.6vw]">
            <Rise delay={0.15}>Se come</Rise>
            <Rise delay={0.28}>con los</Rise>
            <Rise delay={0.41}>
              <span className="text-gradient">ojos.</span>
            </Rise>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
            className="mt-7 max-w-md text-lg leading-relaxed text-cream/75"
          >
            Cocina de autor en Sabaneta. Escanea el QR de tu mesa o pide a domicilio: va
            directo a la parrilla. Sin filas, sin intermediarios, sin comisiones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.02, duration: 0.7, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a href="#carta" className="ember-glow inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 font-semibold text-ink transition-transform active:scale-95">
                Ver la carta <Arrow className="h-4 w-4" />
              </a>
            </Magnetic>
            <Link href="/mesa/5" className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-ink/30 px-6 py-3.5 font-medium text-cream backdrop-blur-sm transition-colors hover:border-cream/60">
              Pedir desde la mesa
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* floating price annotation on the plate */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute right-5 top-[38%] z-10 hidden items-center gap-2 lg:flex"
      >
        <span className="h-px w-10 bg-gold/70" />
        <div className="glass rounded-xl border border-cream/15 px-3 py-2">
          <p className="label-mono text-cream/50">{hero.name}</p>
          <p className="font-mono text-sm font-semibold tracking-tight text-gold">{cop(hero.price)}</p>
        </div>
      </motion.div>

      {/* mono stats ledger, pinned to the fold */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.7 }}
        className="absolute inset-x-0 bottom-0 z-10"
      >
        <div className="mx-auto max-w-7xl px-5 pb-6">
          <div className="grid grid-cols-2 border-t border-cream/15 sm:grid-cols-4 sm:divide-x sm:divide-cream/10">
            <Stat top={<span className="inline-flex items-center gap-2"><CountUp to={RESTAURANT.rating} format={(n) => n.toFixed(1)} /><Stars value={RESTAURANT.rating} /></span>} label={<><CountUp to={RESTAURANT.reviewCount} /> reseñas Google</>} />
            <Stat top="25 min" label="domicilio promedio" />
            <Stat top="QR" label="pide desde la mesa" />
            <Stat top={<span className="text-leaf">0%</span>} label="comisión de apps" />
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div style={{ opacity: fade }} className="pointer-events-none absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-cream/50 lg:flex">
        <span className="label-mono">Desliza</span>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <Arrow className="h-4 w-4 rotate-90" />
        </motion.span>
      </motion.div>
    </section>
  );
}

function Stat({ top, label }: { top: ReactNode; label: ReactNode }) {
  return (
    <div className="px-1 py-4 sm:px-5">
      <div className="font-display text-xl font-semibold">{top}</div>
      <p className="label-mono mt-1 text-cream/45">{label}</p>
    </div>
  );
}

/* ================================================================ TICKER */
function Ticker() {
  const items = ["Recién hecho a la brasa", "Pide desde la mesa", "Sin comisiones de apps", "Café de origen antioqueño", "Brunch todo el día", "Producto real, cocina a la vista"];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2 py-4">
      <div className="marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-lg font-medium text-cream/80">{t}</span>
            <Mark className="h-3.5 w-3.5" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================ MANIFESTO */
function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1fr_0.9fr]">
        <div>
          <Reveal>
            <Eyebrow>La casa</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              Producto real,
              <br />
              <span className="text-gradient">cocina a la vista.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
              Carne madurada en casa, pan brioche horneado cada mañana y café de fincas
              de Antioquia. Nada de congelados de bolsa: lo que ves en la foto es lo que
              llega a tu mesa, hecho al momento.
            </p>
          </Reveal>

          <div ref={ref} className="mt-9 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {[
              { n: "120g", l: "carne madurada" },
              { n: "16", l: "min a la brasa" },
              { n: "100%", l: "hecho en casa" },
            ].map((s) => (
              <div key={s.l} className="bg-surface/60 px-3 py-5 text-center">
                <p className="font-mono text-2xl font-semibold text-cream">{s.n}</p>
                <p className="label-mono mt-1.5 text-faint">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* tall parallax plate */}
        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line">
            <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
              <Image src={p("huevos-benedict").image.replace("w=900", "w=1200")} alt="Brunch en Muestra" fill sizes="(max-width:768px) 100vw, 520px" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="label-mono text-cream/60">Domingos</p>
                <p className="font-display text-2xl font-semibold text-cream">Brunch de la casa</p>
              </div>
              <span className="glass rounded-full border border-cream/20 px-3 py-1 font-mono text-sm text-gold">{cop(p("huevos-benedict").price)}</span>
            </div>
          </div>
          {/* rotating credit stamp */}
          <div className="absolute -left-6 -top-6 hidden h-24 w-24 sm:grid">
            <svg viewBox="0 0 200 200" className="spin-slow h-full w-full">
              <defs>
                <path id="stamp" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
              </defs>
              <text className="label-mono" fill="var(--color-gold)" style={{ fontSize: 15, letterSpacing: 3 }}>
                <textPath href="#stamp" startOffset="0">MUESTRA · SABANETA · DESDE 2019 ·&nbsp;</textPath>
              </text>
            </svg>
            <span className="absolute inset-0 m-auto grid h-9 w-9 place-items-center rounded-full bg-ember text-ink"><Star className="h-4 w-4" /></span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================ DISH REEL */
const REEL = ["clasica", "alitas-bbq", "pancakes", "smash", "papas-trufa", "malteada"].map(p);

function ReelCard({ id, progress, speed }: { id: (typeof REEL)[number]; progress: MotionValue<number>; speed: number }) {
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  const dish = id;
  const badge = dish.tags.includes("top") ? { t: "Más vendido", c: "bg-ember text-ink" } : dish.tags.includes("nuevo") ? { t: "Nuevo", c: "bg-gold text-ink" } : dish.tags.includes("picante") ? { t: "Picante", c: "bg-wine text-cream" } : null;
  return (
    <motion.article style={{ y }} className="spotlight group relative overflow-hidden rounded-[1.5rem] border border-line bg-surface/50">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image src={dish.image.replace("w=900", "w=1000")} alt={dish.name} fill sizes="(max-width:768px) 80vw, 380px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        {badge && <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 label-mono ${badge.c}`}>{badge.t}</span>}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
          <div>
            <h3 className="font-display text-xl font-semibold leading-tight text-cream transition-colors group-hover:text-ember">{dish.name}</h3>
            <p className="label-mono mt-1 text-cream/55">{dish.prepMin} min · {dish.kcal} kcal</p>
          </div>
          <span className="shrink-0 font-mono text-lg font-semibold text-gold">{cop(dish.price)}</span>
        </div>
      </div>
    </motion.article>
  );
}

function DishReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // three parallax columns, each drifting at a different speed
  const cols = [
    { items: [REEL[0], REEL[3]], speed: 60 },
    { items: [REEL[1], REEL[4]], speed: 110 },
    { items: [REEL[2], REEL[5]], speed: 40 },
  ];

  return (
    <section id="carta" className="relative bg-ink-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><Eyebrow>La carta en su punto</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
                Lo que todos vuelven a pedir.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link href="/mesa/5" className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-cream transition-colors hover:border-ember">
              Ver la carta completa
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* desktop: parallax masonry columns */}
        <div ref={ref} className="mt-12 hidden gap-5 md:grid md:grid-cols-3">
          {cols.map((col, i) => (
            <div key={i} className={`flex flex-col gap-5 ${i === 1 ? "md:mt-16" : ""}`}>
              {col.items.map((d) => (
                <ReelCard key={d.id} id={d} progress={scrollYProgress} speed={col.speed} />
              ))}
            </div>
          ))}
        </div>

        {/* mobile: horizontal snap rail */}
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden">
          {REEL.map((d) => (
            <div key={d.id} className="w-[78vw] shrink-0 snap-center">
              <ReelCard id={d} progress={scrollYProgress} speed={0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================ DIRECT PITCH */
function DirectPitch() {
  const ticket = 100000; // COP reference ticket
  const commission = 0.28;
  const lost = ticket * commission;

  return (
    <section id="directo" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal><Eyebrow>Pide directo</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.0] tracking-tight sm:text-6xl">
                Cada pedido por app
                <br />
                se lleva hasta el{" "}
                <span className="relative inline-block text-wine-2">
                  28%
                  <svg viewBox="0 0 120 40" className="pointer-events-none absolute -left-1 top-1/2 h-full w-[calc(100%+8px)] -translate-y-1/2" aria-hidden>
                    <motion.path d="M4,30 C40,10 80,34 116,12" fill="none" stroke="var(--color-wine-2)" strokeWidth={3} strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE, delay: 0.3 }} />
                  </svg>
                </span>
                .
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
                En Muestra pides directo al restaurante. El 100% de la venta se queda en
                la casa — por eso la comida rinde, el precio es justo y quien cocina
                gana lo que merece.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Magnetic>
                  <Link href="/mesa/5" className="ember-glow inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 font-semibold text-ink transition-transform active:scale-95">
                    Pedir directo <Arrow className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <a href="/admin" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 font-medium text-cream transition-colors hover:border-faint">
                  ¿Tienes un restaurante?
                </a>
              </div>
            </Reveal>
          </div>

          {/* the ticket comparison */}
          <Reveal delay={0.1}>
            <div className="grain-card relative overflow-hidden rounded-[1.75rem] border border-line p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-dashed border-line pb-4">
                <span className="label-mono text-faint">Ticket de ejemplo</span>
                <span className="font-mono text-lg font-semibold text-cream">{cop(ticket)}</span>
              </div>

              <div className="mt-6 space-y-5">
                <Row label="Por app de domicilios" tone="bad" amount={`− ${cop(lost)}`} sub="comisión + tarifas (~28%)" />
                <Row label="Directo en Muestra" tone="good" amount={cop(0)} sub="0% de comisión, siempre" />
              </div>

              <div className="mt-7 rounded-2xl border border-ember/30 bg-ember/[0.06] p-5">
                <p className="label-mono text-ember">Te ahorras por cada 100 mil</p>
                <p className="mt-1 font-mono text-4xl font-semibold text-cream">
                  <CountUp to={lost} format={(n) => cop(n)} />
                </p>
                <p className="mt-2 text-sm text-muted">
                  Multiplícalo por cientos de pedidos al mes. Ese es dinero que vuelve a
                  la cocina — no a un intermediario.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({ label, amount, sub, tone }: { label: string; amount: string; sub: string; tone: "good" | "bad" }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full ${tone === "good" ? "bg-leaf/15 text-leaf" : "bg-wine/25 text-wine-2"}`}>
          {tone === "good" ? "✓" : "✕"}
        </span>
        <div>
          <p className="font-medium text-cream">{label}</p>
          <p className="label-mono mt-0.5 text-faint">{sub}</p>
        </div>
      </div>
      <span className={`font-mono text-lg font-semibold ${tone === "good" ? "text-leaf" : "text-wine-2"}`}>{amount}</span>
    </div>
  );
}

/* ================================================================ GALLERY */
function Gallery() {
  const shots = ["clasica", "smash", "capuccino", "pancakes", "alitas-bbq", "brownie"].map(p);
  const spans = ["md:col-span-2 md:row-span-2", "", "", "md:row-span-2", "md:col-span-2", ""];
  return (
    <section className="relative bg-ink-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal><Eyebrow>En el sartén</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-6xl">Del sartén a tu feed.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a href={`https://instagram.com/${RESTAURANT.ig}`} target="_blank" rel="noopener noreferrer" className="underline-grow text-sm font-medium text-muted transition-colors hover:text-cream">
              @{RESTAURANT.ig} →
            </a>
          </Reveal>
        </div>

        <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4">
          {shots.map((s, i) => (
            <Reveal key={s.id + i} delay={(i % 3) * 0.06} className={`group relative overflow-hidden rounded-2xl border border-line ${spans[i]}`}>
              <Image src={s.image.replace("w=900", "w=1000")} alt={s.name} fill sizes="(max-width:768px) 50vw, 400px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 translate-y-2 font-display text-sm font-medium text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{s.name}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================ VOICES */
function Voices() {
  const picks = REVIEWS.slice(0, 3);
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal><Eyebrow>La mesa habla</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
                4.8 de 5, y contando.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-4xl font-semibold text-cream"><CountUp to={RESTAURANT.rating} format={(n) => n.toFixed(1)} /></span>
              <div>
                <Stars value={5} />
                <p className="label-mono mt-1 text-faint"><CountUp to={RESTAURANT.reviewCount} /> reseñas</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {picks.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <figure className="grain-card flex h-full flex-col rounded-[1.5rem] border border-line p-6">
                <Stars value={r.rating} />
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-cream/85">“{r.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 font-display text-sm font-semibold text-cream">{r.name.charAt(0)}</span>
                  <div>
                    <p className="text-sm font-medium text-cream">{r.name}</p>
                    <p className="label-mono text-faint">{r.source} · {r.date}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================ VISIT / CTA */
function Visit() {
  return (
    <section id="visita" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="relative overflow-hidden rounded-[2rem] border border-line">
          <Image src={p("alitas-bbq").image.replace("w=900", "w=1920")} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-[2px]" />
          <div className="relative grid gap-10 p-8 sm:p-12 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>Visítanos</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">
                Te esperamos
                <br />
                en <span className="text-gradient">Sabaneta.</span>
              </h2>
              <div className="mt-8 max-w-sm space-y-4">
                <InfoRow label="Dónde" value={RESTAURANT.address} />
                <InfoRow label="Horario" value={RESTAURANT.hours} />
                <InfoRow label="WhatsApp" value={RESTAURANT.phone} />
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Magnetic>
                  <Link href="/mesa/5" className="ember-glow inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 font-semibold text-ink transition-transform active:scale-95">
                    Pedir ahora <Arrow className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT.name + " " + RESTAURANT.address)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3.5 font-medium text-cream transition-colors hover:border-cream/60">
                  Cómo llegar
                </a>
              </div>
            </div>

            {/* mono "open" ledger card */}
            <div className="glass rounded-[1.5rem] border border-cream/15 p-6">
              <div className="flex items-center justify-between">
                <span className="label-mono text-cream/60">Estado</span>
                <span className="flex items-center gap-2 label-mono text-leaf"><span className="live-dot h-1.5 w-1.5 rounded-full bg-leaf" /> Abierto ahora</span>
              </div>
              <div className="mt-5 space-y-3 font-mono text-sm">
                {[["Mar–Jue", "11:00 – 21:00"], ["Vie–Sáb", "11:00 – 22:30"], ["Domingo", "10:00 – 21:30"], ["Lunes", "Cerrado"]].map(([d, h]) => (
                  <div key={d} className="flex items-center justify-between border-b border-cream/10 pb-3 last:border-0 last:pb-0">
                    <span className="text-cream/60">{d}</span>
                    <span className={h === "Cerrado" ? "text-wine-2" : "text-cream"}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 border-b border-line pb-3">
      <span className="label-mono w-20 shrink-0 pt-1 text-ember">{label}</span>
      <span className="text-cream/90">{value}</span>
    </div>
  );
}

/* ================================================================ FOOTER */
function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2 pt-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-10 pb-12 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ember text-lg font-black text-ink">M</span>
              <span className="font-display text-xl font-semibold">{RESTAURANT.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{RESTAURANT.tagline} en {RESTAURANT.neighborhood}. Pide directo, sin comisiones.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol title="Carta" links={[["Hamburguesas", "#carta"], ["Brunch", "#carta"], ["Bebidas", "#carta"]]} />
            <FooterCol title="La casa" links={[["Nosotros", "#top"], ["¿Por qué directo?", "#directo"], ["Visítanos", "#visita"]]} />
            <FooterCol title="Negocio" links={[["Panel del negocio", "/admin"], ["Menú QR", "/mesa/5"], [`@${RESTAURANT.ig}`, `https://instagram.com/${RESTAURANT.ig}`]]} />
          </div>
        </div>
      </div>

      {/* monumental clipped wordmark */}
      <div className="select-none overflow-hidden">
        <p className="translate-y-[22%] text-center font-display text-[24vw] font-extrabold uppercase leading-none tracking-tighter text-cream/[0.04]">Muestra</p>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 sm:flex-row">
          <p className="label-mono text-faint">© {new Date().getFullYear()} Muestra · Sabaneta, Medellín</p>
          <p className="label-mono text-faint">Hecho directo · sin comisiones</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="label-mono text-faint">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-sm text-muted transition-colors hover:text-cream">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================================================================ PAGE */
export default function Landing() {
  return (
    <>
      <Preloader />
      <Nav />
      <main className="relative">
        <Hero />
        <Ticker />
        <Manifesto />
        <DishReel />
        <DirectPitch />
        <Gallery />
        <Voices />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
