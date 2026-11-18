import Image from "next/image";

export type Enquadramento = {
  zoom: number;
  posX: number;
  posY: number;
};

export const ENQUADRAMENTO_PADRAO: Enquadramento = { zoom: 1, posX: 0, posY: 0 };

export const ZOOM_MIN = 1;
export const ZOOM_MAX = 3;

/** Proporção do card do site (largura / altura). */
export const PROPORCAO_CARD = 4 / 5;

export function lerEnquadramento(p: {
  zoom?: number;
  posX?: number;
  posY?: number;
}): Enquadramento {
  return {
    zoom: typeof p.zoom === "number" ? p.zoom : ENQUADRAMENTO_PADRAO.zoom,
    posX: typeof p.posX === "number" ? p.posX : ENQUADRAMENTO_PADRAO.posX,
    posY: typeof p.posY === "number" ? p.posY : ENQUADRAMENTO_PADRAO.posY,
  };
}

/**
 * Desenha a arte do pacote dentro de um quadro (o pai define o tamanho).
 * Com zoom 1 a arte aparece inteira, sem cortes; o fundo é preenchido com uma
 * versão desfocada da própria arte. Zoom e posição são em % do quadro, então
 * a pré-visualização do painel e o card do site ficam idênticos.
 */
export function PacoteArte({
  src,
  alt,
  enquadramento,
  sizes,
  priority,
  onLoad,
}: {
  src: string;
  alt: string;
  enquadramento: Enquadramento;
  sizes: string;
  priority?: boolean;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}) {
  const { zoom, posX, posY } = enquadramento;
  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        className="scale-110 object-cover opacity-60 blur-xl"
        draggable={false}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={onLoad}
        draggable={false}
        className="object-contain"
        style={{
          transform: `translate(${posX}%, ${posY}%) scale(${zoom})`,
          transformOrigin: "center",
        }}
      />
    </>
  );
}
