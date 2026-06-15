/* ============================================================
   SMOKE — fumaça volumétrica procedural em WebGL
   fbm + domain warping. Tons oxblood → brasa → ouro.
   Saída em preto+luz para compor com mix-blend-mode: screen.
   window.initSmoke(canvas, opts) -> { destroy() }
   ============================================================ */
(function () {
  const VSRC = 'attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }';

  const FSRC = [
    'precision highp float;',
    'uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;',
    'float hash(vec2 p){ p = fract(p*vec2(123.34,345.45)); p += dot(p, p+34.345); return fract(p.x*p.y); }',
    'float noise(vec2 p){',
    '  vec2 i = floor(p), f = fract(p);',
    '  float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));',
    '  vec2 u = f*f*(3.0-2.0*f);',
    '  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);',
    '}',
    'float fbm(vec2 p){',
    '  float v = 0.0, a = 0.5;',
    '  mat2 m = mat2(1.6,1.2,-1.2,1.6);',
    '  for(int i=0;i<6;i++){ v += a*noise(p); p = m*p; a *= 0.5; }',
    '  return v;',
    '}',
    'void main(){',
    '  vec2 uv = gl_FragCoord.xy / u_res.xy;',
    '  vec2 p = uv; p.x *= u_res.x / u_res.y;',
    '  float t = u_time * 0.035;',
    '  vec2 mo = (u_mouse - 0.5) * 0.10;',
    '  p += mo;',
    // domain warp — duas passadas para dar volume/turbulência
    '  vec2 q = vec2( fbm(p*2.4 + vec2(0.0, t)), fbm(p*2.4 + vec2(5.2,1.3) - t*0.8) );',
    '  vec2 r = vec2( fbm(p*2.4 + 2.6*q + vec2(1.7,9.2) + t*0.55), fbm(p*2.4 + 2.6*q + vec2(8.3,2.8) - t*0.42) );',
    '  float f = fbm(p*2.4 + 2.6*r);',
    '  f = f*f*1.3;',
    // máscara: forte embaixo e nas laterais, central limpo p/ o título
    '  float bottom = 1.0 - smoothstep(0.18, 0.86, uv.y);',
    '  float sides  = smoothstep(0.04, 0.34, abs(uv.x-0.5));',
    '  float mask = bottom * mix(0.30, 1.0, sides);',
    '  float d = clamp(f * mask * 1.18, 0.0, 1.0);',
    // rampa de cor: vinho → brasa → ouro nas cristas
    '  vec3 col = mix(vec3(0.10,0.018,0.015), vec3(0.52,0.165,0.055), smoothstep(0.0,0.5,d));',
    '  col = mix(col, vec3(0.86,0.58,0.28), smoothstep(0.62,1.0,d));',
    '  gl_FragColor = vec4(col * d, 1.0);',
    '}'
  ].join('\n');

  function compile(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('[smoke] shader error:', gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  function initSmoke(canvas, opts) {
    opts = opts || {};
    const scale = opts.scale || 0.55;           // resolução interna (fumaça é suave → low-res ok)
    const fps = opts.fps || 30;
    const activeSel = opts.activeSelector || '.scene';

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, premultipliedAlpha: false })
            || canvas.getContext('experimental-webgl');
    if (!gl) { canvas.classList.add('no-gl'); return null; }

    const vs = compile(gl, gl.VERTEX_SHADER, VSRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FSRC);
    if (!vs || !fs) { canvas.classList.add('no-gl'); return null; }
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.classList.add('no-gl'); return null; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let W = 0, H = 0;
    const mouse = { x: 0.5, y: 0.5 }, mt = { x: 0.5, y: 0.5 };

    function resize() {
      const r = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width * scale));
      const h = Math.max(1, Math.round(r.height * scale));
      if (w === W && h === H) return;
      W = w; H = h;
      canvas.width = W; canvas.height = H;
      gl.viewport(0, 0, W, H);
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX);
      const cy = (e.touches ? e.touches[0].clientY : e.clientY);
      mt.x = Math.min(1, Math.max(0, (cx - r.left) / r.width));
      mt.y = Math.min(1, Math.max(0, (cy - r.top) / r.height));
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });

    const ro = ('ResizeObserver' in window) ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(canvas); else window.addEventListener('resize', resize);

    const host = canvas.closest(activeSel);
    function isActive() {
      if (document.hidden) return false;
      if (host && !host.classList.contains('is-active')) return false;
      return true;
    }

    const t0 = performance.now();
    let last = 0, raf = 0, alive = true;
    const frameGap = 1000 / fps;

    function loop(now) {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      if (now - last < frameGap) return;
      last = now;
      if (!isActive()) return;            // pausa GPU fora do hero / aba oculta
      resize();
      mouse.x += (mt.x - mouse.x) * 0.04;  // parallax suave
      mouse.y += (mt.y - mouse.y) * 0.04;
      gl.uniform2f(uRes, W, H);
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    resize();
    raf = requestAnimationFrame(loop);

    return {
      destroy() {
        alive = false;
        cancelAnimationFrame(raf);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
        const ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext();
      }
    };
  }

  window.initSmoke = initSmoke;
})();
