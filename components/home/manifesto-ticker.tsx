"use client";

import { MANIFESTO_ITEMS } from "@/lib/constants";

export function ManifestoTicker() {
  const items = [...MANIFESTO_ITEMS, ...MANIFESTO_ITEMS];

  return (
    <div className="overflow-hidden bg-rose py-4" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-10">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 whitespace-nowrap font-display text-sm font-bold italic text-white sm:text-base"
          >
            {item}
            <span className="text-gold-light" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
