import { NextResponse } from "next/server";
import { empresa } from "@/lib/config";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  // Honeypot anti-spam: se o campo oculto vier preenchido, é bot.
  if (body?.website) {
    return NextResponse.json({ ok: true });
  }

  const nome = String(body?.nome || "").trim();
  const telefone = String(body?.telefone || "").trim();
  if (!nome || !telefone) {
    return NextResponse.json(
      { error: "Nome e telefone são obrigatórios" },
      { status: 400 },
    );
  }

  const tipo = String(body?.tipo || "Cotação");
  const destino = String(body?.destino || "").trim() || "a definir";
  const quando = String(body?.quando || "").trim() || "a definir";
  const passageiros = String(body?.passageiros || "").trim() || "não informado";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // E-mail ainda não configurado: não derruba o fluxo do usuário.
    return NextResponse.json(
      { error: "Envio de e-mail não configurado" },
      { status: 503 },
    );
  }

  const from =
    process.env.LEAD_FROM || "Monsueto Turismo <onboarding@resend.dev>";
  const to = process.env.LEAD_TO || empresa.email;

  const linhas = [
    "Novo pedido de cotação pelo site",
    "",
    `Nome: ${nome}`,
    `WhatsApp/Telefone: ${telefone}`,
    `Tipo: ${tipo}`,
    `Destino: ${destino}`,
    `Quando: ${quando}`,
    `Passageiros: ${passageiros}`,
  ];

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Novo lead do site: ${nome}`,
      replyTo: undefined,
      text: linhas.join("\n"),
    });
    if (error) {
      return NextResponse.json({ error: "Falha ao enviar" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Falha ao enviar" }, { status: 502 });
  }
}
