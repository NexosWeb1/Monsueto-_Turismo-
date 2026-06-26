import type { Pacote } from "./types";

// Conteúdo inicial de exemplo. A equipe substitui tudo pelo painel admin.
export const seedPacotes: Pacote[] = [
  {
    id: "pac-caldas-julho",
    destino: "Caldas Novas - Especial Férias",
    local: "Goiás",
    descricao:
      "Transporte semi-leito, Hotel Boulevard, cafés da manhã, almoços e acesso a 4 parques aquáticos do grupo WAM.",
    imagem: "/destinos/caldas-novas-julho.png",
    preco: "R$ 1.950,00",
    condicao: "por adulto em até 10x sem juros · crianças a partir de R$ 699",
    promocao: true,
    validade: "Embarque 25 a 30 de julho",
    ativo: true,
    ordem: 1,
  },
  {
    id: "pac-caldas-corpus",
    destino: "Caldas Novas - Corpus Christi",
    local: "Goiás",
    descricao:
      "Ônibus semi-leito, cafés da manhã, almoços, hospedagem de 3 diárias e acesso aos parques aquáticos.",
    imagem: "/destinos/caldas-novas-corpus.png",
    preco: "R$ 1.399,00",
    condicao: "por adulto em até 10x sem juros",
    promocao: true,
    validade: "Embarque 03 a 07 de junho",
    ativo: true,
    ordem: 2,
  },
  {
    id: "pac-caldas-diroma",
    destino: "Caldas Novas - diRoma",
    local: "Goiás",
    descricao:
      "Transporte semi-leito, Hotel Exclusive diRoma, cafés e almoços e acesso ao diRoma Acqua Park.",
    imagem: "/destinos/caldas-novas-diroma.png",
    preco: "R$ 1.521,00",
    condicao: "por adulto em até 10x sem juros · crianças a partir de R$ 599",
    promocao: true,
    validade: "Embarque 27/06 a 01/07",
    ativo: true,
    ordem: 3,
  },
  {
    id: "pac-caldas-agosto",
    destino: "Caldas Novas - Mês de Agosto",
    local: "Goiás",
    descricao:
      "Ônibus semi-leito, cafés e almoços, hospedagem de 4 diárias e acesso ao diRoma Acqua Park. Várias saídas.",
    imagem: "/destinos/caldas-novas-agosto.png",
    preco: "R$ 1.690,00",
    condicao: "por pessoa em apto triplo · em até 10x",
    promocao: false,
    validade: "Saídas em agosto e setembro",
    ativo: true,
    ordem: 4,
  },
  {
    id: "pac-arraial-julho",
    destino: "Arraial do Cabo - Férias de Julho",
    local: "Rio de Janeiro",
    descricao:
      "Ônibus semi-leito, lanche a bordo, Hotel Méditerranée, 5 cafés da manhã, guia Monsueto e brinde.",
    imagem: "/destinos/arraial-julho.png",
    preco: "R$ 1.490,00",
    condicao: "por adulto · entrada de 30% + 10x no cartão",
    promocao: true,
    validade: "Embarque 18 a 24 de julho",
    ativo: true,
    ordem: 5,
  },
  {
    id: "pac-arraial-corpus",
    destino: "Arraial do Cabo - Corpus Christi",
    local: "Rio de Janeiro",
    descricao:
      "Ônibus semi-leito, lanche a bordo, Hotel Méditerranée, cafés da manhã, guia Monsueto e brinde.",
    imagem: "/destinos/arraial-corpus.png",
    preco: "R$ 1.390,00",
    condicao: "por adulto · entrada de 30% + parcelas no cartão",
    promocao: true,
    validade: "Embarque 03 a 07 de junho",
    ativo: true,
    ordem: 6,
  },
];

// Depoimentos curados (estilo avaliações do Google)
export const depoimentos = [
  {
    nome: "Ana Paula Ferreira",
    nota: 5,
    texto:
      "Atendimento excelente do começo ao fim. Organizaram toda a nossa viagem para Caldas Novas e foi tudo perfeito. Recomendo demais!",
    origem: "Avaliação no Google",
  },
  {
    nome: "Marcos Vinícius",
    nota: 5,
    texto:
      "Equipe muito atenciosa e preço justo. Conseguiram um pacote ótimo para a família. Já estamos planejando a próxima.",
    origem: "Avaliação no Google",
  },
  {
    nome: "Juliana Costa",
    nota: 5,
    texto:
      "Profissionais de confiança. Explicaram cada detalhe e ainda parcelaram a viagem. Voltarei com certeza.",
    origem: "Avaliação no Google",
  },
  {
    nome: "Roberto Almeida",
    nota: 5,
    texto:
      "Fechei meu cruzeiro com eles e foi a melhor escolha. Suporte do início ao fim da viagem. Nota 10.",
    origem: "Avaliação no Google",
  },
];
