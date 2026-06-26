# Monsueto Turismo - Site institucional

Site institucional e de captação para a agência de viagens Monsueto Turismo
(Contagem - MG), com painel administrativo para a equipe atualizar banners e
pacotes de viagem sem precisar mexer no código.

## Visão geral

- Site de uma página (one-page) com seções: Hero (estático, com a fachada de fundo),
  Pacotes, Sobre, Serviços, Depoimentos e Localização/Contato.
- Conversão somente por WhatsApp e telefone (sem formulário e sem reserva online).
- Painel admin em `/admin` para gerenciar Pacotes (CRUD com upload de imagem/arte).
- Persistência sem banco de dados: Vercel Blob em produção, arquivos locais em dev.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (tokens via `@theme` em `app/globals.css`) + shadcn/ui
- motion (Framer Motion) para animações
- lucide-react para ícones (ícones de Instagram/Facebook são SVG próprios em
  `components/icons/social.tsx`, pois o lucide removeu ícones de marca)
- @vercel/blob para upload de imagens e armazenamento dos dados em JSON
- jose para a sessão do admin (JWT em cookie httpOnly)

## Identidade visual

Cores da marca (definidas em `app/globals.css`):

- Vermelho `#EC1C24` (CTAs / destaque) -> token `brand-red` e `--primary`
- Azul-marinho `#0D2D4D` (base / texto) -> token `brand-navy` e `--foreground`
- Azul-céu `#3DA5E0` (apoio / gradientes) -> token `brand-sky`
- Areia `#FBF7F0` (fundo de respiro) -> token `brand-sand`

Fontes: Calistoga (títulos, classe `font-heading`) + Inter (corpo).
Assets da marca em `public/brand/` (logos, mascote, fachada).

## Estrutura

- `app/page.tsx` - home (monta as seções, lê banners ativos)
- `app/admin/` - painel (login, dashboard, banners, pacotes)
- `app/api/` - rotas: `login`, `logout`, `upload`, `banners`, `pacotes`
- `components/site/` - seções e elementos do site público
- `components/admin/` - shell, formulários e gerenciadores do painel
- `components/ui/` - componentes shadcn/ui
- `lib/config.ts` - dados da empresa (endereço, telefones, horários, redes)
- `lib/types.ts` - tipos `Banner` e `Pacote`
- `lib/data.ts` - leitura/escrita de banners e pacotes
- `lib/blob.ts` - camada de persistência (Blob em prod, arquivos locais em dev)
- `lib/seed.ts` - conteúdo inicial de exemplo e depoimentos curados
- `lib/auth.ts` - sessão e senha do admin
- `proxy.ts` - protege rotas do admin e de escrita da API
- `public/destinos/` - pôsteres de destino em SVG (placeholders editáveis)

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

Sem `BLOB_READ_WRITE_TOKEN` configurado, o painel salva em arquivos locais
(`data/*.json` e `public/uploads/`), então tudo funciona offline em desenvolvimento.

## Variáveis de ambiente

Ver `.env.example`. Em produção (Vercel) configure:

- `ADMIN_PASSWORD` - senha de acesso ao painel `/admin`
- `AUTH_SECRET` - segredo aleatório para assinar a sessão
- `BLOB_READ_WRITE_TOKEN` - criado ao conectar um Blob Store na Vercel

Em desenvolvimento, sem `.env.local`, a senha padrão é `monsueto123`
(definida em `lib/auth.ts`). Troque em produção pela variável `ADMIN_PASSWORD`.

## Como a equipe edita o conteúdo

1. Acessar `/admin` e entrar com a senha.
2. Em "Pacotes", cadastrar destinos e promoções (arte, preço, condição, validade, etc.).
3. As alterações aparecem no site em poucos segundos (a home revalida a cada 30s).

## Deploy (Vercel)

1. Subir o projeto para um repositório Git e importar na Vercel.
2. Em Storage, criar um Blob Store e conectar ao projeto
   (gera `BLOB_READ_WRITE_TOKEN` automaticamente).
3. Definir `ADMIN_PASSWORD` e `AUTH_SECRET` nas variáveis de ambiente.
4. Fazer o deploy. O domínio pode ser apontado nas configurações do projeto.

## Convenções

- Texto em português (pt-BR), tom próximo e humano, sem emojis na interface.
- Evitar travessões como pontuação; ícones sempre em SVG.
- Dados da empresa centralizados em `lib/config.ts` (não duplicar telefone/endereço).
