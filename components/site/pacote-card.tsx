import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Pacote } from "@/lib/types";
import { whatsappLink } from "@/lib/config";

export function PacoteCard({ pacote }: { pacote: Pacote }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={pacote.imagem}
          alt={`Pacote para ${pacote.destino}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {pacote.promocao && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
            Promoção
          </span>
        )}
      </div>

      <div className="p-3">
        <a
          href={whatsappLink(
            `Olá! Tenho interesse no pacote para ${pacote.destino}. Pode me passar mais informações?`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-red"
        >
          Quero esse pacote
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}
