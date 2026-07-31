const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

export default function Texture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* solid base */}
      <div className="absolute inset-0 bg-ink" />
      {/* film grain only — no colored glows */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: GRAIN, opacity: 0.05, mixBlendMode: "overlay" }}
      />
    </div>
  );
}
