import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Camada de persistência sem banco de dados.
 *
 * Produção (Netlify): usa Netlify Blobs para JSON e imagens, pois o sistema
 * de arquivos das funções é somente-leitura. O SDK detecta o contexto em
 * runtime automaticamente; por isso tentamos e, se não houver contexto
 * (ex.: `npm run dev` local), caímos no sistema de arquivos local.
 * Também suporta Vercel Blob caso um dia rode na Vercel (BLOB_READ_WRITE_TOKEN).
 */

const hasVercelBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;

const STORE_DATA = "monsueto-data";
const STORE_UPLOADS = "monsueto-uploads";

const dataDir = path.join(process.cwd(), "data");
// Fora de public/ porque o Next em produção não serve arquivos adicionados
// em runtime dentro de public/. As imagens são servidas por /api/uploads/[file].
const uploadsDir = path.join(process.cwd(), "uploads");

/**
 * Retorna um store do Netlify Blobs se houver contexto (rodando na Netlify),
 * ou null caso contrário (ex.: desenvolvimento local sem contexto).
 */
async function getNetlifyStore(name: string) {
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore({ name, consistency: "strong" });
  } catch {
    return null;
  }
}

// ---------- JSON (banners / pacotes) ----------

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  if (hasVercelBlob()) {
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

  const store = await getNetlifyStore(STORE_DATA);
  if (store) {
    try {
      const data = await store.get(`${key}.json`, { type: "json" });
      return (data as T) ?? fallback;
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
  if (hasVercelBlob()) {
    const { put } = await import("@vercel/blob");
    await put(`data/${key}.json`, JSON.stringify(data, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });
    return;
  }

  const store = await getNetlifyStore(STORE_DATA);
  if (store) {
    await store.setJSON(`${key}.json`, data);
    return;
  }

  // Fallback local
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(
    path.join(dataDir, `${key}.json`),
    JSON.stringify(data, null, 2),
    "utf-8",
  );
}

// ---------- Imagens ----------

export async function uploadImage(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  if (hasVercelBlob()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${safe}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return blob.url;
  }

  const store = await getNetlifyStore(STORE_UPLOADS);
  if (store) {
    const buffer = await file.arrayBuffer();
    await store.set(safe, buffer, {
      metadata: { contentType: file.type || "application/octet-stream" },
    });
    return `/api/uploads/${safe}`;
  }

  // Fallback local: grava em ./uploads e serve por /api/uploads/[file]
  await fs.mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadsDir, safe), buffer);
  return `/api/uploads/${safe}`;
}
