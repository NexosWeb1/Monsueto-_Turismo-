import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Camada de persistência sem banco de dados.
 *
 * Em produção (Vercel): usa Vercel Blob para JSON e imagens.
 * Em desenvolvimento sem token: usa o sistema de arquivos local
 * (data/*.json e public/uploads/*) para o site funcionar offline.
 */

const hasBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;

const dataDir = path.join(process.cwd(), "data");
// Fora de public/ porque o Next em produção não serve arquivos adicionados
// em runtime dentro de public/. As imagens são servidas por /api/uploads/[file].
const uploadsDir = path.join(process.cwd(), "uploads");

// ---------- JSON (banners / pacotes) ----------

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  if (hasBlob()) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: `data/${key}.json`, limit: 1 });
      if (!blobs.length) return fallback;
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (!res.ok) return fallback;
      return (await res.json()) as T;
    } catch {
      return fallback;
    }
  }
  // Fallback local
  try {
    const raw = await fs.readFile(path.join(dataDir, `${key}.json`), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson<T>(key: string, data: T): Promise<void> {
  const json = JSON.stringify(data, null, 2);
  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    await put(`data/${key}.json`, json, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });
    return;
  }
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(path.join(dataDir, `${key}.json`), json, "utf-8");
}

// ---------- Imagens ----------

export async function uploadImage(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${safe}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return blob.url;
  }

  // Fallback local: grava em ./uploads e serve por /api/uploads/[file]
  await fs.mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadsDir, safe), buffer);
  return `/api/uploads/${safe}`;
}
