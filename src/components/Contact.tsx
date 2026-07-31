import { RESTAURANT } from "@/lib/data";
import { Eyebrow } from "./ui";
import { Pin, Clock, Whatsapp } from "./icons";
import { Reveal } from "./motion";

export default function Contact() {
  return (
    <section id="contacto" className="scroll-mt-20 bg-ink-2/60 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="grid gap-8 md:grid-cols-2">
          <div>
            <Eyebrow>Visítanos o pide a domicilio</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Estamos en {RESTAURANT.neighborhood.split("·")[0].trim()}
            </h2>

            <div className="mt-8 space-y-5">
              <Item icon={<Pin className="h-5 w-5" />} title="Dirección">
                {RESTAURANT.address}
              </Item>
              <Item icon={<Clock className="h-5 w-5" />} title="Horario">
                {RESTAURANT.hours}
              </Item>
              <Item icon={<Whatsapp className="h-5 w-5 text-leaf" />} title="WhatsApp">
                {RESTAURANT.phone}
              </Item>
            </div>

            <a
              href={`https://wa.me/${RESTAURANT.whatsapp}`}
              target="_blank"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3.5 font-semibold text-ink"
            >
              <Whatsapp className="h-5 w-5" />
              Escríbenos ahora
            </a>
          </div>

          <div className="relative min-h-64 overflow-hidden rounded-[2rem] border border-line bg-surface">
            <iframe
              title="Ubicación Muestra"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-75.630%2C6.145%2C-75.605%2C6.165&layer=mapnik&marker=6.153%2C-75.617"
              className="h-full w-full min-h-64 opacity-90 grayscale contrast-125"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-line" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Item({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-ember">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-faint">{title}</p>
        <p className="mt-0.5 text-cream">{children}</p>
      </div>
    </div>
  );
}
