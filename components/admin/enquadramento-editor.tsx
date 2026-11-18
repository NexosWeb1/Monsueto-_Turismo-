"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Maximize,
  Minimize,
  Move,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ENQUADRAMENTO_PADRAO,
  PROPORCAO_CARD,
  PacoteArte,
  ZOOM_MAX,
  ZOOM_MIN,
  type Enquadramento,
} from "@/components/site/pacote-arte";

const limitar = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export function EnquadramentoEditor({
  src,
  value,
  onChange,
}: {
  src: string;
  value: Enquadramento;
  onChange: (v: Enquadramento) => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    x: number;
    y: number;
    posX: number;
    posY: number;
  } | null>(null);
  const [zoomPreencher, setZoomPreencher] = useState<number | null>(null);

  // Quanto o quadro deixa a arte se mover sem sair totalmente de vista.
  const limitePos = (zoom: number) => Math.max(0, (zoom - 1) * 50) + 25;

  function atualizar(parcial: Partial<Enquadramento>) {
    const zoom = limitar(parcial.zoom ?? value.zoom, ZOOM_MIN, ZOOM_MAX);
    const lim = limitePos(zoom);
    onChange({
      zoom: Math.round(zoom * 100) / 100,
      posX:
        Math.round(limitar(parcial.posX ?? value.posX, -lim, lim) * 10) / 10,
      posY:
        Math.round(limitar(parcial.posY ?? value.posY, -lim, lim) * 10) / 10,
    });
  }

  function aoCarregar(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    if (!img.naturalWidth || !img.naturalHeight) return;
    const proporcao = img.naturalWidth / img.naturalHeight;
    setZoomPreencher(
      Math.max(PROPORCAO_CARD / proporcao, proporcao / PROPORCAO_CARD),
    );
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      posX: value.posX,
      posY: value.posY,
    };
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const frame = frameRef.current;
    if (!d || !frame) return;
    const { width, height } = frame.getBoundingClientRect();
    atualizar({
      posX: d.posX + ((e.clientX - d.x) / width) * 100,
      posY: d.posY + ((e.clientY - d.y) / height) * 100,
    });
  }

  function onPointerUp() {
    drag.current = null;
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const passo = e.shiftKey ? 5 : 1;
    const mapa: Record<string, Partial<Enquadramento>> = {
      ArrowLeft: { posX: value.posX - passo },
      ArrowRight: { posX: value.posX + passo },
      ArrowUp: { posY: value.posY - passo },
      ArrowDown: { posY: value.posY + passo },
      "+": { zoom: value.zoom + 0.05 },
      "=": { zoom: value.zoom + 0.05 },
      "-": { zoom: value.zoom - 0.05 },
    };
    const mudanca = mapa[e.key];
    if (!mudanca) return;
    e.preventDefault();
    atualizar(mudanca);
  }

  const mostrandoInteira =
    value.zoom === ENQUADRAMENTO_PADRAO.zoom &&
    value.posX === ENQUADRAMENTO_PADRAO.posX &&
    value.posY === ENQUADRAMENTO_PADRAO.posY;

  return (
    <div className="space-y-3">
      <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div
          ref={frameRef}
          role="application"
          aria-label="Enquadramento da arte. Arraste ou use as setas para mover; + e - para zoom."
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
          className="relative aspect-[4/5] cursor-grab touch-none select-none overflow-hidden bg-muted outline-none focus-visible:ring-2 focus-visible:ring-brand-sky active:cursor-grabbing"
        >
          <PacoteArte
            src={src}
            alt="Pré-visualização do card"
            enquadramento={value}
            sizes="280px"
            onLoad={aoCarregar}
          />
          <span className="pointer-events-none absolute bottom-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white">
            <Move className="h-3 w-3" /> Arraste para ajustar
          </span>
        </div>
        <div className="p-2" aria-hidden>
          <div className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white">
            Quero esse pacote <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label="Diminuir zoom"
          onClick={() => atualizar({ zoom: value.zoom - 0.1 })}
          disabled={value.zoom <= ZOOM_MIN}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <input
          type="range"
          aria-label="Zoom"
          min={ZOOM_MIN}
          max={ZOOM_MAX}
          step={0.01}
          value={value.zoom}
          onChange={(e) => atualizar({ zoom: Number(e.target.value) })}
          className="h-2 flex-1 cursor-pointer accent-brand-red"
        />
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label="Aumentar zoom"
          onClick={() => atualizar({ zoom: value.zoom + 0.1 })}
          disabled={value.zoom >= ZOOM_MAX}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <span className="w-12 text-right text-xs tabular-nums text-muted-foreground">
          {Math.round(value.zoom * 100)}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange(ENQUADRAMENTO_PADRAO)}
          disabled={mostrandoInteira}
        >
          <Minimize className="h-4 w-4" /> Mostrar inteira
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            zoomPreencher &&
            onChange({
              zoom: limitar(zoomPreencher, ZOOM_MIN, ZOOM_MAX),
              posX: 0,
              posY: 0,
            })
          }
          disabled={!zoomPreencher}
        >
          <Maximize className="h-4 w-4" /> Preencher card
        </Button>
      </div>
    </div>
  );
}
