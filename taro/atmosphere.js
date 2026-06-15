/* ============================================================
   ATMOSPHERE — drifting mist + wandering celestial symbols
   CSS-animation driven (set per-element variables), so the
   motion plays whenever the page is displayed — even when the
   environment forces prefers-reduced-motion (it's re-enabled
   in styles.css) or throttles requestAnimationFrame.
   ============================================================ */
(function () {
  const GOLD = "#e7d3a6", MINT = "#7af0cf", EMER = "#34d399";
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (a) => a[(Math.random() * a.length) | 0];
  const small = window.innerWidth < 680;

  /* ---------------- Mist clouds ---------------- */
  const cloudLayer = document.querySelector(".clouds");
  if (cloudLayer) {
    const tints = [
      "rgba(45,212,191,0.22)",
      "rgba(52,211,153,0.17)",
      "rgba(122,240,207,0.15)",
      "rgba(201,169,106,0.13)",   // warm light-leak cloud
      "rgba(18,120,94,0.20)",
    ];
    const N = small ? 5 : 8;
    for (let i = 0; i < N; i++) {
      const el = document.createElement("div");
      el.className = "cloud";
      const size = rand(280, 700);
      el.style.width = el.style.height = size + "px";
      el.style.marginLeft = el.style.marginTop = -size / 2 + "px";
      el.style.top = rand(-8, 96).toFixed(1) + "%";
      el.style.background = `radial-gradient(circle at 50% 50%, ${tints[i % tints.length]} 0%, transparent 68%)`;
      el.style.opacity = rand(0.55, 1).toFixed(2);
      const dx = rand(48, 104);
      el.style.setProperty("--x0", `${-(size + 80)}px`);
      el.style.setProperty("--x1", `calc(100vw + ${size + 80}px)`);
      el.style.setProperty("--dx", dx.toFixed(1) + "s");
      el.style.setProperty("--delay", `-${rand(0, dx).toFixed(1)}s`);
      el.style.setProperty("--db", rand(9, 17).toFixed(1) + "s");
      el.style.setProperty("--bob", rand(8, 28).toFixed(0) + "px");
      cloudLayer.appendChild(el);
    }
  }

  /* ---------------- Celestial symbols ---------------- */
  const symLayer = document.querySelector(".symbols");
  if (symLayer) {
    const S = (inner) =>
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
    const rays = (cx, cy, r1, r2, n) => {
      let p = "";
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 / n) * i;
        p += `<line x1="${(cx + r1 * Math.cos(a)).toFixed(1)}" y1="${(cy + r1 * Math.sin(a)).toFixed(1)}" x2="${(cx + r2 * Math.cos(a)).toFixed(1)}" y2="${(cy + r2 * Math.sin(a)).toFixed(1)}"/>`;
      }
      return p;
    };
    const SYMS = [
      S(`<path d="M12 2 C12.7 8 16 11.3 22 12 C16 12.7 12.7 16 12 22 C11.3 16 8 12.7 2 12 C8 11.3 11.3 8 12 2 Z"/>`),
      S(`<path d="M15.5 3.2 a9 9 0 1 0 0 17.6 A7.4 7.4 0 0 1 15.5 3.2 z"/>`),
      S(`<circle cx="12" cy="12" r="4.4"/>${rays(12, 12, 6, 9, 8)}`),
      S(`<path d="M12 3.5 L20.5 19 L3.5 19 Z"/><path d="M12 9.5 L16 17 L8 17 Z" opacity="0.55"/>`),
      S(`<path d="M2 12 q10 -8 20 0 q-10 8 -20 0 z"/><circle cx="12" cy="12" r="2.4"/>`),
      S(`<path d="M12 3.5 L13.8 9.4 L20 9.9 L15 13.6 L16.7 19.6 L12 16 L7.3 19.6 L9 13.6 L4 9.9 L10.2 9.4 Z"/>`),
      S(`<ellipse cx="12" cy="12" rx="9" ry="3.2" transform="rotate(-22 12 12)"/><circle cx="12" cy="12" r="4.2"/>`),
      S(`<path d="M12 12 a2.2 2.2 0 1 1 2.4 -2.2 A4.6 4.6 0 1 1 9.5 14.6 A7 7 0 1 1 16.8 7.4"/>`),
      S(`<path d="M12 4 v16 M4 12 h16" opacity="0.5"/><path d="M12 8.2 L13.4 10.6 L16 12 L13.4 13.4 L12 15.8 L10.6 13.4 L8 12 L10.6 10.6 Z"/>`),
      S(`<path d="M7 7 L17 17 M17 7 L7 17" opacity="0.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>`),
    ];
    const N = small ? 7 : 12;
    for (let i = 0; i < N; i++) {
      const el = document.createElement("div");
      el.className = "symbol";
      el.innerHTML = pick(SYMS);
      const size = rand(15, 46);
      const depth = rand(0.4, 1);
      const col = Math.random() < 0.55 ? GOLD : (Math.random() < 0.5 ? MINT : EMER);
      el.style.width = el.style.height = size + "px";
      el.style.marginLeft = el.style.marginTop = -size / 2 + "px";
      el.style.top = rand(3, 93).toFixed(1) + "%";
      el.style.color = col;
      el.style.filter = `drop-shadow(0 0 ${Math.max(3, size / 5) | 0}px ${col}66)`;
      const dx = rand(20, 52) / (0.5 + depth / 2);   // farther = slower crossing
      el.style.setProperty("--x0", `${-(size + 50)}px`);
      el.style.setProperty("--x1", `calc(100vw + ${size + 50}px)`);
      el.style.setProperty("--dx", dx.toFixed(1) + "s");
      el.style.setProperty("--delay", `-${rand(0, dx).toFixed(1)}s`);
      el.style.setProperty("--ds", rand(22, 64).toFixed(0) + "s");
      el.style.setProperty("--turn", Math.random() < 0.5 ? "360deg" : "-360deg");
      el.style.setProperty("--op", (rand(0.2, 0.52) * (0.5 + depth / 2)).toFixed(2));
      symLayer.appendChild(el);
    }
  }
})();
