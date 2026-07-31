"use client";

import { cop } from "@/lib/format";
import { useCart } from "./CartProvider";
import { Bag } from "./icons";

export default function MobileOrderBar() {
  const { count, total, setOpen, open } = useCart();
  if (count === 0 || open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 p-4 md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="ember-glow flex w-full items-center justify-between rounded-full bg-ember px-5 py-3.5 font-semibold text-ink shadow-2xl"
      >
        <span className="flex items-center gap-2">
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-ink/20 px-1.5 text-sm">
            {count}
          </span>
          Ver mi pedido
        </span>
        <span className="flex items-center gap-2">
          {cop(total)}
          <Bag className="h-4 w-4" />
        </span>
      </button>
    </div>
  );
}
