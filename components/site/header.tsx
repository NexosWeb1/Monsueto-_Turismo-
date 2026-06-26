"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { empresa, whatsappLink } from "@/lib/config";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#pacotes", label: "Pacotes" },
  { href: "#sobre", label: "Sobre" },
  { href: "#depoimentos", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "bg-gradient-to-b from-black/40 to-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2" aria-label="Monsueto Turismo">
          <Image
            src={scrolled ? "/brand/logo.png" : "/brand/logo-white.png"}
            alt="Monsueto Turismo"
            width={64}
            height={64}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium ring-1 ring-transparent transition-all duration-200",
                scrolled
                  ? "text-brand-navy hover:bg-brand-red/10 hover:text-brand-red hover:ring-brand-red/30"
                  : "text-white/90 hover:bg-white/10 hover:text-white hover:ring-white/40",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:+${empresa.telefoneFixo}`}
            className={cn(
              "hidden items-center gap-2 text-sm font-medium md:flex",
              scrolled ? "text-brand-navy" : "text-white",
            )}
          >
            <Phone className="h-4 w-4" />
            {empresa.whatsappLabel}
          </a>
          <a
            href={whatsappLink("Olá! Vim pelo site e gostaria de informações.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-red-dark hover:shadow-md sm:inline-flex"
          >
            Fale conosco
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden",
              scrolled ? "text-brand-navy" : "text-white",
            )}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-brand-navy-deep/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 z-50 flex h-dvh w-[80%] max-w-xs flex-col bg-white p-6 shadow-xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <Image
                  src="/brand/logo.png"
                  alt="Monsueto Turismo"
                  width={64}
                  height={64}
                  className="h-11 w-auto"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-navy"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-lg font-medium text-brand-navy transition-colors hover:bg-muted"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <a
                  href={whatsappLink("Olá! Vim pelo site e gostaria de informações.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-brand-red px-5 py-3 font-semibold text-white"
                >
                  Falar no WhatsApp
                </a>
                <a
                  href={`tel:+${empresa.telefoneFixo}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 font-medium text-brand-navy"
                >
                  <Phone className="h-4 w-4" /> {empresa.telefoneFixoLabel}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
