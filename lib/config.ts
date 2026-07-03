// Informações da empresa (centralizadas para reuso no site inteiro)
export const empresa = {
  nome: "Monsueto Turismo",
  slogan: "Sua próxima viagem começa aqui",
  experiencia: "mais de 28 anos",
  endereco: "Av. Água Branca, 168 - Jardim Bandeirantes, Contagem - MG, 32371-190",
  cidade: "Contagem - MG",
  cep: "32371-190",
  whatsapp: "5531991717950",
  whatsappLabel: "(31) 99171-7950",
  telefoneFixo: "553125573865",
  telefoneFixoLabel: "(31) 2557-3865",
  email: "contato@monsueto.com.br",
  instagram: "https://www.instagram.com/monsuetoturismo/",
  facebook: "https://www.facebook.com/MonsuetoTurismo/",
  mapsQuery:
    "Monsueto Turismo, Av. Água Branca, 168 - Jardim Bandeirantes, Contagem - MG",
  horarios: [
    { dia: "Segunda-feira", horario: "09:00 às 18:00", aberto: true },
    { dia: "Terça-feira", horario: "09:00 às 18:00", aberto: true },
    { dia: "Quarta-feira", horario: "09:00 às 18:00", aberto: true },
    { dia: "Quinta-feira", horario: "09:00 às 18:00", aberto: true },
    { dia: "Sexta-feira", horario: "09:00 às 18:00", aberto: true },
    { dia: "Sábado", horario: "09:00 às 17:00", aberto: true },
    { dia: "Domingo", horario: "Fechado", aberto: false },
  ],
} as const;

export function whatsappLink(mensagem?: string) {
  const base = `https://wa.me/${empresa.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
