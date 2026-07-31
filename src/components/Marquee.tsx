const ITEMS = [
  "Nequi",
  "Daviplata",
  "Bancolombia QR",
  "PSE",
  "Tarjeta",
  "Efectivo",
  "Domicilio en 25 min",
  "Recoge en tienda",
  "Sin comisiones",
  "Pedido por WhatsApp",
  "Puntos en cada pedido",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line/70 bg-ink-2 py-4">
      <div className="marquee flex w-max items-center gap-3 whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted">{item}</span>
            <span className="text-ember">◆</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-2 to-transparent" />
    </div>
  );
}
