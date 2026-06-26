import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/social";
import { Reveal } from "./reveal";
import { empresa, whatsappLink } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Localizacao() {
  const now = new Date();
  const hoje = (now.getDay() + 6) % 7; // index para empresa.horarios (Seg=0)
  const hora = now.getHours();
  const abertoAgora = empresa.horarios[hoje].aberto && hora >= 9 && hora < 18;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    empresa.mapsQuery,
  )}&output=embed`;

  return (
    <section id="contato" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Info */}
          <div>
            <Reveal>
              <div className="w-fit">
                <span className="block text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                  Venha nos visitar
                </span>
                <h2 className="font-heading mt-3 text-3xl leading-tight text-brand-navy sm:text-4xl">
                  Estamos pertinho de você
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Prefere conversar pessoalmente? Nossa loja está de portas abertas em{" "}
                {empresa.cidade}. Tome um café com a gente e planeje sua próxima viagem.
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              <Reveal delay={0.05}>
                <div className="flex gap-4">
                  <Item icon={MapPin} />
                  <div>
                    <p className="font-semibold text-brand-navy">Endereço</p>
                    <p className="text-sm text-muted-foreground">{empresa.endereco}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex gap-4">
                  <Item icon={Phone} />
                  <div>
                    <p className="font-semibold text-brand-navy">Telefone & WhatsApp</p>
                    <p className="text-sm text-muted-foreground">
                      {empresa.whatsappLabel} · {empresa.telefoneFixoLabel}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex gap-4">
                  <Item icon={Clock} />
                  <div className="w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-brand-navy">Horário de funcionamento</p>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          abertoAgora
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            abertoAgora ? "bg-emerald-500" : "bg-muted-foreground",
                          )}
                        />
                        {abertoAgora ? "Aberto agora" : "Fechado agora"}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {empresa.horarios.map((h, i) => (
                        <li
                          key={h.dia}
                          className={cn(
                            "flex justify-between text-sm",
                            i === hoje
                              ? "font-semibold text-brand-navy"
                              : "text-muted-foreground",
                          )}
                        >
                          <span>{h.dia}</span>
                          <span>{h.horario}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappLink("Olá! Gostaria de informações sobre viagens.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-red-dark"
                >
                  <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
                </a>
                <a
                  href={empresa.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)] text-white shadow-sm transition-transform hover:scale-110"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href={empresa.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition-transform hover:scale-110"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Mapa */}
          <Reveal className="min-h-[360px]">
            <div className="h-full overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                title="Localização da Monsueto Turismo no mapa"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[360px] w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Item({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white">
      <Icon className="h-5 w-5" />
    </div>
  );
}
