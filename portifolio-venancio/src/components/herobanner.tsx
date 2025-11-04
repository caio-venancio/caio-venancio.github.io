'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button"; // opcional: remova se não usar shadcn
import { useState } from "react";

type Align = "left" | "center" | "right";

interface HeroBannerProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string|string[];
  initialIndex?: number;
  cta?: { label: string; href: string; target?: "_blank" | "_self" };
  bgImage?: string;                // url da imagem de fundo
  overlayFrom?: string;            // ex: "from-black/60"
  overlayTo?: string;              // ex: "to-transparent"
  align?: Align;                   // "left" | "center" | "right"
  className?: string;
}

export default function HeroBlock({
  eyebrow,
  title,
  subtitle,
  initialIndex,
  cta,
  bgImage,
  overlayFrom = "from-black/50",
  overlayTo = "to-transparent",
  align = "left",
  className = ""
}: HeroBannerProps) {
  const alignMap: Record<Align, string> = {
    left:   "items-start text-left",
    center: "items-center text-center",
    right:  "items-end text-right",
  };

  let phrase = "";
  const [randomNumber, setRandomNumber] = useState<number>(initialIndex ?? 0)
  if (Array.isArray(subtitle)){
    phrase = subtitle[randomNumber]
  } else if (typeof subtitle == "string") {
    phrase = subtitle
  }


  return (
    <section
      className={`relative w-full overflow-hidden rounded-xl ${className}`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      {/* fundo */}
      <div className="absolute inset-0 bg-cover bg-center"
           style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}} />

      {/* overlay para contraste do texto */}
      {/* <div className={`absolute inset-0 bg-gradient-to-r ${overlayFrom} ${overlayTo}`} /> */}

      {/* conteúdo */}
      <div className={`relative mx-auto max-w-6xl px-6 py-16 sm:py-24 flex flex-col gap-4 ${alignMap[align]}`}>
        {eyebrow && <span className="text-xs font-semibold tracking-widest text-white/80">{eyebrow}</span>}
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow">
          {title}
        </h1>
        {subtitle && <p className="text-lg sm:text-xl text-white/90 max-w-2xl">{phrase}</p>}

        {cta && (
          <div className="mt-6">
            {/* se não usar shadcn, troque por <a className="inline-block rounded bg-black px-5 py-2 text-white">... */}
            <Button asChild size="lg" className="bg-black text-white hover:bg-black/90">
              <Link href={cta.href} target={cta.target ?? "_self"}>
                {cta.label}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
