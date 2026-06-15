/* ============================================================
   MOTION — starfield, cursor, parallax, reveals, deck build
   ============================================================ */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Canvas starfield ---------------- */
  (function starfield() {
    const cv = document.getElementById("stars");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let w, h, dpr, stars = [], shooting = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.width = innerWidth * dpr;
      h = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + "px";
      cv.style.height = innerHeight + "px";
      const count = Math.min(260, Math.floor((innerWidth * innerHeight) / 6500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.3 + 0.3) * dpr,
        b: Math.random() * 0.6 + 0.2,
        tw: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.012 + 0.004,
        gold: Math.random() < 0.18,
        depth: Math.random() * 0.6 + 0.2,
      }));
    }
    resize();
    addEventListener("resize", resize);

    let scrollY = 0;
    addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

    function spawnShooter() {
      const startX = Math.random() * w * 0.7;
      shooting.push({
        x: startX, y: Math.random() * h * 0.4,
        len: (Math.random() * 120 + 80) * dpr,
        vx: (Math.random() * 3 + 5) * dpr,
        vy: (Math.random() * 1.5 + 2) * dpr,
        life: 1,
      });
      setTimeout(spawnShooter, Math.random() * 6500 + 4500);
    }
    setTimeout(spawnShooter, 2600);

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.tw += s.sp;
        const a = s.b * (0.55 + 0.45 * Math.sin(s.tw));
        const py = (s.y - scrollY * dpr * s.depth * 0.25) % h;
        const yy = py < 0 ? py + h : py;
        ctx.beginPath();
        ctx.arc(s.x, yy, s.r, 0, 7);
        ctx.fillStyle = s.gold
          ? `rgba(231,211,166,${a})`
          : `rgba(170,245,222,${a})`;
        ctx.shadowBlur = s.r * 3;
        ctx.shadowColor = s.gold ? "rgba(231,211,166,0.8)" : "rgba(122,240,207,0.7)";
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      for (let i = shooting.length - 1; i >= 0; i--) {
        const m = shooting[i];
        m.x += m.vx; m.y += m.vy; m.life -= 0.012;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.len, m.y - m.len * (m.vy / m.vx));
        grad.addColorStop(0, `rgba(255,255,255,${m.life})`);
        grad.addColorStop(0.3, `rgba(122,240,207,${m.life * 0.7})`);
        grad.addColorStop(1, "rgba(122,240,207,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6 * dpr;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.len, m.y - m.len * (m.vy / m.vx));
        ctx.stroke();
        if (m.life <= 0 || m.x > w + 100) shooting.splice(i, 1);
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* ---------------- Custom cursor ---------------- */
  (function cursor() {
    if (matchMedia("(max-width: 720px)").matches) return;
    const c = document.createElement("div");
    c.className = "cursor";
    document.body.appendChild(c);
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
    (function loop() {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      c.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(".tarot, a, .scroll-cue")) c.classList.add("big");
      else c.classList.remove("big");
    });
  })();

  /* ---------------- Hero title letters ---------------- */
  (function heroTitle() {
    const el = document.querySelector(".hero-title");
    if (!el) return;
    const txt = el.textContent.trim();
    el.innerHTML = "";
    [...txt].forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "l";
      s.textContent = ch === " " ? "\u00A0" : ch;
      s.style.animation = `rise 1.3s var(--ease) ${0.5 + i * 0.07}s forwards`;
      el.appendChild(s);
    });
    const card = document.querySelector(".hero-card");
    if (card) card.classList.add("lit");
  })();

  /* ---------------- Build the deck gallery ---------------- */
  (function buildDeck() {
    const grid = document.getElementById("deck");
    if (!grid || !window.ARCANA) return;
    window.ARCANA.forEach((c) => {
      const el = document.createElement("div");
      el.className = "tarot";
      el.innerHTML = `
        <div class="flipper">
          <div class="card-face">
            <div class="card-roman">${c.roman}</div>
            <div class="card-emblem">${c.art()}</div>
            <div class="card-name">${c.name}</div>
          </div>
          <div class="meaning">
            <div class="m-num">Arcano ${c.roman}</div>
            <div class="m-name">${c.name}</div>
            <div class="m-key">${c.key}</div>
            <div class="m-text">${c.meaning}</div>
          </div>
        </div>`;
      el.addEventListener("click", () => el.classList.toggle("flipped"));
      grid.appendChild(el);
    });
  })();

  /* ---------------- Inject hero card emblem + sigils ---------------- */
  (function injectArt() {
    const heroEm = document.querySelector(".hero-card .card-emblem");
    if (heroEm && window.ARCANA_EM) heroEm.innerHTML = window.ARCANA_EM.estrela();
    document.querySelectorAll("[data-sigil]").forEach((n) => {
      if (window.ARCANA_SIGIL) n.innerHTML = window.ARCANA_SIGIL;
    });
    // feature spread glyphs
    document.querySelectorAll("[data-glyph]").forEach((n) => {
      const k = n.getAttribute("data-glyph");
      if (window.ARCANA_EM && window.ARCANA_EM[k]) n.innerHTML = window.ARCANA_EM[k]();
    });
  })();

  /* ---------------- Scroll reveals ---------------- */
  (function reveals() {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((n) => io.observe(n));

    // staggered cards
    const cio = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          const cards = [...e.target.querySelectorAll(".tarot")];
          cards.forEach((c, i) => setTimeout(() => c.classList.add("in"), i * 90));
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    const deck = document.getElementById("deck");
    if (deck) cio.observe(deck);
  })();

  /* ---------------- Parallax + reading progress ---------------- */
  (function parallax() {
    const layers = [...document.querySelectorAll("[data-par]")];
    const bar = document.querySelector(".scrollbar");
    const dots = [...document.querySelectorAll(".progress a")];
    const sections = dots.map((d) => document.querySelector(d.getAttribute("href")));

    let ticking = false;
    function update() {
      const sy = window.scrollY;
      const docH = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.width = (sy / docH * 100) + "%";

      for (const l of layers) {
        const speed = parseFloat(l.getAttribute("data-par"));
        const rect = l.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - innerHeight / 2;
        l.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
      }
      // active dot
      let act = 0;
      sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= innerHeight * 0.4) act = i; });
      dots.forEach((d, i) => d.classList.toggle("active", i === act));

      ticking = false;
    }
    addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  })();

  /* ---------------- Hero card pointer tilt ---------------- */
  (function heroTilt() {
    const stage = document.querySelector(".hero");
    const card = document.querySelector(".hero-card");
    if (!stage || !card || reduce) return;
    stage.addEventListener("mousemove", (e) => {
      const rx = (e.clientY / innerHeight - 0.5) * -10;
      const ry = (e.clientX / innerWidth - 0.5) * 10;
      card.style.setProperty("--tilt", `rotateX(${rx}deg) rotateY(${ry}deg)`);
    });
  })();
})();
