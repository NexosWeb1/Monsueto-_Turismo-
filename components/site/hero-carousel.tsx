"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import {
  MapPin,
  Star,
  CalendarDays,
  Users,
  Search,
  ShieldCheck,
  HeartHandshake,
  Tag,
  Plane,
} from "lucide-react";
import { empresa, whatsappLink } from "@/lib/config";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const tipos = [
  { id: "pacote", label: "Pacote" },
  { id: "aereo", label: "Passagem aérea" },
  { id: "personalizado", label: "Roteiro sob medida" },
] as const;

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Destinos sugeridos (os que a agência trabalha + procurados)
const destinos = [
  "Caldas Novas - GO",
  "Porto Seguro - BA",
  "Natal - RN",
  "Maceió - AL",
  "Gramado - RS",
  "Arraial do Cabo - RJ",
  "Rio de Janeiro - RJ",
  "Fortaleza - CE",
  "Salvador - BA",
  "João Pessoa - PB",
  "Recife / Porto de Galinhas - PE",
  "Foz do Iguaçu - PR",
  "Bonito - MS",
  "Florianópolis - SC",
  "Búzios - RJ",
  "Cancún - México",
  "Buenos Aires - Argentina",
  "Santiago - Chile",
  "Orlando - Estados Unidos",
  "Lisboa - Portugal",
];

// Remove acentos para a busca ficar tolerante (ex.: "maceio" acha "Maceió")
const semAcento = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const destaques = [
  {
    icon: HeartHandshake,
    titulo: "Atendimento humano",
    texto: "Gente de verdade do início ao fim",
  },
  {
    icon: Tag,
    titulo: "Melhores condições",
    texto: "Preços justos e parcelamento facilitado",
  },
  {
    icon: ShieldCheck,
    titulo: "Segurança e confiança",
    texto: "Agência registrada, viagem tranquila",
  },
  {
    icon: Plane,
    titulo: "Nacional e internacional",
    texto: "Roteiros para todos os estilos",
  },
];

