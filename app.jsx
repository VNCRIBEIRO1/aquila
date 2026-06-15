/* ============================================================
   APP — "Véu Escarlate" as a film: one scene at a time,
   cinematic dissolves, auto-play + full manual control.
   ============================================================ */
const ACTS = [
  {id:'abertura',    roman:'I',    label:'Abertura',        dur:8},
  {id:'invocacao',   roman:'II',   label:'Invocação',       dur:9},
  {id:'vidente',     roman:'III',  label:'A Vidente',       dur:16},
  {id:'arcanos',     roman:'IV',   label:'A Tiragem',       dur:20},
  {id:'consulta',    roman:'V',    label:'Consulta',        dur:14},
];
const SCENES = [Hero, Invocation, Seer, Arcana, Consult];
const TRANS = 1150;

/* ---- intro veil ---- */
function Veil({onEnter}){
  const [gone,setGone] = useState(false);
  const enter = ()=>{ setGone(true); setTimeout(onEnter, 700); };
  return (
    <div id="veil" className={gone?'gone':''}>
      <div className="veil-mandala"></div>
      <div className="veil-kicker">Tarologia · Oráculo</div>
      <div className="veil-title">Véu Escarlate</div>
      <button className="veil-btn" onClick={enter}>Abrir o véu</button>
    </div>
  );
}

/* ---- chapter card that flashes during each cut ---- */
function ChapterCard({act, show}){
  return (
    <div className={'chapter'+(show?' show':'')} aria-hidden="true">
      <div className="chapter-in">
        <span className="cr">{act.roman}</span>
        <span className="cl">{act.label}</span>
      </div>
    </div>
  );
}

/* ---- top progress bar for the playing scene ---- */
function SceneProgress({cur, playing, dur}){
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    el.style.transition = 'none';
    el.style.width = '0%';
    void el.offsetWidth;
    if(playing){ el.style.transition = `width ${dur}s linear`; el.style.width = '100%'; }
  },[cur, playing, dur]);
  return <div className="sceneprog"><i ref={ref}></i></div>;
}

/* ---- bottom film controls ---- */
function FilmControls({cur, total, act, playing, onPrev, onNext, onPlay}){
  const pad = (n)=> (n<10?'0':'')+n;
  return (
    <div className="filmbar">
      <button className="fb-btn" aria-label="Cena anterior" onClick={onPrev} disabled={cur===0}>‹</button>
      <button className="fb-play" aria-label={playing?'Pausar':'Reproduzir'} onClick={onPlay}>
        {playing
          ? <span className="ic"><i></i><i></i></span>
          : <span className="ic tri"></span>}
      </button>
      <button className="fb-btn" aria-label="Próxima cena" onClick={onNext} disabled={cur===total-1}>›</button>
      <div className="fb-meta">
        <b>{act.roman} · {act.label}</b>
        <span>{pad(cur+1)} <i>/</i> {pad(total)}</span>
      </div>
    </div>
  );
}

