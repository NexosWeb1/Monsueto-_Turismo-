import Image from "next/image";
import { ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
import { Reveal } from "./reveal";
import { empresa, whatsappLink } from "@/lib/config";

const pilares = [
  {
    icon: ShieldCheck,
    titulo: "Confiança de verdade",
    texto: "Agência registrada, com endereço físico e equipe que acompanha você do orçamento ao embarque.",
  },
  {
    icon: HeartHandshake,
    titulo: "Atendimento humano",
    texto: "Nada de robô. Você fala com gente que entende de viagem e cuida de cada detalhe.",
  },
  {
    icon: Sparkles,
    titulo: "Roteiro do seu jeito",
    texto: "Montamos pacotes sob medida para o seu orçamento, sua data e o seu estilo de viagem.",
  },
];

export function Sobre() {
  const anos = new Date().getFullYear() - empresa.desde;

  return (
    <section
      id="sobre"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* Fundo: foto do ônibus da Monsueto */}
      <Image
        src="/brand/busao.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/72 via-white/86 to-white/95" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Mascote / imagem */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md animate-float">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-brand-sky/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl">
              <div className="sky-gradient relative aspect-[4/5]">
                <Image
                  src="/brand/mascote.png"
                  alt="Atendente da Monsueto Turismo pronta para planejar sua viagem"
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            </div>
            {/* selo flutuante */}
            <div className="absolute -bottom-5 -right-2 rounded-2xl bg-white px-5 py-4 shadow-lg ring-1 ring-brand-sky/20 sm:-right-6">
              <p className="font-heading text-3xl text-brand-red">+{anos}</p>
              <p className="text-xs font-medium text-muted-foreground">anos cuidando<br />das suas viagens</p>
            </div>
          </div>
        </Reveal>

        {/* Texto */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <div className="w-fit">
              <span className="block text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                Sobre a Monsueto
              </span>
              <h2 className="font-heading mt-3 text-3xl leading-tight text-brand-navy sm:text-4xl">
                Realizamos o sonho de viajar com cuidado em cada detalhe
              </h2>
            </div>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Desde {empresa.desde}, a Monsueto Turismo ajuda famílias e grupos de{" "}
              {empresa.cidade} e região a viajar com tranquilidade. Cuidamos de passagens,
              hospedagem, passeios e de tudo o que sua viagem precisa, com um atendimento
              próximo e de confiança.
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {pilares.map((p, i) => (
              <Reveal key={p.titulo} delay={i * 0.08}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-navy">{p.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <a
              href={whatsappLink("Olá! Quero planejar uma viagem com a Monsueto.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-brand-red px-7 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-brand-red-dark hover:shadow-md"
            >
              Planejar minha viagem
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