export function Hero() {
  const [tipo, setTipo] = useState<(typeof tipos)[number]["id"]>("pacote");
  const [destino, setDestino] = useState("");
  const [quando, setQuando] = useState("");
  const [passageiros, setPassageiros] = useState("2 adultos");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  const sugestoes = (
    destino.trim()
      ? destinos.filter((d) => semAcento(d).includes(semAcento(destino.trim())))
      : destinos
  ).slice(0, 6);

  function solicitar(e: React.FormEvent) {
    e.preventDefault();
    const tipoLabel = tipos.find((t) => t.id === tipo)?.label ?? "Pacote";
    const msg =
      `Olá! Vim pelo site da Monsueto e gostaria de uma cotação.\n` +
      `Tipo: ${tipoLabel}\n` +
      `Destino: ${destino.trim() || "a definir"}\n` +
      `Quando: ${quando.trim() || "a definir"}\n` +
      `Passageiros: ${passageiros}`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="inicio"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-brand-navy-deep"
    >
      {/* Fundo: foto com leve zoom contínuo */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
        >
          <Image
            src="/brand/hero-oasis.jpg"
            alt="Destino paradisíaco com piscina e coqueiros"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/92 via-brand-navy-deep/72 to-brand-navy-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/90 via-transparent to-brand-navy-deep/30" />
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

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-4 pt-28 pb-10 sm:px-6 lg:grid-cols-[1fr_460px] lg:gap-12 lg:px-10 lg:pb-20">
          {/* Texto */}
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
              Os melhores destinos, os melhores preços e um atendimento que faz a
              diferença, pertinho de você em Contagem.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#pacotes"
                className="inline-flex items-center justify-center rounded-full bg-brand-red px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-xl"
              >
                Ver pacotes
              </a>
              <a
                href={whatsappLink(
                  "Olá! Vim pelo site da Monsueto e gostaria de informações sobre viagens.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-medium text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                Falar no WhatsApp
              </a>
            </motion.div>

            {/* Prova social enxuta */}
            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="font-heading text-lg text-white">4,9</span>
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </span>
                no Google
              </span>
              <span className="h-4 w-px bg-white/25" />
              <span>{empresa.experiencia} realizando sonhos</span>
            </motion.div>
          </motion.div>

          {/* Painel de cotação rápida */}
          <motion.form
            onSubmit={solicitar}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-3xl border border-white/60 bg-white/95 p-5 shadow-2xl backdrop-blur-md sm:p-6"
          >
            <p className="font-heading text-lg text-brand-navy">
              Peça sua cotação
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Resposta rápida no WhatsApp, sem compromisso.
            </p>

            {/* Tipo de viagem */}
            <div className="mt-4 flex gap-1.5 rounded-full bg-brand-sand p-1">
              {tipos.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTipo(t.id)}
                  className={`flex-1 rounded-full px-2 py-1.5 text-xs font-semibold transition-colors ${
                    tipo === t.id
                      ? "bg-brand-red text-white shadow-sm"
                      : "text-brand-navy/70 hover:text-brand-navy"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Campos */}
            <div className="mt-4 space-y-3">
              {/* Destino com busca / autocomplete */}
              <div className="relative">
                <Campo icon={MapPin} label="Destino">
                  <input
                    value={destino}
                    onChange={(e) => {
                      setDestino(e.target.value);
                      setMostrarSugestoes(true);
                    }}
                    onFocus={() => setMostrarSugestoes(true)}
                    onBlur={() =>
                      window.setTimeout(() => setMostrarSugestoes(false), 120)
                    }
                    placeholder="Digite e selecione o lugar"
                    autoComplete="off"
                    className="w-full bg-transparent text-sm text-brand-navy outline-none placeholder:text-muted-foreground/70"
                  />
                </Campo>
                {mostrarSugestoes && sugestoes.length > 0 && (
                  <ul className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-border bg-white p-1 shadow-xl">
                    {sugestoes.map((d) => (
                      <li key={d}>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setDestino(d);
                            setMostrarSugestoes(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-brand-navy transition-colors hover:bg-brand-sand"
                        >
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-red" />
                          {d}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Campo icon={CalendarDays} label="Quando">
                  <select
                    value={quando}
                    onChange={(e) => setQuando(e.target.value)}
                    className="w-full bg-transparent text-sm text-brand-navy outline-none"
                  >
                    <option value="">Escolha o mês</option>
                    {meses.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                    <option value="Ainda não decidi">Ainda não decidi</option>
                  </select>
                </Campo>
                <Campo icon={Users} label="Passageiros">
                  <select
                    value={passageiros}
                    onChange={(e) => setPassageiros(e.target.value)}
                    className="w-full bg-transparent text-sm text-brand-navy outline-none"
                  >
                    <option>1 adulto</option>
                    <option>2 adultos</option>
                    <option>2 adultos, 1 criança</option>
                    <option>2 adultos, 2 crianças</option>
                    <option>Família ou grupo</option>
                  </select>
                </Campo>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-900/20 transition-all hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-xl"
            >
              <Search className="h-4 w-4" />
              Buscar minha viagem
            </button>
          </motion.form>
        </div>
      </div>

      {/* Faixa de destaques */}
      <div className="relative z-10 border-t border-white/10 bg-white/10 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-6 gap-y-5 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-10">
          {destaques.map((d) => (
            <div key={d.titulo} className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-brand-sky-light ring-1 ring-white/20">
                <d.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{d.titulo}</p>
                <p className="truncate text-xs text-white/70">{d.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Campo({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-2.5 rounded-xl border border-border bg-brand-sand/60 px-3 py-2.5 transition-colors focus-within:border-brand-sky focus-within:bg-white">
      <Icon className="h-4 w-4 shrink-0 text-brand-red" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}
