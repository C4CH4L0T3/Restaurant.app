"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";

const WORDS = ["BRASA", "SABOR", "MESA", "DIRECTO", "MUESTRA"];

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const mv = useMotionValue(0);

  // Only play once per session
  useEffect(() => {
    if (typeof window === "undefined") return;
    // a11y: skip the long intro for users who prefer reduced motion
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem("muestra:loaded")) {
      sessionStorage.setItem("muestra:loaded", "1");
      setShow(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const controls = animate(mv, 100, {
      duration: 2.1,
      ease: [0.7, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setDone(true);
        sessionStorage.setItem("muestra:loaded", "1");
        setTimeout(() => setShow(false), 620);
      },
    });
    return () => {
      controls.stop();
      document.body.style.overflow = "";
    };
  }, [mv]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  function skip() {
    try {
      sessionStorage.setItem("muestra:loaded", "1");
    } catch {}
    document.body.style.overflow = "";
    setShow(false);
  }

  const wordIdx = Math.min(WORDS.length - 1, Math.floor((count / 100) * WORDS.length));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-7"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* top row */}
          <div className="flex items-center justify-between">
            <span className="label-mono text-cream/70">MUESTRA</span>
            <button
              onClick={skip}
              className="label-mono flex items-center gap-1.5 text-cream/40 transition-colors hover:text-cream"
            >
              Saltar <span className="text-ember">✦</span>
            </button>
          </div>

          {/* center: word sequence */}
          <div className="flex flex-1 items-center justify-center">
            <div className="relative h-[14vw] w-full max-w-4xl overflow-hidden text-center sm:h-[11rem]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={wordIdx}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-110%" }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 flex items-center justify-center font-display text-[13vw] font-extrabold leading-none tracking-tight text-cream sm:text-8xl"
                >
                  {WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* bottom: counter + progress */}
          <div>
            <div className="mb-3 h-px w-full bg-line">
              <motion.div
                className="h-px bg-ember"
                style={{ width: `${count}%` }}
              />
            </div>
            <div className="flex items-end justify-between">
              <span className="label-mono text-cream/50">
                {done ? "BIENVENIDO" : "CARGANDO CARTA"}
              </span>
              <span className="font-mono text-5xl font-semibold tabular-nums tracking-tight text-cream sm:text-6xl">
                {String(count).padStart(3, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
