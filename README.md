# Portal do Invisível — T'aróloga Aquila

Landing cinematográfica (intro em vídeo, leitura de tarô interativa, cenas WebGL com three.js).

## 100% local / independente

Todos os recursos que antes vinham da internet foram **embutidos no projeto**, sem alterar nenhuma função ou efeito:

| Recurso | Antes | Agora |
| --- | --- | --- |
| Cartas de tarô | `commons.wikimedia.org` (online) | `cards/` (22 JPEGs locais) |
| Fontes (Cormorant Garamond + Jost) | Google Fonts CDN | `fonts/` (woff2 self-hosted + `fonts.css`) |
| three.js r128 | cdnjs | `vendor/three.min.js` |
| React 18.3.1 + ReactDOM | unpkg | `vendor/react*.production.min.js` (SRI preservado) |
| Babel standalone 7.26.4 | unpkg | `vendor/babel.min.js` |

Não há mais nenhuma requisição externa de recurso. Os únicos links externos restantes são intencionais: o botão de WhatsApp (`wa.me`) e o namespace XML de SVG (`w3.org`).

## Estrutura

- **`index.html`** — bundle self-contained (página entregue na Vercel). React, ReactDOM e three.js já vêm embutidos; só busca as cartas em `cards/`.
- **`Portal do Invisível.dc.html` + `support.js`** — fonte modular editável (mesma experiência), agora carregando tudo de `vendor/`, `fonts/` e `cards/`.
- `cards/`, `fonts/`, `vendor/` — assets locais embutidos.

## Deploy

Site estático. Na Vercel, `index.html` é servido na raiz automaticamente (sem build).
