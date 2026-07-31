import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const Bag = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const Search = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3-3" />
  </svg>
);
export const Star = (p: P) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
  </svg>
);
export const Plus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Minus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);
export const X = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Clock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const Whatsapp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.34 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm5.84 14.24c-.25.7-1.44 1.33-1.98 1.38-.53.05-1.02.24-3.44-.72-2.9-1.14-4.75-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38.002.55.01.18.008.42-.07.65.5.25.6.85 2.07.92 2.22.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.14-.3.3-.13.59.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.26.09 1.67.79 1.96.93.29.15.48.22.55.34.07.12.07.72-.18 1.42Z" />
  </svg>
);
export const Chevron = (p: P) => (
  <svg {...base} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);
export const Pin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
export const Fire = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2s5 4 5 9a5 5 0 0 1-10 0c0-1.6.7-2.8.7-2.8S8 10 9 11c0-2.5 1.5-4.5 3-9Z" />
  </svg>
);
export const Leaf = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 20c0-8 6-14 16-14 0 10-6 14-14 14" />
    <path d="M4 20c4-4 6-6 10-8" />
  </svg>
);
export const Wheat = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 22V9" />
    <path d="M12 9c0-3-2-5-5-5 0 3 2 5 5 5Zm0 0c0-3 2-5 5-5 0 3-2 5-5 5Zm0 4c0-3-2-5-5-5 0 3 2 5 5 5Zm0 0c0-3 2-5 5-5 0 3-2 5-5 5Z" />
  </svg>
);
export const TrendUp = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 17 9 11l4 4 8-8" />
    <path d="M21 7v5h-5" />
  </svg>
);
export const Gift = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 11h16v9H4z" />
    <path d="M2 7h20v4H2zM12 7v13M12 7S9 3 7 5s3 2 5 2Zm0 0s3-4 5-2-3 2-5 2Z" />
  </svg>
);

/* --- Culinary category icons (line) --- */
export const Sparkle = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" />
  </svg>
);
export const Burger = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 10.5a8 8 0 0 1 16 0" />
    <path d="M3.5 14.5h17" />
    <path d="M5 18h14a1 1 0 0 0 1-1v-.5H4v.5a1 1 0 0 0 1 1Z" />
    <path d="M7.5 10.2h.01M11 9.6h.01M14.5 10.2h.01" />
  </svg>
);
export const Egg = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3c3 0 6 5 6 9a6 6 0 0 1-12 0c0-4 3-9 6-9Z" />
    <circle cx="12" cy="12.5" r="2.4" />
  </svg>
);
export const Drumstick = (p: P) => (
  <svg {...base} {...p}>
    <path d="M15.5 4.5a4.5 4.5 0 0 0-6.6 6.1l-.9.9a2.6 2.6 0 1 0 2.5 2.5l.9-.9a4.5 4.5 0 0 0 6.1-6.6l1.5-1.5-1.5-1.5-1.5 1.5Z" />
  </svg>
);
export const Fries = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 10.5 5 7m4 3.5V6.5m2 4V7m3 3.5.8-3.4" />
    <path d="M4.5 10.5h15l-1.2 8a1.5 1.5 0 0 1-1.5 1.3H7.2a1.5 1.5 0 0 1-1.5-1.3l-1.2-8Z" />
    <path d="M8 14h8" />
  </svg>
);
export const Cake = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 20h16v-6H4z" />
    <path d="M4 15c1.3 1.2 2.7 1.2 4 0s2.7-1.2 4 0 2.7 1.2 4 0" />
    <path d="M12 6v3M8.5 6.5v2.5M15.5 6.5v2.5" />
  </svg>
);
export const Cup = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" />
    <path d="M16 9h2.5a2 2 0 0 1 0 4H16" />
    <path d="M8 3.5s-.6.8 0 1.6M11 3s-.7 1 0 1.9" />
  </svg>
);
