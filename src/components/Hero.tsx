"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RESTAURANT } from "@/lib/data";
import { cop } from "@/lib/format";
import { Stars } from "./ui";
import { Chevron, Pin } from "./icons";
import { CountUp, Magnetic } from "./motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const prodY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ringRot = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[92vh] overflow-hidden pt-24 md:pt-28"
    >
      {/* editorial meta row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pb-6">
        <motion.a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            RESTAURANT.name + " " + RESTAURANT.address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="label-mono flex items-center gap-1.5 text-faint transition-colors hover:text-cream"
        >
          <Pin className="h-3 w-3" />
          Sabaneta — Est. 2019
        </motion.a>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="label-mono hidden text-faint sm:block"
        >
          6.15°N / 75.62°W
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="group relative label-mono flex cursor-default items-center gap-2 text-leaf"
        >
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-leaf" /> Abierto
          <span className="glass pointer-events-none absolute right-0 top-6 whitespace-nowrap rounded-md border border-line/70 px-2.5 py-1.5 text-[11px] normal-case tracking-normal text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {RESTAURANT.hours}
          </span>
        </motion.span>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 md:grid-cols-[1.1fr_0.9fr]">
        {/* Headline */}
        <div className="relative z-10 order-2 md:order-1">
          <h1 className="font-display text-[15vw] font-extrabold uppercase leading-[0.82] tracking-[-0.03em] sm:text-[12vw] md:text-[8.2vw]">
            <Overflow delay={0.15}>Del QR</Overflow>
            <Overflow delay={0.28}>a tu</Overflow>
            <Overflow delay={0.41}>
              <span className="text-gradient">mesa.</span>
            </Overflow>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 max-w-sm text-base leading-relaxed text-muted"
          >
            Escanea el QR de tu mesa, arma tu pedido y va directo a cocina. Sin
            filas, sin comisiones. También a domicilio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/mesa/5"
                className="ember-glow inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 font-semibold text-ink transition-transform active:scale-95"
              >
                Probar menú de mesa
              </Link>
            </Magnetic>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-6 py-3.5 font-medium text-cream transition-colors hover:border-faint"
            >
              Ver la carta
            </a>
          </motion.div>

          {/* discreet owner thread */}
          <motion.a
            href="#directo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="label-mono group mt-5 inline-flex items-center gap-1.5 text-faint transition-colors hover:text-ember"
          >
            ¿Tienes un restaurante?
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </motion.a>
        </div>

        {/* Pedestal product display */}
        <motion.div
          style={{ y: prodY }}
          className="relative order-1 mx-auto flex aspect-square w-full max-w-md items-center justify-center md:order-2"
        >
          {/* rotating dashed ring */}
          <motion.svg
            viewBox="0 0 400 400"
            style={{ rotate: ringRot }}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 h-full w-full"
          >
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="#e5b567"
              strokeWidth="1"
              strokeDasharray="2 10"
              opacity="0.5"
            />
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="#e5b567"
              strokeWidth="1.5"
              strokeDasharray="1 26"
              opacity="0.45"
            />
          </motion.svg>

          {/* pedestal shadow */}
          <div className="absolute bottom-[12%] h-8 w-56 rounded-[100%] bg-black/60 blur-xl" />
          <div className="absolute bottom-[16%] h-4 w-72 rounded-[100%] border-t border-gold/30" />

          {/* floating product */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.3 },
              scale: { duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] },
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="relative h-[62%] w-[62%] overflow-hidden rounded-full border border-line shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80"
              alt="La Muestra Clásica"
              fill
              priority
              sizes="360px"
              className="object-cover"
            />
          </motion.div>

          {/* product annotation tag */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute right-0 top-[22%] flex items-center gap-2"
          >
            <span className="h-px w-8 bg-gold" />
            <div className="glass rounded-lg border border-line/70 px-2.5 py-1.5">
              <p className="label-mono text-cream/60">La Clásica</p>
              <p className="font-mono text-sm font-semibold tracking-tight text-gold">
                {cop(28900)}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* mono stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mx-auto mt-10 max-w-7xl px-5"
      >
        <div className="grid grid-cols-2 divide-line border-t border-line sm:grid-cols-4 sm:divide-x">
          <Stat
            top={
              <span className="inline-flex items-center gap-2">
                <CountUp to={RESTAURANT.rating} format={(n) => n.toFixed(1)} />
                <Stars value={RESTAURANT.rating} />
              </span>
            }
            label={
              <>
                <CountUp to={RESTAURANT.reviewCount} /> reseñas Google
              </>
            }
          />
          <Stat top="25 min" label="domicilio promedio" />
          <Stat top="QR" label="pide desde la mesa" />
          <Stat top={<span className="text-leaf">0%</span>} label="comisión de apps" />
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-faint lg:flex"
      >
        <span className="label-mono">Descubre</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Chevron className="h-4 w-4 rotate-90" />
        </motion.span>
      </motion.div>
    </section>
  );
}

function Overflow({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function Stat({
  top,
  label,
}: {
  top: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <div className="px-2 py-4 sm:px-5">
      <div className="font-display text-xl font-semibold">{top}</div>
      <p className="label-mono mt-1 text-faint">{label}</p>
    </div>
  );
}
