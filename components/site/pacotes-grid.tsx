"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Pacote } from "@/lib/types";
import { PacoteCard } from "./pacote-card";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function PacotesGrid({ pacotes }: { pacotes: Pacote[] }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(pacotes.length / PAGE_SIZE);
  const inicio = page * PAGE_SIZE;
  const visiveis = pacotes.slice(inicio, inicio + PAGE_SIZE);

  function irPara(p: number) {
    const alvo = Math.max(0, Math.min(p, pageCount - 1));
    setPage(alvo);
    document.getElementById("pacotes")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      <motion.div
        key={page}
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visiveis.map((p) => (
          <motion.div key={p.id} variants={item} className="h-full">
            <PacoteCard pacote={p} />
          </motion.div>
        ))}
      </motion.div>

      {pageCount > 1 && (
        <nav
          aria-label="Paginação dos pacotes"
          className="mt-10 flex items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => irPara(page - 1)}
            disabled={page === 0}
            aria-label="Página anterior"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-brand-navy transition-colors hover:bg-brand-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand-navy"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => irPara(i)}
              aria-label={`Página ${i + 1}`}
              aria-current={i === page ? "page" : undefined}
              className={cn(
                "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors",
                i === page
                  ? "bg-brand-red text-white"
                  : "border border-border text-brand-navy hover:bg-muted",
              )}
            >
              {i + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={() => irPara(page + 1)}
            disabled={page === pageCount - 1}
            aria-label="Próxima página"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-brand-navy transition-colors hover:bg-brand-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand-navy"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      )}
    </>
  );
}
