import { SectionHeading } from "./section-heading";

const parceiros = [
  "Yak Beach",
  "Hotel Areia de Ouro",
  "Mirai Beach",
  "Ondas Praia (WAM)",
  "Sued's Premium",
  "Sunbahia Praia Hotel",
  "Baía Cabrália",
  "Rede diRoma",
  "Rede WAM",
  "Hotel Flix",
  "San Marino Suite Hotel",
  "Bertoluci",
  "Wyndham Gramado Resort",
  "Hotel Laghetto",
  "Hotel Méditerranée",
];

// Divide os nomes em duas faixas para rolarem em sentidos opostos
const metade = Math.ceil(parceiros.length / 2);
const faixaCima = parceiros.slice(0, metade);
const faixaBaixo = parceiros.slice(metade);

function Faixa({
  nomes,
  sentido,
}: {
  nomes: string[];
  sentido: "esquerda" | "direita";
}) {
  // Lista duplicada para o loop ser contínuo (sem emenda visível)
  const itens = [...nomes, ...nomes];
  const animacao =
    sentido === "esquerda" ? "animate-marquee" : "animate-marquee-reverse";

  return (
    <div className="relative overflow-hidden bg-brand-navy py-2.5">
      {/* fades nas bordas para suavizar a entrada/saída */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-navy to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-navy to-transparent sm:w-24" />
      <div
        className={`flex w-max items-center ${animacao} [will-change:transform] [transform:translateZ(0)]`}
      >
        {itens.map((nome, i) => (
          <span
            key={`${nome}-${i}`}
            className="flex shrink-0 items-center text-sm font-medium tracking-wide text-white/90 sm:text-base"
          >
            {nome}
            <span
              className="mx-8 text-brand-sky/60 sm:mx-12"
              aria-hidden
            >
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Parcerias() {
  return (
    <section id="parcerias" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Parcerias"
          title="Viajamos com quem é referência"
          description="Trabalhamos com hotéis, resorts e operadoras de confiança para garantir o melhor da sua viagem."
        />
      </div>

      <div className="mt-12 flex flex-col gap-3">
        <Faixa nomes={faixaCima} sentido="direita" />
        <Faixa nomes={faixaBaixo} sentido="esquerda" />
      </div>
    </section>
  );
}
