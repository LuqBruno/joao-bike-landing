# João Bike, Içara: landing de demonstração

Landing premium para a João Bike, bicicletaria no Centro de Içara (SC) desde 1983. É uma demonstração
comercial para um prospect real: o conteúdo é da empresa, mas a página **não** está contratada nem
publicada. A prévia tem `noindex` e um aviso no rodapé.

## Rodar

```bash
cd site
npm ci
npm run dev        # http://127.0.0.1:3031/
npm run build      # TypeScript + build + pré-renderização em site/dist
npm run preview    # serve site/dist em http://127.0.0.1:3031/ (pare o dev antes)
npm run assets     # regenera imagens a partir de ../referencias e materiais/originais
```

Na raiz da operação: `op revisar Joao_Bike_Icara --url http://127.0.0.1:3031/`.

## Stack

React 19 + TypeScript + Tailwind 4 + Vite 8, a partir de `Landing_Premium_Base`. Bibliotecas:

| Biblioteca | Uso |
| --- | --- |
| GSAP + ScrollTrigger + @gsap/react | Entrada do hero, parallax leve da foto, revelação dos títulos, rolagem da roda do guia |
| Embla | Carrossel "Na vitrine da loja" |
| Motion (LazyMotion) | Só o menu do celular, carregado sob demanda na primeira abertura |
| @fontsource-variable/archivo | Archivo variável (largura e peso), auto-hospedada |

Three, Lenis, Rive, Lottie e Radix da base foram removidos por não terem uso aqui.

## Estrutura

```
docs/FONTES.md        origem de cada dado e imagem
materiais/originais/  fotos e logo oficiais usadas (cópias intactas)
referencias/          downloads de pesquisa (não versionados)
site/src/content/     site.ts (todo o conteúdo e contatos) e images.json (dimensões)
site/src/components/  seções; Picture (AVIF/WebP); hex.ts (geometria do selo da logo)
site/scripts/         build-assets.py (recortes e derivadas) e prerender.mjs
```

## Decisões visuais

- **Paleta da logo.** Azul #0149AF medido no PNG oficial, azul-noite #04173D, gelo #EEF3FA e branco.
  O rosa (#D6246E) aparece só no bloco do Pedal Outubro Rosa, que é campanha da própria loja.
- **Tipografia.** Archivo itálica, largura 125% e peso 860 nos títulos, ecoando o letreiro inclinado e
  largo da logo. Archivo normal no texto.
- **Selo hexagonal.** A placa da logo, um hexágono com cantos arredondados que lembra uma porca de
  parafuso, emoldura a foto do hero. O contorno se desenha na entrada, como a linha dupla da logo.
  Também aparece nos marcadores das listas da oficina e na linha da história.
- **Hero.** A GTA Gravity Violeta Galáctico, em foto de estúdio da loja, dentro do selo. O fundo azul
  da foto continua o azul da página. No desktop, "começa aqui." invade a moldura; no celular, o texto
  e os CTAs vêm antes da foto.
- **Momento assinatura.** O guia "Qual aro para cada idade?" foi publicado pela loja. A roda tem
  diâmetro proporcional ao aro e rola sem deslizar quando a idade muda: o giro é a distância dividida
  pelo raio. Na faixa adulta, as rodas de 26″ e 27,5″ aparecem tracejadas.
- **Movimento.** Um único vocabulário, "seguir em frente": o traço de rota se desenha da esquerda para
  a direita e o conteúdo avança no mesmo sentido. Com movimento reduzido, tudo aparece estático e completo.
- **3D avaliado e não adotado.** Testei o recorte das fotos de estúdio (resíduos do painel de fundo e
  rodas cortadas) e avaliei a modelagem no Blender. Sem medidas técnicas da GTA Gravity, uma bike
  modelada ficaria inferior à foto real. Prevaleceu a fotografia, conforme o briefing.

## Contatos e conversão

Todos os CTAs abrem `wa.me/5548999327190` com mensagem pronta e editável, nunca enviada automaticamente:
bike (por modelo), peças e acessórios, oficina e revisão, guia de aro (por faixa) e lista do Pedal Outubro
Rosa. O telefone (48) 3432-4651 está em `tel:`. "Como chegar" usa as coordenadas do Google.
