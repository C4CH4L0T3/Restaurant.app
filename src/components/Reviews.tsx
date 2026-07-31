import Image from "next/image";
import { REVIEWS, RESTAURANT } from "@/lib/data";
import type { Review } from "@/lib/types";
import { Eyebrow, Stars } from "./ui";
import { Reveal } from "./motion";

export default function Reviews() {
  const half = Math.ceil(REVIEWS.length / 2);
  const rowA = REVIEWS.slice(0, half);
  const rowB = REVIEWS.slice(half);

  return (
    <section id="resenas" className="scroll-mt-20 overflow-hidden bg-ink-2/60 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>La voz de la clientela</Eyebrow>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Amados en el sur de Medellín
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface/50 px-5 py-3">
              <span className="font-mono text-3xl font-semibold tracking-tight">
                {RESTAURANT.rating}
              </span>
              <div>
                <Stars value={RESTAURANT.rating} />
                <p className="text-xs text-muted">
                  {RESTAURANT.reviewCount.toLocaleString("es-CO")} reseñas en Google
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Two-row infinite marquee (edge-faded) */}
      <div className="relative mt-10">
        <MarqueeRow reviews={rowA} reverse={false} />
        <div className="mt-4">
          <MarqueeRow reviews={rowB} reverse />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-2 to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-2 to-transparent md:w-32" />
      </div>
    </section>
  );
}

function MarqueeRow({ reviews, reverse }: { reviews: Review[]; reverse: boolean }) {
  const doubled = [...reviews, ...reviews];
  return (
    <div className="marquee-row flex overflow-hidden">
      <div
        className={`flex w-max gap-4 ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} r={r} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col rounded-3xl border border-line bg-surface/40 p-5 transition-colors duration-300 hover:border-faint/60 sm:w-[360px]">
      <div className="flex items-center justify-between">
        <Stars value={r.rating} />
        <span className="label-mono text-faint">{r.source}</span>
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-cream">
        “{r.text}”
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-4">
        <Image
          src={r.avatar}
          alt={r.name}
          width={36}
          height={36}
          className="rounded-full"
          unoptimized
        />
        <div>
          <p className="text-sm font-semibold">{r.name}</p>
          <p className="text-xs text-faint">{r.date}</p>
        </div>
      </figcaption>
    </figure>
  );
}
