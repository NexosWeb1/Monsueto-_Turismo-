import Link from "next/link";
import type { Metadata } from "next";
import { Luggage, ArrowRight } from "lucide-react";
import { AdminShell, PageHeader } from "@/components/admin/admin-shell";
import { getPacotes } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

export default async function AdminHome() {
  const pacotes = await getPacotes();
  const pacotesAtivos = pacotes.filter((p) => p.ativo).length;

  return (
    <AdminShell>
      <PageHeader
        title="Bem-vindo(a) ao painel"
        description="Gerencie os pacotes de viagem que aparecem no site."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Link
          href="/admin/pacotes"
          className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white">
              <Luggage className="h-6 w-6" />
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>
          <h2 className="mt-4 font-heading text-xl text-brand-navy">Pacotes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cadastre destinos e promoções de viagem.
          </p>
          <p className="mt-4 text-sm">
            <span className="font-semibold text-brand-navy">{pacotes.length}</span>{" "}
            <span className="text-muted-foreground">cadastrados ·</span>{" "}
            <span className="font-semibold text-emerald-600">{pacotesAtivos}</span>{" "}
            <span className="text-muted-foreground">ativos</span>
          </p>
        </Link>
      </div>
    </AdminShell>
  );
}
