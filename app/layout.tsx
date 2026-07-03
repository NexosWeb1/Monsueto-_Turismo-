import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://monsueto.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Monsueto Turismo | Agência de Viagens em Contagem - MG",
    template: "%s | Monsueto Turismo",
  },
  description:
    "Pacotes de viagem, passagens e roteiros nacionais e internacionais com atendimento humano e de confiança. Agência de turismo em Contagem, Minas Gerais.",
  keywords: [
    "agência de viagens Contagem",
    "pacotes de viagem",
    "Monsueto Turismo",
    "Caldas Novas",
    "turismo Minas Gerais",
    "viagens nacionais e internacionais",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Monsueto Turismo",
    title: "Monsueto Turismo | Sua próxima viagem começa aqui",
    description:
      "Pacotes, passagens e roteiros com atendimento de confiança. Agência de turismo em Contagem - MG.",
  },
  icons: {
    icon: "/brand/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d2d4d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${bricolage.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
