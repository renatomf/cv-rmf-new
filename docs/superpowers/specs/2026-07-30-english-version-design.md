# Versão em inglês (`/en`) com SEO real

## Contexto

O site (`rmf-dev.com.br`) já tem conteúdo PT/EN pronto em `src/data/translations.json`, mas o idioma hoje só troca no client via `LocaleProvider` (estado React, sem mudança de URL). Isso significa que o Google só indexa a versão em português — a versão em inglês é invisível pra buscadores e não pode ser compartilhada como link direto.

Objetivo: o usuário tem interesse em vagas internacionais e quer uma versão em inglês real, indexável e compartilhável, sem regredir o trabalho de SEO já feito na versão em português (domínio, sitemap, verificação no Google Search Console, todos já configurados e funcionando em `rmf-dev.com.br`).

## Decisões

- **Sem redirect automático por idioma do navegador.** `/` sempre serve PT por padrão. Google recomenda evitar redirect por `Accept-Language`/IP (comportamento inconsistente pro crawler). Quem quiser inglês acessa `/en` diretamente (link compartilhado, resultado de busca em inglês via hreflang, ou toggle manual).
- **Toggle de idioma no Header passa a navegar entre rotas** (`/` ↔ `/en`), preservando o hash da seção atual (`window.location.hash`) pra não perder a posição de scroll.
- **URL raiz (`/`) continua exibindo PT sem prefixo** — não pode virar `/pt` visível, pra não invalidar o que já está indexado/verificado no Search Console.

## Arquitetura

Abordagem escolhida: rota dinâmica `app/[lang]/` (padrão oficial do Next.js pra i18n), com um `proxy.ts` reescrevendo `/` → `/pt` internamente (o navegador e o Google continuam vendo `/`).

Alternativa descartada: duplicar pastas (`app/en/`) sem segmento dinâmico — não permite `<html lang>` dinâmico corretamente, porque layouts aninhados não podem redeclarar `<html>`/`<body>` (só o layout raiz pode). A rota dinâmica resolve isso nativamente.

Nota de versão: nesta versão do Next.js, `middleware.ts` foi renomeado para `proxy.ts` — usar a convenção nova.

### Estrutura de arquivos

```
src/app/
  [lang]/
    layout.tsx      ← era app/layout.tsx (html/body, fonts, LocaleProvider, generateMetadata, JSON-LD)
    page.tsx        ← era app/page.tsx (Header, ScrollHero, seções — conteúdo inalterado)
  robots.ts          (inalterado)
  sitemap.ts          (atualizado — ver "Sitemap" abaixo)
  apple-icon.png, icon.svg  (inalterados — ícones globais continuam resolvendo normalmente)
  actions/            (inalterado — não é rota)
src/proxy.ts          ← novo
```

`generateStaticParams()` no `[lang]/layout.tsx` retorna `[{lang: 'pt'}, {lang: 'en'}]` (as duas páginas são geradas estaticamente no build).

### `proxy.ts`

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/pt", request.url));
  }
}

export const config = { matcher: "/" };
```

### Header / LocaleProvider

- `LocaleProvider` passa a receber `initialLocale` (vindo de `params.lang`, propagado pelo layout) em vez de sempre iniciar em `"pt"`.
- `toggleLocale` no `Header.tsx` deixa de chamar `setLocale` (estado local) e passa a navegar via router: destino `/` (pt) ou `/en` (en), concatenando o hash atual da página pra preservar a seção.

### Metadata por idioma

`[lang]/layout.tsx` troca `export const metadata` estático por `generateMetadata({ params })`. Diferenças por idioma:

- `canonical`: `https://rmf-dev.com.br` (pt) ou `https://rmf-dev.com.br/en` (en) — nunca `/pt`.
- `alternates.languages`: `{ "pt-BR": "https://rmf-dev.com.br", "en-US": "https://rmf-dev.com.br/en" }`, recíproco nas duas versões.
- `html lang`: `"pt-BR"` ou `"en"`, dinâmico via `params.lang`.
- `title`/`description`/`keywords`/`openGraph`/`twitter`: traduzidos para EN na rota `/en`, mantendo o mesmo padrão de tamanho (title ≤60 caracteres, description ≤160) já validado na versão PT.
- JSON-LD (`personJsonLd`): `jobTitle` traduzido ("Desenvolvedor Front-End Sênior" / "Senior Front-End Developer"); nome, contato e endereço continuam iguais.

### Imagem OG em inglês

Nova imagem `image-og-en.jpg` (mesma arte/foto do `image-og.jpg` atual), badge traduzido para "SENIOR FRONT-END" (sem "Tech Lead", igual à decisão já aplicada na versão PT), description em inglês. Referenciada na metadata da rota `/en`.

### Sitemap

`sitemap.ts` passa a listar as duas URLs (`https://rmf-dev.com.br` e `https://rmf-dev.com.br/en`), cada uma com `alternates.languages` apontando pra outra.

### Robots

Sem mudança — `Allow: /` já cobre `/en`.

### Search Console

Não precisa de nova propriedade — `/en` já está coberto pela propriedade `https://rmf-dev.com.br/` (tipo prefixo de URL) já verificada. Só reenviar o sitemap depois do deploy.

## Fora de escopo

- Tradução de conteúdo das seções (About, Experience, Skills, etc.) — já existe em `translations.json`, os componentes já leem via `useTranslations()`.
- Redirect automático por geolocalização/idioma do navegador.
- Domínio/subdomínio separado para inglês.
