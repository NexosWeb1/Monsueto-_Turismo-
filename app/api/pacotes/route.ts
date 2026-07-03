import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPacotes, savePacotes, novoId } from "@/lib/data";
import type { Pacote } from "@/lib/types";

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
  pacotes[idx] = {
    ...pacotes[idx],
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
