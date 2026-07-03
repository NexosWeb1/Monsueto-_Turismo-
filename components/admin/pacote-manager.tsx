"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Loader2, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import type { Pacote } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "./image-upload";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

type Form = {
  destino: string;
  mes: string;
  imagem: string;
  promocao: boolean;
  ativo: boolean;
};

const vazio: Form = {
  destino: "",
  mes: "",
  imagem: "",
  promocao: false,
  ativo: true,
};

export function PacoteManager({ inicial }: { inicial: Pacote[] }) {
  const [pacotes, setPacotes] = useState<Pacote[]>(inicial);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(vazio);
  const [saving, setSaving] = useState(false);

  function abrirNovo() {
    setEditId(null);
    setForm(vazio);
    setOpen(true);
  }

  function abrirEdicao(p: Pacote) {
    setEditId(p.id);
    setForm({
      destino: p.destino,
      mes: p.mes || "",
      imagem: p.imagem,
      promocao: p.promocao,
      ativo: p.ativo,
    });
    setOpen(true);
  }

  async function salvar() {
    if (!form.imagem) {
      toast.error("Envie a arte do pacote.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/pacotes", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { id: editId, ...form } : form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao salvar");
      if (editId) {
        setPacotes((prev) => prev.map((p) => (p.id === editId ? data : p)));
        toast.success("Pacote atualizado");
      } else {
        setPacotes((prev) => [...prev, data]);
        toast.success("Pacote criado");
      }
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  async function alternarAtivo(p: Pacote) {
    const novo = !p.ativo;
    setPacotes((prev) => prev.map((x) => (x.id === p.id ? { ...x, ativo: novo } : x)));
    const res = await fetch("/api/pacotes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id, ativo: novo }),
    });
    if (!res.ok) {
      setPacotes((prev) => prev.map((x) => (x.id === p.id ? { ...x, ativo: p.ativo } : x)));
      toast.error("Não foi possível atualizar");
    }
  }

  async function excluir(p: Pacote) {
    if (!confirm(`Excluir o pacote "${p.destino || "sem nome"}"?`)) return;
    const anterior = pacotes;
    setPacotes((prev) => prev.filter((x) => x.id !== p.id));
    const res = await fetch("/api/pacotes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id }),
    });
    if (res.ok) toast.success("Pacote excluído");
    else {
      setPacotes(anterior);
      toast.error("Erro ao excluir");
    }
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button onClick={abrirNovo} className="bg-brand-red hover:bg-brand-red-dark">
          <Plus className="h-4 w-4" /> Novo pacote
        </Button>
      </div>

      {pacotes.length === 0 ? (
        <EmptyState onNew={abrirNovo} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pacotes.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src={p.imagem}
                  alt={p.destino || "Pacote"}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
                {p.promocao && (
                  <span className="absolute left-2 top-2 rounded-full bg-brand-red px-2.5 py-0.5 text-xs font-bold text-white">
                    Promoção
                  </span>
                )}
                {!p.ativo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Badge variant="secondary">Inativo</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-brand-navy">
                  {p.destino || "Pacote sem nome"}
                </p>
                {p.mes && (
                  <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3" /> {p.mes}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Switch checked={p.ativo} onCheckedChange={() => alternarAtivo(p)} />
                    {p.ativo ? "Ativo" : "Inativo"}
                  </label>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => abrirEdicao(p)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => excluir(p)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? "Editar pacote" : "Novo pacote"}</DialogTitle>
            <DialogDescription>
              Envie a arte do pacote. O nome do lugar e o mês são opcionais.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Arte do pacote *</Label>
              <ImageUpload
                value={form.imagem}
                onChange={(url) => setForm((f) => ({ ...f, imagem: url }))}
              />
              <p className="text-xs text-muted-foreground">
                Envie a arte/flyer do pacote (formato retrato, tipo post de
                Instagram). É ela que aparece no card do site.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-destino">Nome do lugar</Label>
              <Input
                id="p-destino"
                value={form.destino}
                onChange={(e) => setForm((f) => ({ ...f, destino: e.target.value }))}
                placeholder="Ex: Caldas Novas (opcional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-mes">Mês</Label>
              <select
                id="p-mes"
                value={form.mes}
                onChange={(e) => setForm((f) => ({ ...f, mes: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Selecione o mês (opcional)</option>
                {meses.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3">
                <Switch
                  checked={form.promocao}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, promocao: v }))}
                />
                <span className="text-sm">Marcar como promoção</span>
              </label>
              <label className="flex items-center gap-3">
                <Switch
                  checked={form.ativo}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, ativo: v }))}
                />
                <span className="text-sm">Pacote ativo</span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={salvar}
              disabled={saving}
              className="bg-brand-red hover:bg-brand-red-dark"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function EmptyState({ onNew }: { onNew: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
      <p className="font-medium text-brand-navy">Nenhum pacote cadastrado</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Crie o primeiro pacote de viagem para exibir no site.
      </p>
      <Button onClick={onNew} className="mt-4 bg-brand-red hover:bg-brand-red-dark">
        <Plus className="h-4 w-4" /> Novo pacote
      </Button>
    </div>
  );
}
