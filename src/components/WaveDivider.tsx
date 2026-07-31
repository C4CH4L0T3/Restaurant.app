"use client";

import { motion } from "framer-motion";

/**
 * Wavy solid-color contour lines that straddle the boundary between two
 * sections — they dip up into the section above and down into the one below.
 * Not a glow: crisp strokes in solid brand colors.
 */

type Variant = "warm" | "cool" | "gold";

const PALETTES: Record<Variant, string[]> = {
  warm: ["#ee6c2b", "#e5b567", "#7c2f2f"],
  cool: ["#e5b567", "#ee6c2b", "#86b06a"],
  gold: ["#e5b567", "#f28c2a", "#ee6c2b"],
};

// Three interweaving sine-like paths across a 1440×120 canvas (stretched).
const PATHS = [
  "M0,60 C 180,18 360,18 540,60 C 720,102 900,102 1080,60 C 1260,18 1380,18 1440,42",
  "M0,72 C 220,120 440,10 660,60 C 840,100 1020,20 1200,66 C 1320,96 1400,54 1440,66",
  "M0,50 C 200,90 420,96 620,52 C 820,10 1000,10 1200,52 C 1320,78 1400,40 1440,54",
];

export default function WaveDivider({
  variant = "warm",
  flip = false,
}: {
  variant?: Variant;
  flip?: boolean;
}) {
  const colors = PALETTES[variant];
  return (
    <div
      aria-hidden
      className="relative z-[5] -my-10 h-24 w-full overflow-hidden md:-my-12 md:h-28"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {PATHS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={colors[i]}
            strokeWidth={i === 0 ? 2.4 : 1.6}
            strokeLinecap="round"
            opacity={i === 0 ? 0.95 : 0.55}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: i === 0 ? 0.95 : 0.55 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 1.5,
              ease: [0.23, 1, 0.32, 1],
              delay: i * 0.18,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
