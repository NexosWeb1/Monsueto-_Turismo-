import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPacotes, savePacotes, novoId } from "@/lib/data";
import type { Pacote } from "@/lib/types";

function numero(v: unknown, min: number, max: number): number | undefined {
  const n = Number(v);
  if (v === undefined || v === null || v === "" || !Number.isFinite(n)) return undefined;
  return Math.min(max, Math.max(min, n));
}

function enquadramento(body: Record<string, unknown>) {
  return {
    zoom: numero(body.zoom, 1, 3),
    posX: numero(body.posX, -200, 200),
    posY: numero(body.posY, -200, 200),
  };
}

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(await getPacotes());
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.imagem) {
    return NextResponse.json(
      { error: "Envie a arte do pacote" },
      { status: 400 },
    );
  }
  const pacotes = await getPacotes();
  const novo: Pacote = {
    id: novoId("pac"),
    destino: String(body.destino || ""),
    local: "",
    descricao: "",
    imagem: String(body.imagem),
    ...enquadramento(body),
    preco: "",
    condicao: "",
    promocao: Boolean(body.promocao),
    mes: body.mes ? String(body.mes) : "",
    validade: "",
    ativo: body.ativo !== false,
    ordem: pacotes.length ? Math.max(...pacotes.map((p) => p.ordem)) + 1 : 1,
  };
  await savePacotes([...pacotes, novo]);
  revalidatePath("/");
  return NextResponse.json(novo, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.id) {
    return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
  }
  const pacotes = await getPacotes();
  const idx = pacotes.findIndex((p) => p.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Pacote não encontrado" }, { status: 404 });
  }
  const enq = enquadramento(body);
  pacotes[idx] = {
    ...pacotes[idx],
    zoom: enq.zoom ?? pacotes[idx].zoom,
    posX: enq.posX ?? pacotes[idx].posX,
    posY: enq.posY ?? pacotes[idx].posY,
    destino: body.destino ?? pacotes[idx].destino,
    imagem: body.imagem ?? pacotes[idx].imagem,
    mes: body.mes ?? pacotes[idx].mes,
    promocao:
      typeof body.promocao === "boolean" ? body.promocao : pacotes[idx].promocao,
    ativo: typeof body.ativo === "boolean" ? body.ativo : pacotes[idx].ativo,
    ordem: typeof body.ordem === "number" ? body.ordem : pacotes[idx].ordem,
  };
  await savePacotes(pacotes);
  revalidatePath("/");
  return NextResponse.json(pacotes[idx]);
}

/** Reordena os pacotes: recebe a lista de ids na nova ordem. */
export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null);
  const ids: unknown = body?.ids;
  if (!Array.isArray(ids) || !ids.every((id) => typeof id === "string")) {
    return NextResponse.json({ error: "Lista de ids inválida" }, { status: 400 });
  }
  const pacotes = await getPacotes();
  const posicao = new Map(ids.map((id, i) => [id, i]));
  // Pacotes que não vieram na lista (ex.: criados em outra aba) vão para o fim.
  const ordenados = [...pacotes].sort(
    (a, b) =>
      (posicao.get(a.id) ?? ids.length + a.ordem) -
      (posicao.get(b.id) ?? ids.length + b.ordem),
  );
  await savePacotes(ordenados.map((p, i) => ({ ...p, ordem: i + 1 })));
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.id) {
    return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
  }
  const pacotes = await getPacotes();
  await savePacotes(pacotes.filter((p) => p.id !== body.id));
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
