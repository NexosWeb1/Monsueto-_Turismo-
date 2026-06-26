import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/blob";

export const runtime = "nodejs";

const MAX = 8 * 1024 * 1024; // 8MB
const OK = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
  }
  if (!OK.includes(file.type)) {
    return NextResponse.json(
      { error: "Formato inválido. Use JPG, PNG, WEBP ou AVIF." },
      { status: 400 },
    );
  }
  if (file.size > MAX) {
    return NextResponse.json(
      { error: "Imagem muito grande (máx. 8MB)." },
      { status: 400 },
    );
  }

  try {
    const url = await uploadImage(file);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Falha ao enviar a imagem" }, { status: 500 });
  }
}
