import { RESTAURANT } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ember text-lg font-black text-ink">
                M
              </span>
              <span className="font-display text-xl font-semibold">
                {RESTAURANT.name}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">
              {RESTAURANT.tagline}. Pedidos directos, sin comisiones, en{" "}
              {RESTAURANT.neighborhood}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <FooterCol
              title="Menú"
              links={["Hamburguesas", "Brunch", "Alitas", "Postres"]}
            />
            <FooterCol
              title="Negocio"
              links={["Panel del negocio", "Programa de puntos", "Reservas", "Eventos"]}
            />
            <FooterCol
              title="Contacto"
              links={[`@${RESTAURANT.ig}`, "WhatsApp", "Google Maps", "Trabaja con nosotros"]}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} {RESTAURANT.name}. Demo de plataforma.</p>
          <p>
            Hecho con <span className="text-ember">♦</span> para restaurantes de Medellín
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="font-semibold text-cream">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-muted transition-colors hover:text-cream">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
