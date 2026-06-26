# Monsueto Turismo

Site institucional e painel administrativo da agência Monsueto Turismo (Contagem - MG).
Feito com Next.js, Tailwind CSS, shadcn/ui e Vercel Blob (sem banco de dados).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. O painel fica em http://localhost:3000/admin
(senha padrão em desenvolvimento: `monsueto123`).

Em desenvolvimento, sem token do Vercel Blob, os dados são salvos em arquivos
locais (`data/` e `public/uploads/`), então o painel funciona normalmente.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável | Para que serve |
| --- | --- |
| `ADMIN_PASSWORD` | Senha de acesso ao painel `/admin` |
| `AUTH_SECRET` | Segredo aleatório para assinar a sessão do admin |
| `BLOB_READ_WRITE_TOKEN` | Token do Vercel Blob (deixe vazio em dev local) |

Gerar um `AUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Deploy na Vercel

1. Suba o código para um repositório Git e importe o projeto na Vercel.
2. Em **Storage**, crie um **Blob Store** e conecte ao projeto. Isso cria a
   variável `BLOB_READ_WRITE_TOKEN` automaticamente.
3. Em **Settings > Environment Variables**, defina `ADMIN_PASSWORD` e `AUTH_SECRET`.
4. Faça o deploy.

## Painel administrativo

- **Banners**: imagens e textos do carrossel da página inicial.
- **Pacotes**: destinos e promoções (imagem, preço, condição, validade, promoção).

As imagens de destino que vêm de exemplo (`public/destinos/*.svg`) são pôsteres
gerados para o lançamento e devem ser substituídas pelas fotos reais da agência
pelo painel.

## Scripts

```bash
npm run dev     # desenvolvimento
npm run build   # build de produção
npm run start   # servir o build
npm run lint    # checagem de lint
```
