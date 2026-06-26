import "server-only";
import { readJson, writeJson } from "./blob";
import type { Pacote } from "./types";
import { seedPacotes } from "./seed";

const sortByOrdem = <T extends { ordem: number }>(a: T, b: T) =>
  a.ordem - b.ordem;

export async function getPacotes(): Promise<Pacote[]> {
  const pacotes = await readJson<Pacote[]>("pacotes", seedPacotes);
  return [...pacotes].sort(sortByOrdem);
}

export async function getPacotesAtivos(): Promise<Pacote[]> {
  return (await getPacotes()).filter((p) => p.ativo);
}

export async function savePacotes(pacotes: Pacote[]): Promise<void> {
  await writeJson("pacotes", pacotes);
}

export function novoId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}
