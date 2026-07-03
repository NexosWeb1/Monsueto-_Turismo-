import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/social";
import { empresa, whatsappLink } from "@/lib/config";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#pacotes", label: "Pacotes" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#depoimentos", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="brand-gradient relative overflow-hidden text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr_1.1fr_1.3fr] lg:gap-16 lg:px-12">
        <div>
          <Image
            src="/brand/logo-white.png"
            alt="Monsueto Turismo"
            width={72}
            height={72}
            className="h-16 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {empresa.slogan}. Agência de viagens em {empresa.cidade}, com {empresa.experiencia} de mercado.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={empresa.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)] text-white shadow-sm transition-transform hover:scale-110"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={empresa.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition-transform hover:scale-110"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
          <a
            href="/admin"
            className="mt-6 inline-block text-xs text-white/45 transition-colors hover:text-white/80"
          >
            Painel administrativo
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Contato
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-brand-sky-light" />
              <span>{empresa.endereco}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-brand-sky-light" />
              <span>
                {empresa.whatsappLabel}
                <br />
                {empresa.telefoneFixoLabel}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-brand-sky-light" />
              <span>Seg a Sex 09h às 18h · Sáb 09h às 17h</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Bora viajar?
          </h3>
          <p className="mt-4 text-sm text-white/70">
            Fale com a gente e receba um orçamento sem compromisso.
          </p>
          <a
            href={whatsappLink("Olá! Quero um orçamento de viagem.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
          >
            Pedir orçamento
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-12">
          <p>
            © {ano} {empresa.nome}. Todos os direitos reservados.
          </p>
          <p>CNPJ 35.120.291/0001-36</p>
        </div>
      </div>
    </footer>
  );
}
