/* ============================================================
   FX — embers, cursor glow, reveal & parallax hooks, rail
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- ember + dust particle field on a canvas ---- */
function EmberField(){
  const ref = useRef(null);
  useEffect(()=>{
    const cv = ref.current, ctx = cv.getContext('2d');
    let w,h,dpr, raf, parts=[];
    const COUNT = Math.min(70, Math.floor(window.innerWidth/22));
    function resize(){
      dpr = Math.min(window.devicePixelRatio||1, 2);
      w = cv.width = innerWidth*dpr; h = cv.height = innerHeight*dpr;
      cv.style.width = innerWidth+'px'; cv.style.height = innerHeight+'px';
    }
    function spawn(initial){
      const gold = Math.random()>0.45;
      return {
        x: Math.random()*w,
        y: initial ? Math.random()*h : h + Math.random()*40*dpr,
        r: (Math.random()*1.6+0.5)*dpr,
        vy: -(Math.random()*0.4+0.12)*dpr,
        vx: (Math.random()-0.5)*0.25*dpr,
        a: Math.random()*0.6+0.15,
        tw: Math.random()*Math.PI*2,
        tws: Math.random()*0.04+0.01,
        c: gold ? [247,220,160] : [224,116,46],
      };
    }
    function init(){ parts = Array.from({length:COUNT}, ()=>spawn(true)); }
    resize(); init();
    function tick(){
      ctx.clearRect(0,0,w,h);
      ctx.globalCompositeOperation='lighter';
      for(const p of parts){
        p.y += p.vy; p.x += p.vx; p.tw += p.tws;
        const flick = (Math.sin(p.tw)*0.4+0.6);
        if(p.y < -20*dpr){ Object.assign(p, spawn(false)); }
        const al = p.a*flick;
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*4);
        g.addColorStop(0,`rgba(${p.c[0]},${p.c[1]},${p.c[2]},${al})`);
        g.addColorStop(1,`rgba(${p.c[0]},${p.c[1]},${p.c[2]},0)`);
        ctx.fillStyle=g;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r*4,0,7); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    tick();
    addEventListener('resize', resize);
    return ()=>{ cancelAnimationFrame(raf); removeEventListener('resize',resize); };
  },[]);
  return React.createElement('canvas',{id:'embers', ref});
}

/* ---- cursor glow that trails the pointer ---- */
function useCursorGlow(){
  useEffect(()=>{
    const el = document.getElementById('glow');
    if(!el) return;
    let tx=innerWidth/2, ty=innerHeight/2, x=tx, y=ty, raf;
    function move(e){ tx=e.clientX; ty=e.clientY; document.body.classList.add('has-pointer'); }
    function loop(){ x+=(tx-x)*0.12; y+=(ty-y)*0.12; el.style.transform=`translate(${x}px,${y}px)`; raf=requestAnimationFrame(loop); }
    addEventListener('pointermove', move); loop();
    return ()=>{ cancelAnimationFrame(raf); removeEventListener('pointermove',move); };
  },[]);
}

/* ---- reveal hook: now a no-op ref (the film stage drives .rv per scene) ---- */
function useReveal(){
  return useRef(null);
}

/* ---- pointer parallax: [data-par] in the active scene drift with the cursor ---- */
function usePointerParallax(entered, cur){
  useEffect(()=>{
    if(!entered) return;
    let raf=null, tx=0, ty=0;
    function apply(){
      raf=null;
      const sc = document.querySelector('.scene.is-active'); if(!sc) return;
      sc.querySelectorAll('[data-par]').forEach(n=>{
        const amp = parseFloat(n.dataset.par)||0;
        const f = amp*0.22;
        n.style.translate = `${(-tx*f).toFixed(1)}px ${(-ty*f).toFixed(1)}px`;
      });
    }
    function onMove(e){ tx = e.clientX/innerWidth - .5; ty = e.clientY/innerHeight - .5; if(!raf) raf = requestAnimationFrame(apply); }
    addEventListener('pointermove', onMove);
    return ()=>{ removeEventListener('pointermove', onMove); if(raf) cancelAnimationFrame(raf); };
  },[entered, cur]);
}

/* ---- parallax: elements with data-par move on scroll ---- */
function useParallax(){
  useEffect(()=>{
    const nodes = Array.from(document.querySelectorAll('[data-par]'));
    let raf=null;
    function update(){
      const vh = innerHeight;
      for(const n of nodes){
        const r = n.getBoundingClientRect();
        const center = r.top + r.height/2;
        const prog = (center - vh/2) / vh;           // -1..1 around viewport center
        const speed = parseFloat(n.dataset.par);     // px amplitude
        n.style.transform = `translate3d(0,${(prog*speed).toFixed(1)}px,0)`;
      }
      raf=null;
    }
    function onScroll(){ if(!raf) raf=requestAnimationFrame(update); }
    update();
    addEventListener('scroll', onScroll, {passive:true});
    addEventListener('resize', onScroll);
    return ()=>{ removeEventListener('scroll',onScroll); removeEventListener('resize',onScroll); };
  },[]);
}

/* ---- progress rail w/ act tracking (driven by film state) ---- */
function ProgressRail({acts, active, onJump}){
  return React.createElement('nav',{className:'rail'},
    acts.map((a,i)=>React.createElement('button',{
      key:a.id, className:i===active?'on':'', 'aria-label':a.label, onClick:()=> onJump && onJump(i)
    }, React.createElement('span',{className:'tip'}, a.roman+' · '+a.label)))
  );
}

Object.assign(window,{ EmberField, useCursorGlow, useReveal, useParallax, usePointerParallax, ProgressRail });
