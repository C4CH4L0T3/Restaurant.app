import { PRODUCTS } from "@/lib/data";
import { Eyebrow } from "./ui";
import { Reveal, Stagger, StaggerItem } from "./motion";
import TiltCard from "./TiltCard";
import ProductCard from "./ProductCard";

export default function Featured() {
  const featured = [...PRODUCTS]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Lo que todos piden</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Los favoritos de la casa
            </h2>
          </div>
          <a
            href="#menu"
            className="underline-grow text-sm font-medium text-ember transition-colors hover:text-ember-2"
          >
            Ver menú completo →
          </a>
        </div>
      </Reveal>

      <Stagger className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
        {featured.map((p) => (
          <StaggerItem
            key={p.id}
            className="w-[78vw] shrink-0 snap-start sm:w-[42vw] md:w-auto"
          >
            <TiltCard className="h-full">
              <ProductCard product={p} />
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
