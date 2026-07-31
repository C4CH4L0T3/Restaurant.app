import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "./ui";
import { Check, Chevron, Bag, Fire } from "./icons";
import { Reveal } from "./motion";

const STEPS = [
  { n: "1", t: "Escanea el QR", d: "Cada mesa tiene su código. Sin apps ni descargas." },
  { n: "2", t: "Explora y personaliza", d: "Fotos, filtros, adiciones y notas para la cocina." },
  { n: "3", t: "Envía a cocina", d: "El pedido llega solo. Sin esperar al mesero." },
  { n: "4", t: "Pide la cuenta", d: "Divide, deja propina y paga cuando quieras." },
];

const PERKS = [
  "Cero cartas físicas: actualizas precios y fotos al instante",
  "Agotas un plato y desaparece de todas las mesas al toque",
  "Mesas rotan más rápido: menos espera, más ventas",
  "Adiciones y combos suben el ticket promedio solos",
];

export default function QrMenu() {
  return (
    <section id="mesa" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
          {/* Visual: phone + QR */}
          <Reveal className="relative order-2 lg:order-1" y={40}>
            <div className="relative mx-auto flex max-w-md items-end justify-center gap-4">
              {/* Phone mockup */}
              <div className="relative w-56 shrink-0 rounded-[2.2rem] border-4 border-surface-2 bg-ink-2 p-2 shadow-2xl">
                <div className="overflow-hidden rounded-[1.7rem]">
                  <div className="flex items-center justify-between bg-surface px-3 py-2">
                    <span className="text-[10px] font-semibold text-cream">Muestra</span>
                    <span className="rounded-full bg-ember/15 px-2 py-0.5 text-[9px] font-bold text-ember">
                      Mesa 5
                    </span>
                  </div>
                  <div className="relative h-28">
                    <Image
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=70"
                      alt="Plato"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1.5 p-2.5">
                    {["La Muestra Clásica", "Smash Doble", "Papas a la Trufa"].map((n, i) => (
                      <div
                        key={n}
                        className="flex items-center justify-between rounded-lg border border-line bg-surface/60 px-2 py-1.5"
                      >
                        <span className="truncate text-[10px] text-cream">{n}</span>
                        <span className="grid h-4 w-4 place-items-center rounded-full bg-ember text-[9px] text-ink">
                          +
                        </span>
                      </div>
                    ))}
                    <div className="mt-1 rounded-full bg-ember py-1.5 text-center text-[10px] font-bold text-ink">
                      Enviar a cocina
                    </div>
                  </div>
                </div>
              </div>

              {/* QR card */}
              <div className="grain-card mb-6 rounded-2xl border border-line p-4 text-center shadow-xl">
                <div className="rounded-xl bg-cream p-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=0&data=https://muestra.demo/mesa/5"
                    alt="Código QR de la Mesa 5"
                    width={110}
                    height={110}
                    className="mx-auto"
                  />
                </div>
                <p className="mt-2 text-xs font-semibold text-cream">Escanéame</p>
                <p className="text-[10px] text-faint">Mesa 5</p>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal className="order-1 lg:order-2" delay={0.1}>
            <Eyebrow>El corazón del producto</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl text-balance">
              Tu carta vive en la mesa, no en un papel.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Un menú digital con QR en cada mesa: tus clientes exploran, personalizan
              y <strong className="text-cream">envían su pedido directo a cocina</strong>{" "}
              desde el celular. Menos esperas, más rotación, más ventas.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="flex gap-3 rounded-2xl border border-line bg-surface/40 p-4"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ember text-sm font-bold text-ink">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-semibold">{s.t}</p>
                    <p className="mt-0.5 text-sm text-muted">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-2">
              {PERKS.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-muted">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf/15 text-leaf">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/mesa/5"
                className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface/60 px-7 py-3.5 font-semibold text-cream transition-colors hover:border-gold"
              >
                <Fire className="h-4 w-4 text-gold" />
                Abrir Mesa 5
                <Chevron className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-6 py-3.5 font-medium text-muted transition-colors hover:border-faint hover:text-cream"
              >
                <Bag className="h-4 w-4" />
                Ver la carta
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
