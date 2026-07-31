export function cop(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

// Compact for dashboards: $1,2M / $980k
export function copCompact(value: number): string {
  if (value >= 1_000_000)
    return `$${(value / 1_000_000).toFixed(1).replace(".", ",")}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${value}`;
}
