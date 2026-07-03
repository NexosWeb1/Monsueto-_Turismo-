import { SectionHeading } from "./section-heading";
import { PacotesGrid } from "./pacotes-grid";
import { getPacotesAtivos } from "@/lib/data";
import { whatsappLink } from "@/lib/config";

export async function Pacotes() {
  const pacotes = await getPacotesAtivos();

  return (
    <section
      id="pacotes"
      className="relative overflow-hidden bg-gradient-to-b from-brand-sand via-white to-brand-sand py-20 sm:py-28"
    >
      {/* Brilhos decorativos nas cores da marca */}
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-sky/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-brand-red/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--brand-navy) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Destinos & Promoções"
          title="Pacotes prontos para você embarcar"
          description="Selecionamos destinos que são a cara das suas próximas férias. Não achou o que procura? A gente monta o roteiro do seu jeito."
        />

        {pacotes.length > 0 ? (
          <PacotesGrid pacotes={pacotes} />
        ) : (
          <p className="mt-14 text-center text-muted-foreground">
            Em breve novos pacotes. Fale conosco no WhatsApp para um roteiro personalizado.
          </p>
        )}

        <div className="mt-12 text-center">
          <a
            href={whatsappLink("Olá! Quero um pacote de viagem personalizado.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-brand-navy px-7 py-3.5 font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
          >
            Quero um roteiro personalizado
          </a>
        </div>
      </div>
    </section>
  );
}
