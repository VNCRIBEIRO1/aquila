/* ============================================================
   ARCANA — data + hand-crafted SVG line-art emblems
   Esmeralda etérea celestial glyphs (gold + mint)
   ============================================================ */
(function () {
  const G = "#e7d3a6";   // gold
  const M = "#7af0cf";   // mint

  // wrap inner svg paths in a styled <svg>
  const svg = (inner, vb = "0 0 100 100") =>
    `<svg viewBox="${vb}" fill="none" stroke="${G}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

  // -- helpers that generate repetitive geometry --
  const polar = (cx, cy, r, deg) => {
    const a = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  // ring of straight + wavy sun rays
  function sunRays(cx, cy, r1, r2, n) {
    let p = "";
    for (let i = 0; i < n; i++) {
      const deg = (360 / n) * i;
      const [x1, y1] = polar(cx, cy, r1, deg);
      if (i % 2 === 0) {
        const [x2, y2] = polar(cx, cy, r2, deg);
        p += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
      } else {
        const [mx, my] = polar(cx, cy, (r1 + r2) / 2, deg + 7);
        const [x2, y2] = polar(cx, cy, r2 - 1.5, deg);
        p += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
      }
    }
    return p;
  }

  function spokes(cx, cy, r1, r2, n) {
    let p = "";
    for (let i = 0; i < n; i++) {
      const deg = (360 / n) * i;
      const [x1, y1] = polar(cx, cy, r1, deg);
      const [x2, y2] = polar(cx, cy, r2, deg);
      p += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
    }
    return p;
  }

  // laurel: leaf ticks along an ellipse arc
  function laurel(cx, cy, rx, ry, startDeg, endDeg, n, dir) {
    let p = "";
    for (let i = 0; i <= n; i++) {
      const deg = startDeg + (endDeg - startDeg) * (i / n);
      const a = (deg - 90) * Math.PI / 180;
      const x = cx + rx * Math.cos(a);
      const y = cy + ry * Math.sin(a);
      const lx = x + dir * 5 * Math.sin(a);
      const ly = y - dir * 5 * Math.cos(a);
      const tx = x + dir * 2.4 * Math.cos(a);
      const ty = y + dir * 2.4 * Math.sin(a);
      p += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} Q ${tx.toFixed(1)} ${ty.toFixed(1)} ${lx.toFixed(1)} ${ly.toFixed(1)}"/>`;
    }
    return p;
  }

  // n-point star as a single closed path
  function star(cx, cy, outer, inner, points) {
    let d = "";
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const [x, y] = polar(cx, cy, r, (180 / points) * i);
      d += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
    }
    return d + "Z";
  }

  const scatter = (list, r = 1.1, col = G) =>
    list.map(([x, y, rr]) => `<circle cx="${x}" cy="${y}" r="${rr || r}" fill="${col}" stroke="none"/>`).join("");

  // ---- emblems ----
  const EM = {
    louco: () => svg(`
      <line x1="14" y1="72" x2="86" y2="72" opacity="0.5"/>
      <path d="M58 72 a14 14 0 0 1 28 0" stroke="${M}"/>
      ${sunRays(72, 72, 16, 22, 7).replace(/<line/g, '<line stroke="'+M+'"').replace(/<path/g, '<path stroke="'+M+'"')}
      <path d="M16 84 C 26 70, 30 84, 40 74 S 54 66, 58 72" stroke-dasharray="1.5 4" opacity="0.85"/>
      <g stroke="${M}">
        <circle cx="26" cy="58" r="3.2"/>
        <circle cx="26" cy="58" r="6.2" opacity="0.5"/>
        <line x1="26" y1="64" x2="26" y2="70"/>
      </g>`),

    mago: () => svg(`
      <path d="M50 30 C 41 21, 31 25, 31 30 C 31 35, 41 39, 50 30 C 59 21, 69 25, 69 30 C 69 35, 59 39, 50 30 Z" stroke="${M}"/>
      <line x1="50" y1="40" x2="50" y2="80"/>
      <circle cx="50" cy="38" r="2" fill="${M}" stroke="none"/>
      <circle cx="26" cy="74" r="3.6"/>
      <path d="M40 79 l3.6 -6.2 3.6 6.2 z"/>
      <rect x="55" y="71" width="6.4" height="6.4" transform="rotate(0)"/>
      <path d="M70 71 a4 4 0 1 0 4 4 a3 3 0 1 1 -4 -4 z" stroke="${M}"/>`),

    sacerdotisa: () => svg(`
      <g>
        <line x1="30" y1="22" x2="30" y2="82"/>
        <line x1="70" y1="22" x2="70" y2="82"/>
        <path d="M25 22 h10 M65 22 h10"/>
        <path d="M26 82 h8 M66 82 h8"/>
      </g>
      <path d="M58 42 a16 16 0 1 1 -0.1 -8 a12 12 0 1 0 0.1 8 z" stroke="${M}"/>
      <path d="M50 60 l7 12 h-14 z" opacity="0.85"/>
      <circle cx="50" cy="40" r="1.6" fill="${M}" stroke="none"/>`),

    imperatriz: () => svg(`
      <circle cx="50" cy="38" r="13"/>
      <line x1="50" y1="51" x2="50" y2="80"/>
      <line x1="42" y1="70" x2="58" y2="70"/>
      <path d="M40 30 l4 -7 4 7 M52 30 l4 -7 4 7" stroke="${M}"/>
      <path d="M30 84 q4 -16 6 -26 M70 84 q-4 -16 -6 -26" />
      ${[0,1,2,3].map(i=>`<path d="M${33-i*0} ${74-i*5} q-4 -2 -5 1 q3 2 5 -1" />`).join("")}
      <circle cx="50" cy="38" r="2" fill="${M}" stroke="none"/>`),

    enamorados: () => svg(`
      ${sunRays(50, 28, 6, 10, 8).replace(/stroke-width="1.3"/g,'')}
      <circle cx="50" cy="28" r="5" stroke="${M}"/>
      <circle cx="42" cy="58" r="14"/>
      <circle cx="58" cy="58" r="14" stroke="${M}"/>
      <line x1="50" y1="40" x2="50" y2="46" opacity="0.6"/>`),

    eremita: () => svg(`
      <line x1="30" y1="86" x2="58" y2="30"/>
      <path d="M50 28 l14 14 -14 14 -14 -14 z"/>
      <path d="${star(50, 42, 8.5, 3.6, 6)}" stroke="${M}"/>
      <circle cx="50" cy="42" r="13.5" opacity="0.4"/>
      ${sunRays(50,42,15,19,6).replace(/<line/g,'<line opacity="0.55" stroke="'+M+'"')}`),

    roda: () => svg(`
      <circle cx="50" cy="50" r="30"/>
      <circle cx="50" cy="50" r="22" opacity="0.5"/>
      <circle cx="50" cy="50" r="9" stroke="${M}"/>
      ${spokes(50,50,9,30,8)}
      <circle cx="50" cy="50" r="35" stroke-dasharray="2 5" opacity="0.6"/>
      <circle cx="50" cy="15" r="1.6" fill="${M}" stroke="none"/>
      <circle cx="85" cy="50" r="1.6" fill="${M}" stroke="none"/>
      <circle cx="50" cy="85" r="1.6" fill="${M}" stroke="none"/>
      <circle cx="15" cy="50" r="1.6" fill="${M}" stroke="none"/>`),

    morte: () => svg(`
      <line x1="14" y1="64" x2="86" y2="64" opacity="0.5"/>
      <path d="M16 64 a14 14 0 0 1 28 0" />
      <path d="M58 64 a13 13 0 0 1 24 -6.5 a10 10 0 1 0 -24 6.5 z" stroke="${M}"/>
      <path d="M50 64 q-7 -10 0 -22 q7 12 0 22 z"/>
      <line x1="50" y1="64" x2="50" y2="82"/>
      <path d="M50 74 q6 -2 8 -7 M50 70 q-6 -2 -8 -7" stroke="${M}"/>`),

    estrela: () => svg(`
      <path d="${star(50, 36, 22, 8, 8)}" stroke="${M}"/>
      <path d="${star(50, 36, 10, 4, 8)}" opacity="0.7"/>
      ${scatter([[20,20,1.3],[80,22,1.3],[26,46,1],[74,46,1],[50,12,1.4],[34,30,0.9],[66,30,0.9]], 1.1, M)}
      <path d="M18 70 q8 -5 16 0 t16 0 t16 0 t16 0" opacity="0.8"/>
      <path d="M18 78 q8 -5 16 0 t16 0 t16 0 t16 0" opacity="0.55"/>
      <path d="M40 58 q3 6 -2 11 M60 58 q-3 6 2 11" stroke="${M}" opacity="0.7"/>`),

    lua: () => svg(`
      <path d="M58 36 a18 18 0 1 1 -0.2 -10 a13 13 0 1 0 0.2 10 z" stroke="${M}"/>
      ${[ -22,-12,38,48 ].map(d=>{const[x,y]=polar(50,30,24,d);const[x2,y2]=polar(50,30,28,d);return `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${M}" opacity="0.7"/>`}).join("")}
      <path d="M24 84 l4 -16 4 16 z M68 84 l4 -16 4 16 z"/>
      <path d="M28 68 h8 M72 68 h8" opacity="0.6"/>
      <path d="M50 84 C 46 74, 54 66, 50 56 C 47 50, 52 46, 50 44" stroke-dasharray="1.5 4"/>
      <path d="M44 60 q2 3 0 5 M58 64 q2 3 0 5" stroke="${M}" opacity="0.7"/>`),

    sol: () => svg(`
      ${sunRays(50, 46, 18, 30, 12)}
      <circle cx="50" cy="46" r="15" stroke="${M}"/>
      <circle cx="50" cy="46" r="9" opacity="0.5"/>
      <circle cx="50" cy="46" r="2.2" fill="${M}" stroke="none"/>
      <path d="M30 80 q20 -8 40 0" opacity="0.45"/>`),

    mundo: () => svg(`
      ${laurel(50,50,26,34,200,340,7,-1)}
      ${laurel(50,50,26,34,20,160,7,1)}
      <path d="M28 22 q22 -8 44 0 M28 78 q22 8 44 0" opacity="0.5"/>
      <path d="${star(50, 50, 16, 5.5, 4)}" stroke="${M}"/>
      ${scatter([[50,18,1.4],[82,50,1.4],[50,82,1.4],[18,50,1.4]], 1.2, G)}
      <circle cx="50" cy="50" r="3" opacity="0.6"/>`),
  };

  // sigil for card backs / closing
  const SIGIL = svg(`
    <circle cx="50" cy="50" r="34" stroke="${G}" opacity="0.7"/>
    <circle cx="50" cy="50" r="26" stroke="${M}" opacity="0.5"/>
    <path d="${star(50,50,30,12,12)}" stroke="${M}" opacity="0.8"/>
    <path d="M58 50 a12 12 0 1 1 -0.2 -7 a8 8 0 1 0 0.2 7 z" stroke="${G}"/>
    ${spokes(50,50,26,34,12).replace(/<line/g,'<line opacity="0.4"')}`);

  // ---- the deck ----
  const ARCANA = [
    { roman: "0",    name: "O Louco",            key: "O Salto",      art: EM.louco,
      meaning: "O começo de tudo. Inocência, fé e a coragem de saltar para o desconhecido." },
    { roman: "I",    name: "O Mago",             key: "A Vontade",    art: EM.mago,
      meaning: "Poder de manifestar. O céu acima e a terra abaixo respondem à sua intenção." },
    { roman: "II",   name: "A Sacerdotisa",      key: "O Véu",        art: EM.sacerdotisa,
      meaning: "Intuição e mistério. Aquilo que se sabe sem precisar ver." },
    { roman: "III",  name: "A Imperatriz",       key: "A Abundância", art: EM.imperatriz,
      meaning: "Criação fértil. A vida que floresce, generosa e sensorial." },
    { roman: "VI",   name: "Os Enamorados",      key: "A União",      art: EM.enamorados,
      meaning: "O encontro de opostos. Amor, escolha e a harmonia entre dois mundos." },
    { roman: "IX",   name: "O Eremita",          key: "A Lanterna",   art: EM.eremita,
      meaning: "A luz interior. Recolher-se para enxergar o caminho com clareza." },
    { roman: "X",    name: "A Roda da Fortuna",  key: "O Ciclo",      art: EM.roda,
      meaning: "Tudo gira. Destino, mudança e o eterno retorno das estações." },
    { roman: "XIII", name: "A Morte",            key: "A Travessia",  art: EM.morte,
      meaning: "Não o fim, mas a transformação. O que morre abre espaço ao que nasce." },
    { roman: "XVII", name: "A Estrela",          key: "A Esperança",  art: EM.estrela,
      meaning: "Cura e fé renovada. A luz que guia depois da tempestade." },
    { roman: "XVIII",name: "A Lua",              key: "O Sonho",      art: EM.lua,
      meaning: "O reino do inconsciente. Sonhos, ilusões e a maré secreta da alma." },
    { roman: "XIX",  name: "O Sol",              key: "A Alegria",    art: EM.sol,
      meaning: "Vitalidade e clareza. O calor que tudo revela e celebra." },
    { roman: "XXI",  name: "O Mundo",            key: "A Plenitude",  art: EM.mundo,
      meaning: "A dança completa. Integração, realização e o retorno à totalidade." },
  ];

  window.ARCANA = ARCANA;
  window.ARCANA_SIGIL = SIGIL;
  window.ARCANA_EM = EM;
})();
