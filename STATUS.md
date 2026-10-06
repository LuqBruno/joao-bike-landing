# Estado do projeto — João Bike (Içara)
Atualizado em: 06/10/2026. Esta ficha é técnica; negociação e recebimento ficam no PIPELINE.md.

- **Objetivo e ação principal:** landing de demonstração para apresentação comercial; conversa no WhatsApp com mensagem pronta (ver BRIEFING.md)
- **Natureza:** demonstração comercial para empresa real. Conteúdo verdadeiro com fonte, não fictício. Não contratada, com `noindex` e aviso no rodapé
- **Pasta:** 02_Trabalhos_Reais/00_Leads_e_Propostas/Joao_Bike_Icara (código em `site/`)
- **Fonte vigente de aprovação:** nenhuma (a loja ainda não viu a demo)
- **Stack e comandos:** React 19 + TS + Tailwind 4 + Vite 8; GSAP, Embla, Motion (menu, sob demanda). Em `site/`: `npm run dev` (porta 3031), `npm run build`, `npm run preview`, `npm run assets`
- **Versão em trabalho:** 0.1.0
- **Destino de entrega e estado de publicação:** código em repositório privado no GitHub (pedido de Bruno, 06/10/2026). Página não publicada; nenhuma mensagem enviada à loja

## Última verificação real (06/10/2026)
- `npm run check` e `npm run build` (com pré-renderização) passaram.
- **op revisar** `2026-10-06_174108-revisar` (dev, 360/390/768/1024/1440): 0 bloqueadores, 0 prioritários, 0 avisos.
  Execuções anteriores corrigidas: estrutura ARIA do carrossel e alvos de toque menores que 32 px.
- **Playwright:**
  - Sem rolagem horizontal em 360/390/430.
  - Menu abre, recebe o foco, fecha com Esc e devolve o foco.
  - Carrossel avança por seta do teclado e por botão.
  - Guia de aro responde a botões e teclado e monta a mensagem do WhatsApp por faixa.
  - Âncoras e imagens sem falhas; 0 erros ou avisos no console, inclusive após a hidratação do HTML pré-renderizado.
  - Movimento reduzido: tudo visível e contorno do selo estático.
- **Lighthouse local** (build de produção, laboratório, não é dado de usuário real):
  - Celular: desempenho 71, acessibilidade 100, boas práticas 100, LCP 5,8 s (simulado), CLS 0,014.
  - Desktop: desempenho 99, LCP 0,9 s.
  - SEO 58 é causado pelo `noindex` intencional.
- **Não verificado:** aparelho físico, Safari/iOS e taxa de quadros.

## Decisões recentes
- 06/10/2026: pasta criada por `op preparar`. Pesquisa no Linktree, no Instagram (12 posts e carrosséis) e no Google Maps; fontes em docs/FONTES.md.
- 06/10/2026: direção "Ajuste fino desde 1983" (DIRECAO.md). Hero com foto real da GTA Gravity dentro do selo da logo.
- 06/10/2026: **3D não adotado.** O recorte automático deixou resíduos e as fotos cortam as rodas; sem medidas, a modelagem ficaria inferior à foto.
- 06/10/2026: preços, nota do Google e Skill Boy (arte do fabricante) deixados de fora.
- 06/10/2026: o bloco do Pedal Outubro Rosa some sozinho depois de 17/10/2026.

## Pendências reais
- Autorização da loja para logo, fotos e imagem das pessoas antes de qualquer publicação.
- Disponibilidade atual dos modelos da vitrine. Os modelos foram publicados entre 24/09 e 02/10.
- Horário em feriados (o Google sinaliza variação); URL do TikTok, se a loja quiser exibir.
- Melhorar o LCP no celular (tamanho da foto do hero e fontes), se a demo virar projeto.

## Publicação (06/10/2026, autorizada por Bruno: "faça uma page", "deixa publico")
- O repositório https://github.com/LuqBruno/joao-bike-landing está **público**, com o GitHub Pages via Actions (`.github/workflows/deploy-pages.yml`).
- Prévia em https://luqbruno.github.io/joao-bike-landing/, com `noindex` ativo e aviso de demo no rodapé.
- No primeiro deploy, as imagens falharam: o HTML pré-renderizado usava a base `/`. Corrigido com caminhos relativos `./img/` e reenviado.

## Próxima ação
Bruno revisar a prévia (`cd site && npm run dev`) e decidir se e quando apresentar à loja, conforme o
fluxo do PIPELINE (primeiro contato antes de enviar a demo).
