import type { DietTag } from "@/lib/types";
import {
  Fire,
  Leaf,
  Wheat,
  Star,
  Sparkle,
  Burger,
  Egg,
  Drumstick,
  Fries,
  Cake,
  Cup,
} from "./icons";

export function CategoryIcon({
  id,
  className = "h-4 w-4",
}: {
  id: string;
  className?: string;
}) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    top: Sparkle,
    burgers: Burger,
    brunch: Egg,
    alitas: Drumstick,
    sides: Fries,
    postres: Cake,
    bebidas: Cup,
  };
  const Cmp = map[id] ?? Sparkle;
  return <Cmp className={className} />;
}

export const TAG_META: Record<
  DietTag,
  { label: string; className: string; icon?: React.ReactNode }
> = {
  top: {
    label: "Más vendido",
    className: "bg-ember/15 text-ember border-ember/30",
    icon: <Star className="h-3 w-3" />,
  },
  nuevo: {
    label: "Nuevo",
    className: "bg-gold/15 text-gold border-gold/30",
  },
  picante: {
    label: "Picante",
    className: "bg-wine/25 text-wine-2 border-wine/40",
    icon: <Fire className="h-3 w-3" />,
  },
  veg: {
    label: "Veggie",
    className: "bg-leaf/15 text-leaf border-leaf/30",
    icon: <Leaf className="h-3 w-3" />,
  },
  singluten: {
    label: "Sin gluten",
    className: "bg-cream/10 text-muted border-line",
    icon: <Wheat className="h-3 w-3" />,
  },
};

export function TagChip({ tag }: { tag: DietTag }) {
  const m = TAG_META[tag];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${m.className}`}
    >
      {m.icon}
      {m.label}
    </span>
  );
}

export function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < Math.round(value) ? "" : "opacity-25"}`}
        />
      ))}
    </span>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="label-mono inline-flex items-center gap-2 text-ember">
      <span className="grid h-3 w-3 place-items-center border border-ember/50 text-[8px] leading-none">
        ✦
      </span>
      {children}
    </span>
  );
}
