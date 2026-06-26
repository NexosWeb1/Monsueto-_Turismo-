export type Pacote = {
  id: string;
  destino: string;
  local: string;
  descricao: string;
  imagem: string;
  preco?: string;
  condicao?: string;
  promocao: boolean;
  validade?: string;
  ativo: boolean;
  ordem: number;
};
