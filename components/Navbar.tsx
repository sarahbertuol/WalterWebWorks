"use client";

import Image from "next/image";

type Props = {
  onOpenOrcamento: () => void;
};

export default function Navbar({ onOpenOrcamento }: Props) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-3 bg-green px-5 py-3.5 md:px-8">
      <div className="flex items-center gap-2.5">
        <Image
          src="/logo/walter-icon-light.svg"
          alt="Walter Web Works"
          width={28}
          height={25}
          priority
          unoptimized
        />
        <Image
          src="/logo/walter-wordmark-light.svg"
          alt="<walter.web.works/>"
          width={168}
          height={32}
          priority
          unoptimized
          className="hidden sm:block"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenOrcamento}
          className="rounded-full bg-pink px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-wide text-ink transition hover:brightness-95 md:px-4 md:text-[11px]"
        >
          Orçamento rápido
        </button>
        <a
          href="https://wa.me/5551999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full border border-cream/30 px-4 py-2 text-[11px] font-medium text-cream transition hover:border-cream/60 sm:block"
        >
          Falar no WhatsApp
        </a>
      </div>
    </header>
  );
}
