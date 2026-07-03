import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero-carousel";
import { Pacotes } from "@/components/site/pacotes";
import { Sobre } from "@/components/site/sobre";
import { Diferenciais } from "@/components/site/diferenciais";
import { Parcerias } from "@/components/site/parcerias";
import { Depoimentos } from "@/components/site/depoimentos";
import { Localizacao } from "@/components/site/localizacao";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { empresa } from "@/lib/config";

export const revalidate = 30;

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: empresa.nome,
    image: "/brand/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Água Branca, 168 - Jardim Bandeirantes",
      addressLocality: "Contagem",
      addressRegion: "MG",
      postalCode: empresa.cep,
      addressCountry: "BR",
    },
    telephone: `+${empresa.telefoneFixo}`,
    url: "https://monsueto.com.br",
    sameAs: [empresa.instagram, empresa.facebook],
    openingHours: ["Mo-Fr 09:00-18:00", "Sa 09:00-17:00"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <Pacotes />
        <Diferenciais />
        <Parcerias />
        <Sobre />
        <Depoimentos />
        <Localizacao />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
