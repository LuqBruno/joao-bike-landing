# Direção — João Bike (Içara)

Estado: implementada na demo 0.1.0 (06/10/2026). Aprovação da loja: não há (demo não apresentada).
Escolhida por Claude a partir do pedido de Bruno de 06/10/2026, que definia ciclismo, movimento,
precisão mecânica e proximidade local.

## Hipóteses comparadas
| Critério | A — "Ajuste fino desde 1983" (escolhida) | B — Hero 3D da GTA Gravity |
| --- | --- | --- |
| Adequação à marca | Selo hexagonal e letreiro itálico vêm da logo | Genérica se a modelagem não for fiel |
| Clareza da oferta | Foto real e CTA imediato | Produto pode ser confundido com representação |
| Impacto visual | Moldura do selo e guia de aro rolando | Alto, se for convincente |
| Celular | Leve, com texto antes da foto | Custo de GPU e de download |
| Materiais | Fotos de estúdio 3024×4032 da loja | Exige medidas técnicas que não temos |
| Esforço | Médio | Alto, com risco de resultado inferior |

Escolha: A. Recorte automático e modelagem foram testados ou avaliados; a fotografia real é superior (ver README).

## Ficha da direção escolhida
1. **Ideia central:** a precisão de oficina e a tradição de 1983, levadas ao formato do selo da logo.
2. **Impressão desejada:** loja de bairro confiável, com acabamento de marca grande.
3. **Paleta:** azul #0149AF (marca, hero, guia e rodapé), azul-noite #04173D (história), gelo #EEF3FA
   (vitrine e loja), branco, tinta #0B1F44 no texto e rosa #D6246E só no Outubro Rosa.
4. **Tipografia:** Archivo itálica, largura 125%, peso 860, entrelinha 0,92–1,08 e tracking negativo
   nos títulos; Archivo regular no texto, com 1,6 de entrelinha.
5. **Grid:** cabeçalhos de seção em duas colunas (título e texto de apoio); índice editorial em linhas
   em vez de grade de cartões; carrossel que sangra até a borda da tela.
6. **Imagem:** fotos reais recortadas apenas para tirar as tarjas dos posts; produtos em proporção 5:6
   sobre o painel azul da própria loja.
7. **Movimento:**
   - Hero: contorno do selo desenhado em 1,1 s e foto entrando da esquerda.
   - Títulos: sobem de dentro de uma máscara; traço de rota em 1 s; conteúdo avança 18 px ao entrar.
   - Guia: roda com rolagem física em 0,9 s, interrompível.
   - Menu: mola sem quique.
   - Movimento reduzido: tudo estático.
8. **Detalhe distintivo:** o guia de aro com roda proporcional que rola.
9. **Restrições técnicas:** pré-renderização no build; Motion só sob demanda; imagens AVIF/WebP com dimensões reservadas.
10. **Deliberadamente fora:** preços, avaliações, carrinho, autoplay, partículas, 3D.

## Seções e função
| Seção | Pergunta do visitante | Conteúdo confirmado | Pendência |
| --- | --- | --- | --- |
| Hero | Quem é, onde fica, como falo? | Desde 1983, Centro de Içara, WhatsApp | — |
| Tudo para pedalar | O que tem na loja? | Bicicletas, elétricas, peças e acessórios, oficina | — |
| Na vitrine | Que modelos posso ver? | 4 modelos com especificações das legendas | Disponibilidade atual |
| Guia de aro | Qual tamanho para meu filho? | Guia da loja (25/09/2026) | — |
| Oficina | O que fazem e como agendo? | Serviços e revisões dos posts | — |
| História | Posso confiar? | Série de 40 anos | — |
| Pedalar junto | Há comunidade? | Grupo de WhatsApp; Outubro Rosa (17/10) | Bloco some após 17/10 |
| Loja | Onde, quando, com quem falo? | Endereço, horário Google, 3 assuntos | Confirmar horário em feriados |
