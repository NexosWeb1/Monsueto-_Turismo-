import { Plane, Palmtree, Globe2, Ship, Bus, Heart } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { RevealGroup, RevealItem } from "./reveal";

const servicos = [
  { icon: Plane, titulo: "Passagens aéreas", texto: "As melhores tarifas e conexões para qualquer destino." },
  { icon: Palmtree, titulo: "Pacotes nacionais", texto: "Praias, termas e serra com hospedagem e transporte." },
  { icon: Globe2, titulo: "Viagens internacionais", texto: "Roteiros completos para você curtir o mundo sem preocupação." },
  { icon: Ship, titulo: "Cruzeiros", texto: "Embarque em cruzeiros com tudo incluso e muito conforto." },
  { icon: Bus, titulo: "Excursões e grupos", texto: "Saídas em grupo, bate-volta e viagens para a família toda." },
  { icon: Heart, titulo: "Lua de mel", texto: "Roteiros românticos planejados para um momento inesquecível." },
];

export function Diferenciais() {
  return (
    <section className="brand-gradient relative overflow-hidden py-20 sm:py-28">
      {/* textura sutil de rota */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="O que oferecemos"
          title="Tudo para a sua viagem em um só lugar"
          description="Da passagem ao último passeio, cuidamos de cada etapa para você só se preocupar em aproveitar."
          tone="light"
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((s) => (
            <RevealItem key={s.titulo} className="h-full">
              <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red text-white transition-transform group-hover:scale-110">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{s.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.texto}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
