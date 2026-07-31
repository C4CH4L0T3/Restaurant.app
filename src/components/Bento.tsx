"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eyebrow } from "./ui";
import { Reveal } from "./motion";
import { Whatsapp, Gift, Chevron, Check } from "./icons";

function useSpot() {
  return (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
}

const cardBase =
  "spotlight group relative overflow-hidden rounded-3xl border border-line bg-surface/40 p-5 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-faint/60";

export default function Bento() {
  const spot = useSpot();
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Todo en una plataforma</Eyebrow>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                La experiencia Muestra
              </h2>
            </div>
            <p className="max-w-xs text-sm text-muted">
              Una sola herramienta para pedir en mesa, a domicilio, fidelizar y
              vender más — sin intermediarios.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid auto-rows-[168px] grid-cols-2 gap-4 lg:grid-cols-4">
          {/* QR — big tile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            onMouseMove={spot}
            className={`${cardBase} col-span-2 row-span-2 flex flex-col justify-end p-0`}
          >
            <Image
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=70"
              alt="Menú QR en la mesa"
              fill
              sizes="(max-width:1024px) 100vw, 640px"
              className="object-cover opacity-70 transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
            <div className="relative z-10 p-6">
              <span className="label-mono text-ember">Función estrella</span>
              <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
                Menú QR en cada mesa
              </h3>
              <p className="mt-1.5 max-w-sm text-sm text-muted">
                Escanea, personaliza y envía directo a cocina. Sin filas, sin
                esperar al mesero.
              </p>
              <Link
                href="/mesa/5"
                className="group/cta mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cream"
              >
                Abrir Mesa 5
                <Chevron className="h-4 w-4 text-ember transition-transform group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* 0% comisión */}
          <Tile onMove={spot} className="col-span-1 flex flex-col justify-between">
            <span className="label-mono text-faint">Ingresos</span>
            <div>
              <div className="font-mono text-4xl font-semibold tracking-tight text-leaf">
                0%
              </div>
              <p className="mt-1 text-sm text-muted">comisión de apps</p>
            </div>
          </Tile>

          {/* WhatsApp */}
          <Tile onMove={spot} className="col-span-1 flex flex-col justify-between">
            <Whatsapp className="h-6 w-6 text-leaf" />
            <div>
              <p className="font-display text-lg font-semibold">Pedido por WhatsApp</p>
              <p className="text-sm text-muted">checkout en un toque</p>
            </div>
          </Tile>

          {/* Puntos — wide */}
          <Tile onMove={spot} className="col-span-2 flex items-center gap-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ember/15 text-ember">
              <Gift className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold">Muestra Club</p>
              <p className="text-sm text-muted">Puntos en cada pedido directo</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-ember to-gold"
                  style={{ width: "72%" }}
                />
              </div>
            </div>
          </Tile>

          {/* Seguimiento en vivo — wide */}
          <Tile onMove={spot} className="col-span-2 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <span className="live-dot h-2 w-2 rounded-full bg-leaf" />
              <span className="label-mono text-faint">Seguimiento en vivo</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                {["Recibido", "Cocina", "En camino", "Entregado"].map((s, i) => (
                  <div key={s} className="flex flex-1 items-center gap-1.5">
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[9px] ${
                        i < 2 ? "bg-leaf text-ink" : "border border-line text-faint"
                      }`}
                    >
                      {i < 2 ? <Check className="h-3 w-3" /> : i + 1}
                    </span>
                    {i < 3 && (
                      <span className={`h-px flex-1 ${i < 1 ? "bg-leaf" : "bg-line"}`} />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-muted">
                Tu cliente sabe dónde va su pedido, minuto a minuto.
              </p>
            </div>
          </Tile>

          {/* Ticket promedio — wide */}
          <Tile onMove={spot} className="col-span-2 flex items-center justify-between gap-4">
            <div>
              <span className="label-mono text-faint">Ticket promedio</span>
              <p className="mt-1 font-display text-lg font-semibold">
                Sube solo con combos y adiciones
              </p>
              <p className="text-sm text-muted">Sugerencias y cross-sell automáticos</p>
            </div>
            <div className="flex items-end gap-1.5">
              <span className="flex items-center gap-1 font-mono text-2xl font-semibold text-gold">
                +18%
              </span>
            </div>
          </Tile>

          {/* Base de datos propia — wide */}
          <Tile onMove={spot} className="col-span-2 flex items-center gap-5">
            <div className="min-w-0 flex-1">
              <span className="label-mono text-faint">CRM</span>
              <p className="mt-1 font-display text-lg font-semibold">
                Tu base de datos, tuya
              </p>
              <p className="text-sm text-muted">
                Teléfonos, historial y cumpleaños para volver a venderles.
              </p>
            </div>
            <div className="flex -space-x-2">
              {[47, 12, 32].map((n) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={n}
                  src={`https://i.pravatar.cc/64?img=${n}`}
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-ink"
                />
              ))}
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-surface-2 font-mono text-[10px] text-muted">
                +1k
              </span>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}

function Tile({
  children,
  className = "",
  onMove,
}: {
  children: React.ReactNode;
  className?: string;
  onMove: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={onMove}
      className={`${cardBase} ${className}`}
    >
      {children}
    </motion.div>
  );
}
