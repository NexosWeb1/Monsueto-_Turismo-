import type { Metadata } from "next";
import { AdminShell, PageHeader } from "@/components/admin/admin-shell";
import { PacoteManager } from "@/components/admin/pacote-manager";
import { getPacotes } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Pacotes",
  robots: { index: false, follow: false },
};

export default async function PacotesPage() {
  const pacotes = await getPacotes();
  return (
    <AdminShell>
      <PageHeader
        title="Pacotes de viagem"
        description="Destinos e promoções exibidos no site."
      />
      <PacoteManager inicial={pacotes} />
    </AdminShell>
  );
}