function App(){
  const devStill = typeof location!=='undefined' && location.hash.indexOf('still')>=0;
  const [entered,setEntered] = useState(devStill);
  const [cur,setCur]         = useState(0);
  const [leaving,setLeaving] = useState(null);
  const [dir,setDir]         = useState(1);
  const [playing,setPlaying] = useState(false);
  const [cap,setCap]         = useState(false);
  const lock = useRef(false);
  const N = SCENES.length;

  useCursorGlow();
  usePointerParallax(entered, cur);

  const change = useCallback((target, d)=>{
    let i = Math.max(0, Math.min(N-1, target));
    if(lock.current || i===cur) return;
    lock.current = true;
    setDir(d);
    setLeaving(cur);
    setCur(i);
    setCap(true);
    setTimeout(()=> setCap(false), 1000);
    setTimeout(()=>{ lock.current=false; setLeaving(null); }, TRANS);
  },[cur, N]);

  const next = useCallback(()=> change(cur+1, 1), [change, cur]);
  const back = useCallback(()=> change(cur-1, -1), [change, cur]);
  const goTo = useCallback((i)=> change(i, i>cur?1:-1), [change, cur]);
  const stop = useCallback(()=> setPlaying(false), []);

  /* boot + auto-play once the veil lifts */
  useEffect(()=>{
    if(!entered) return;
    document.body.classList.add('booted');
    if(devStill) return;
    const t = setTimeout(()=> setPlaying(true), 1700);
    return ()=> clearTimeout(t);
  },[entered]);

  /* re-trigger reveals whenever a scene takes the stage */
  useEffect(()=>{
    if(!entered) return;
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach((s,i)=>{
      const rvs = s.querySelectorAll('.rv');
      if(i===cur){
        requestAnimationFrame(()=> requestAnimationFrame(()=>
          rvs.forEach(el=> el.classList.add('in'))));
      } else if(i!==leaving){
        rvs.forEach(el=> el.classList.remove('in'));
      }
    });
  },[cur, entered, leaving]);

  /* keyboard */
  useEffect(()=>{
    if(!entered) return;
    const onKey = (e)=>{
      if(['ArrowDown','ArrowRight','PageDown',' ','Spacebar'].includes(e.key)){ e.preventDefault(); stop(); next(); }
      else if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){ e.preventDefault(); stop(); back(); }
      else if(e.key==='Home'){ stop(); goTo(0); }
      else if(e.key==='End'){ stop(); goTo(N-1); }
    };
    addEventListener('keydown', onKey);
    return ()=> removeEventListener('keydown', onKey);
  },[entered, next, back, goTo, stop, N]);

  /* wheel + touch (respect inner scroll of tall scenes) */
  useEffect(()=>{
    if(!entered) return;
    let acc=0, cd=0, ty=null;
    const scroller = ()=> document.querySelector('.scene.is-active .scene-scroll');
    const bounds = ()=>{
      const s = scroller();
      if(!s) return {can:false, atTop:true, atBot:true};
      const can = s.scrollHeight > s.clientHeight + 2;
      return { can, atTop: s.scrollTop<=0, atBot: s.scrollTop + s.clientHeight >= s.scrollHeight - 1 };
    };
    const onWheel = (e)=>{
      const b = bounds();
      const down = e.deltaY > 0;
      const blocked = down ? (b.can && !b.atBot) : (b.can && !b.atTop);
      if(blocked){ acc=0; return; }
      e.preventDefault();
      if(performance.now() < cd) return;
      acc += e.deltaY;
      if(Math.abs(acc) > 36){ stop(); (acc>0 ? next() : back()); acc=0; cd = performance.now() + TRANS + 160; }
    };
    const ts = (e)=>{ ty = e.touches[0].clientY; };
    const tm = (e)=>{
      if(ty==null) return;
      const b = bounds();
      const dy = ty - e.touches[0].clientY;       // >0 swipe up => next
      const blocked = dy>0 ? (b.can && !b.atBot) : (b.can && !b.atTop);
      if(blocked) return;
      if(Math.abs(dy) > 60 && performance.now() > cd){ stop(); (dy>0 ? next() : back()); ty = e.touches[0].clientY; cd = performance.now() + TRANS + 160; }
    };
    const te = ()=>{ ty=null; };
    addEventListener('wheel', onWheel, {passive:false});
    addEventListener('touchstart', ts, {passive:true});
    addEventListener('touchmove', tm, {passive:true});
    addEventListener('touchend', te, {passive:true});
    return ()=>{
      removeEventListener('wheel', onWheel);
      removeEventListener('touchstart', ts);
      removeEventListener('touchmove', tm);
      removeEventListener('touchend', te);
    };
  },[entered, next, back, stop]);

  /* auto-play timer */
  useEffect(()=>{
    if(!entered || !playing) return;
    const t = setTimeout(()=>{ if(cur < N-1) next(); else setPlaying(false); }, (ACTS[cur].dur||10)*1000);
    return ()=> clearTimeout(t);
  },[entered, playing, cur, next, N]);

  const sceneCls = (i)=> 'scene' + (i===cur?' is-active':'') + (i===leaving?' is-leaving':'');

  return (
    <React.Fragment>
      <EmberField/>
      <div id="glow"></div>
      {!entered && <Veil onEnter={()=> setEntered(true)}/>}
      <header className="wordmark">Véu <span className="dot">✦</span> Escarlate</header>

      <div className="film" style={{'--dy': dir>0 ? '5%' : '-5%'}}>
        {SCENES.map((Comp,i)=>(
          <div key={i} className={sceneCls(i)} aria-hidden={i!==cur}>
            <div className="scene-scroll">{React.createElement(Comp)}</div>
          </div>
        ))}
      </div>

      <ChapterCard act={ACTS[cur]} show={cap}/>
      <ProgressRail acts={ACTS} active={cur} onJump={(i)=>{ stop(); goTo(i); }}/>
      <SceneProgress cur={cur} playing={playing} dur={ACTS[cur].dur}/>
      {entered && (
        <FilmControls
          cur={cur} total={N} act={ACTS[cur]} playing={playing}
          onPrev={()=>{ stop(); back(); }}
          onNext={()=>{ stop(); next(); }}
          onPlay={()=> setPlaying(p=>!p)}
        />
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
