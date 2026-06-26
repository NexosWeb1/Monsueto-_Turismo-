import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import type { Pacote } from "@/lib/types";
import { whatsappLink } from "@/lib/config";

export function PacoteCard({ pacote }: { pacote: Pacote }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={pacote.imagem}
          alt={`Pacote para ${pacote.destino}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {pacote.local && (
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-brand-navy/85 px-2.5 py-0.5 text-[11px] font-medium text-white shadow-sm backdrop-blur">
            <MapPin className="h-3 w-3 text-brand-sky-light" />
            {pacote.local}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        {(pacote.preco || pacote.condicao) && (
          <div>
            {pacote.preco && (
              <p className="font-heading text-lg leading-none text-brand-red">
                {pacote.preco}
              </p>
            )}
            {pacote.condicao && (
              <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
                {pacote.condicao}
              </p>
            )}
          </div>
        )}
        <a
          href={whatsappLink(
            `Olá! Tenho interesse no pacote para ${pacote.destino}. Pode me passar mais informações?`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red"
        >
          Quero esse pacote
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}
