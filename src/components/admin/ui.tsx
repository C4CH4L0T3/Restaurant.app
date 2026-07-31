"use client";

export function Toggle({
  label,
  on,
  onChange,
  color = "ember",
  compact,
}: {
  label?: string;
  on: boolean;
  onChange: (v: boolean) => void;
  color?: "ember" | "leaf";
  compact?: boolean;
}) {
  const bg = on ? (color === "leaf" ? "bg-leaf" : "bg-ember") : "bg-surface-2";
  return (
    <button
      onClick={() => onChange(!on)}
      className={`flex cursor-pointer items-center gap-2 rounded-full border border-line ${
        compact ? "p-0.5" : "px-3 py-1.5"
      }`}
    >
      {label && !compact && (
        <span className={`text-xs font-semibold ${on ? "text-cream" : "text-faint"}`}>
          {label}
        </span>
      )}
      <span className={`relative h-5 w-9 rounded-full transition-colors ${bg}`}>
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-ink transition-transform ${
            on ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

export function Panel({
  title,
  right,
  children,
  className = "",
}: {
  title?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-line bg-surface/40 p-5 ${className}`}>
      {(title || right) && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="font-display text-lg font-semibold">{title}</h3>}
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

export const CHANNEL_TONE: Record<string, string> = {
  Web: "#e5b567",
  WhatsApp: "#86b06a",
  QR: "#ee6c2b",
};
