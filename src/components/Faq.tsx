"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data";
import { Eyebrow } from "./ui";
import { Plus } from "./icons";
import { Reveal } from "./motion";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="text-center">
          <Eyebrow>Antes de pedir</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Preguntas frecuentes
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-line rounded-3xl border border-line bg-surface/40">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="font-medium">{f.q}</span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line transition-transform ${
                      isOpen ? "rotate-45 bg-ember text-ink" : "text-muted"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className="grid overflow-hidden px-5 transition-all duration-300"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    paddingBottom: isOpen ? "1.25rem" : 0,
                  }}
                >
                  <p className="min-h-0 text-sm leading-relaxed text-muted">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
