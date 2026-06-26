"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { MapPin, ChevronDown, Star } from "lucide-react";
import { empresa, whatsappLink } from "@/lib/config";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-dvh items-center overflow-hidden bg-brand-navy-deep"
    >
      {/* Fundo: foto da fachada com leve zoom contínuo */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
        >
          <Image
            src="/brand/hero-oasis.jpg"
            alt="Parque aquático paradisíaco com piscina e coqueiros"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/92 via-brand-navy-deep/70 to-brand-navy-deep/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/85 via-transparent to-transparent" />
      </div>

      {/* Brilhos decorativos animados */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-sky/20 blur-3xl"
        animate={{ y: [0, -30, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-10 top-24 h-64 w-64 rounded-full bg-brand-red/20 blur-3xl"
        animate={{ y: [0, 24, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-28 pb-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur"
          >
            <MapPin className="h-3.5 w-3.5 text-brand-sky-light" />
            Agência de viagens em {empresa.cidade}
          </motion.span>

          <motion.h1
            variants={item}
            className="font-heading mt-6 text-4xl leading-[1.05] text-white text-balance sm:text-5xl lg:text-6xl"
          >
            Sua próxima{" "}
            <span className="bg-[linear-gradient(105deg,#7fd0ff_0%,#ffffff_50%,#ff6b52_100%)] bg-clip-text text-transparent">
              viagem
            </span>{" "}
            começa aqui
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base text-white/85 sm:text-lg"
          >
            Pacotes, passagens e roteiros com atendimento de verdade, pertinho de
            você em Contagem.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={whatsappLink(
                "Olá! Vim pelo site da Monsueto e gostaria de informações sobre viagens.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-brand-red px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:bg-brand-red-dark hover:shadow-xl hover:-translate-y-0.5"
            >
              Falar no WhatsApp
            </a>
            <a
              href="#pacotes"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-medium text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              Ver pacotes
            </a>
          </motion.div>
        </motion.div>

        {/* Destaque visual (direita, desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          {/* Card de oferta em destaque */}
          <div className="animate-float relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/destinos/caldas-novas-corpus.png"
                alt="Pacote em destaque para Caldas Novas"
                fill
                sizes="420px"
                className="object-cover"
              />
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
              Oferta em destaque
            </span>
          </div>

          {/* Selo de avaliação flutuante */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-10 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-xl text-white">4,9</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="mt-0.5 text-[11px] text-white/70">Avaliações no Google</p>
          </motion.div>

          {/* Selo de anos flutuante */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 -right-5 rounded-2xl bg-brand-red px-4 py-3 shadow-xl"
          >
            <p className="font-heading text-2xl leading-none text-white">+7</p>
            <p className="text-[11px] text-white/90">anos de viagens</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de rolagem */}
      <motion.a
        href="#pacotes"
        aria-label="Rolar para os pacotes"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  );
}
