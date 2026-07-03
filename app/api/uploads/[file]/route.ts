import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const uploadsDir = path.join(process.cwd(), "uploads");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ file: string }> },
) {
  const { file } = await context.params;

  // Evita path traversal
  if (!file || file.includes("/") || file.includes("\\") || file.includes("..")) {
    return new NextResponse("Não encontrado", { status: 404 });
  }

  const ext = path.extname(file).toLowerCase();
  const contentType = CONTENT_TYPES[ext] || "application/octet-stream";
  const headers = {
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=31536000, immutable",
  };

  // Netlify Blobs (se houver contexto); senão, sistema de arquivos local
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore({ name: "monsueto-uploads", consistency: "strong" });
    const data = await store.get(file, { type: "arrayBuffer" });
    if (data) return new NextResponse(new Uint8Array(data), { headers });
  } catch {
    // sem contexto Netlify (dev local) — cai pro arquivo local abaixo
  }

  try {
    const buffer = await fs.readFile(path.join(uploadsDir, file));
    return new NextResponse(new Uint8Array(buffer), { headers });
  } catch {
    return new NextResponse("Não encontrado", { status: 404 });
  }
}
