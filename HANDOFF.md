# Passagem — João Bike (06/10/2026)

## Onde está
- Código: `site/` (Vite). Conteúdo e contatos: `site/src/content/site.ts`. Tokens: `site/src/styles/global.css`.
- Imagens: originais em `materiais/originais/`; derivadas geradas por `npm run assets` em `site/public/img/`.
- Fontes de cada dado: `docs/FONTES.md`. Direção: `DIRECAO.md`. Estado e verificações: `STATUS.md`.
- Repositório: GitHub `LuqBruno/joao-bike-landing` (privado), branch `main`.

## Como retomar
```bash
cd site
npm ci
npm run dev
```
Depois de editar, rode `npm run build` e, na raiz da operação,
`node 03_Empresa_Interna/06_Producao/op.mjs revisar Joao_Bike_Icara --url http://127.0.0.1:3031/`.

## Cuidados
- **Nunca** acrescentar preço, estoque, avaliação ou marca sem fonte; registrar toda informação nova em docs/FONTES.md.
- O hero é a foto real. Se alguém propuser 3D, ele precisa ficar melhor que a foto (ver README, "3D avaliado").
- O GSAP controla transform e opacity de hero, títulos e roda; o Motion só cuida do menu. Não misturar no mesmo elemento.
- Pré-renderização: `entry-server.tsx` + `scripts/prerender.mjs`. Componentes não devem ler `window` durante a renderização.
- O evento Outubro Rosa tem data em `site.ts` (`event.endsAt`). Para um novo evento, troque os dados e a fonte.
- Antes de publicar de verdade: autorização da loja, remover `noindex` e o aviso de demo do rodapé, definir a URL e as URLs absolutas de `og:image`.

## Próximo passo sugerido
Bruno revisa a prévia. Se aprovar a abordagem, usar o rascunho de PROSPECCAO-2026-10-02.md (não enviado)
e só mostrar a demo depois do interesse da loja.
