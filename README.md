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

## Vídeo de intro (pré-home)

- O vídeo é otimizado: H.264 720p com **+faststart** (toca progressivamente, sem precisar baixar tudo antes) — `intro.mp4` (~1 MB) e `portal.mp4` (faststart lossless).
- Há um **boot-loader** (`#boot-loader` no topo do `<body>`): tela de carregamento on-brand que cobre o bootstrap e o buffering do vídeo, dispara o play (vencendo bloqueio de autoplay), com fallback "Toque para entrar" e trava de segurança. Garante que o vídeo carregue para todos.

## Estrutura

- **`index.html`** = **`Portal do Invisível.dc.html`** — página modular entregue na Vercel. `support.js` carrega React/ReactDOM de `vendor/`; three.js vem de `vendor/three.min.js`; fontes de `fonts/`; cartas de `cards/`. Mantenha os dois arquivos em sincronia (index.html é cópia do .dc.html).
- `cards/`, `fonts/`, `vendor/` — assets locais embutidos.
- `uploads/`, `screenshots/` — arquivos de trabalho (no Git, fora do deploy via `.vercelignore`).

## Deploy

Site estático. Na Vercel, `index.html` é servido na raiz automaticamente (sem build).
