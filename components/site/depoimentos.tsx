"use client";

import { Star } from "lucide-react";
import { depoimentos } from "@/lib/seed";
import { SectionHeading } from "./section-heading";

function GoogleWord({ className = "" }: { className?: string }) {
  const letras: [string, string][] = [
    ["G", "#4285F4"],
    ["o", "#EA4335"],
    ["o", "#FBBC05"],
    ["g", "#4285F4"],
    ["l", "#34A853"],
    ["e", "#EA4335"],
  ];
  return (
    <span
      aria-label="Google"
      className={`font-sans font-semibold tracking-tight ${className}`}
    >
      {letras.map(([ch, cor], i) => (
        <span key={i} style={{ color: cor }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

function Estrelas({ nota }: { nota: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${nota} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < nota ? "h-4 w-4 fill-amber-400 text-amber-400" : "h-4 w-4 text-muted"
          }
        />
      ))}
    </div>
  );
}

function Card({ d }: { d: (typeof depoimentos)[number] }) {
  return (
    <figure className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:w-[380px]">
      <Estrelas nota={d.nota} />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brand-navy/90">
        “{d.texto}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy font-heading text-white">
          {d.nome.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-brand-navy">{d.nome}</span>
          <span className="block text-xs text-muted-foreground">{d.origem}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Depoimentos() {
  const track = [...depoimentos, ...depoimentos];

  return (
    <section id="depoimentos" className="overflow-hidden bg-brand-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quem viaja, recomenda"
          title="A confiança de quem já viajou com a gente"
          description="Avaliações reais de clientes que realizaram suas viagens com a Monsueto Turismo."
        />
        <div className="mx-auto mt-6 flex w-fit items-center gap-3 rounded-full border border-border bg-white px-5 py-2.5 shadow-sm">
          <span className="font-heading text-2xl text-brand-navy">4,9</span>
          <Estrelas nota={5} />
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            no <GoogleWord className="text-base" />
          </span>
        </div>
      </div>

      <div className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max gap-5 animate-marquee">
          {track.map((d, i) => (
            <Card key={`${d.nome}-${i}`} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
