"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senha }),
    });
    if (res.ok) {
      router.replace(params.get("next") || "/admin");
      router.refresh();
    } else {
      setErro("Senha incorreta. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-brand-navy-deep px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex justify-center">
          <Image
            src="/brand/logo.png"
            alt="Monsueto Turismo"
            width={80}
            height={80}
            className="h-20 w-auto"
          />
        </div>
        <h1 className="mt-6 text-center font-heading text-2xl text-brand-navy">
          Painel administrativo
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Acesse para gerenciar os pacotes de viagem.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite a senha de acesso"
              required
            />
          </div>
          {erro && <p className="text-sm font-medium text-destructive">{erro}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-red hover:bg-brand-red-dark"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
