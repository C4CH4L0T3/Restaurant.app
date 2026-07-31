import { Eyebrow } from "./ui";
import { Gift, Star, Fire } from "./icons";
import { Reveal } from "./motion";

const TIERS = [
  { pts: "100 pts", reward: "Papas a la trufa gratis", icon: <Fire className="h-5 w-5" /> },
  { pts: "250 pts", reward: "Postre de la casa gratis", icon: <Gift className="h-5 w-5" /> },
  { pts: "500 pts", reward: "Hamburguesa clásica gratis", icon: <Star className="h-5 w-5" /> },
];

export default function Loyalty() {
  return (
    <section id="puntos" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="grid gap-8 rounded-[2.5rem] border border-line grain-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <Eyebrow>Muestra Club</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl text-balance">
              Cada pedido te acerca a algo gratis.
            </h2>
            <p className="mt-4 text-muted">
              Ganas <strong className="text-cream">1 punto por cada $1.000</strong> en
              pedidos directos. Sin tarjetas, sin apps: solo tu número de celular.
              Acumula, redime y recibe sorpresas de cumpleaños. 🎂
            </p>

            <div className="mt-6 rounded-2xl border border-line bg-ink/40 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Tu progreso</span>
                <span className="font-semibold text-ember">180 / 250 pts</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-ember to-gold"
                  style={{ width: "72%" }}
                />
              </div>
              <p className="mt-2 text-xs text-faint">
                Te faltan 70 puntos para tu postre gratis 🍰
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3">
            {TIERS.map((t) => (
              <div
                key={t.pts}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface/40 p-4"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ember/15 text-ember">
                  {t.icon}
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">{t.reward}</p>
                  <p className="text-sm text-muted">Redime con {t.pts}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
