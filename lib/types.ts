export type Pacote = {
  id: string;
  destino: string;
  local: string;
  descricao: string;
  imagem: string;
  /** Enquadramento da arte no card: zoom (1 = inteira) e deslocamento em %. */
  zoom?: number;
  posX?: number;
  posY?: number;
  preco?: string;
  condicao?: string;
  promocao: boolean;
  mes?: string;
  validade?: string;
  ativo: boolean;
  ordem: number;
};
